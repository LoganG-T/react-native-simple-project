import {Text, View} from "react-native";
import {Card} from "@/components/ui/Card";
import {FC} from "react";

export interface PostCardProps {
    title?: string;
    body?: string;
    displayName?: string;
}

export const PostCard: FC<PostCardProps> = ({title, body, displayName}) => {
    return (
        <Card>
            <View>
                <Text>
                    {title}
                </Text>
                <Text>
                    {body}
                </Text>
                <Text>
                    {displayName}
                </Text>
            </View>
        </Card>
    )
}