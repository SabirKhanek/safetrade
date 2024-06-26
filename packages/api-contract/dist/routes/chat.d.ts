import { z } from "zod";
export declare const chat: {
    initThread: {
        method: "POST";
        body: z.ZodObject<{
            participant: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            participant: string;
        }, {
            participant: string;
        }>;
        path: "/chat/initThread";
        responses: {
            200: z.ZodObject<{
                thread_id: z.ZodString;
                success: z.ZodBoolean;
                message: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                message: string;
                thread_id: string;
                success: boolean;
            }, {
                message: string;
                thread_id: string;
                success: boolean;
            }>;
        };
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
        path: "/chat/send";
        responses: {
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
    };
    getThreads: {
        method: "GET";
        path: "/chat/get-threads";
        responses: {
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
        path: "/chat/get-messages-in-thread";
        responses: {
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
    };
};
