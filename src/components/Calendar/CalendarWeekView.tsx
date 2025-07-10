// src/components/Calendar/CalendarWeekView.tsx

import React, { FC, useCallback, useMemo, useState } from 'react';
import { Text, TouchableOpacity, FlatList, StyleProp, ViewStyle } from 'react-native';
import dayjs, { Dayjs } from 'dayjs';
import { DayItem, useCalendar } from '@/hooks/useCalendar';
import { styles } from './styles';

interface Props {
  weekDays: DayItem[];
  selectedDay: Dayjs;
  handleDayPress: (args: {dayItem: DayItem}) => void;
  style?: StyleProp<ViewStyle>;
}

const CalendarWeekView: FC<Props>= ({weekDays, selectedDay, handleDayPress, style}) => {
  const getDayTextStyle = (args: {
    day: Dayjs
  }) => {
    const {day} = args;
    const textStyle = [styles.cellText];
    if (day.day() === 0) {
      textStyle.push(styles.cellTextRed);
    } else if (day.day() === 6) {
      textStyle.push(styles.cellTextBlue);
    }
    return textStyle;
  };

  const renderItem = useCallback(
    (args: { item: DayItem }) => {
      const { item } = args;
      const { day } = item;
      const isSelected = dayjs(day).isSame(selectedDay, 'day');
      return (
        <TouchableOpacity
          key={day.toString()}
          style={styles.cell}
          onPress={() => handleDayPress({dayItem: item})}
        >
          <Text
            style={[
              getDayTextStyle({day}),
              isSelected && styles.selectedDay,
            ]}
          >
            {day.date()}
          </Text>
        </TouchableOpacity>
      );
    },
    [selectedDay],
  );

  return (
    <FlatList
      contentContainerStyle={{
        justifyContent: 'center',
      }}
      style={style}
      data={weekDays}
      renderItem={renderItem}
      keyExtractor={(_, index) => `day-${index}`}
      numColumns={7}
      scrollEnabled={false}
    />
  );
};

export default CalendarWeekView;
