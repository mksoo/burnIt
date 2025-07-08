import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";
import { RootStackParamList } from "./navigation";
import MainTab from "./MainTab";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack: FC = () => {
  return <Stack.Navigator initialRouteName="MainTab">
    <Stack.Screen
      name="MainTab"
      component={MainTab}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
}

export default RootStack;