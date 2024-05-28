import { DynamicPageClient } from "./client";

const getData = async (num: any) => {
  const d = await (
    await fetch(`https://jsonplaceholder.typicode.com/users/${num}`, {
      next: {
        revalidate: 0,
        tags: [num],
      },
    })
  ).json();
  console.log("Generated data ", d);
  return {
    ...d,
    id: d?.username?.toLowerCase(),
  };
};

export const dynamicParams = true;

export async function generateStaticParams() {
  const nums = ["1", "2", "3"];
  return Promise.all(nums.map((num) => getData(num)));
}

const getThatData = async (id: any) => {
  const hey = [
    {
      id: "samantha",
    },
    {
      id: "bret",
    },
    {
      id: "antonette",
    },
    {
      id: "niko",
    },
  ];
  const found: any = hey.find((i) => i.id === id);

  return await new Promise((res) => {
    setTimeout(() => {
      res(found);
    }, 10);
  });
};

export default async function DynamicPage({ params }: any) {
  console.log("route path id ", params?.id);
  const bro: any = await getThatData(params?.id);
  console.log("Calling server function", bro);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DynamicPageClient {...(bro || {})} />
    </main>
  );
}
