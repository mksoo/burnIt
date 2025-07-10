import React, { FC, useCallback, useMemo, useState } from 'react';
import { FlatList, StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { DayItem, useCalendar } from '@/hooks/useCalendar';
import { styles } from './styles';
import { Dayjs } from 'dayjs';

interface Props {
  selectedDay: Dayjs;
  monthDays: DayItem[];
  handleDayPress: (args: {dayItem: DayItem}) => void;
  style?: StyleProp<ViewStyle>;
}

const CalendarMonthGridView: FC<Props> = ({selectedDay, monthDays, handleDayPress, style}) => {

  const getTextStyle = (args: { item: DayItem }) => {
    const { item } = args;
    const colIndex = item.day.day();

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
    const textStyle = getTextStyle({ item });
    const date = item.day.date();
    return (
      <TouchableOpacity
        style={styles.cell}
        onPress={() => handleDayPress({dayItem: item})}
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
        style={[style]}
        data={monthDays}
        renderItem={renderCalendarCell}
        keyExtractor={(_, index) => `day-${index}`}
        numColumns={7}
        scrollEnabled={false}
      />
  );
};

export default CalendarMonthGridView;
