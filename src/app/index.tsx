import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { Suspense } from "react";

type Repo = {
  name: string;
  stargazers_count: number;
};

export const getServerSideProps = (async () => {
  // Fetch data from external API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/auth/recruiter/refresh`
  );
  const repo: Repo = await res.json();
  // Pass data to the page via props
  return { props: { repo } };
}) satisfies GetServerSideProps<{ repo: Repo }>;

export default function Page({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main>
      <p>{repo.stargazers_count}</p>
    </main>
  );
}
