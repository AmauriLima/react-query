import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { sleep } from "./sleep";
import { IUser } from "./types";

export function Posts() {
  const queryClient = useQueryClient();

  function handleMouseEnter() {
    queryClient.prefetchQuery({
      queryKey: ['users'],
      queryFn: async (): Promise<IUser[]> => {
        const response = await fetch('http://localhost:3000/users')
        await sleep(500);
        return response.json();
      },
    })
  }

  return (
    <pre>
      Posts

      <br /><br />
      <Link to="/" onMouseEnter={handleMouseEnter}>
        Ir para os usuários
      </Link>
    </pre>
  )
}
