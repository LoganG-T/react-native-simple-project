import {PostCard, PostCardProps} from "@/components/ui/PostCard";
import {render} from "@testing-library/react-native";
import {TestWrapper} from "@/components/TestWrapper";

const renderer = (props: PostCardProps) => {
    return render(<PostCard {...props}/>, {wrapper: TestWrapper})
}

describe("Component: PostCard", () => {

    it("Should display the posts title", () => {
        const {getByText} = renderer({title: "Title"})

        getByText("Title")
    })

    it("Should display the posts body", () => {
        const {getByText} = renderer({body: "Body"})

        getByText("Body")
    })

    it("Should display the name of the user", () => {
        const {getByText} = renderer({displayName: "Display"})

        getByText("Display")
    })
})