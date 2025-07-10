import React from 'react';
import { View } from 'react-native';
import { useCalendar } from '@/hooks/useCalendar';
import { CalendarHeader } from './CalendarHeader';
import { WeekDayHeader } from './WeekDayHeader';
import CalendarMonthGridView from './CalendarMonthGridView';
import { styles } from './styles';
import CalendarWeekView from './CalendarWeekView';

const Calendar: React.FC = () => {
  const {
    currentMonth,
    selectedDay,
    days,
    handleClickNextMonth,
    handleClickPreviousMonth,
    handleDayPress,
  } = useCalendar();

  return (
    // <View style={styles.container}>
    //   <CalendarHeader
    //     currentMonth={currentMonth}
    //     onPressPrev={handleClickPreviousMonth}
    //     onPressNext={handleClickNextMonth}
    //   />
    //   <View style={styles.calendarContainer}>
    //     <WeekDayHeader />
    //     <CalendarMonthGridView
    //       days={days}
    //       selectedDay={selectedDay}
    //       onDayPress={handleDayPress}
    //     />
    //   </View>
    // </View>
    <CalendarWeekView />
  );
};

export default Calendar;
