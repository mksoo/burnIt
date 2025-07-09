import dayjs, { Dayjs } from 'dayjs';
import { useState, useCallback, useMemo } from 'react';

export type DayItem = {
  day: Dayjs;
  isInCurrentMonth: boolean;
  colIndex: number;
};

export const useCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDay, setSelectedDay] = useState<Dayjs>(dayjs());

  const handleClickNextMonth = useCallback(() => {
    setCurrentMonth(currentMonth.add(1, 'month'));
  }, [currentMonth]);

  const handleClickPreviousMonth = useCallback(() => {
    setCurrentMonth(currentMonth.add(-1, 'month'));
  }, [currentMonth]);

  const handleDayPress = useCallback(
    (day: Dayjs, isInCurrentMonth: boolean) => {
      if (!isInCurrentMonth) {
        const date = day.date();
        const isNextMonth = date < 15;
        const addMonthValue = isNextMonth ? 1 : -1;
        setCurrentMonth(prev => prev.add(addMonthValue, 'month'));
      }
      setSelectedDay(day);
    },
    [],
  );

  const days = useMemo(() => {
    const daysArray: DayItem[] = [];
    const firstDay = currentMonth.startOf('month').day();
    const maxDate = currentMonth.endOf('month').date();

    for (let i = 0; i < 42; i++) {
      const colIndex = i % 7;
      const index = i - firstDay;
      const isInCurrentMonth = index >= 0 && index < maxDate;
      const cellValue = currentMonth.startOf('month').add(index, 'day');

      daysArray.push({
        day: cellValue,
        isInCurrentMonth,
        colIndex: colIndex,
      });
    }
    return daysArray;
  }, [currentMonth]);

  return {
    currentMonth,
    selectedDay,
    days,
    handleClickNextMonth,
    handleClickPreviousMonth,
    handleDayPress,
  };
};
