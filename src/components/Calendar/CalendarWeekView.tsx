// src/components/Calendar/CalendarWeekView.tsx

import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import { useCalendar } from '@/hooks/useCalendar';
import { CalendarHeader } from './CalendarHeader';
import { WeekDayHeader } from './WeekDayHeader';
import { styles } from './styles';

const CalendarWeekView = () => {
  const {
    currentMonth,
    selectedDay,
    handleDayPress,
    handleClickNextMonth,
    handleClickPreviousMonth,
  } = useCalendar();

  const weekDays = useMemo(() => {
    const startOfWeek = dayjs(selectedDay).startOf('week');
    const days = Array.from({ length: 7 }, (_, i) => {
      const day = startOfWeek.add(i, 'day');
      return {
        day,
        isInCurrentMonth: day.isSame(currentMonth, 'month'),
        colIndex: day.day(),
      };
    });
    return days;
  }, [selectedDay, currentMonth]);

  const handlePressPreviousWeek = () => {
    const prevWeekDay = dayjs(selectedDay).subtract(7, 'days');
    handleDayPress(prevWeekDay, prevWeekDay.isSame(currentMonth, 'month'));
  };

  const handlePressNextWeek = () => {
    const nextWeekDay = dayjs(selectedDay).add(7, 'days');
    handleDayPress(nextWeekDay, nextWeekDay.isSame(currentMonth, 'month'));
  };

  const getDayTextStyle = (
    day: dayjs.Dayjs,
    isInCurrentMonth: boolean,
    colIndex: number,
  ) => {
    const textStyle = [styles.cellText];
    if (colIndex === 0) {
      textStyle.push(styles.cellTextRed);
    } else if (colIndex === 6) {
      textStyle.push(styles.cellTextBlue);
    }
    return textStyle;
  };

  return (
    <View style={styles.container}>
      <CalendarHeader
        currentMonth={currentMonth}
        onPressPrev={handlePressPreviousWeek}
        onPressNext={handlePressNextWeek}
      />
      <WeekDayHeader />
      <View style={styles.row}>
        {weekDays.map(({ day, isInCurrentMonth, colIndex }) => {
          const isSelected = dayjs(day).isSame(selectedDay, 'day');
          return (
            <TouchableOpacity
              key={day.toString()}
              style={styles.cell}
              onPress={() => handleDayPress(day, isInCurrentMonth)}
            >
              <Text
                style={[
                  getDayTextStyle(day, isInCurrentMonth, colIndex),
                  isSelected && styles.selectedDay,
                ]}
              >
                {day.date()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CalendarWeekView;
