import { FC } from "react"
import { Text, View } from "react-native"
import { RootStackScreenProps } from "./navigation";

const HomeScreen: FC<RootStackScreenProps<'Home'>>= () => {
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