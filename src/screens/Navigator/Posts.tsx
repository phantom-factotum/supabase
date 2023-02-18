import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import { TabsParamList } from ".";
import { Post } from "../../../types";
import PostItem from "../../components/PostItem";
import { SessionContext } from "../../Context";
import { supabase } from "../../initSupabase";
const { height } = Dimensions.get("screen");
const totalPostsToGet = 2;

type Props = BottomTabScreenProps<TabsParamList, "Posts">;

export default function PostScreen(props: Props) {
  const { session } = useContext(SessionContext);
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [visibleItems, setVisibleItems] = useState([]);
  const viewabilityConfig = useRef({
    // minimumViewTime: 100,
    itemVisiblePercentThreshold: 50,
  }).current;
  // wrapped in useCallback so that re-renders doesnt recreate it
  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    setVisibleItems(viewableItems.map(({ item }) => item));
  }, []);
  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (!session) return;
    const fetchLastPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at")
        .range(0, 1);
      return data[0];
    };
    const fetchPosts = async () => {
      setIsLoading(true);
      const lastPost = await fetchLastPost();
      console.log("last post", lastPost);
      const rangeStart = (page - 1) * totalPostsToGet;
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false })
        .range(rangeStart, rangeStart + totalPostsToGet - 1);
      if (error) {
        console.log("error retrieving profile data", error);
      }
      if (data) {
        setPosts((prev) => prev.concat(data));
        // I couldnt figure out how PAGE_SIZE could be used to know that the last post was reached
        // so I just grab the  last post and look to see if its id is in current data
        const hasLastPost = Boolean(
          data.find((post) => post.id == lastPost.id)
        );
        setHasMore(!hasLastPost);
      }
      setIsLoading(false);
    };
    fetchPosts();
    // subscribe to database changes
    const subscription = supabase
      .channel(`Posts`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "posts",
          // filter: `id=eq.${session.user.id}`,
        },
        (payload) => {
          setIsLoading(true);
          console.log("Post update");
          setPosts((prev) => {
            // either push new post or update existing one
            const postIndex = prev.findIndex(
              (post) => post.id == payload.new.id
            );
            if (postIndex < 0) return [...prev, payload.new];
            else {
              const newPosts = [...prev];
              newPosts[postIndex] = payload.new;
              return newPosts;
            }
          });
          setIsLoading(false);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [session, page]);
  return (
    <View style={styles.container}>
      <Text>Currently visible:</Text>
      <View style={{ padding: 5, margin: 5 }}>
        {visibleItems.map((item) => (
          <Text style={{ textDecoration: "underline" }}>
            - {item.post.text.substring(0, 30)}
          </Text>
        ))}
      </View>

      <View style={styles.flatlistContainer}>
        {isLoading && <ActivityIndicator />}
        <FlatList
          data={posts}
          keyExtractor={(item: Post) => item.id}
          horizontal={false}
          directionalLockEnabled
          onEndReached={handleLoadMore}
          renderItem={(props) => <PostItem {...props} />}
          viewabilityConfig={viewabilityConfig}
          onViewableItemsChanged={onViewableItemsChanged}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlistContainer: {
    height: height * 0.45,
  },
});
