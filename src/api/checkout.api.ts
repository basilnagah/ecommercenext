import { CheckoutType } from "@/schema/checkout.schema"
import getMyToken from "@/utilities/GetMyToken"


export async function makeOnlinePayment(cartID: string, domain: string, formValues: CheckoutType) {

    const token = await getMyToken()
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=${domain}`, {
        method: 'POST',
        headers: {
            token: `${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            shippingAddress: formValues
        })
    })

    const data = await response.json()

    return data
}


export async function makeCashpayment(cartID: string, formValues: CheckoutType) {

    const token = await getMyToken()
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartID}`, {
        method: 'POST',
        headers: {
            token: `${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            shippingAddress: formValues
        })
    })

    const data = await response.json()

    return data
}