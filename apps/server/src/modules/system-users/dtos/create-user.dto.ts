import { contract } from 'api-contract';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsEnum, IsIn, IsOptional, IsString } from 'class-validator';
import { Groups, GroupsType, Permissions, PermissionsType } from 'common';
import { File } from 'src/shared/types/file';

export class CreateUserDTO {
  @IsString()
  first_name: string;

  @IsString()
  @Transform(({ value }) => {
    return value.toLowerCase();
  })
  email: string;

  @IsArray()
  @Type(() => String)
  @Transform(({ value }) => {
    try {
      console.log('transforming', value);

      if (typeof value !== 'string') {
        console.log(
          'returning ',
          value.map((v: string) => v.replace(/"/g, '')),
        );
        return value.map((v: string) => v.replace(/"/g, ''));
      }

      const parsed = JSON.parse(value);
      console.log(parsed);
      return parsed || [];
    } catch (err) {
      console.log(err);
      return value.split(',');
    }
  })
  @IsOptional()
  @IsEnum(Permissions, { each: true })
  permissions: PermissionsType[];

  @IsString()
  @Transform(({ value }) => {
    return value.replace(/"/g, '');
  })
  @IsEnum(Groups)
  role_group: GroupsType;

  @IsString()
  last_name: string;

  @IsOptional()
  @Type(() => File)
  avatar?: File;
}
