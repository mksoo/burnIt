import dayjs from 'dayjs';
import { FC, useState } from 'react';
import {
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
  day: number | undefined;
  isInCurrentMonth: boolean;
};

const Calendar: FC = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDay, setSelectedDay] = useState<number>(-1);

  const goToNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(currentMonth.add(-1, 'month'));
  };

  const generateMatrix = () => {
    const matrix: dayItem[][] = [];

    const firstDay = currentMonth.startOf('month').day();
    const maxDate = currentMonth.endOf('month').date();
    const maxDateOfPreviousMonth = currentMonth
      .add(-1, 'month')
      .endOf('month')
      .date();

    let index = -firstDay + 1; // 첫 주의 첫 날짜를 계산
    for (let row = 0; row < 6; row++) {
      matrix[row] = [];
      for (let col = 0; col < 7; col++) {
        const isInCurrentMonth = index > 0 && index <= maxDate;
        let cellValue: number;

        if (isInCurrentMonth) {
          cellValue = index;
        } else if (index <= 0) {
          cellValue = maxDateOfPreviousMonth + index;
        } else {
          cellValue = index - maxDate;
        }
        matrix[row][col] = {
          day: cellValue,
          isInCurrentMonth,
        };
        index++;
      }
    }
    return matrix;
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

  const CalendarDate = (args: { colIndex: number; item: dayItem }) => {
    const { colIndex, item } = args;
    const textStyle = getTextStyle({ colIndex, item }); // 날짜 스타일 결정
    return (
      <TouchableOpacity
        style={styles.cell}
        key={colIndex}
        onPress={() =>
          handleDayPress({
            day: item.day ?? 0,
            isInCurrentMonth: item.isInCurrentMonth,
          })
        }
      >
        <Text style={textStyle}>{item.day}</Text>
      </TouchableOpacity>
    );
  };

  const CalendarWeek = (args: { rowIndex: number; row: dayItem[] }) => {
    const { rowIndex, row } = args;
    const rowItems = row.map((item, colIndex) => (
      <CalendarDate item={item} colIndex={colIndex} />
    ));
    return (
      <View style={styles.row} key={rowIndex}>
        {rowItems}
      </View>
    );
  };

  const CalendarBody = () => {
    const matrix = generateMatrix();
    const rows = matrix.map((row, rowIndex) => (
      <CalendarWeek rowIndex={rowIndex} row={row} />
    ));
    return <View style={styles.calendar}>{rows}</View>;
  };

  const CalendarHeader = () => {
    return (
      <View style={styles.row}>
        {days.map((value, index) => {
          const renderTextStyle = (args: { index: number }) => {
            const { index } = args;

            let textStyle =
              index === 0
                ? styles.cellTextRed
                : index === 6
                ? styles.cellTextBlue
                : styles.cellText;
            return textStyle;
          };

          const textStyle = renderTextStyle({ index }); // 날짜 스타일 결정
          return (
            <View style={styles.cell}>
              <Text style={textStyle}>{value}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  const handleDayPress = (args: { day: number; isInCurrentMonth: boolean }) => {
    const { day, isInCurrentMonth } = args;
    const year = currentMonth.year();
    const month = currentMonth.month();

    if (!isInCurrentMonth) {
      // 클릭한 날짜가 현재 월이 아니면 월로 바꾼다.
      const isNextMonth = day < 15;
      const newMonth = isNextMonth ? month + 1 : month - 1;
      const newYear = newMonth < 0 ? year - 1 : newMonth > 11 ? year + 1 : year;

      const newCurrentMonth = dayjs(`${newYear}-${newMonth}-01`);
      setCurrentMonth(newCurrentMonth);
    }
    // 클릭한 날짜가 현재 월이면 동그라미 표시만 한다.
    setSelectedDay(day);
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
        <View style={styles.calendar}>
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
  calendar: {
    justifyContent: 'space-between',
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
    height: 40,
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
    backgroundColor: '#E6EEF5',
    textAlign: 'center',
    lineHeight: 40,
    color: '#000',
    height: 40,
    width: 40,
    borderRadius: 20,
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
