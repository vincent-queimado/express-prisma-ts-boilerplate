import { z } from 'zod';

export const register = z.object({
    body: z.object({
        email: z.string().email({
            message: 'Write a correct email address',
        }),
        name: z
            .string()
            .min(3, {
                message: 'Name too short',
            })
            .max(32, {
                message: 'Name too long',
            }),
        phone: z
            .number()
            .min(11, {
                message: 'Phone too short',
            })
            .max(15, {
                message: 'Phone too long',
            }),
        password: z
            .string()
            .min(6, {
                message: 'Password too short',
            })
            .max(16, {
                message: 'Password too long',
            }),
    }),
});

export const login = z.object({
    body: z.object({
        email: z.string().email({
            message: 'Write a correct email address',
        }),
        password: z.string().min(6, {
            message: 'Password too short',
        }),
    }),
});

export type loginType = z.infer<typeof login>;
export type registerType = z.infer<typeof register>;
