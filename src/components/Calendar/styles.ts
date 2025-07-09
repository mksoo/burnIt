import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

const CELL_SIZE = 40;

export const styles = StyleSheet.create({
  bg: {
    flexGrow: 1,
  },
  container: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  calendarContainer: {
    justifyContent: 'space-between',
  },
  monthLabel: {
    fontSize: 18,
    color: colors.grayscale[100],
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    height: CELL_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    color: colors.calendar.normal,
  },
  cellTextRed: {
    color: colors.calendar.holiday,
  },
  cellTextBlue: {
    color: colors.calendar.saterday,
  },
  cellTextGray: {
    color: colors.grayscale[500],
  },
  selectedDay: {
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 20,
    textAlign: 'center',
    lineHeight: CELL_SIZE,
    color: colors.grayscale[100],
    height: CELL_SIZE,
    width: CELL_SIZE,
    overflow: 'hidden',
  },
  cellTextGrayOpacity: {
    opacity: 0.3,
  },
});

export const CELL_SIZE_CONSTANT = CELL_SIZE;
