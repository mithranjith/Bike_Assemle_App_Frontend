import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UsersList from "./UsersList";
import Layout from "@/components/Layout";
import { GetUsers } from "@/services/api.service";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(-1);

  useEffect(() => {
    getUsers();
  }, [page, search, sort]);
  const onPageChange = (page: number) => {
    setPage(page);
  };

  const getUsers = async () => {
    let body = {
      page: page,
      search: search,
      sort: {
        createdAt: sort,
      },
    };
    setLoading(true);
    let result;
    try {
      result = await GetUsers(body);
    } catch (e) {
      setLoading(false);

      return console.log(e);
    }
    if (result.success) {
      setLoading(false);
      setTotalPages(result.user.totalPages);
      setUsers(result.user.docs);
    }
  };

  return (
    <Layout title_1="Users List" hideRightSidebar>
      <div className="px-10 pt-0 w-full  md:p-2 md:pt-0 mb-5">
        <UsersList
          users={users}
          loading={loading}
          totalPages={totalPages}
          setPage={onPageChange}
          page={page}
          search={search}
          setSearch={(search) => setSearch(search)}
          setSort={(sort) => setSort(sort)}
        />
      </div>
    </Layout>
  );
};

export default Users;
