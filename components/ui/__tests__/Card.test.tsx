import {render} from "@testing-library/react-native";
import {Card} from "@/components/ui/Card";
import {TestWrapper} from "@/components/ui/__tests__/TestWrapper";
import {Text} from "react-native";

const renderer = () => render(<Card><Text>Text</Text></Card>, {wrapper: TestWrapper});


describe("Component: Card", () => {

    it("Should match snapshot styles", () => {
        const component = renderer();

        expect(component.toJSON()).toMatchSnapshot();
    })

    it("Should display child components", () => {
        const {getByText} = renderer();

        getByText("Text");
    })
})