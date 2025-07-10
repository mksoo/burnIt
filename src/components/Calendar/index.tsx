import React, {FC} from 'react';
import { View } from 'react-native';
import { useCalendar } from '@/hooks/useCalendar';
import { CalendarHeader } from './CalendarHeader';
import { WeekDayHeader } from './WeekDayHeader';
import CalendarMonthGridView from './CalendarMonthGridView';
import { styles } from './styles';
import CalendarWeekView from './CalendarWeekView';
import Divider from '../common/Divider';

const Calendar: FC = () => {
  const {
    weekDays,
    selectedDay,
    setSelectedDay,
    currentWeek,
    currentMonth,
    monthDays,
    handleDayPress,
    handleClickPrevious,
    handleClickNext,
    viewType,
  } = useCalendar();

  return (
    <View style={styles.container}>
      <CalendarHeader
        currentDay={viewType==="MONTH" ? currentMonth : currentWeek}
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
          <CalendarWeekView
            weekDays={weekDays}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}/>
        }
      </View>
      <Divider style={{marginTop: 10}}/>
    </View>
  );
};

export default Calendar;
