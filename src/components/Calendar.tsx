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
  day: number;
  isInCurrentMonth: boolean;
};

const Calendar: FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number>(-1);
  const [specificDates, setSpecificDates] = useState<string[]>([]); // 특정 날짜
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
    var matrix: dayItem[][] = [];

    var year = currentMonth.getFullYear();
    var month = currentMonth.getMonth();
    var firstDay = new Date(year, month, 1).getDay();
    var maxDays = new Date(year, month + 1, 0).getDate();

    var counter = -firstDay + 1; // 첫 주의 첫 날짜를 계산
    for (var row = 0; row < 6; row++) {
      matrix[row] = [];
      for (var col = 0; col < 7; col++) {
        let cellValue = counter > 0 && counter <= maxDays ? counter : 0;
        matrix[row][col] = {
          day: cellValue,
          isInCurrentMonth: counter > 0 && counter <= maxDays,
        };
        counter++;
      }
    }
    return matrix;
  };

  const getTextStyle = (args: {
    rowIndex: number;
    colIndex: number;
    item: dayItem;
  }) => {
    const { rowIndex, colIndex, item } = args;
    if (rowIndex !== 0) {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth() + 1; // 월은 0부터 인덱스가 지정됩니다. 1을 추가하세요
      const formattedMonth = month < 10 ? `0${month}` : month;
      const formattedDay = item.day < 10 ? `0${item.day}` : item.day;
      const fullDate = `${year}-${formattedMonth}-${formattedDay}`; // 'YYYY-MM-DD'와 일치하도록 조정

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

      if (item.isInCurrentMonth && specificDates.includes(fullDate)) {
        textStyle = { ...textStyle, ...styles.specificDate };
      }

      if (item.day === selectedDay && item.isInCurrentMonth) {
        textStyle = styles.selectedDay;
      }

      return textStyle;
    } else {
      return colIndex === 0
        ? styles.headerTextRed
        : colIndex === 6
        ? styles.headerTextBlue
        : styles.headerText;
    }
  };

  const renderCalendar = () => {
    const matrix = generateMatrix();
    var rows = matrix.map((row, rowIndex) => {
      var rowItems = row.map((item, colIndex) => {
        const textStyle = getTextStyle({ rowIndex, colIndex, item }); // 날짜 스타일 결정
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
