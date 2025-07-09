import React from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { DayItem } from '@/hooks/useCalendar';
import { styles } from './styles';
import { Dayjs } from 'dayjs';

interface CalendarGridProps {
  days: DayItem[];
  selectedDay: Dayjs;
  onDayPress: (day: Dayjs, isInCurrentMonth: boolean) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  days,
  selectedDay,
  onDayPress,
}) => {
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

    return textStyle;
  };

  const renderCalendarCell = ({ item }: { item: DayItem }) => {
    const textStyle = getTextStyle({ colIndex: item.colIndex, item });
    const date = item.day.date();
    return (
      <TouchableOpacity
        style={styles.cell}
        onPress={() => onDayPress(item.day, item.isInCurrentMonth)}
      >
        <Text
          style={[
            textStyle,
            selectedDay.isSame(item.day) ? styles.selectedDay : {},
          ]}
        >
          {date}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={days}
      renderItem={renderCalendarCell}
      keyExtractor={(_, index) => `day-${index}`}
      numColumns={7}
      scrollEnabled={false}
    />
  );
};
