import dayjs, { Dayjs } from 'dayjs';
import { useState, useCallback, useMemo } from 'react';

export type DayItem = {
  day: Dayjs;
  isInCurrentMonth?: boolean;
};

const getWeekDays = (args: {viewDay: Dayjs}) => {
  const {viewDay} = args;
  const days = Array.from({ length: 7 }, (_, i) => {
    const startOfWeek = viewDay.startOf('week');
    const day = startOfWeek.add(i, 'day');
    return {
      day,
      colIndex: day.day(),
    };
  });
  return days;
}

const getMonthDays = (args: {viewDay: Dayjs}) => {
  const {viewDay} = args;
  const daysArray: DayItem[] = [];
    const firstDay = viewDay.startOf('month').day();
    const maxDate = viewDay.endOf('month').date();

    for (let i = 0; i < 42; i++) {
      const index = i - firstDay;
      const isInCurrentMonth = index >= 0 && index < maxDate;
      const cellValue = viewDay.startOf('month').add(index, 'day');

      daysArray.push({
        day: cellValue,
        isInCurrentMonth,
      });
    }
    return daysArray;
}

export const useCalendar = () => {
  const [selectedDay, setSelectedDay] = useState<Dayjs>(dayjs());
  const [viewDay, setViewDay] = useState<Dayjs>(dayjs());

  const [viewType, setViewType] = useState<"MONTH" | "WEEK">("MONTH");

  const handleClickNext = useCallback(() => {
    if (viewType === "MONTH") {
      setViewDay(prev => prev.add(1, 'month'));
    } else {
      setViewDay(prev => prev.add(1, 'week'));
    }
  }, [viewType]);

  const handleClickPrevious = useCallback(() => {
    if (viewType === "MONTH") {
      setViewDay(prev => prev.subtract(1, 'month'));
    } else {
      setViewDay(prev => prev.subtract(1, 'week'));
    }
  }, [viewType]);

  const weekDays = useMemo(() => {
    return getWeekDays({viewDay});
  }, [viewDay]);

  const monthDays = useMemo(() => {
    return getMonthDays({viewDay});
  }, [viewDay]);


  const weekPositionRatio = useMemo(() => {
    const weekIndex = monthDays.findIndex((item => item.day.isSame(viewDay, 'date')));
    return Math.floor(weekIndex / 7);
  }, [monthDays, viewDay]);


  const handleDayPress = useCallback(
    (args: {dayItem: DayItem}) => {
      const {dayItem} = args;
      if (dayItem.isInCurrentMonth === false) {
        const date = dayItem.day.date();
        const isNextMonth = date < 15;
        const addMonthValue = isNextMonth ? 1 : -1;
        setViewDay(prev => prev.add(addMonthValue, 'month'));
      }
      setSelectedDay(dayItem.day);
      setViewDay(dayItem.day);
    },
    [],
  );

  return {
    weekDays,
    monthDays,
    weekPositionRatio,
    handleDayPress,
    selectedDay,
    setSelectedDay,
    viewDay,
    viewType,
    setViewType,
    handleClickPrevious,
    handleClickNext
  };
};
