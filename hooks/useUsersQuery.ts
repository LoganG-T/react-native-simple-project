import { axiosClient } from "@/constants/axiosClient";
import { useQuery } from "@tanstack/react-query";

type usersQueryType = {
  id: number;
  name: string;
  email: string;
  address: {
    street?: string;
    suite?: string;
    city?: string;
    zipcode?: string;
    geo?: {
      lat: number;
      lng: number;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchphrase: string;
    bs: string;
  };
};

export const useUsersQuery = () =>
  useQuery<usersQueryType[]>({
    queryKey: ["users"],
    queryFn: async (_) => {
      try {
        const result = await axiosClient().get("https://jsonplaceholder.typicode.com/users", {});
        await new Promise((res) => setTimeout(() => res(true), 1500));
        return result.data;
      } catch (e) {
        console.log(e);
      }
    },
  });
