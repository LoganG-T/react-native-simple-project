import {render} from "@testing-library/react-native";

import HomeScreen from '@/app/(tabs)/index'
import {renderRouter} from "expo-router/testing-library";

const renderHomeScreen = () => {
    // const screen = render(<HomeScreen />)
    const screen = renderRouter({
        index: jest.fn(() => <HomeScreen />)
    })
    return screen;
}

describe("index", ()=>{
    it("Should render the welcome text", ()=>{
        const { getByText } = renderHomeScreen()

        getByText("Welcome!");
    })
})