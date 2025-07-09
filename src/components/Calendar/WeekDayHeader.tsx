import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

export const WeekDayHeader: React.FC = () => {
  return (
    <View style={styles.row}>
      {weekDays.map((day, index) => {
        const textStyle =
          index === 0
            ? styles.cellTextRed
            : index === 6
            ? styles.cellTextBlue
            : styles.cellText;
        return (
          <View key={`${day}-${index}`} style={styles.cell}>
            <Text style={textStyle}>{day}</Text>
          </View>
        );
      })}
    </View>
  );
};
