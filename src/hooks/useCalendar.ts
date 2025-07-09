import dayjs from 'dayjs';
import { useState, useCallback, useMemo } from 'react';

export type DayItem = {
  day: number;
  isInCurrentMonth: boolean;
  colIndex: number;
};

export const useCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDay, setSelectedDay] = useState<number>(-1);

  const handleClickNextMonth = useCallback(() => {
    setSelectedDay(-1);
    setCurrentMonth(currentMonth.add(1, 'month'));
  }, [currentMonth]);

  const handleClickPreviousMonth = useCallback(() => {
    setSelectedDay(-1);
    setCurrentMonth(currentMonth.add(-1, 'month'));
  }, [currentMonth]);

  const handleDayPress = useCallback(
    (day: number, isInCurrentMonth: boolean) => {
      if (!isInCurrentMonth) {
        const isNextMonth = day < 15;
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
    const maxDateOfPreviousMonth = currentMonth
      .add(-1, 'month')
      .endOf('month')
      .date();

    for (let i = 0; i < 42; i++) {
      const colIndex = i % 7;
      const index = i - firstDay;
      const isInCurrentMonth = index >= 0 && index < maxDate;
      let cellValue: number;

      if (isInCurrentMonth) {
        cellValue = index + 1;
      } else if (index < 0) {
        cellValue = maxDateOfPreviousMonth + index + 1;
      } else {
        cellValue = index - maxDate + 1;
      }
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
