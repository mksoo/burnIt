import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { FC, useCallback } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MainTabParamList } from './navigation';
import HomeScreen from './HomeScreen';
import CalendarScreen from './CalendarScreen';
import LibraryScreen from './LibraryScreen';
import MyPageScreeen from './MyPageScreen';
import SvgIcon from '../components/common/SvgIcon';
import { colors } from '@/styles/colors';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TabBar: FC<BottomTabBarProps> = ({ state, navigation }) => {
  const handlePressNavigate = useCallback(
    (name: keyof MainTabParamList, onPress?: () => void) => () => {
      onPress?.();
      navigation.navigate(name);
    },
    [navigation],
  );

  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const name = route.name as keyof MainTabParamList;

        const isFocused = state.index === index;

        if (name === 'Home') {
          return (
            <TouchableOpacity
              style={[styles.tabBarItem]}
              key={`home-${isFocused}`}
              onPress={handlePressNavigate(name)}
            >
              <SvgIcon
                name="home"
                color={
                  isFocused ? colors.grayscale[100] : colors.grayscale[500]
                }
              />
              <Text
                style={{
                  color: isFocused
                    ? colors.grayscale[100]
                    : colors.grayscale[500],
                }}
              >
                Home
              </Text>
            </TouchableOpacity>
          );
        }

        if (name === 'Calendar') {
          return (
            <TouchableOpacity
              style={[styles.tabBarItem]}
              key={`calendar-${isFocused}`}
              onPress={handlePressNavigate(name)}
            >
              <SvgIcon
                name="calendar"
                color={
                  isFocused ? colors.grayscale[100] : colors.grayscale[500]
                }
              />
              <Text
                style={{
                  color: isFocused
                    ? colors.grayscale[100]
                    : colors.grayscale[500],
                }}
              >
                Calendar
              </Text>
            </TouchableOpacity>
          );
        }

        if (name === 'Library') {
          return (
            <TouchableOpacity
              style={[styles.tabBarItem]}
              key={`library-${isFocused}`}
              onPress={handlePressNavigate(name)}
            >
              <SvgIcon
                name="library"
                color={
                  isFocused ? colors.grayscale[100] : colors.grayscale[500]
                }
              />
              <Text
                style={{
                  color: isFocused
                    ? colors.grayscale[100]
                    : colors.grayscale[500],
                }}
              >
                Library
              </Text>
            </TouchableOpacity>
          );
        }

        if (name === 'MyPage') {
          return (
            <TouchableOpacity
              style={[styles.tabBarItem]}
              key={`mypage-${isFocused}`}
              onPress={handlePressNavigate(name)}
            >
              <SvgIcon
                name="profile"
                color={
                  isFocused ? colors.grayscale[100] : colors.grayscale[900]
                }
              />
              <Text
                style={{
                  color: isFocused
                    ? colors.grayscale[100]
                    : colors.grayscale[500],
                }}
              >
                MyPage
              </Text>
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
};

const MainTab: FC = () => {
  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <TabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="MyPage" component={MyPageScreeen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    paddingTop: 16,
    paddingBottom: Platform.OS === 'android' ? 16 : 36,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabBarItem: {
    alignItems: 'center',
    gap: 2,
    flex: 1,
  },
});

export default MainTab;
