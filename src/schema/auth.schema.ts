import * as zod from 'zod'




export const RegisterSchema = zod.object({
    name: zod.string().nonempty('name is required').min(3, 'name minmum 3 chars').max(15, 'name max 15 chars'),
    email: zod.email('email must be valid').nonempty('email is required'),
    password: zod.string().nonempty('pass is requierd').regex(/^[A-Z][A-Za-z0-9]{5,}$/, 'pass must start with capital letter followed by 5 chars atleast'),
    rePassword: zod.string().nonempty('pass is requierd').regex(/^[A-Z][A-Za-z0-9]{5,}$/, 'pass must start with capital letter followed by 5 chars atleast'),
    phone: zod.string().nonempty('phone is required').regex(/^01[0125][0-9]{8}$/)
}).refine((object) => object.password === object.rePassword, {
    path: ['rePassword'],
    error: 'passwords dont match'
})





export const LoginSchema = zod.object({
    email: zod.email('email must be valid').nonempty('email is required'),
    password: zod.string().nonempty('pass is requierd').regex(/^[A-Z][A-Za-z0-9]{5,}$/, 'pass must start with capital letter followed by 5 chars atleast'),
})


export const forgetSchema = zod.object({
    email: zod.email('email must be valid').nonempty('email is required'),
})

export const verifySchema = zod.object({
    resetCode: zod.string().nonempty('name is required'),
})
export const resetSchema = zod.object({
    email: zod.email('email must be valid').nonempty('email is required'),
    newPassword: zod.string().nonempty('pass is requierd').regex(/^[A-Z][A-Za-z0-9]{5,}$/, 'pass must start with capital letter followed by 5 chars atleast'),
})






export type LoginType = zod.infer<typeof LoginSchema>
export type RegisterType = zod.infer<typeof RegisterSchema>
export type forgetType = zod.infer<typeof forgetSchema>
export type verifyType = zod.infer<typeof verifySchema>
export type resetType = zod.infer<typeof resetSchema>