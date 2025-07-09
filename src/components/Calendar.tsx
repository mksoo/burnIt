import { colors } from '@/styles/colors';
import dayjs from 'dayjs';
import { FC } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCalendar, DayItem } from '../hooks/useCalendar';

const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

const months = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
];

const CELL_SIZE = 40;

const Calendar: FC = () => {
  const {
    currentMonth,
    selectedDay,
    days,
    handleClickNextMonth,
    handleClickPreviousMonth,
    handleDayPress,
  } = useCalendar();

  const getTextStyle = (args: { colIndex: number; item: DayItem }) => {
    const { colIndex, item } = args;

    let textStyle = item.isInCurrentMonth
      ? colIndex === 0
        ? styles.cellTextRed
        : colIndex === 6
        ? styles.cellTextBlue
        : styles.cellText
      : colIndex === 0
      ? { ...styles.cellTextRed, ...styles.cellTextGrayOpacity }
      : colIndex === 6
      ? { ...styles.cellTextBlue, ...styles.cellTextGrayOpacity }
      : { ...styles.cellTextGray, ...styles.cellTextGrayOpacity };

    if (item.day === selectedDay && item.isInCurrentMonth) {
      textStyle = styles.selectedDay;
    }

    return textStyle;
  };

  const renderCalendarCell = ({ item }: { item: DayItem }) => {
    const textStyle = getTextStyle({ colIndex: item.colIndex, item });
    return (
      <TouchableOpacity
        style={styles.cell}
        onPress={() => handleDayPress(item.day, item.isInCurrentMonth)}
      >
        <Text style={textStyle}>{item.day}</Text>
      </TouchableOpacity>
    );
  };

  const CalendarBody = () => (
    <FlatList
      data={days}
      renderItem={renderCalendarCell}
      keyExtractor={(_, index) => `day-${index}`}
      numColumns={7}
      scrollEnabled={false}
    />
  );

  const CalendarWeekDayHeader = () => (
    <View style={styles.row}>
      {weekDays.map((day, index) => {
        const textStyle =
          index === 0
            ? styles.cellTextRed
            : index === 6
            ? styles.cellTextBlue
            : styles.cellText;
        return (
          <View key={`${day}-${index}`} style={styles.cell}>
            <Text style={textStyle}>{day}</Text>
          </View>
        );
      })}
    </View>
  );

  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClickPreviousMonth}>
            <Text style={styles.monthLabel}>&lt; Prev</Text>
          </TouchableOpacity>
          <Text style={styles.monthLabel}>
            {currentMonth.year()}.&nbsp;
            {months[currentMonth.month()]}
          </Text>
          <TouchableOpacity onPress={handleClickNextMonth}>
            <Text style={styles.monthLabel}>Next &gt;</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.calendarContainer}>
          <CalendarWeekDayHeader />
          <CalendarBody />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    padding: 10,
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
    borderColor: 'red',
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

export default Calendar;
