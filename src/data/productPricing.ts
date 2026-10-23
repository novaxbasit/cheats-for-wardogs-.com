export type ProductPlanId = 'weekly' | 'monthly' | 'lifetime' | 'onetime';

export interface ProductPlan {
  id: ProductPlanId;
  label: string;
  priceUsd: number;
  priceNote: string;
  /** Shown on the checkout card, and used as the preselected plan. */
  recommended?: boolean;
  badge?: string;
}

const monthlyPlan: ProductPlan = {
  id: 'monthly',
  label: 'Monthly',
  priceUsd: 35,
  priceNote: '31 days',
};

const hwidMonthlyPlan: ProductPlan = {
  id: 'monthly',
  label: 'Monthly',
  priceUsd: 50,
  priceNote: '31 days',
};

const lifetimeUtilityPlan: ProductPlan = {
  id: 'lifetime',
  label: 'Lifetime',
  priceUsd: 150,
  priceNote: 'Unlimited access',
};

const lifetimeFeaturedPlan: ProductPlan = {
  id: 'lifetime',
  label: 'Lifetime',
  priceUsd: 150,
  priceNote: 'Unlimited access',
  recommended: true,
  badge: 'Best value',
};

const monthLifetime35: ProductPlan[] = [
  { ...monthlyPlan, recommended: true },
  lifetimeUtilityPlan,
];

const monthLifetime50: ProductPlan[] = [
  { ...hwidMonthlyPlan, recommended: true },
  lifetimeUtilityPlan,
];

const standardPlans: ProductPlan[] = [monthlyPlan, lifetimeFeaturedPlan];

export function getProductPlans(productSlug: string): ProductPlan[] {
  if (productSlug === 'hwid-spoofer') return monthLifetime50;
  if (productSlug === 'skin-changer' || productSlug === 'ugc') return monthLifetime35;
  return standardPlans;
}

export function getFeaturedPlan(productSlug: string): ProductPlan | undefined {
  const plans = getProductPlans(productSlug);
  return plans.find((plan) => plan.recommended) ?? plans[0];
}

export function formatPlanPrice(usd: number): string {
  return `$${usd}`;
}

export function checkoutUrlWithPlan(baseUrl: string, planId: ProductPlanId): string {
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}plan=${planId}`;
}
