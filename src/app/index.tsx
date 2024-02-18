import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

type Repo = {
  name: string;
  stargazers_count: number;
};

export const getServerSideProps = (async () => {
  // Fetch data from external API
  const res = await fetch(
    "http://ec2-43-201-27-22.ap-northeast-2.compute.amazonaws.com:3000/auth/recruiter/refresh"
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
