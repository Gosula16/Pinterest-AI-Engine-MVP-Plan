import Stripe from "stripe";
import { env } from "../config/env.js";
import { Subscription } from "../models/Subscription.js";

const stripe = env.STRIPE_SECRET_KEY ? new Stripe(env.STRIPE_SECRET_KEY) : null;

export async function getBillingState(userId: string) {
  const subscription = await Subscription.findOne({ userId }).lean();
  return (
    subscription ?? {
      plan: "free",
      status: "inactive"
    }
  );
}

export async function createCheckoutSession(userId: string, customerEmail: string) {
  if (!stripe || !env.STRIPE_PRICE_PRO_MONTHLY) {
    return { url: `${env.APP_URL}/dashboard/settings?billing=mock-upgrade` };
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: customerEmail,
    line_items: [{ price: env.STRIPE_PRICE_PRO_MONTHLY, quantity: 1 }],
    success_url: `${env.APP_URL}/dashboard/settings?billing=success`,
    cancel_url: `${env.APP_URL}/dashboard/settings?billing=cancel`,
    metadata: { userId }
  });

  return { url: session.url };
}

export async function createPortalSession(customerId?: string) {
  if (!stripe || !customerId) {
    return { url: `${env.APP_URL}/dashboard/settings?billing=mock-portal` };
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${env.APP_URL}/dashboard/settings`
  });

  return { url: session.url };
}

