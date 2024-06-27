import Stripe from "stripe";
export const stripe = new Stripe(
  "sk_test_51PQCRlBKBSYtnFFCxDx9atoZmMEjBj6Svgjj5v31CmF9vHqAtnnLcqS3GHX7Nr9nRwyPckcrZmvIbHyAAZXOcuhs004amhpaKY",
  {
    apiVersion: "2024-06-20",
  }
);

export async function getStripeCustomerFromEmail(email: string, name: string) {
  const customer_from_stripe = (
    await stripe.customers.list({ email: email })
  ).data.at(0);

  let stripe_new_customer: Stripe.Customer | undefined;
  if (!customer_from_stripe) {
    stripe_new_customer = await stripe.customers.create({
      name: name,
      email: email,
    });
  } else {
    stripe_new_customer = customer_from_stripe;
  }

  return stripe_new_customer!;
}

export async function createPaymentSession(
  email: string,
  amount: number,
  name: string,
  currency = "usd"
): Promise<string> {
  try {
    // Create a new customer
    const customer = await getStripeCustomerFromEmail(email, name);

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer: customer.id,
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: "Safetrade Tokens",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://safetrade.cloud/dashboard/wallet?success",
      cancel_url: "https://safetrade.cloud/dashboard/wallet/?cancel",
    });

    return session.url!;
  } catch (error) {
    console.error("Error creating payment session:", error);
    throw error;
  }
}
