import Link from "next/link";
import Image from "@/components/Image";
import { useRouter } from "next/router";
// import Aiicon from "../../public/images/AI Icons.png"
// import Aiicondark from "../../public/images/dark Ai icon.png"
type TestProps = {
  className?: string;
  dark?: boolean;
};
const Test = ({ className, dark }: TestProps) => {
  const router = useRouter();

  return (
    <Link
      className={`flex w-[11.88rem] justify-center gap-2 ${className}`}
      href="/"
    >
      <div
        className="h4 text-n-9 dark:text-n-1 leading-[4rem] 2xl:mb-2 2xl:h4 Inria Sans text-2xl"
        style={dark ? { color: "black" } : { color: "white" }}
      >
        Assemblers
      </div>
    </Link>
  );
};

export default Test;
