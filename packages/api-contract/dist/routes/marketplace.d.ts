import { z } from "zod";
export declare const marketplace: {
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
        path: "/marketplace/offer";
        responses: {
            200: z.ZodObject<{
                success: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                success: boolean;
            }, {
                success: boolean;
            }>;
        };
    };
};
