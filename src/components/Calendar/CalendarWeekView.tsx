// src/components/Calendar/CalendarWeekView.tsx

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import dayjs, { Dayjs } from 'dayjs';
import { DayItem, useCalendar } from '@/hooks/useCalendar';
import { CalendarHeader } from './CalendarHeader';
import { WeekDayHeader } from './WeekDayHeader';
import { styles } from './styles';

const CalendarWeekView = () => {
  const { currentMonth, selectedDay, handleDayPress } = useCalendar();

  const [startOfWeek, setStartOfWeek] = useState<Dayjs>(
    selectedDay.startOf('week'),
  );

  const weekDays = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const day = startOfWeek.add(i, 'day');
      return {
        day,
        isInCurrentMonth: day.isSame(currentMonth, 'month'),
        colIndex: day.day(),
      };
    });
    return days;
  }, [selectedDay, currentMonth, startOfWeek]);

  const handlePressPreviousWeek = () => {
    setStartOfWeek(prev => prev.subtract(1, 'week'));
  };

  const handlePressNextWeek = () => {
    setStartOfWeek(prev => prev.add(1, 'week'));
  };

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
      const { day, isInCurrentMonth } = item;
      const isSelected = dayjs(day).isSame(selectedDay, 'day');
      return (
        <TouchableOpacity
          key={day.toString()}
          style={styles.cell}
          onPress={() => handleDayPress(day, isInCurrentMonth)}
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
    <View style={styles.container}>
      <CalendarHeader
        currentDay={startOfWeek}
        onPressPrev={handlePressPreviousWeek}
        onPressNext={handlePressNextWeek}
      />
      <WeekDayHeader />
      <View style={styles.row}>
        <FlatList
          data={weekDays}
          renderItem={renderItem}
          keyExtractor={(_, index) => `day-${index}`}
          numColumns={7}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};

export default CalendarWeekView;
