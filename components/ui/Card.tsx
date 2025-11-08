import {View} from "react-native"
import {FC, ReactElement} from "react";

interface CardProps {
    children: ReactElement
}

export const Card: FC<CardProps> = ({children}) => {

    return (
        <View>
            {children}
        </View>
    )
}