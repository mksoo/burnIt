import { FC } from 'react';
import { MainTabScreenProps } from './navigation';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const CalendarScreen: FC<MainTabScreenProps<'Calendar'>> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Calendar Screen</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CalendarScreen;
