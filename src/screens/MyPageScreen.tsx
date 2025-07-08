import { FC } from 'react';
import { MainTabScreenProps } from './navigation';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const MyPageScreeen: FC<MainTabScreenProps<'MyPage'>> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>MyPage Screen</Text>
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

export default MyPageScreeen;
