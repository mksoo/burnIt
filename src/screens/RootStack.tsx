import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";
import { RootStackParamList } from "./navigation";
import MainTab from "./MainTab";
import HomeScreen from "./HomeScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack: FC = () => {
  return <Stack.Navigator initialRouteName="Home">
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
}

export default RootStack;