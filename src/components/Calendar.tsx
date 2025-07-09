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
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number>(-1);
  const [checkDate, setCheckDate] = useState(''); // 선택한 날짜 포맷 'YYYY-MM-DD'

  // const goToNextMonth = () => {
  //   setCurrentMonth(currentMonth.add(1, 'month'));
  // };

  // const goToPreviousMonth = () => {
  //   setCurrentMonth(currentMonth.add(-1, 'month'));
  // };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };

  // const generateMatrix = () => {
  //   let matrix = [];
  //   matrix[0] = days;

  //   let year = currentMonth.year();
  //   let month = currentMonth.month();
  //   let firstDay = currentMonth.startOf('month').day();
  //   let maxDays = currentMonth.endOf('month').date();

  //   let counter = -firstDay + 1; // 첫 주의 첫 날짜를 계산
  //   for (let row=1; row < 7; row++) {
  //     matrix[row] = [];
  //     for (let col = 0; col < 7; col++) {
  //       let cellValue = counter > 0 && counter <= maxDays ? counter : '';
  //       matrix[row][col] = {
  //         day: cellValue,
  //         isInCurrentMonth: counter > 0 && counter <= maxDays
  //       };
  //     }
  //   }
  // }

  const generateMatrix = () => {
    let matrix: dayItem[][] = [];

    let year = currentMonth.getFullYear();
    let month = currentMonth.getMonth();
    let firstDay = new Date(year, month, 1).getDay();
    // let firstDayJs = dayjs(currentMonth).startOf('month').day();
    let maxDays = new Date(year, month + 1, 0).getDate();
    // const maxDaysJs = dayjs(currentMonth).endOf('month').date();

    let counter = -firstDay + 1; // 첫 주의 첫 날짜를 계산
    for (let row = 0; row < 6; row++) {
      matrix[row] = [];
      for (let col = 0; col < 7; col++) {
        const cellValue =
          counter > 0 && counter <= maxDays ? counter : undefined;
        matrix[row][col] = {
          day: cellValue,
          isInCurrentMonth: counter > 0 && counter <= maxDays,
        };
        counter++;
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

  const renderCalendar = () => {
    // 여기다가 요일 header 추가하면 될 듯.
    const matrix = generateMatrix();
    let rows = matrix.map((row, rowIndex) => {
      let rowItems = row.map((item, colIndex) => {
        const textStyle = getTextStyle({ colIndex, item }); // 날짜 스타일 결정
        return (
          <TouchableOpacity
            style={styles.cell}
            key={colIndex}
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
      });
      return (
        <View style={styles.row} key={rowIndex}>
          {rowItems}
        </View>
      );
    });
    return <View style={styles.calendar}>{rows}</View>;
  };

  const handleDayPress = (args: { day: number; isInCurrentMonth: boolean }) => {
    const { day, isInCurrentMonth } = args;
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    if (!isInCurrentMonth) {
      // 클릭한 날짜가 현재 월이 아니면 월을 바꾼다.
      const isNextMonth = day < 15;
      const newMonth = isNextMonth ? month + 1 : month - 1;
      const newYear = newMonth < 0 ? year - 1 : newMonth > 11 ? year + 1 : year;
      const adjustedMonth = (newMonth + 12) % 12;

      const newCurrentMonth = new Date(newYear, adjustedMonth, 1);
      setCurrentMonth(newCurrentMonth);

      const formattedMonth =
        adjustedMonth < 9 ? `0${adjustedMonth + 1}` : adjustedMonth + 1;
      const formattedDay = day < 10 ? `0${day}` : day;
      const formattedDate = `${newYear}-${formattedMonth}-${formattedDay}`;

      setSelectedDay(day);
      setCheckDate(formattedDate);
    } else {
      // 클릭한 날짜가 현재 월이면 동그라미 표시만 한다.
      const formattedMonth = month < 9 ? `0${month + 1}` : month + 1;
      const formattedDay = day < 10 ? `0${day}` : day;
      const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
      setSelectedDay(day);
      setCheckDate(formattedDate);
    }
  };

  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goToPreviousMonth}>
            <Text style={styles.monthLabel}>&lt; Prev</Text>
          </TouchableOpacity>
          <Text style={styles.monthLabel}>
            {currentMonth.getFullYear()}.&nbsp;
            {months[currentMonth.getMonth()]}
          </Text>
          <TouchableOpacity onPress={goToNextMonth}>
            <Text style={styles.monthLabel}>Next &gt;</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.calendar}>{renderCalendar()}</View>
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
