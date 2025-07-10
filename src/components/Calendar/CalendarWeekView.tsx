// src/components/Calendar/CalendarWeekView.tsx

import React, { useCallback, useMemo, useState } from 'react';
import { Text, TouchableOpacity, FlatList } from 'react-native';
import dayjs, { Dayjs } from 'dayjs';
import { DayItem, useCalendar } from '@/hooks/useCalendar';
import { styles } from './styles';

const CalendarWeekView = () => {
  const { selectedDay, setSelectedDay } = useCalendar();

  const [startOfWeek, setStartOfWeek] = useState<Dayjs>(
    selectedDay.startOf('week'),
  );

  const weekDays = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const day = startOfWeek.add(i, 'day');
      return {
        day,
        colIndex: day.day(),
      };
    });
    return days;
  }, [selectedDay, startOfWeek]);


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
          onPress={() => setSelectedDay(day)}
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
      data={weekDays}
      renderItem={renderItem}
      keyExtractor={(_, index) => `day-${index}`}
      numColumns={7}
      scrollEnabled={false}
    />
  );
};

export default CalendarWeekView;
