import * as zod from 'zod'




export const checkOutSchema = zod.object({
    details:zod.string('details must be string').nonempty('details is required'),
    phone: zod.string('phone must be string').nonempty('phone is required').regex(/^(\+2)?01[0125][0-9]{8}$/,'phone must be egyptian , country code is optional'),
    city:zod.string('city must be string').nonempty('city is required')

})


export type CheckoutType = zod.infer<typeof checkOutSchema>
