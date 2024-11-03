import { useQuery } from "@tanstack/react-query";
import { sleep } from "../sleep";
import { IUser } from "../types";

export const GET_USERS_QUERY_KEY = ['users'];

export function useUsers() {
  const { data, isLoading, refetch, isFetching, error } = useQuery({
    enabled: true,
    queryKey: GET_USERS_QUERY_KEY,
    queryFn: async (): Promise<IUser[]> => {
      const response = await fetch('http://localhost:3000/users')
      await sleep(500);
      return response.json();
    },
  });

  return { users: data ?? [], isLoading, refetch, isFetching, error };
}
