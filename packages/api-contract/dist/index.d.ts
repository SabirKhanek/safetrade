import { z } from "zod";
export declare const contract: {
    system_user: {
        create: {
            method: "POST";
            body: z.ZodObject<{
                first_name: z.ZodString;
                email: z.ZodString;
                role_group: z.ZodString;
                last_name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                email: string;
                first_name: string;
                role_group: string;
                last_name: string;
            }, {
                email: string;
                first_name: string;
                role_group: string;
                last_name: string;
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
        searchusers: {
            query: z.ZodObject<{
                name_email: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                name_email: string;
            }, {
                name_email: string;
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
                    users: z.ZodArray<z.ZodObject<{
                        first_name: z.ZodString;
                        last_name: z.ZodString;
                        email: z.ZodString;
                        joined_on: z.ZodDate;
                        avatar: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        email: string;
                        first_name: string;
                        last_name: string;
                        joined_on: Date;
                        avatar: string;
                    }, {
                        email: string;
                        first_name: string;
                        last_name: string;
                        joined_on: Date;
                        avatar: string;
                    }>, "many">;
                    success: z.ZodBoolean;
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                    success: boolean;
                    users: {
                        email: string;
                        first_name: string;
                        last_name: string;
                        joined_on: Date;
                        avatar: string;
                    }[];
                }, {
                    message: string;
                    success: boolean;
                    users: {
                        email: string;
                        first_name: string;
                        last_name: string;
                        joined_on: Date;
                        avatar: string;
                    }[];
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
                }, "strip", z.ZodTypeAny, {
                    success: boolean;
                }, {
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
