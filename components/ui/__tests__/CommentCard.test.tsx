import {render} from "@testing-library/react-native";
import {TestWrapper} from "@/components/TestWrapper";
import {CommentCard, CommentCardProps} from "../CommentCard";

const renderer = (props: CommentCardProps) => {
    return render(<CommentCard {...props}/>, {wrapper: TestWrapper})
}

describe("Component: CommentCard", () => {

    it("Should display the comment name", () => {
        const {getByText} = renderer({name: "User name"})

        getByText("User name")
    })

    it("Should display the email address for the comment", () => {
        const {getByText} = renderer({email: "Email"})

        getByText("Email")
    })

    it("Should display the comment body text", () => {
        const {getByText} = renderer({body: "Content"})

        getByText("Content")
    })

})