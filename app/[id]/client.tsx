"use client";

import { atom, useAtom, useSetAtom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";

const idAtom = atom(1);
const userAtom = atomWithQuery((get) => ({
  queryKey: ["users", get(idAtom)],
  queryFn: async ({ queryKey: [, id] }) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    return res.json();
  },
}));

const UserData = () => {
  const [{ data, isPending, isError }] = useAtom(userAtom);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Errutor</div>;

  return <div>{JSON.stringify(data)}</div>;
};

export function DynamicPageClient(props: any) {
  const setSome = useSetAtom(idAtom);
  console.log("client component", { props });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UserData />
      <button onClick={() => setSome(Date.now())}>
        Add some data to my atom!
      </button>
    </main>
  );
}
