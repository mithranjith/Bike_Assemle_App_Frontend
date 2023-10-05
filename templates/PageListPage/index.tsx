import Link from "next/link";

const items = [
  {
    title: "Dashboard",
    url: "/",
  },
  {
    title: "AdminDashboard",
    url: "/admin/dashboard",
  },
];

const PageListPage = () => {
  return (
    <div className="flex flex-col items-start px-12 py-8 text-xl">
      {items.map((item, index) => (
        <Link
          className="text-n-1 transition-colors hover:text-primary-1 md:text-n-7 dark:text-n-1"
          href={item.url}
          key={index}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default PageListPage;
