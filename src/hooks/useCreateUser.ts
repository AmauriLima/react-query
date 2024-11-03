import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sleep } from "../sleep";
import { IUser } from "../types";
import { GET_USERS_QUERY_KEY } from "./useUsers";

export function useCreateUser() {
  const queryCliente = useQueryClient();

  const { mutateAsync, isPending, } = useMutation({

    mutationFn: async ({ name, email }: { name: string, email: string; }): Promise<IUser> => {
      console.log('Executando mutationFn()')
      await sleep(1000);

      // throw new Error('Deu ruim na mutation');

      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ name, email }),
      });

      return response.json();
    },
    onError: (error, variables) => {
      console.log(`Error na request.\n${error.toString()}\nvariables: ${JSON.stringify(variables)}`);
    },
    onSuccess: (data, variables) => {
      console.log('onSucces:', { data, variables })
      queryCliente.invalidateQueries({
        queryKey: GET_USERS_QUERY_KEY,
      });
    },

  })

  return {
    createUser: mutateAsync,
    isPending
  };
}
