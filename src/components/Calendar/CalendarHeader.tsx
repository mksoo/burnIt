import { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import dayjs from 'dayjs';
import SvgIcon from '../common/SvgIcon';

const months = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
];

interface CalendarHeaderProps {
  currentDay: dayjs.Dayjs;
  onPressPrev: () => void;
  onPressNext: () => void;
}

export const CalendarHeader: FC<CalendarHeaderProps> = ({
  currentDay,
  onPressPrev,
  onPressNext,
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={{ flexDirection: 'row' }} onPress={onPressPrev}>
        <SvgIcon name="chevron-left" />
        <Text style={styles.monthLabel}>Prev</Text>
      </TouchableOpacity>
      <Text style={styles.monthLabel}>
        {`${currentDay.year()}. ${months[currentDay.month()]}`}
      </Text>
      <TouchableOpacity style={{ flexDirection: 'row' }} onPress={onPressNext}>
        <Text style={styles.monthLabel}>Next</Text>
        <SvgIcon name="chevron-right" />
      </TouchableOpacity>
    </View>
  );
};
