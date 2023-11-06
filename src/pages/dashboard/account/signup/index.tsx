import * as React from "react";
import { Register } from "../../../../Components/auth";
import DashboardLayout from "../../../../Layouts/DashboardLayout";
import { SignUp } from "../../../../Components/auth/signup";

export default function Auth() {
  return (
    <DashboardLayout>
      <div className="flex w-full h-full my-8 items-center justify-center ">
        <SignUp />
      </div>
    </DashboardLayout>
  );
}
