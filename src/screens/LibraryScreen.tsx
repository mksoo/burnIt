import { FC } from 'react';
import { MainTabScreenProps } from './navigation';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const LibraryScreen: FC<MainTabScreenProps<'Library'>> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Library Screen</Text>
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

export default LibraryScreen;
