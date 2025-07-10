import React, {FC} from 'react';
import { View } from 'react-native';
import { useCalendar } from '@/hooks/useCalendar';
import { CalendarHeader } from './CalendarHeader';
import { WeekDayHeader } from './WeekDayHeader';
import CalendarMonthGridView from './CalendarMonthGridView';
import { styles } from './styles';
import Divider from '../common/Divider';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

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

  const position = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      position.value = e.translationY;
      console.log(position.value, e.translationY);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    height: position.value,
  }));



  return (
    <View style={styles.container}>
      <CalendarHeader
        currentDay={viewType==="MONTH" ? currentMonth : currentWeek}
        onPressPrev={handleClickPrevious}
        onPressNext={handleClickNext}
      />
      <View style={styles.calendarContainer}>
        <WeekDayHeader />
        <GestureDetector gesture={gesture}>
          <Animated.View style={[animatedStyle]}>
          <CalendarMonthGridView 
            selectedDay={selectedDay}
            monthDays={monthDays} 
            handleDayPress={handleDayPress}/>
          </Animated.View>
        </GestureDetector>
        {/* {viewType==="MONTH" ? 
          <CalendarMonthGridView 
            selectedDay={selectedDay}
            monthDays={monthDays} 
            handleDayPress={handleDayPress}/>
          :
          <CalendarWeekView
            weekDays={weekDays}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}/>
        } */}
      </View>
      <Divider style={{marginTop: 10}}/>
    </View>
  );
};

export default Calendar;
