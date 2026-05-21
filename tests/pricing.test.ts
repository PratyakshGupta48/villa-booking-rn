// Unit tests for the pricing math in src/lib/pricing.ts.

import { CLEANING_FEE, SERVICE_FEE, calcSubtotal, calcTotal } from '../src/lib/pricing';

describe('calcSubtotal', () => {
  test('nightly × nights', () => {
    expect(calcSubtotal(1200, 5)).toBe(6000);
    expect(calcSubtotal(850, 4)).toBe(3400);
    expect(calcSubtotal(1, 1)).toBe(1);
  });

  test('returns 0 when nights is 0', () => {
    expect(calcSubtotal(1200, 0)).toBe(0);
  });

  test('returns 0 when nights is negative', () => {
    expect(calcSubtotal(1200, -1)).toBe(0);
  });

  test('returns 0 when nightly is 0', () => {
    expect(calcSubtotal(0, 5)).toBe(0);
  });
});

describe('calcTotal', () => {
  test('subtotal plus cleaning plus service', () => {
    expect(calcTotal(1200, 5)).toBe(6610);
    expect(calcTotal(1200, 5)).toBe(calcSubtotal(1200, 5) + CLEANING_FEE + SERVICE_FEE);
  });

  test('matches the design BOOKING constant for Villa Aroma', () => {
    expect(calcTotal(1200, 5)).toBe(6610);
  });

  test('returns 0 when there is no range', () => {
    expect(calcTotal(1200, 0)).toBe(0);
    expect(calcTotal(0, 5)).toBe(0);
    expect(calcTotal(0, 0)).toBe(0);
  });

  test('fees are applied even on a 1-night booking', () => {
    expect(calcTotal(1200, 1)).toBe(1200 + CLEANING_FEE + SERVICE_FEE);
  });

  test('fees are not double-charged across a longer stay', () => {
    const total = calcTotal(1200, 10);
    const subtotal = calcSubtotal(1200, 10);
    expect(total - subtotal).toBe(CLEANING_FEE + SERVICE_FEE);
  });
});
