// SheetMonth — one month rendered as the DateSheet's calendar grid.
// Translated from the <SheetMonth> in screens/datesheet.jsx. Each cell is a
// 44h tappable square; range selection is driven by the draft-booking
// store. The visual logic — light gold fill across the in-range span, a
// darker gold pill on the start and end days, dark text on the pill — comes
// straight from lib/tokens.css and the design source.

import { Pressable, StyleSheet, View } from 'react-native';

import { colors, fonts, radii } from '../../lib/theme';
import { type DraftRange, useDraftBooking } from '../../store/draftBooking';
import { Serif, Tnum } from '../typography';

const DAY_INITIALS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const;
const CELL_HEIGHT = 44;
const RANGE_FILL = 'rgba(212,178,122,0.14)';

export type SheetMonthProps = {
  year: number;
  /** 0-indexed (Jan = 0, Sep = 8). */
  month: number;
  booked?: readonly number[];
};

export function SheetMonth({ year, month, booked = [] }: SheetMonthProps) {
  const range = useDraftBooking((s) => s.range);
  const tapDate = useDraftBooking((s) => s.tapDate);

  const first = new Date(year, month, 1);
  const startDow = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  const monthName = first.toLocaleString('en-US', { month: 'long' });

  return (
    <View style={styles.month}>
      <Serif size={22} style={styles.heading}>
        {monthName} {year}
      </Serif>
      <View style={styles.dayHeaderRow}>
        {DAY_INITIALS.map((d, i) => (
          <View key={i} style={styles.dayHeaderCell}>
            <Serif
              size={10}
              color={colors.text3}
              style={{ letterSpacing: 0.1 * 10, fontFamily: fonts.sansMedium }}
            >
              {d}
            </Serif>
          </View>
        ))}
      </View>
      <View style={styles.grid}>
        {cells.map((d, i) => (
          <Cell
            key={`${month}-${i}`}
            day={d}
            month={month}
            range={range}
            isBooked={d !== null && booked.includes(d)}
            onTap={tapDate}
          />
        ))}
      </View>
    </View>
  );
}

// --- Single cell -------------------------------------------------------

type CellProps = {
  day: number | null;
  month: number;
  range: DraftRange;
  isBooked: boolean;
  onTap: (day: number, monthIdx: number) => void;
};

function Cell({ day, month, range, isBooked, onTap }: CellProps) {
  if (day === null) return <View style={styles.empty} />;

  const isRangeMonth = range.monthIdx === month;
  const isStart = isRangeMonth && day === range.start;
  const isEnd = isRangeMonth && day === range.end;
  const inRange =
    isRangeMonth &&
    range.start !== null &&
    range.end !== null &&
    day >= range.start &&
    day <= range.end;

  const radius = inRange
    ? cornerRadii(isStart, isEnd)
    : {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      };

  return (
    <Pressable
      disabled={isBooked}
      onPress={() => onTap(day, month)}
      style={[styles.cell, radius, inRange && { backgroundColor: RANGE_FILL }]}
    >
      {(isStart || isEnd) && <View style={styles.pill} pointerEvents="none" />}
      <Tnum
        size={15}
        weight={isStart || isEnd ? 600 : 400}
        color={isStart || isEnd ? colors.goldButtonText : isBooked ? colors.text4 : colors.text}
        style={[styles.dayNumber, isBooked && { textDecorationLine: 'line-through' }]}
      >
        {day}
      </Tnum>
    </Pressable>
  );
}

function cornerRadii(isStart: boolean, isEnd: boolean) {
  if (isStart && isEnd) {
    return {
      borderTopLeftRadius: 999,
      borderTopRightRadius: 999,
      borderBottomLeftRadius: 999,
      borderBottomRightRadius: 999,
    };
  }
  if (isStart) {
    return {
      borderTopLeftRadius: 999,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 999,
      borderBottomRightRadius: 0,
    };
  }
  if (isEnd) {
    return {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 999,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 999,
    };
  }
  return {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  };
}

const styles = StyleSheet.create({
  month: { marginBottom: 22 },
  heading: { marginBottom: 14 },
  dayHeaderRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dayHeaderCell: {
    width: '14.2857%',
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: '14.2857%',
    height: CELL_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  empty: {
    width: '14.2857%',
    height: CELL_HEIGHT,
  },
  pill: {
    position: 'absolute',
    top: 3,
    bottom: 3,
    left: 3,
    right: 3,
    backgroundColor: colors.gold,
    borderRadius: radii.pill,
  },
  dayNumber: {
    zIndex: 1,
  },
});
