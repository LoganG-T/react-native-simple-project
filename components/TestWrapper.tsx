import {DefaultTheme, ThemeProvider} from "@react-navigation/native";
import {FC, ReactElement} from "react";

export const TestWrapper: FC<{ children: ReactElement }> = ({children}) => {

    return (
        <ThemeProvider value={DefaultTheme}>
            {children}
        </ThemeProvider>
    )
}