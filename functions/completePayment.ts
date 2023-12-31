'use server'

import generateSig from '@/util/generateSig'
import xml2js from 'xml2js'

export default async function completePayment(order: OrderType, user: UserType) {
  // Payment data
  const merchantId = process.env.PAYBOX_MERCHANT_ID as string
  const paymentData = {
    pg_order_id: order.id,
    pg_merchant_id: merchantId,
    pg_amount: order.amount,
    pg_currency: 'KZT',
    pg_salt: 'salt',
    pg_description: 'Product',
    pg_user_phone: user.phone,
    pg_user_contact_email: user.email
  } as any

  // Generate signature key
  paymentData.pg_sig = generateSig('init_payment.php', paymentData)

  // Create request body from payment data
  const body = new FormData()
  Object.keys(paymentData).forEach((key) => {
    body.append(key, paymentData[key])
  })

  // Send request
  const pgResponse = await fetch('https://api.paybox.money/init_payment.php', {
    method: 'POST',
    body: body,
  })

  // Extract XML from response
  const result = await pgResponse.text()

  // Parse XML result to JS object
  const parser = new xml2js.Parser()
  const { response } = await parser.parseStringPromise(result)

  return response
}