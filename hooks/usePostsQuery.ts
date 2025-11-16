import { axiosClient } from "@/constants/axiosClient";
import { useQuery } from "@tanstack/react-query";

export type postsQueryType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const usePostsQuery = () =>
  useQuery<postsQueryType[]>({
    queryKey: ["posts"],
    queryFn: async (_) => {
      const result = await axiosClient().get("https://jsonplaceholder.typicode.com/posts", {});
      await new Promise((res) => setTimeout(() => res(true), 1000));
      return result.data;
    },
  });
