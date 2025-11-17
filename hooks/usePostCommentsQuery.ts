import { axiosClient } from "@/constants/axiosClient";
import { useQuery } from "@tanstack/react-query";

type commentsQueryType = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export const usePostCommentsQuery = (postId?: number) =>
  useQuery<commentsQueryType[]>({
    queryKey: [`post_${postId}_comments`],
    queryFn: async (_) => {
      const result = await axiosClient().get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, {});
      await new Promise((res) => setTimeout(() => res(true), 800));
      return result.data;
    },
  });
