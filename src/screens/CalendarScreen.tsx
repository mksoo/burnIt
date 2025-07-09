import { FC } from 'react';
import { MainTabScreenProps } from './navigation';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Calendar from '@/components/Calendar';

const CalendarScreen: FC<MainTabScreenProps<'Calendar'>> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Calendar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CalendarScreen;
