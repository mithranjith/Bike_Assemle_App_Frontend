import Link from "next/link";
import Image from "@/components/Image";
import { BiSolidUserCircle } from "react-icons/bi";

type ProfileProps = {
  visible?: boolean;
  user: any;
};

const Profile = ({ visible, user }: ProfileProps) => (
  <div
    className={`${
      visible ? "mb-6" : "mb-3 shadow-[0_1.25rem_1.5rem_0_rgba(0,0,0,0.5)]"
    }`}
  >
    <div className={`${!visible && "p-2.5 bg-n-6 rounded-xl"}`}>
      <div
        className={`flex items-center ${
          visible ? "justify-center" : "px-2.5 py-2.5 pb-4.5"
        }`}
      >
        <div className="relative w-10 h-10">
          {user.profileUrl ? (
            <Image
              className="rounded-full object-cover"
              src={user.profileUrl}
              fill
              alt="Avatar"
            />
          ) : (
            <BiSolidUserCircle className="text-gray-500" size={40} />
          )}
          <div className="absolute -right-0.75 -bottom-0.75 w-4.5 h-4.5 bg-primary-1 rounded-full border-4 border-n-6"></div>
        </div>
        {!visible && (
          <>
            <div className="ml-2 mr-2">
              <div className="base2 tracking-wide font-semibold text-n-1">
                {user.firstName} {user.lastName}
              </div>
              <div className="caption1 tracking-wider font-semibold text-n-8/50">
                {user.email}
              </div>
            </div>
            {!visible && !user.admin && (
              <div className="shrnik-0 ml-auto self-start px-3 bg-primary-1 rounded-lg caption1 font-bold  text-black">
                Free
              </div>
            )}
          </>
        )}
      </div>
      {!visible && !user.admin && (
        <Link className="btn-stroke-dark w-full mt-2" href="/pricing">
          Upgrade
        </Link>
      )}
    </div>
  </div>
);

export default Profile;
