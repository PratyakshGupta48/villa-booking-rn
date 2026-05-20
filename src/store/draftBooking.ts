// Draft-booking store — the in-progress date range and guest count the user
// is composing on the DateSheet, before they confirm and head to Review.
//
// The store is single-month by design (range.monthIdx + start + end), which
// matches the way the Claude Design handoff models it. Multi-month spans
// are a deliberate follow-up.

import { create } from 'zustand';

export type DraftRange = {
  /** Day-of-month of the range start (1-31), or null if nothing tapped yet. */
  start: number | null;
  /** Day-of-month of the range end (1-31), or null if only start is set. */
  end: number | null;
  /** 0-indexed month the range lives in (8 = September). */
  monthIdx: number | null;
};

export type DraftBookingState = {
  range: DraftRange;
  guests: number;
  /** Tap a day in a given month — handles the start / end / reset logic. */
  tapDate: (day: number, monthIdx: number) => void;
  setGuests: (guests: number) => void;
  reset: () => void;
};

const EMPTY_RANGE: DraftRange = { start: null, end: null, monthIdx: null };

const initial: Pick<DraftBookingState, 'range' | 'guests'> = {
  range: EMPTY_RANGE,
  guests: 1,
};

export const useDraftBooking = create<DraftBookingState>((set) => ({
  ...initial,
  tapDate: (day, monthIdx) =>
    set((s) => {
      // Different month from the current selection — start fresh in the new month.
      if (s.range.monthIdx !== monthIdx) {
        return { range: { start: day, end: null, monthIdx } };
      }
      // Both endpoints already chosen — start fresh in this month.
      if (s.range.start !== null && s.range.end !== null) {
        return { range: { start: day, end: null, monthIdx } };
      }
      // No start yet — set it.
      if (s.range.start === null) {
        return { range: { start: day, end: null, monthIdx } };
      }
      // Day is earlier than the current start — replace start.
      if (day < s.range.start) {
        return { range: { start: day, end: null, monthIdx } };
      }
      // Day equals start — single-night selection.
      if (day === s.range.start) {
        return { range: { start: day, end: day, monthIdx } };
      }
      // Day is later than start — set as end.
      return { range: { start: s.range.start, end: day, monthIdx } };
    }),
  setGuests: (guests) => set({ guests }),
  reset: () => set(initial),
}));
