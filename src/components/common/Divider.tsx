import { colors } from "@/styles/colors";
import { FC, memo } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface Props {
  height?: number;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}

const Divider: FC<Props> = ({height = 1, backgroundColor=colors.grayscale[800], style}) => {
  return (
    <View
      style={[
        {
          height,
          backgroundColor
        },
        style,
      ]}/>
  );
};

export default memo(Divider);