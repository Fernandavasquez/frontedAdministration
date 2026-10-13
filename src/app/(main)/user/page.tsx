import findAll from "@/actions/user/findAll";
import PageClient from "./page.client";

import { ReadonlyURLSearchParams } from "next/navigation";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: Props) {
 const resolvedSearchParams = await searchParams;
 
const params = new URLSearchParams(resolvedSearchParams as Record<string, string>);
  const response = await findAll(
    {searchParams: params}
  );


  if (response.status !== 200 || !("data" in response)) {
    throw new Error("Failed to fetch user data");
  }

  return <PageClient users={response.data} pagination={response.meta}/>;
}
