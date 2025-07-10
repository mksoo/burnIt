import React, { FC, useMemo } from 'react';
import { Dimensions, View } from 'react-native';
import { getMonthDays, getWeekDays, useCalendar } from '@/hooks/useCalendar';
import { CalendarHeader } from './CalendarHeader';
import { WeekDayHeader } from './WeekDayHeader';
import CalendarMonthGridView from './CalendarMonthGridView';
import { styles } from './styles';
import Divider from '../common/Divider';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import CalendarWeekView from './CalendarWeekView';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const SWIPE_LEFT_THRESHOLD = SCREEN_WIDTH * 0.2;
const SWIPE_RIGHT_THRESHOLD = SCREEN_WIDTH * 0.8;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.15;

const Calendar: FC = () => {
  const {
    weekDays,
    selectedDay,
    viewDay,
    monthDays,
    weekPositionRatio,
    handleDayPress,
    handleClickPrevious,
    handleClickNext,
    setViewType
  } = useCalendar();

  const MIN_HEIGHT = 50;
  const MAX_HEIGHT = 250;

  const viewHeight = useSharedValue(MAX_HEIGHT);
  const gestureStartHeight = useSharedValue(MAX_HEIGHT);

  const startX = useSharedValue(0);
  const translateX = useSharedValue(0);

  const movingMode = useSharedValue<'LEFT' | 'RIGHT' | null>(null);

  const gesture = Gesture.Pan()
    .onBegin(e => {
      gestureStartHeight.value = viewHeight.value;
      startX.value = e.absoluteX;
      translateX.value = 0;
    })
    .onStart(() => {
      if (startX.value < SWIPE_LEFT_THRESHOLD) {
        movingMode.value = 'LEFT'
      } else if (startX.value > SWIPE_RIGHT_THRESHOLD) {
        movingMode.value = 'RIGHT';
      }
    })
    .onUpdate((e) => {
      if (movingMode.value === 'LEFT') {
        // 왼 -> 오 스와이프
        translateX.value = Math.max(0, e.translationX);
      } else if (movingMode.value === 'RIGHT') {
        // 오 -> 왼 스와이프
        translateX.value = Math.min(0, e.translationX);
      } else {
        const newHeight = gestureStartHeight.value + e.translationY;
        viewHeight.value = Math.max(MIN_HEIGHT, Math.min(newHeight, MAX_HEIGHT));
      }
    })
    .onEnd((e) => {
      if (movingMode.value === 'LEFT') {
        if (translateX.value > SWIPE_THRESHOLD) {
          // 완전히 오른쪽으로 넘기는 애니메이션
          translateX.value = withTiming(SCREEN_WIDTH, { duration: 200 }, (finished) => {
            if (finished) {
              runOnJS(handleClickPrevious)();
              // 애니메이션 값 초기화
              translateX.value = 0;
            }
          });
        } else {
          // 원래 위치로 복귀
          translateX.value = withTiming(0, { duration: 200 });
        }
      } else if (movingMode.value === 'RIGHT') {
        if (translateX.value < -SWIPE_THRESHOLD) {
          // 완전히 왼쪽으로 넘기는 애니메이션
          translateX.value = withTiming(-SCREEN_WIDTH, { duration: 200 }, (finished) => {
            if (finished) {
              runOnJS(handleClickNext)();
              // 애니메이션 값 초기화
              translateX.value = 0;
            }
          });
        } else {
          // 원래 위치로 복귀
          translateX.value = withTiming(0, { duration: 200 });
        }
      } else {
        if (viewHeight.value > (MIN_HEIGHT + MAX_HEIGHT) / 2) {
          viewHeight.value = withTiming(MAX_HEIGHT, { duration: 200 });
          runOnJS(setViewType)('MONTH');
        } else {
          viewHeight.value = withTiming(MIN_HEIGHT, { duration: 200 });
          runOnJS(setViewType)('WEEK');
        }
      }
      movingMode.value = null;
    });
  
  const monthViewAnimatedStyle = useAnimatedStyle(() => ({
    opacity: (viewHeight.value - MIN_HEIGHT) / (MAX_HEIGHT - MIN_HEIGHT),
    height: viewHeight.value,
    transform: [{translateX: translateX.value}]
  }));

  const prevMonthViewAnimatedStyle = useAnimatedStyle(() => ({
    opacity: (viewHeight.value - MIN_HEIGHT) / (MAX_HEIGHT - MIN_HEIGHT),
    transform: [{translateX: translateX.value}],
    position: 'absolute',
    top: 0,
    left: -SCREEN_WIDTH,
    width: '100%'
  }));

  const nextMonthViewAnimatedStyle = useAnimatedStyle(() => ({
    opacity: (viewHeight.value - MIN_HEIGHT) / (MAX_HEIGHT - MIN_HEIGHT),
    transform: [{translateX: translateX.value}],
    position: 'absolute',
    top: 0,
    right: -SCREEN_WIDTH,
    width: '100%'
  }));

  const weekAnimatedStyle = useAnimatedStyle(() => {
    const oneToZero = 1 - (viewHeight.value - MIN_HEIGHT) / (MAX_HEIGHT - MIN_HEIGHT);
    const topRatio = 100 / 6 * weekPositionRatio;

    return {
      transform: [{translateX: translateX.value}],
      opacity: Math.ceil(oneToZero),
      top: `${topRatio - topRatio * oneToZero}%`,
      position: 'absolute',
      width: '100%',
    }
  });

  const prevWeekAnimatedStyle = useAnimatedStyle(() => {
    const oneToZero = 1 - (viewHeight.value - MIN_HEIGHT) / (MAX_HEIGHT - MIN_HEIGHT);
    const topRatio = 100 / 6 * weekPositionRatio;

    return {
      transform: [{translateX: translateX.value}],
      opacity: Math.ceil(oneToZero),
      top: `${topRatio - topRatio * oneToZero}%`,
      position: 'absolute',
      left: -SCREEN_WIDTH,
      width: '100%',
    }
  });

  const nextWeekAnimatedStyle = useAnimatedStyle(() => {
    const oneToZero = 1 - (viewHeight.value - MIN_HEIGHT) / (MAX_HEIGHT - MIN_HEIGHT);
    const topRatio = 100 / 6 * weekPositionRatio;

    return {
      transform: [{translateX: translateX.value}],
      opacity: Math.ceil(oneToZero),
      top: `${topRatio - topRatio * oneToZero}%`,
      position: 'absolute',
      right: -SCREEN_WIDTH,
      width: '100%',
    }
  });



  const prevMonthDays = useMemo(() => {
    return getMonthDays({viewDay: viewDay.subtract(1, 'month')});
  }, [viewDay]);

  const nextMonthDays = useMemo(() => {
    return getMonthDays({viewDay: viewDay.add(1, 'month')});
  }, [viewDay]);

  const prevWeekDays = useMemo(() => {
    return getWeekDays({viewDay: viewDay.subtract(1, 'week')});
  }, [viewDay]);

  const nextWeekDays = useMemo(() => {
    return getWeekDays({viewDay: viewDay.add(1, 'week')});
  }, [viewDay]);

  return (
    <View style={styles.container}>
      <CalendarHeader
        currentDay={viewDay}
        onPressPrev={handleClickPrevious}
        onPressNext={handleClickNext}
      />
      <View style={styles.calendarContainer}>
        <WeekDayHeader />
        <GestureDetector gesture={gesture}>
          <View style={{
            position: 'relative',
          }}>
            <Animated.View style={[monthViewAnimatedStyle]}>
              <CalendarMonthGridView
                selectedDay={selectedDay}
                monthDays={monthDays}
                handleDayPress={handleDayPress} />
            </Animated.View>
            <Animated.View style={prevMonthViewAnimatedStyle}>
              <CalendarMonthGridView
                selectedDay={selectedDay}
                monthDays={prevMonthDays}
                handleDayPress={handleDayPress} />
            </Animated.View>
            <Animated.View style={nextMonthViewAnimatedStyle}>
              <CalendarMonthGridView
                selectedDay={selectedDay}
                monthDays={nextMonthDays}
                handleDayPress={handleDayPress} />
            </Animated.View>
            <View style={{
              position: 'absolute', // 다른 컴포넌트 위에 덮음
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}>
              <Animated.View style={[weekAnimatedStyle]}>
                <CalendarWeekView
                  weekDays={weekDays}
                  selectedDay={selectedDay}
                  handleDayPress={handleDayPress} />
              </Animated.View>
              <Animated.View style={[prevWeekAnimatedStyle]}>
                <CalendarWeekView
                  weekDays={prevWeekDays}
                  selectedDay={selectedDay}
                  handleDayPress={handleDayPress} />
              </Animated.View>
              <Animated.View style={[nextWeekAnimatedStyle]}>
                <CalendarWeekView
                  weekDays={nextWeekDays}
                  selectedDay={selectedDay}
                  handleDayPress={handleDayPress} />
              </Animated.View>
            </View>
          </View>
        </GestureDetector>
      </View>
      <Divider style={{ marginTop: 10 }} />
    </View>
  );
};

export default Calendar;
