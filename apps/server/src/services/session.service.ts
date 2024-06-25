import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { schema } from 'db-schema';
import { InferInsertModel, and, eq } from 'drizzle-orm';
import configuration from 'src/config/configuration';
import { DrizzleService } from 'src/drizzle.service';
import { IpGeoResponse } from 'src/shared/types/apis';
import * as useragent from 'express-useragent';
import { SessionAdditional, UserAuthChallenge } from 'common';
import { EmailService } from 'src/modules/email/email.service';
export interface SessionInfo {
  ip_address: string;
  useragent: string;
  deferred?: boolean;
  challenge?: SessionAdditional['challenge'];
  [key: string]: any;
}

export abstract class SessionService {
  protected session_table:
    | typeof schema.system_user_session
    | typeof schema.user_session;
  protected session_user_column_name: 'system_uid' | 'user_uid';
  protected session_user_column:
    | typeof schema.system_user_session.system_uid
    | typeof schema.user_session.user_uid;

  constructor(
    protected drizzleService: DrizzleService,
    protected mailService: EmailService,
    session_table:
      | typeof schema.system_user_session
      | typeof schema.user_session,
    session_user_column_name: 'system_uid' | 'user_uid',
    session_user_column:
      | typeof schema.system_user_session.system_uid
      | typeof schema.user_session.user_uid,
    private logger = new Logger(SessionService.name),
  ) {
    this.session_table = session_table;
    this.session_user_column_name = session_user_column_name;
    this.session_user_column = session_user_column;
  }

  async getActiveSessionById(session_id: string) {
    const session: InferInsertModel<typeof this.session_table> & {
      [key in 'system_uid' | 'user_uid']?: string;
    } = (
      await this.drizzleService.db
        .select()
        .from(this.session_table)
        .where(
          and(
            eq(this.session_table.session_id, session_id),
            eq(this.session_table.status, 'active'),
          ),
        )
    ).at(0);
    return session;
  }

  async undefferSession(session_id: string, challenge: UserAuthChallenge) {
    this.logger.debug('fetching session to undeffer');
    const session = await this.getActiveSessionById(session_id);
    if (!session.additional_meta?.deferred) {
      this.logger.debug(
        "Session was not deferred that's why throwing bad request",
      );
      throw new BadRequestException('Session was not deferred to start with');
    }
    const oldMeta = session.additional_meta;
    oldMeta.deferred = false;
    oldMeta.challenge = { type: challenge };
    return (
      await this.drizzleService.db
        .update(schema.user_session)
        .set({ additional_meta: oldMeta })
        .returning()
    ).at(0);
  }

  async sendLoginAlert(
    email: string,
    ip_address: string,
    additional_meta: SessionAdditional,
  ) {
    this.logger.debug('Sending login alert to user');
    await this.mailService.sendMail(email, {
      template: 'login-alert',
      templateArgs: {
        ip: ip_address,
        country: additional_meta?.ip?.country_name,
        country_flag: additional_meta?.ip?.country_flag,
        location: `${additional_meta?.ip?.state_prov}, ${additional_meta?.ip?.city}`,
        time: `${additional_meta?.ip?.time_zone?.current_time}`,
        timezone: `${additional_meta?.ip?.time_zone?.name} , GMT${additional_meta?.ip?.time_zone?.offset}`,
        browser: `${additional_meta?.ua?.browser}`,
        os: `${additional_meta.ua.os}`,
      },
      subject: `Safetrade ${this.session_user_column_name === 'system_uid' ? 'Systems' : ''} | Login alert`,
    });
  }

  async signOutFromAll(uid: string) {
    await this.drizzleService.db
      .update(this.session_table)
      .set({ status: 'logged_out' })
      .where(eq(this.session_user_column, uid));
    //   schema.user_session.
  }

  async signOutSession(session_id: string) {
    await this.drizzleService.db
      .update(this.session_table)
      .set({ status: 'logged_out' })
      .where(eq(this.session_table.session_id, session_id));
  }

  async _fetchIpInfo(ip_address: string) {
    const endpoint = `https://api.ipgeolocation.io/ipgeo?apiKey=${configuration().api_ipgeo}&ip=${ip_address}`;
    let resp: IpGeoResponse;
    try {
      resp = await (await fetch(endpoint)).json();
    } catch (err) {
      // TODO: Sentry error logging
    }
    return {
      country_name: resp.country_name,
      country_flag: resp.country_flag,
      state_prov: resp.state_prov,
      city: resp.city,
      district: resp.district,
      time_zone: {
        current_time: resp.time_zone?.current_time,
        name: resp.time_zone?.name,
        offset: resp.time_zone?.offset,
      },
    };
  }

  _fetchUserAgentInfo(user_agent: string) {
    // TODO: Browser Icons implement static module
    let ua: useragent.Details;
    try {
      ua = useragent.parse(user_agent);
    } catch (err) {}
    return { browser: ua.browser, os: ua.os };
  }

  async updateLastActive(session_id: string) {
    const session = (
      await this.drizzleService.db
        .update(this.session_table)
        .set({ last_active: new Date() })
        .where(eq(this.session_table.session_id, session_id))
        .returning()
    ).at(0);
    return session;
  }

  async initiateSession(user_uid: string, session_info: SessionInfo) {
    const created_at = new Date().getTime();
    this.logger.debug(
      `initiating session with ${this.session_user_column_name}`,
    );
    const user_obj: InferInsertModel<typeof this.session_table> & {
      [key in 'system_uid' | 'user_uid']?: string;
    } = {
      ip_address: session_info.ip_address || 'unknown',
      [this.session_user_column_name]: user_uid,
      created_at: new Date(created_at),
      last_active: new Date(),
      status: 'active',
      additional_meta: {
        ip: await this._fetchIpInfo(session_info.ip_address),
        ua: this._fetchUserAgentInfo(session_info.useragent),
        challenge: session_info.challenge,
        deferred: session_info.deferred,
      },
      expire_at: new Date(created_at + 7 * 24 * 60 * 60 * 1000),
    };
    this.logger.debug(user_obj);
    const session = await this.drizzleService.db
      .insert(this.session_table)
      .values({
        ...user_obj,
      })
      .onConflictDoNothing()
      .returning();
    return session.at(0);
  }
}

@Injectable()
export class SystemUserSessionService extends SessionService {
  constructor(drizzleService: DrizzleService, mailService: EmailService) {
    super(
      drizzleService,
      mailService,
      schema.system_user_session,
      'system_uid',
      schema.system_user_session.system_uid,
    );
  }
}

@Injectable()
export class UserSessionService extends SessionService {
  constructor(drizzleService: DrizzleService, mailService: EmailService) {
    super(
      drizzleService,
      mailService,
      schema.user_session,
      'user_uid',
      schema.user_session.user_uid,
    );
  }
}
