import { Colors, SharedStyles } from "@/constants/theme";
import { Pressable, StyleSheet, Text } from "react-native";

type TextStyle = "primary";

export const Button = ({
  title,
  onPress,
  selected,
  textStyle,
}: {
  title: string;
  textStyle: TextStyle;
  onPress?: () => void;
  selected?: boolean;
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles[`${textStyle}ButtonContainer`], selected && styles[`${textStyle}ButtonBorder`]]}
    >
      <Text style={selected ? styles[`${textStyle}ButtonUnderline`] : styles[`${textStyle}Button`]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  primaryButtonContainer: {
    backgroundColor: Colors.light.button.primary,
    borderRadius: 50,
    padding: 10,
    minWidth: 100,
    borderColor: "#00000000",
    borderWidth: 3,
  },
  primaryButtonBorder: {
    borderColor: "black",
    borderWidth: 3,
  },
  primaryButton: {
    ...SharedStyles.buttonText,
  },
  primaryButtonUnderline: {
    ...SharedStyles.buttonTextUnderline,
  },
});
