import dayjs, { Dayjs } from 'dayjs';
import { useState, useCallback, useMemo } from 'react';

export type DayItem = {
  day: Dayjs;
  isInCurrentMonth?: boolean;
};

export const useCalendar = () => {
  const [selectedDay, setSelectedDay] = useState<Dayjs>(dayjs());
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [currentWeek, setCurrentWeek] = useState<Dayjs>(dayjs().startOf('week'));

  const [viewType, setViewType] = useState<"MONTH" | "WEEK">("MONTH");

  const handleClickNext = useCallback(() => {
    if (viewType === "MONTH") {
      setCurrentMonth(prev => prev.add(1, 'month'));
    } else {
      setCurrentWeek(prev => prev.add(1, 'week'));
    }
  }, [viewType]);

  const handleClickPrevious = useCallback(() => {
    if (viewType === "MONTH") {
      setCurrentMonth(prev => prev.subtract(1, 'month'));
    } else {
      setCurrentWeek(prev => prev.subtract(1, 'week'));
    }
  }, [viewType]);

  const weekDays = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const startOfWeek = currentWeek.startOf('week');
      const day = startOfWeek.add(i, 'day');
      return {
        day,
        colIndex: day.day(),
      };
    });
    return days;
  }, [selectedDay, currentWeek]);

  const monthDays = useMemo(() => {
    const daysArray: DayItem[] = [];
    const firstDay = currentMonth.startOf('month').day();
    const maxDate = currentMonth.endOf('month').date();

    for (let i = 0; i < 42; i++) {
      const index = i - firstDay;
      const isInCurrentMonth = index >= 0 && index < maxDate;
      const cellValue = currentMonth.startOf('month').add(index, 'day');

      daysArray.push({
        day: cellValue,
        isInCurrentMonth,
      });
    }
    return daysArray;
  }, [currentMonth]);

  const handleDayPress = useCallback(
    (args: {dayItem: DayItem}) => {
      const {dayItem} = args;
      if (!dayItem?.isInCurrentMonth) {
        const date = dayItem.day.date();
        const isNextMonth = date < 15;
        const addMonthValue = isNextMonth ? 1 : -1;
        setCurrentMonth(prev => prev.add(addMonthValue, 'month'));
      }
      setSelectedDay(dayItem.day);
    },
    [],
  );

  return {
    weekDays,
    monthDays,
    handleDayPress,
    selectedDay,
    setSelectedDay,
    currentWeek,
    currentMonth,
    setCurrentMonth,
    viewType,
    setViewType,
    handleClickPrevious,
    handleClickNext
  };
};
