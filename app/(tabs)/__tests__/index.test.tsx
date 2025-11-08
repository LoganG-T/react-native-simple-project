import HomeScreen from '@/app/(tabs)'
import {renderRouter} from "expo-router/testing-library";

const renderHomeScreen = () => {
    // const screen = render(<HomeScreen />)
    const screen = renderRouter({
        index: jest.fn(() => <HomeScreen/>)
    })
    return screen;
}

describe("Screen: HomeScreen", () => {
    it("Should render the welcome text", () => {
        const {getByText} = renderHomeScreen()

        getByText("Welcome!");
    })
})