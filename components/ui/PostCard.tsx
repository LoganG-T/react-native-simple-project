import { Card } from "@/components/ui/Card";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

export interface PostCardProps {
  title?: string;
  body?: string;
  displayName?: string;
  onPress?: () => void;
}

export const PostCard: FC<PostCardProps> = ({ title, body, displayName, onPress }) => {
  return (
    <Card onPress={onPress} accessibilityHint="Press to navigate to post comments">
      <View>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.displayName}>{displayName ?? "Anonymous"}</Text>
        <Text>{body}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  displayName: {
    textAlign: "center",
    marginVertical: 5,
  },
});
