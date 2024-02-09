import dynamic from "next/dynamic";
import { getHumeAccessToken } from "@/utils/getHumeAccessToken";

const Chat = dynamic(() => import("@/components/Chat"), {
  ssr: false,
});

export default async function Page() {
  const accessToken = await getHumeAccessToken();

  if (!accessToken) {
    console.error("Failed to retrieve Hume access token");
    return <div>Error: Access token not available. Please check your configuration.</div>;
  }

  return (
    <div className={"grow flex flex-col"}>
      <Chat accessToken={accessToken} />
    </div>
  );
}
