import React, { FC } from 'react';
import { View } from 'react-native';
import { useCalendar } from '@/hooks/useCalendar';
import { CalendarHeader } from './CalendarHeader';
import { WeekDayHeader } from './WeekDayHeader';
import CalendarMonthGridView from './CalendarMonthGridView';
import { styles } from './styles';
import Divider from '../common/Divider';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import CalendarWeekView from './CalendarWeekView';

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

  const MIN_HEIGHT = 50;
  const MAX_HEIGHT = 250;

  const viewHeight = useSharedValue(MAX_HEIGHT);
  const gestureStartHeight = useSharedValue(MAX_HEIGHT);


  const gesture = Gesture.Pan()
    .onBegin(() => {
      gestureStartHeight.value = viewHeight.value;
    })
    .onUpdate((e) => {
      const newHeight = gestureStartHeight.value + e.translationY;
      viewHeight.value = Math.max(MIN_HEIGHT, Math.min(newHeight, MAX_HEIGHT));
    })
    .onEnd((e) => {
      if (viewHeight.value > (MIN_HEIGHT + MAX_HEIGHT) / 2) {
        viewHeight.value = withTiming(MAX_HEIGHT, { duration: 200 });
      } else {
        viewHeight.value = withTiming(MIN_HEIGHT, { duration: 200 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: (viewHeight.value - MIN_HEIGHT) / (MAX_HEIGHT - MIN_HEIGHT),
    height: viewHeight.value,
  }));
  const weekAnimatedStyle = useAnimatedStyle(() => ({
    opacity: 1 - (viewHeight.value - MIN_HEIGHT) / (MAX_HEIGHT - MIN_HEIGHT),
  }))

  return (
    <View style={styles.container}>
      <CalendarHeader
        currentDay={viewType === "MONTH" ? currentMonth : currentWeek}
        onPressPrev={handleClickPrevious}
        onPressNext={handleClickNext}
      />
      <View style={styles.calendarContainer}>
        <WeekDayHeader />
        <GestureDetector gesture={gesture}>
          <View style={{
            position: 'relative',
          }}>
            <Animated.View style={[animatedStyle]}>
              <CalendarMonthGridView
                selectedDay={selectedDay}
                monthDays={monthDays}
                handleDayPress={handleDayPress} />
            </Animated.View>
          <Animated.View style={[weekAnimatedStyle, {
              position: 'absolute', // 다른 컴포넌트 위에 덮음
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }]}>
              <CalendarWeekView
                weekDays={weekDays}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}/>
            </Animated.View>
          </View>
        </GestureDetector>
      </View>
      <Divider style={{ marginTop: 10 }} />
    </View>
  );
};

export default Calendar;
