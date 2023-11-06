import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import DashboardLayout from "../../../../Layouts/DashboardLayout";

const NoSSRComponent = dynamic(
  () => import("../../../../Components/auth/confirm"),
  {
    ssr: false,
  }
);

function ConfirmAccount(props: any) {
  const router = useRouter();

  const { query } = router;

  console.log(query);

  return (
    <DashboardLayout>
      <NoSSRComponent userId={query.id} />;
    </DashboardLayout>
  );
}

export default ConfirmAccount;
