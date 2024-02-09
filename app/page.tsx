import dynamic from "next/dynamic";

const Chat = dynamic(() => import("@/components/Chat"), {
  ssr: false,
});

export default async function Page() {
  const accessToken = process.env.HUME_API_KEY;

  if (!accessToken) {
    console.error("HUME_API_KEY is not set in environment variables");
    return <div>Error: Access token not available. Please check your configuration.</div>;
  }

  return (
    <div className={"grow flex flex-col"}>
      <Chat accessToken={accessToken} />
    </div>
  );
}
