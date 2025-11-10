import {Card} from "@/components/ui/Card";
import {Text, View} from "react-native";
import {FC} from "react";

export interface CommentCardProps {
    name?: string;
    email?: string;
    body?: string;
}

export const CommentCard: FC<CommentCardProps> = ({name, email, body}) => {
    return (
        <Card>
            <View>
                <Text>
                    {name}
                </Text>
                <Text>
                    {email}
                </Text>
                <Text>
                    {body}
                </Text>
            </View>
        </Card>
    )
}