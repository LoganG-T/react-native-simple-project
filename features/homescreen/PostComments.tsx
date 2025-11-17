import { CommentCard } from "@/components/ui/CommentCard";
import { PostCard } from "@/components/ui/PostCard";
import { usePostCommentsQuery } from "@/hooks/usePostCommentsQuery";
import { postsQueryType } from "@/hooks/usePostsQuery";
import { FC } from "react";
import { Text, View } from "react-native";

export const PostComments: FC<{ post?: postsQueryType; username?: string }> = ({ post, username }) => {
  const { data, isLoading, isError } = usePostCommentsQuery(post?.id);
  if (isLoading) {
    return <Text>Display loading component</Text>;
  }
  if (isError) {
    return <Text>Display error layout</Text>;
  }
  if (post?.id !== undefined && data !== undefined) {
    return (
      <>
        {username && <PostCard key={post.id} displayName={username} body={post.body} title={post.title} />}
        {data.map((comment) => (
          <View key={comment.id} style={{ marginLeft: 20 }}>
            <CommentCard name={comment.name} email={comment.email} body={comment.body} />
          </View>
        ))}
      </>
    );
  }
  return <></>;
};
