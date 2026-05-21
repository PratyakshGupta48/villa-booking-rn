// Pricing math — the per-night × nights subtotal and the all-in total
// including the standard cleaning and service fees. Extracted as pure
// functions so the math is unit-testable independent of the booking flow.

export const CLEANING_FEE = 250;
export const SERVICE_FEE = 360;

/** Subtotal before fees: nightly × nights. */
export function calcSubtotal(nightlyUsd: number, nights: number): number {
  if (nights <= 0 || nightlyUsd <= 0) return 0;
  return nightlyUsd * nights;
}

/** All-in total: subtotal + cleaning + service. Returns 0 for an empty range. */
export function calcTotal(nightlyUsd: number, nights: number): number {
  const subtotal = calcSubtotal(nightlyUsd, nights);
  if (subtotal === 0) return 0;
  return subtotal + CLEANING_FEE + SERVICE_FEE;
}
