import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useCalendar } from '@/hooks/useCalendar';
import { CalendarHeader } from './CalendarHeader';
import { WeekDayHeader } from './WeekDayHeader';
import CalendarMonthGridView from './CalendarMonthGridView';
import { styles } from './styles';
import CalendarWeekView from './CalendarWeekView';

const Calendar: React.FC = () => {
  const {selectedDay, currentMonth, monthDays, handleDayPress, handleClickPrevious, handleClickNext, viewType} = useCalendar();


  return (
    <View style={styles.container}>
      <CalendarHeader
        currentDay={currentMonth}
        onPressPrev={handleClickPrevious}
        onPressNext={handleClickNext}
      />
      <View style={styles.calendarContainer}>
        <WeekDayHeader />
        {viewType==="MONTH" ? 
          <CalendarMonthGridView 
            selectedDay={selectedDay}
            monthDays={monthDays} 
            handleDayPress={handleDayPress}/>
          :
          <CalendarWeekView />
        }
      </View>
    </View>
  );
};

export default Calendar;
