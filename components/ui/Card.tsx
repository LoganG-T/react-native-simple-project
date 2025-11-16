import { Colors } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { FC, ReactElement } from "react";
import { Pressable, View, ViewStyle } from "react-native";

interface CardProps {
  onPress?: () => void;
  children: ReactElement;
}

export const Card: FC<CardProps> = ({ onPress, children }) => {
  const backgroundColour = useThemeColor(
    {
      light: Colors.light.background,
      dark: Colors.dark.background,
    },
    "background"
  );

  return (
    <Pressable style={{ margin: 10 }} onPress={onPress}>
      <View style={{ backgroundColor: backgroundColour, ...styles }}>{children}</View>
    </Pressable>
  );
};

const styles: ViewStyle = {
  borderRadius: 25,
  borderWidth: 1,
  borderColor: "#6a6c8380",
  shadowColor: "#00000054",
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.5,
  shadowRadius: 4.65,

  elevation: 6,

  padding: 25,
};
