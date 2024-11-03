import { useCreateUser } from "./hooks/useCreateUser";
import { useUsers } from "./hooks/useUsers";

export function Users() {
  const { users, isLoading, refetch, isFetching, error: usersError } = useUsers();

  const { createUser, isPending } = useCreateUser();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const elements = event.currentTarget.elements as typeof event.currentTarget.elements & {
      name: HTMLInputElement;
      email: HTMLInputElement;
    }

    createUser({
      name: elements.name.value,
      email: elements.email.value,
    });
  };

  return (
    <div className="p-4">
      <div className="mb-10">
        <form action="" className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            className="outline-none p-1 rounded-md text-zinc-900"
            placeholder="Nome"
            name="name"

          />
          <input
            type="text"
            className="outline-none p-1 rounded-md text-zinc-900"
            placeholder="E-mail"
            name="email"
          />

          <button type="submit" className="bg-blue-400 py-2 text-zinc-950 rounded-md">
            {isPending ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
      </div>

      <button
        type="button"
        className="bg-white text-black px-4 py-2 rounded-lg"
        onClick={() => refetch()}
      >
        Listar usuários
      </button>

      {isLoading && <h1>Carregando...</h1>}
      {!isLoading && isFetching && <h1>Fetching...</h1>}
      {usersError && <h1 className="text-red-400">{usersError.message}</h1>}

      {users.map(user => (
        <div key={user.id}>
          <strong className="block" >{user.name}</strong>
          <small>{user.email}</small>
        </div>
      ))}
    </div>
  );
}
