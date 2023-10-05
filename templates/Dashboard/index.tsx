import Layout from "@/components/Layout";
import Main from "./Layout";
import { ClassNames } from "@emotion/react";
import { useRouter } from "next/router"; 
const Dashboard = () => {
  const router = useRouter();
  const title = "Dashboard";

  return (
    <Layout title={title} hideRightSidebar>
      <Main />
    </Layout>
  );
};

export default Dashboard;
