import { Card } from "@/components/ui/Card";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

export interface CommentCardProps {
  name?: string;
  email?: string;
  body?: string;
}

export const CommentCard: FC<CommentCardProps> = ({ name, email, body }) => {
  return (
    <Card>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
        <Text>{body}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  name: {
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  email: {
    textAlign: "center",
  },
});
