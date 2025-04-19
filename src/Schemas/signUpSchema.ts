import {z} from 'zod'

export const userNameValidation = z.string().min(2, "minimum 2 characters needed")
.max(20, "max 20 characters allowed")
.regex(/^[a-zA-z0-9]+$/, "must not contain special characters");


export const signUpValidation = z.object({
    username: userNameValidation,
    email: z.string().email({message: "invalid email message"}),
    password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
})