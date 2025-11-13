import {useQuery} from "@tanstack/react-query";
import {axiosClient} from "@/constants/axiosClient";

type usersQueryType = {
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

export const useUsersQuery = () => useQuery<usersQueryType[]>({
    queryKey: ["users"], queryFn: async _ => {
        const result = await axiosClient().get("https://jsonplaceholder.typicode.com/users/1", {});
        await new Promise(res => setTimeout(() => res(true), 1500));
        return result.data;
    }
})