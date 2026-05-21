// Unit tests for the draft-booking reducer — the tapDate state machine
// that powers the DateSheet's range selection.

import { useDraftBooking } from '../src/store/draftBooking';

beforeEach(() => {
  useDraftBooking.getState().reset();
});

describe('draftBooking — initial state', () => {
  test('range is empty', () => {
    expect(useDraftBooking.getState().range).toEqual({
      start: null,
      end: null,
      monthIdx: null,
    });
  });

  test('guests defaults to 1', () => {
    expect(useDraftBooking.getState().guests).toBe(1);
  });
});

describe('draftBooking — tapDate state machine', () => {
  test('first tap sets the start in the chosen month', () => {
    useDraftBooking.getState().tapDate(8, 8);
    expect(useDraftBooking.getState().range).toEqual({ start: 8, end: null, monthIdx: 8 });
  });

  test('a later tap in the same month sets the end', () => {
    const { tapDate } = useDraftBooking.getState();
    tapDate(8, 8);
    tapDate(13, 8);
    expect(useDraftBooking.getState().range).toEqual({ start: 8, end: 13, monthIdx: 8 });
  });

  test('an earlier tap replaces the start with no end', () => {
    const { tapDate } = useDraftBooking.getState();
    tapDate(8, 8);
    tapDate(5, 8);
    expect(useDraftBooking.getState().range).toEqual({ start: 5, end: null, monthIdx: 8 });
  });

  test('a tap in a different month starts a fresh range in that month', () => {
    const { tapDate } = useDraftBooking.getState();
    tapDate(8, 8);
    tapDate(15, 9);
    expect(useDraftBooking.getState().range).toEqual({ start: 15, end: null, monthIdx: 9 });
  });

  test('once both endpoints are chosen, the next tap starts over', () => {
    const { tapDate } = useDraftBooking.getState();
    tapDate(8, 8);
    tapDate(13, 8);
    tapDate(20, 8);
    expect(useDraftBooking.getState().range).toEqual({ start: 20, end: null, monthIdx: 8 });
  });

  test('tapping the start day a second time selects a single-night stay', () => {
    const { tapDate } = useDraftBooking.getState();
    tapDate(8, 8);
    tapDate(8, 8);
    expect(useDraftBooking.getState().range).toEqual({ start: 8, end: 8, monthIdx: 8 });
  });

  test('tapping a later day in a different month while complete resets to new month', () => {
    const { tapDate } = useDraftBooking.getState();
    tapDate(8, 8);
    tapDate(13, 8);
    tapDate(20, 9);
    expect(useDraftBooking.getState().range).toEqual({ start: 20, end: null, monthIdx: 9 });
  });
});

describe('draftBooking — guests', () => {
  test('setGuests updates the count', () => {
    useDraftBooking.getState().setGuests(4);
    expect(useDraftBooking.getState().guests).toBe(4);
  });
});

describe('draftBooking — reset', () => {
  test('clears range and guests back to initial', () => {
    const { tapDate, setGuests, reset } = useDraftBooking.getState();
    tapDate(8, 8);
    tapDate(13, 8);
    setGuests(4);
    reset();
    const after = useDraftBooking.getState();
    expect(after.range).toEqual({ start: null, end: null, monthIdx: null });
    expect(after.guests).toBe(1);
  });
});
