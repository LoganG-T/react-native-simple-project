import {View, ViewStyle} from "react-native"
import {FC, ReactElement} from "react";
import {useThemeColor} from "@/hooks/use-theme-color";
import {Colors} from "@/constants/theme";

interface CardProps {
    children: ReactElement
}

export const Card: FC<CardProps> = ({children}) => {
    const backgroundColour = useThemeColor({
        light: Colors.light.background,
        dark: Colors.dark.background
    }, 'background');

    return (
        <View style={{margin: 10}}>
            <View style={{backgroundColor: backgroundColour, ...styles}}>
                {children}
            </View>
        </View>
    )
}

const styles: ViewStyle = {
    borderRadius: 25,
    borderColor: "#6a6c8380",
    shadowColor: "#00000054",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,

    elevation: 6,

    padding: 25
}