import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { Button } from "@/components/ui/Button";
import { PostCard } from "@/components/ui/PostCard";
import { UserCard } from "@/components/ui/UserCard";
import { PostComments } from "@/features/homescreen/PostComments";
import { postsQueryType, usePostsQuery } from "@/hooks/usePostsQuery";
import { useUsersQuery } from "@/hooks/useUsersQuery";
import { useEffect, useState } from "react";

enum DisplayContent {
  Users,
  Posts,
  Comments,
}

export default function HomeScreen() {
  const [selectedDisplayContent, setSelectedDisplayContent] = useState<DisplayContent>(DisplayContent.Users);
  const [userMap, setUserMap] = useState<{ [userId: number]: string }>({});
  const [selectedPost, setSelectedPost] = useState<undefined | postsQueryType>(undefined);
  const exampleQuery = useUsersQuery();
  const { data: postData, isLoading: postIsLoading, isError: postIsError } = usePostsQuery();

  useEffect(() => {
    if (exampleQuery.data === undefined) {
      return;
    }
    const newUsers: { [userId: number]: string } = {};
    exampleQuery.data?.map((user) => {
      newUsers[user.id] = user.name;
    });
    setUserMap(newUsers);
  }, [exampleQuery.data]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={
            "https://northernlifemagazine.co.uk/wp-content/uploads/bb-plugin/cache/Skipton-8-landscape-b4f757e8377bd79fcfa6f906475908bf-bnfey68k2qgz.jpg"
          }
          style={styles.reactLogo}
        />
      }
    >
      <View style={styles.row}>
        <Button
          onPress={() => {
            setSelectedDisplayContent(DisplayContent.Users);
          }}
          title="Users"
          textStyle={"primary"}
          selected={selectedDisplayContent === DisplayContent.Users}
        />
        <Button
          onPress={() => {
            setSelectedDisplayContent(DisplayContent.Posts);
          }}
          title="Posts"
          textStyle={"primary"}
          selected={selectedDisplayContent === DisplayContent.Posts}
        />
      </View>

      {selectedDisplayContent === DisplayContent.Users ? (
        exampleQuery.isLoading ? (
          <Text>Display loading component</Text>
        ) : exampleQuery.isError || exampleQuery.data === undefined ? (
          <>
            <Text>Handle error</Text>
          </>
        ) : (
          exampleQuery.data.map((user) => {
            return (
              <UserCard
                key={user.name}
                name={user.name}
                email={user.email}
                address={user.address}
                phoneNumber={user.phone}
                website={user.website}
                company={user.company}
              />
            );
          })
        )
      ) : (
        <></>
      )}

      {selectedDisplayContent === DisplayContent.Posts ? (
        postIsLoading ? (
          <Text>Display loading component</Text>
        ) : postIsError || postData === undefined ? (
          <>
            <Text>Handle error</Text>
          </>
        ) : (
          postData.map((post) => {
            return (
              <PostCard
                key={post.id}
                displayName={userMap?.[post.userId]}
                body={post.body}
                title={post.title}
                onPress={() => {
                  setSelectedDisplayContent(DisplayContent.Comments);
                  setSelectedPost(post);
                }}
              />
            );
          })
        )
      ) : (
        <></>
      )}

      {selectedDisplayContent === DisplayContent.Comments && selectedPost !== undefined && (
        <PostComments post={selectedPost} username={userMap?.[selectedPost.userId]} />
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
});
