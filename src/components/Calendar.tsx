import dayjs from 'dayjs';
import { FC, useCallback, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const days = ['일', '월', '화', '수', '목', '금', '토'];

// 월 표기
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

type dayItem = {
  day: number;
  isInCurrentMonth: boolean;
  colIndex: number; // Add colIndex to determine the day of the week for styling
};

const CELL_SIZE = 40;

const Calendar: FC = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDay, setSelectedDay] = useState<number>(-1);

  const goToNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(currentMonth.add(-1, 'month'));
  };

  // Generates a flat list of day items for the FlatList
  const generateDays = () => {
    const daysArray: dayItem[] = [];
    const firstDay = currentMonth.startOf('month').day();
    const maxDate = currentMonth.endOf('month').date();
    const maxDateOfPreviousMonth = currentMonth
      .add(-1, 'month')
      .endOf('month')
      .date();

    // 6 rows * 7 columns = 42 cells
    for (let i = 0; i < 42; i++) {
      const colIndex = i % 7;
      const index = i - firstDay;
      const isInCurrentMonth = index >= 0 && index < maxDate;
      let cellValue: number;

      if (isInCurrentMonth) {
        cellValue = index + 1;
      } else if (index < 0) {
        cellValue = maxDateOfPreviousMonth + index + 1;
      } else {
        cellValue = index - maxDate + 1;
      }
      daysArray.push({
        day: cellValue,
        isInCurrentMonth,
        colIndex: colIndex,
      });
    }
    return daysArray;
  };

  const getTextStyle = (args: { colIndex: number; item: dayItem }) => {
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

  const handleDayPress = useCallback(
    (args: { day: number; isInCurrentMonth: boolean }) => {
      const { day, isInCurrentMonth } = args;

      if (!isInCurrentMonth) {
        const isNextMonth = day < 15;
        const addMonthValue = isNextMonth ? 1 : -1;
        setCurrentMonth(prev => prev.add(addMonthValue, 'month'));
      }
      setSelectedDay(day);
    },
    [],
  );

  const renderCalendarCell = ({ item, index }: { item: dayItem; index: number }) => {
    const textStyle = getTextStyle({ colIndex: item.colIndex, item });
    return (
      <TouchableOpacity
        style={styles.cell}
        onPress={() =>
          handleDayPress({
            day: item.day,
            isInCurrentMonth: item.isInCurrentMonth,
          })
        }
      >
        <Text style={textStyle}>{item.day}</Text>
      </TouchableOpacity>
    );
  };

  const CalendarBody = () => {
    const days = generateDays();
    return (
      <FlatList
        data={days}
        renderItem={renderCalendarCell}
        keyExtractor={(item, index) => `day-${index}`}
        numColumns={7}
        style={styles.calendar}
        scrollEnabled={false} // To disable scroll for the calendar grid
      />
    );
  };

  const CalendarHeader = () => {
    return (
      <View style={styles.row}>
        {days.map((value, index) => {
          const textStyle =
            index === 0
              ? styles.cellTextRed
              : index === 6
              ? styles.cellTextBlue
              : styles.cellText;
          return (
            <View key={`${value}-${index}`} style={styles.cell}>
              <Text style={textStyle}>{value}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goToPreviousMonth}>
            <Text style={styles.monthLabel}>&lt; Prev</Text>
          </TouchableOpacity>
          <Text style={styles.monthLabel}>
            {currentMonth.year()}.&nbsp;
            {months[currentMonth.month()]}
          </Text>
          <TouchableOpacity onPress={goToNextMonth}>
            <Text style={styles.monthLabel}>Next &gt;</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.calendarContainer}>
          <CalendarHeader />
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
  calendarContainer: { // Renamed from calendar
    justifyContent: 'space-between',
  },
  calendar: {
    // Styles for FlatList if any
  },
  monthLabel: {
    fontSize: 18,
    color: '#000',
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
  headerText: {
    color: '#000',
  },
  headerTextRed: {
    color: '#FF0000',
  },
  headerTextBlue: {
    color: '#007BA4',
  },
  cellText: {
    color: '#000',
  },
  cellTextRed: {
    color: '#FF0000',
  },
  cellTextBlue: {
    color: '#007BA4',
  },
  cellTextGray: {
    color: '#0000004D',
  },
  selectedDay: {
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 20,
    textAlign: 'center',
    lineHeight: CELL_SIZE,
    color: '#000',
    height: CELL_SIZE,
    width: CELL_SIZE,
    overflow: 'hidden',
  },
  cellTextGrayOpacity: {
    opacity: 0.3,
  },
  specificDate: {
    color: '#FF0000',
  },
});

export default Calendar;