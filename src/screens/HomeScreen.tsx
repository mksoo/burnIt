import { FC } from "react"
import { Text, View } from "react-native"
import { MainTabScreenProps, RootStackScreenProps } from "./navigation";

const HomeScreen: FC<MainTabScreenProps<'Home'>>= () => {
    return (
        <View style={{
            backgroundColor: 'red',
        }}>
            <Text>
                text
            </Text>
        </View>
    )
}

export default HomeScreen;