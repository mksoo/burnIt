import { FC } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { MainTabScreenProps, RootStackScreenProps } from './navigation';

const HomeScreen: FC<MainTabScreenProps<'Home'>> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Home text</Text>
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

export default HomeScreen;
