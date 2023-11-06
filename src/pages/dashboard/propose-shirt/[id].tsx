import dynamic from "next/dynamic";
import withAuth from "../../../helpers/withAuth";
import { useRouter } from "next/router";
import DashboardLayout from "../../../Layouts/DashboardLayout";

const NoSSRComponent = dynamic(() => import("../../../Components/canvas"), {
  ssr: false,
});

function CanvasPage(props: any) {
  const router = useRouter();

  const { query } = router;

  console.log(query);

  return (
    <DashboardLayout>
      <NoSSRComponent nftId={query.token} tokenId={query.id} />
    </DashboardLayout>
  );
}

export default CanvasPage;
