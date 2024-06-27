import { z } from "zod";
export declare const contract: {
    system_user: {
        create: {
            method: "POST";
            contentType: "multipart/form-data";
            body: z.ZodObject<{
                first_name: z.ZodString;
                email: z.ZodString;
                role_group: z.ZodString;
                last_name: z.ZodString;
                avatar: z.ZodOptional<z.ZodType<File, z.ZodTypeDef, File>>;
                permissions: z.ZodOptional<z.ZodArray<z.ZodNativeEnum<{
                    readonly ReadUserPermissions: "read_user_permissions";
                    readonly UpdateUserPermissions: "update_user_permissions";
                    readonly ReadGroupPermissions: "read_group_permissions";
                    readonly UpdateGroupPermissions: "update_group_permissions";
                    readonly AddUsers: "add_user";
                    readonly RemoveUser: "remove_user";
                    readonly ListUsers: "list_users";
                    readonly ReadAuditTrails: "read_audit_trails";
                }>, "many">>;
            }, "strip", z.ZodTypeAny, {
                email: string;
                first_name: string;
                role_group: string;
                last_name: string;
                avatar?: File | undefined;
                permissions?: ("read_user_permissions" | "update_user_permissions" | "read_group_permissions" | "update_group_permissions" | "add_user" | "remove_user" | "list_users" | "read_audit_trails")[] | undefined;
            }, {
                email: string;
                first_name: string;
                role_group: string;
                last_name: string;
                avatar?: File | undefined;
                permissions?: ("read_user_permissions" | "update_user_permissions" | "read_group_permissions" | "update_group_permissions" | "add_user" | "remove_user" | "list_users" | "read_audit_trails")[] | undefined;
            }>;
            headers: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            path: "/api/user/create";
            responses: {
                404: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "resource not found";
                    reason: any;
                }>;
                500: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "internal server error";
                    reason: any;
                }>;
                400: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "bad request";
                    reason: "";
                }>;
                401: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "unauthorized";
                    resason: any;
                }>;
                403: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "forbidden";
                    reason: any;
                }>;
                200: z.ZodObject<{
                    success: z.ZodBoolean;
                }, "strip", z.ZodTypeAny, {
                    success: boolean;
                }, {
                    success: boolean;
                }>;
            };
            strictStatusCodes: false;
        };
        remove: {
            method: "DELETE";
            body: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            headers: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            path: "/api/user/remove/:userId";
            responses: {
                404: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "resource not found";
                    reason: any;
                }>;
                500: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "internal server error";
                    reason: any;
                }>;
                400: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "bad request";
                    reason: "";
                }>;
                401: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "unauthorized";
                    resason: any;
                }>;
                403: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "forbidden";
                    reason: any;
                }>;
                200: z.ZodObject<{
                    deleted: z.ZodBoolean;
                    audit_log: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    deleted: boolean;
                    audit_log: string;
                }, {
                    deleted: boolean;
                    audit_log: string;
                }>;
            };
            strictStatusCodes: false;
        };
        searchusers: {
            query: z.ZodObject<{
                name_email: z.ZodDefault<z.ZodOptional<z.ZodString>>;
                take: z.ZodDefault<z.ZodNumber>;
                skip: z.ZodDefault<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                name_email: string;
                take: number;
                skip: number;
            }, {
                name_email?: string | undefined;
                take?: number | undefined;
                skip?: number | undefined;
            }>;
            method: "GET";
            headers: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            path: "/api/user/";
            responses: {
                404: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "resource not found";
                    reason: any;
                }>;
                500: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "internal server error";
                    reason: any;
                }>;
                400: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "bad request";
                    reason: "";
                }>;
                401: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "unauthorized";
                    resason: any;
                }>;
                403: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "forbidden";
                    reason: any;
                }>;
                200: z.ZodObject<{
                    data: z.ZodObject<{
                        users: z.ZodArray<z.ZodObject<{
                            first_name: z.ZodString;
                            last_name: z.ZodString;
                            email: z.ZodString;
                            joined_on: z.ZodDate;
                            avatar: z.ZodString;
                            creator: z.ZodObject<{
                                name: z.ZodString;
                                email: z.ZodString;
                                avatar: z.ZodString;
                            }, "strip", z.ZodTypeAny, {
                                email: string;
                                avatar: string;
                                name: string;
                            }, {
                                email: string;
                                avatar: string;
                                name: string;
                            }>;
                        }, "strip", z.ZodTypeAny, {
                            email: string;
                            first_name: string;
                            last_name: string;
                            avatar: string;
                            joined_on: Date;
                            creator: {
                                email: string;
                                avatar: string;
                                name: string;
                            };
                        }, {
                            email: string;
                            first_name: string;
                            last_name: string;
                            avatar: string;
                            joined_on: Date;
                            creator: {
                                email: string;
                                avatar: string;
                                name: string;
                            };
                        }>, "many">;
                        total_available: z.ZodNumber;
                    }, "strip", z.ZodTypeAny, {
                        users: {
                            email: string;
                            first_name: string;
                            last_name: string;
                            avatar: string;
                            joined_on: Date;
                            creator: {
                                email: string;
                                avatar: string;
                                name: string;
                            };
                        }[];
                        total_available: number;
                    }, {
                        users: {
                            email: string;
                            first_name: string;
                            last_name: string;
                            avatar: string;
                            joined_on: Date;
                            creator: {
                                email: string;
                                avatar: string;
                                name: string;
                            };
                        }[];
                        total_available: number;
                    }>;
                    success: z.ZodBoolean;
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                    success: boolean;
                    data: {
                        users: {
                            email: string;
                            first_name: string;
                            last_name: string;
                            avatar: string;
                            joined_on: Date;
                            creator: {
                                email: string;
                                avatar: string;
                                name: string;
                            };
                        }[];
                        total_available: number;
                    };
                }, {
                    message: string;
                    success: boolean;
                    data: {
                        users: {
                            email: string;
                            first_name: string;
                            last_name: string;
                            avatar: string;
                            joined_on: Date;
                            creator: {
                                email: string;
                                avatar: string;
                                name: string;
                            };
                        }[];
                        total_available: number;
                    };
                }>;
            };
            strictStatusCodes: false;
        };
    };
    system_auth: {
        login: {
            method: "POST";
            body: z.ZodObject<{
                email: z.ZodString;
                password: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                email: string;
                password: string;
            }, {
                email: string;
                password: string;
            }>;
            path: "/api/system/auth/";
            responses: {
                404: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "resource not found";
                    reason: any;
                }>;
                500: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "internal server error";
                    reason: any;
                }>;
                400: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "bad request";
                    reason: "";
                }>;
                401: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "unauthorized";
                    resason: any;
                }>;
                403: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "forbidden";
                    reason: any;
                }>;
                200: z.ZodObject<{
                    token: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    token: string;
                }, {
                    token: string;
                }>;
            };
            strictStatusCodes: false;
        };
        logout: {
            method: "GET";
            path: "/api/system/auth/logout";
            responses: {
                404: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "resource not found";
                    reason: any;
                }>;
                500: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "internal server error";
                    reason: any;
                }>;
                400: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "bad request";
                    reason: "";
                }>;
                401: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "unauthorized";
                    resason: any;
                }>;
                403: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "forbidden";
                    reason: any;
                }>;
                200: z.ZodObject<{
                    success: z.ZodBoolean;
                }, "strip", z.ZodTypeAny, {
                    success: boolean;
                }, {
                    success: boolean;
                }>;
            };
            strictStatusCodes: false;
        };
        getAuthUser: {
            method: "GET";
            path: "/api/system/auth/me";
            responses: {
                404: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "resource not found";
                    reason: any;
                }>;
                500: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "internal server error";
                    reason: any;
                }>;
                400: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "bad request";
                    reason: "";
                }>;
                401: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "unauthorized";
                    resason: any;
                }>;
                403: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "forbidden";
                    reason: any;
                }>;
                200: z.ZodObject<{
                    success: z.ZodBoolean;
                    token: z.ZodString;
                    user: z.ZodType<import("common").UserPayload, z.ZodTypeDef, import("common").UserPayload>;
                }, "strip", z.ZodTypeAny, {
                    token: string;
                    success: boolean;
                    user: import("common").UserPayload;
                }, {
                    token: string;
                    success: boolean;
                    user: import("common").UserPayload;
                }>;
            };
            strictStatusCodes: false;
        };
    };
    audit: {
        getTrailDetails: {
            query: z.ZodObject<{
                trail_ids: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodOptional<z.ZodString>, "many">>>;
                user_email: z.ZodDefault<z.ZodOptional<z.ZodString>>;
                take: z.ZodDefault<z.ZodNumber>;
                skip: z.ZodDefault<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                take: number;
                skip: number;
                trail_ids: (string | undefined)[];
                user_email: string;
            }, {
                take?: number | undefined;
                skip?: number | undefined;
                trail_ids?: (string | undefined)[] | undefined;
                user_email?: string | undefined;
            }>;
            method: "GET";
            path: "/api/audit/trail";
            responses: {
                404: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "resource not found";
                    reason: any;
                }>;
                500: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "internal server error";
                    reason: any;
                }>;
                400: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "bad request";
                    reason: "";
                }>;
                401: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "unauthorized";
                    resason: any;
                }>;
                403: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "forbidden";
                    reason: any;
                }>;
                200: z.ZodObject<{
                    data: z.ZodArray<z.ZodObject<{
                        performer: z.ZodObject<{
                            avatar: z.ZodString;
                            first_name: z.ZodString;
                            last_name: z.ZodString;
                            email: z.ZodString;
                            user_uid: z.ZodString;
                        }, "strip", z.ZodTypeAny, {
                            email: string;
                            first_name: string;
                            last_name: string;
                            avatar: string;
                            user_uid: string;
                        }, {
                            email: string;
                            first_name: string;
                            last_name: string;
                            avatar: string;
                            user_uid: string;
                        }>;
                        performed_at: z.ZodDate;
                        action_name: z.ZodString;
                        metadata: z.ZodUnknown;
                        trail_id: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        performer: {
                            email: string;
                            first_name: string;
                            last_name: string;
                            avatar: string;
                            user_uid: string;
                        };
                        performed_at: Date;
                        action_name: string;
                        trail_id: string;
                        metadata?: unknown;
                    }, {
                        performer: {
                            email: string;
                            first_name: string;
                            last_name: string;
                            avatar: string;
                            user_uid: string;
                        };
                        performed_at: Date;
                        action_name: string;
                        trail_id: string;
                        metadata?: unknown;
                    }>, "many">;
                    total_available: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    data: {
                        performer: {
                            email: string;
                            first_name: string;
                            last_name: string;
                            avatar: string;
                            user_uid: string;
                        };
                        performed_at: Date;
                        action_name: string;
                        trail_id: string;
                        metadata?: unknown;
                    }[];
                    total_available: number;
                }, {
                    data: {
                        performer: {
                            email: string;
                            first_name: string;
                            last_name: string;
                            avatar: string;
                            user_uid: string;
                        };
                        performed_at: Date;
                        action_name: string;
                        trail_id: string;
                        metadata?: unknown;
                    }[];
                    total_available: number;
                }>;
            };
            strictStatusCodes: false;
        };
    };
    chat: {
        initThread: {
            method: "POST";
            body: z.ZodObject<{
                participant: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                participant: string;
            }, {
                participant: string;
            }>;
            path: "/api/chat/initThread";
            responses: {
                404: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "resource not found";
                    reason: any;
                }>;
                500: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "internal server error";
                    reason: any;
                }>;
                400: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "bad request";
                    reason: "";
                }>;
                401: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "unauthorized";
                    resason: any;
                }>;
                403: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "forbidden";
                    reason: any;
                }>;
                200: z.ZodObject<{
                    thread_id: z.ZodString;
                    success: z.ZodBoolean;
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                    success: boolean;
                    thread_id: string;
                }, {
                    message: string;
                    success: boolean;
                    thread_id: string;
                }>;
            };
            strictStatusCodes: false;
        };
        sendMessge: {
            method: "POST";
            body: z.ZodObject<{
                message: z.ZodString;
                thread_id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                message: string;
                thread_id: string;
            }, {
                message: string;
                thread_id: string;
            }>;
            path: "/api/chat/send";
            responses: {
                404: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "resource not found";
                    reason: any;
                }>;
                500: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "internal server error";
                    reason: any;
                }>;
                400: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "bad request";
                    reason: "";
                }>;
                401: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "unauthorized";
                    resason: any;
                }>;
                403: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "forbidden";
                    reason: any;
                }>;
                200: z.ZodObject<{
                    success: z.ZodBoolean;
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                    success: boolean;
                }, {
                    message: string;
                    success: boolean;
                }>;
            };
            strictStatusCodes: false;
        };
        getThreads: {
            method: "GET";
            path: "/api/chat/get-threads";
            responses: {
                404: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "resource not found";
                    reason: any;
                }>;
                500: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "internal server error";
                    reason: any;
                }>;
                400: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "bad request";
                    reason: "";
                }>;
                401: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "unauthorized";
                    resason: any;
                }>;
                403: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "forbidden";
                    reason: any;
                }>;
                200: z.ZodArray<z.ZodObject<{
                    thread_id: z.ZodString;
                    other_user_name: z.ZodString;
                    other_user_uid: z.ZodString;
                    last_message: z.ZodNullable<z.ZodObject<{
                        message_id: z.ZodString;
                        sender_name: z.ZodString;
                        message_content: z.ZodString;
                        created_at: z.ZodDate;
                    }, "strip", z.ZodTypeAny, {
                        message_id: string;
                        sender_name: string;
                        message_content: string;
                        created_at: Date;
                    }, {
                        message_id: string;
                        sender_name: string;
                        message_content: string;
                        created_at: Date;
                    }>>;
                    other_user_avatar: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    thread_id: string;
                    other_user_name: string;
                    other_user_uid: string;
                    last_message: {
                        message_id: string;
                        sender_name: string;
                        message_content: string;
                        created_at: Date;
                    } | null;
                    other_user_avatar?: string | undefined;
                }, {
                    thread_id: string;
                    other_user_name: string;
                    other_user_uid: string;
                    last_message: {
                        message_id: string;
                        sender_name: string;
                        message_content: string;
                        created_at: Date;
                    } | null;
                    other_user_avatar?: string | undefined;
                }>, "many">;
            };
            strictStatusCodes: false;
        };
        getMessagesInThread: {
            query: z.ZodObject<{
                thread_id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                thread_id: string;
            }, {
                thread_id: string;
            }>;
            method: "GET";
            path: "/api/chat/get-messages-in-thread";
            responses: {
                404: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "resource not found";
                    reason: any;
                }>;
                500: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "internal server error";
                    reason: any;
                }>;
                400: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "bad request";
                    reason: "";
                }>;
                401: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "unauthorized";
                    resason: any;
                }>;
                403: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "forbidden";
                    reason: any;
                }>;
                200: z.ZodObject<{
                    messages: z.ZodArray<z.ZodObject<{
                        message_id: z.ZodString;
                        message: z.ZodString;
                        created_at: z.ZodDate;
                        sender: z.ZodObject<{
                            name: z.ZodString;
                            avatar: z.ZodOptional<z.ZodString>;
                        }, "strip", z.ZodTypeAny, {
                            name: string;
                            avatar?: string | undefined;
                        }, {
                            name: string;
                            avatar?: string | undefined;
                        }>;
                    }, "strip", z.ZodTypeAny, {
                        message: string;
                        message_id: string;
                        created_at: Date;
                        sender: {
                            name: string;
                            avatar?: string | undefined;
                        };
                    }, {
                        message: string;
                        message_id: string;
                        created_at: Date;
                        sender: {
                            name: string;
                            avatar?: string | undefined;
                        };
                    }>, "many">;
                    thread: z.ZodObject<{
                        thread_id: z.ZodString;
                        other_user_name: z.ZodString;
                        other_user_uid: z.ZodString;
                        last_message: z.ZodNullable<z.ZodObject<{
                            message_id: z.ZodString;
                            sender_name: z.ZodString;
                            message_content: z.ZodString;
                            created_at: z.ZodDate;
                        }, "strip", z.ZodTypeAny, {
                            message_id: string;
                            sender_name: string;
                            message_content: string;
                            created_at: Date;
                        }, {
                            message_id: string;
                            sender_name: string;
                            message_content: string;
                            created_at: Date;
                        }>>;
                        other_user_avatar: z.ZodOptional<z.ZodString>;
                    }, "strip", z.ZodTypeAny, {
                        thread_id: string;
                        other_user_name: string;
                        other_user_uid: string;
                        last_message: {
                            message_id: string;
                            sender_name: string;
                            message_content: string;
                            created_at: Date;
                        } | null;
                        other_user_avatar?: string | undefined;
                    }, {
                        thread_id: string;
                        other_user_name: string;
                        other_user_uid: string;
                        last_message: {
                            message_id: string;
                            sender_name: string;
                            message_content: string;
                            created_at: Date;
                        } | null;
                        other_user_avatar?: string | undefined;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    messages: {
                        message: string;
                        message_id: string;
                        created_at: Date;
                        sender: {
                            name: string;
                            avatar?: string | undefined;
                        };
                    }[];
                    thread: {
                        thread_id: string;
                        other_user_name: string;
                        other_user_uid: string;
                        last_message: {
                            message_id: string;
                            sender_name: string;
                            message_content: string;
                            created_at: Date;
                        } | null;
                        other_user_avatar?: string | undefined;
                    };
                }, {
                    messages: {
                        message: string;
                        message_id: string;
                        created_at: Date;
                        sender: {
                            name: string;
                            avatar?: string | undefined;
                        };
                    }[];
                    thread: {
                        thread_id: string;
                        other_user_name: string;
                        other_user_uid: string;
                        last_message: {
                            message_id: string;
                            sender_name: string;
                            message_content: string;
                            created_at: Date;
                        } | null;
                        other_user_avatar?: string | undefined;
                    };
                }>;
            };
            strictStatusCodes: false;
        };
    };
    marketplace: {
        createOffer: {
            method: "POST";
            contentType: "multipart/form-data";
            body: z.ZodObject<{
                category: z.ZodString;
                title: z.ZodString;
                description: z.ZodString;
                price: z.ZodString;
                short_description: z.ZodString;
                attachments: z.ZodType<File, z.ZodTypeDef, File>;
            }, "strip", z.ZodTypeAny, {
                description: string;
                title: string;
                category: string;
                price: string;
                short_description: string;
                attachments: File;
            }, {
                description: string;
                title: string;
                category: string;
                price: string;
                short_description: string;
                attachments: File;
            }>;
            path: "/api/marketplace/offer";
            responses: {
                404: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "resource not found";
                    reason: any;
                }>;
                500: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "internal server error";
                    reason: any;
                }>;
                400: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "bad request";
                    reason: "";
                }>;
                401: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "unauthorized";
                    resason: any;
                }>;
                403: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "forbidden";
                    reason: any;
                }>;
                200: z.ZodObject<{
                    success: z.ZodBoolean;
                }, "strip", z.ZodTypeAny, {
                    success: boolean;
                }, {
                    success: boolean;
                }>;
            };
            strictStatusCodes: false;
        };
    };
    accessctrl: {
        getGroupsPermission: {
            query: z.ZodObject<{
                groupName: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                groupName?: string | undefined;
            }, {
                groupName?: string | undefined;
            }>;
            method: "GET";
            path: "/api/accessctrl/group/permissions";
            responses: {
                404: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "resource not found";
                    reason: any;
                }>;
                500: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "internal server error";
                    reason: any;
                }>;
                400: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "bad request";
                    reason: "";
                }>;
                401: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "unauthorized";
                    resason: any;
                }>;
                403: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "forbidden";
                    reason: any;
                }>;
                200: z.ZodObject<{
                    groups: z.ZodArray<z.ZodObject<{
                        group_name: z.ZodNativeEnum<{
                            readonly RootGroup: string;
                            readonly SupportStaff: "support_staff";
                        }>;
                        permissions: z.ZodArray<z.ZodNativeEnum<{
                            readonly ReadUserPermissions: "read_user_permissions";
                            readonly UpdateUserPermissions: "update_user_permissions";
                            readonly ReadGroupPermissions: "read_group_permissions";
                            readonly UpdateGroupPermissions: "update_group_permissions";
                            readonly AddUsers: "add_user";
                            readonly RemoveUser: "remove_user";
                            readonly ListUsers: "list_users";
                            readonly ReadAuditTrails: "read_audit_trails";
                        }>, "many">;
                    }, "strip", z.ZodTypeAny, {
                        permissions: ("read_user_permissions" | "update_user_permissions" | "read_group_permissions" | "update_group_permissions" | "add_user" | "remove_user" | "list_users" | "read_audit_trails")[];
                        group_name: string;
                    }, {
                        permissions: ("read_user_permissions" | "update_user_permissions" | "read_group_permissions" | "update_group_permissions" | "add_user" | "remove_user" | "list_users" | "read_audit_trails")[];
                        group_name: string;
                    }>, "many">;
                    success: z.ZodBoolean;
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                    success: boolean;
                    groups: {
                        permissions: ("read_user_permissions" | "update_user_permissions" | "read_group_permissions" | "update_group_permissions" | "add_user" | "remove_user" | "list_users" | "read_audit_trails")[];
                        group_name: string;
                    }[];
                }, {
                    message: string;
                    success: boolean;
                    groups: {
                        permissions: ("read_user_permissions" | "update_user_permissions" | "read_group_permissions" | "update_group_permissions" | "add_user" | "remove_user" | "list_users" | "read_audit_trails")[];
                        group_name: string;
                    }[];
                }>;
            };
            strictStatusCodes: false;
        };
        updatePermissionsInGroup: {
            method: "PUT";
            body: z.ZodObject<{
                permissions: z.ZodArray<z.ZodNativeEnum<{
                    readonly ReadUserPermissions: "read_user_permissions";
                    readonly UpdateUserPermissions: "update_user_permissions";
                    readonly ReadGroupPermissions: "read_group_permissions";
                    readonly UpdateGroupPermissions: "update_group_permissions";
                    readonly AddUsers: "add_user";
                    readonly RemoveUser: "remove_user";
                    readonly ListUsers: "list_users";
                    readonly ReadAuditTrails: "read_audit_trails";
                }>, "many">;
                group: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                permissions: ("read_user_permissions" | "update_user_permissions" | "read_group_permissions" | "update_group_permissions" | "add_user" | "remove_user" | "list_users" | "read_audit_trails")[];
                group: string;
            }, {
                permissions: ("read_user_permissions" | "update_user_permissions" | "read_group_permissions" | "update_group_permissions" | "add_user" | "remove_user" | "list_users" | "read_audit_trails")[];
                group: string;
            }>;
            path: "/api/accessctrl/group/permissions";
            responses: {
                404: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "resource not found";
                    reason: any;
                }>;
                500: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "internal server error";
                    reason: any;
                }>;
                400: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "bad request";
                    reason: "";
                }>;
                401: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "unauthorized";
                    resason: any;
                }>;
                403: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "forbidden";
                    reason: any;
                }>;
                200: z.ZodObject<{
                    success: z.ZodBoolean;
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                    success: boolean;
                }, {
                    message: string;
                    success: boolean;
                }>;
            };
            strictStatusCodes: false;
        };
        getUsersPermissions: {
            query: z.ZodObject<{
                user_name_or_email: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                user_name_or_email: string;
            }, {
                user_name_or_email: string;
            }>;
            method: "GET";
            path: "/api/accessctrl/user/permissions";
            responses: {
                404: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "resource not found";
                    reason: any;
                }>;
                500: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "internal server error";
                    reason: any;
                }>;
                400: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "bad request";
                    reason: "";
                }>;
                401: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "unauthorized";
                    resason: any;
                }>;
                403: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "forbidden";
                    reason: any;
                }>;
                200: z.ZodObject<{
                    users: z.ZodArray<z.ZodObject<{
                        user_email: z.ZodString;
                        user_f_name: z.ZodString;
                        permissions: z.ZodArray<z.ZodNativeEnum<{
                            readonly ReadUserPermissions: "read_user_permissions";
                            readonly UpdateUserPermissions: "update_user_permissions";
                            readonly ReadGroupPermissions: "read_group_permissions";
                            readonly UpdateGroupPermissions: "update_group_permissions";
                            readonly AddUsers: "add_user";
                            readonly RemoveUser: "remove_user";
                            readonly ListUsers: "list_users";
                            readonly ReadAuditTrails: "read_audit_trails";
                        }>, "many">;
                    }, "strip", z.ZodTypeAny, {
                        permissions: ("read_user_permissions" | "update_user_permissions" | "read_group_permissions" | "update_group_permissions" | "add_user" | "remove_user" | "list_users" | "read_audit_trails")[];
                        user_email: string;
                        user_f_name: string;
                    }, {
                        permissions: ("read_user_permissions" | "update_user_permissions" | "read_group_permissions" | "update_group_permissions" | "add_user" | "remove_user" | "list_users" | "read_audit_trails")[];
                        user_email: string;
                        user_f_name: string;
                    }>, "many">;
                    success: z.ZodBoolean;
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                    success: boolean;
                    users: {
                        permissions: ("read_user_permissions" | "update_user_permissions" | "read_group_permissions" | "update_group_permissions" | "add_user" | "remove_user" | "list_users" | "read_audit_trails")[];
                        user_email: string;
                        user_f_name: string;
                    }[];
                }, {
                    message: string;
                    success: boolean;
                    users: {
                        permissions: ("read_user_permissions" | "update_user_permissions" | "read_group_permissions" | "update_group_permissions" | "add_user" | "remove_user" | "list_users" | "read_audit_trails")[];
                        user_email: string;
                        user_f_name: string;
                    }[];
                }>;
            };
            strictStatusCodes: false;
        };
        updateUserPermissions: {
            method: "PUT";
            body: z.ZodObject<{
                permissions: z.ZodArray<z.ZodNativeEnum<{
                    readonly ReadUserPermissions: "read_user_permissions";
                    readonly UpdateUserPermissions: "update_user_permissions";
                    readonly ReadGroupPermissions: "read_group_permissions";
                    readonly UpdateGroupPermissions: "update_group_permissions";
                    readonly AddUsers: "add_user";
                    readonly RemoveUser: "remove_user";
                    readonly ListUsers: "list_users";
                    readonly ReadAuditTrails: "read_audit_trails";
                }>, "many">;
                user_uid: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                permissions: ("read_user_permissions" | "update_user_permissions" | "read_group_permissions" | "update_group_permissions" | "add_user" | "remove_user" | "list_users" | "read_audit_trails")[];
                user_uid: string;
            }, {
                permissions: ("read_user_permissions" | "update_user_permissions" | "read_group_permissions" | "update_group_permissions" | "add_user" | "remove_user" | "list_users" | "read_audit_trails")[];
                user_uid: string;
            }>;
            path: "/api/accessctrl/user/permissions";
            responses: {
                404: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "resource not found";
                    reason: any;
                }>;
                500: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "internal server error";
                    reason: any;
                }>;
                400: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "bad request";
                    reason: "";
                }>;
                401: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "unauthorized";
                    resason: any;
                }>;
                403: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "forbidden";
                    reason: any;
                }>;
                200: z.ZodObject<{
                    success: z.ZodBoolean;
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                    success: boolean;
                }, {
                    message: string;
                    success: boolean;
                }>;
            };
            strictStatusCodes: false;
        };
    };
    auth: {
        signup: {
            method: "POST";
            body: z.ZodObject<{
                f_name: z.ZodString;
                l_name: z.ZodString;
                email: z.ZodString;
                dob: z.ZodString;
                password: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                email: string;
                password: string;
                f_name: string;
                l_name: string;
                dob: string;
            }, {
                email: string;
                password: string;
                f_name: string;
                l_name: string;
                dob: string;
            }>;
            headers: z.ZodObject<{
                "x-verified-otp-token": z.ZodString;
            }, "strip", z.ZodTypeAny, {
                "x-verified-otp-token": string;
            }, {
                "x-verified-otp-token": string;
            }>;
            path: "/api/auth/register";
            responses: {
                404: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "resource not found";
                    reason: any;
                }>;
                500: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "internal server error";
                    reason: any;
                }>;
                400: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "bad request";
                    reason: "";
                }>;
                401: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "unauthorized";
                    resason: any;
                }>;
                403: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "forbidden";
                    reason: any;
                }>;
                200: z.ZodObject<{
                    success: z.ZodBoolean;
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                    success: boolean;
                }, {
                    message: string;
                    success: boolean;
                }>;
            };
            strictStatusCodes: false;
        };
        logout: {
            method: "GET";
            path: "/api/auth/logout";
            responses: {
                404: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "resource not found";
                    reason: any;
                }>;
                500: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "internal server error";
                    reason: any;
                }>;
                400: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "bad request";
                    reason: "";
                }>;
                401: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "unauthorized";
                    resason: any;
                }>;
                403: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "forbidden";
                    reason: any;
                }>;
                200: z.ZodObject<{
                    success: z.ZodBoolean;
                }, "strip", z.ZodTypeAny, {
                    success: boolean;
                }, {
                    success: boolean;
                }>;
            };
            strictStatusCodes: false;
        };
        login: {
            method: "POST";
            body: z.ZodObject<{
                email: z.ZodString;
                password: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                email: string;
                password: string;
            }, {
                email: string;
                password: string;
            }>;
            path: "/api/auth/basic";
            responses: {
                404: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "resource not found";
                    reason: any;
                }>;
                500: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "internal server error";
                    reason: any;
                }>;
                400: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "bad request";
                    reason: "";
                }>;
                401: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "unauthorized";
                    resason: any;
                }>;
                403: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "forbidden";
                    reason: any;
                }>;
                200: z.ZodObject<{
                    token: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    token: string;
                }, {
                    token: string;
                }>;
            };
            strictStatusCodes: false;
        };
        me: {
            method: "GET";
            path: "/api/auth/me";
            responses: {
                404: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "resource not found";
                    reason: any;
                }>;
                500: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "internal server error";
                    reason: any;
                }>;
                400: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "bad request";
                    reason: "";
                }>;
                401: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "unauthorized";
                    resason: any;
                }>;
                403: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "forbidden";
                    reason: any;
                }>;
                200: z.ZodType<import("common").PublicUserPayload, z.ZodTypeDef, import("common").PublicUserPayload>;
            };
            strictStatusCodes: false;
        };
        completeChallenge: {
            method: "POST";
            body: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            headers: z.ZodObject<{
                "x-verified-otp-token": z.ZodString;
            }, "strip", z.ZodTypeAny, {
                "x-verified-otp-token": string;
            }, {
                "x-verified-otp-token": string;
            }>;
            path: "/api/auth/challenge";
            responses: {
                404: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "resource not found";
                    reason: any;
                }>;
                500: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "internal server error";
                    reason: any;
                }>;
                400: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "bad request";
                    reason: "";
                }>;
                401: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "unauthorized";
                    resason: any;
                }>;
                403: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "forbidden";
                    reason: any;
                }>;
                200: z.ZodObject<{
                    token: z.ZodString;
                    success: z.ZodBoolean;
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                    token: string;
                    success: boolean;
                }, {
                    message: string;
                    token: string;
                    success: boolean;
                }>;
            };
            strictStatusCodes: false;
        };
        test: {
            method: "GET";
            path: "/api/auth/test";
            responses: {
                404: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "resource not found";
                    reason: any;
                }>;
                500: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "internal server error";
                    reason: any;
                }>;
                400: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "bad request";
                    reason: "";
                }>;
                401: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "unauthorized";
                    resason: any;
                }>;
                403: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "forbidden";
                    reason: any;
                }>;
                200: z.ZodObject<{
                    success: z.ZodBoolean;
                }, "strip", z.ZodTypeAny, {
                    success: boolean;
                }, {
                    success: boolean;
                }>;
            };
            strictStatusCodes: false;
        };
        testdeferred: {
            method: "GET";
            path: "/api/auth/test/deferred";
            responses: {
                404: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "resource not found";
                    reason: any;
                }>;
                500: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "internal server error";
                    reason: any;
                }>;
                400: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "bad request";
                    reason: "";
                }>;
                401: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "unauthorized";
                    resason: any;
                }>;
                403: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "forbidden";
                    reason: any;
                }>;
                200: z.ZodObject<{
                    success: z.ZodBoolean;
                }, "strip", z.ZodTypeAny, {
                    success: boolean;
                }, {
                    success: boolean;
                }>;
            };
            strictStatusCodes: false;
        };
    };
    otp: {
        generate: {
            method: "POST";
            body: z.ZodObject<{
                email: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                email: string;
            }, {
                email: string;
            }>;
            path: "/api/otp/generate";
            responses: {
                404: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "resource not found";
                    reason: any;
                }>;
                500: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "internal server error";
                    reason: any;
                }>;
                400: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "bad request";
                    reason: "";
                }>;
                401: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "unauthorized";
                    resason: any;
                }>;
                403: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "forbidden";
                    reason: any;
                }>;
                200: z.ZodObject<{
                    otp_id: z.ZodString;
                    success: z.ZodBoolean;
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                    success: boolean;
                    otp_id: string;
                }, {
                    message: string;
                    success: boolean;
                    otp_id: string;
                }>;
            };
            strictStatusCodes: false;
        };
        resend: {
            method: "POST";
            body: z.ZodObject<{
                otp_id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                otp_id: string;
            }, {
                otp_id: string;
            }>;
            path: "/api/otp/resend";
            responses: {
                404: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "resource not found";
                    reason: any;
                }>;
                500: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "internal server error";
                    reason: any;
                }>;
                400: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "bad request";
                    reason: "";
                }>;
                401: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "unauthorized";
                    resason: any;
                }>;
                403: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "forbidden";
                    reason: any;
                }>;
                200: z.ZodObject<{
                    success: z.ZodBoolean;
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                    success: boolean;
                }, {
                    message: string;
                    success: boolean;
                }>;
            };
            strictStatusCodes: false;
        };
        verify: {
            query: z.ZodObject<{
                otp: z.ZodString;
                otp_id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                otp_id: string;
                otp: string;
            }, {
                otp_id: string;
                otp: string;
            }>;
            method: "GET";
            path: "/api/otp/verify";
            responses: {
                404: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "resource not found";
                    reason: any;
                }>;
                500: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "internal server error";
                    reason: any;
                }>;
                400: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "bad request";
                    reason: "";
                }>;
                401: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "unauthorized";
                    resason: any;
                }>;
                403: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "forbidden";
                    reason: any;
                }>;
                200: z.ZodObject<{
                    verified_token: z.ZodString;
                    success: z.ZodBoolean;
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                    success: boolean;
                    verified_token: string;
                }, {
                    message: string;
                    success: boolean;
                    verified_token: string;
                }>;
            };
            strictStatusCodes: false;
        };
        test: {
            pathParams: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            method: "GET";
            headers: z.ZodObject<{
                "x-verified-otp-token": z.ZodString;
            }, "strip", z.ZodTypeAny, {
                "x-verified-otp-token": string;
            }, {
                "x-verified-otp-token": string;
            }>;
            path: "/api/otp/test";
            responses: {
                404: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "resource not found";
                    reason: any;
                }>;
                500: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "internal server error";
                    reason: any;
                }>;
                400: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "bad request";
                    reason: "";
                }>;
                401: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "unauthorized";
                    resason: any;
                }>;
                403: import("@ts-rest/core").ContractPlainType<{
                    success: false;
                    message: "forbidden";
                    reason: any;
                }>;
                200: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            };
            strictStatusCodes: false;
        };
    };
};
export declare const openApiDocument: import("openapi3-ts").OpenAPIObject;
