import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (req: any) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  await revalidatePath(`/${id}`);

  console.log("revalidated ", id);
  return NextResponse.json({ id });
};
