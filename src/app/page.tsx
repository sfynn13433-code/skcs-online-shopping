import HomeClient from "./HomeClient";

export const revalidate = 3600;
export const dynamic = "force-static";

export default function Page() {
  return <HomeClient />;
}
