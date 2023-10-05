import Layout from "@/components/Layout";
import AdminMain from "./Layout";
import { ClassNames } from "@emotion/react";
import { useRouter } from "next/router"; 
const AdminDashboard = () => {
  const router = useRouter();
  const title = "Admin Dashboard";

  return (
    <Layout title_1={title} hideRightSidebar>
      <AdminMain />
    </Layout>
  );
};

export default AdminDashboard;
