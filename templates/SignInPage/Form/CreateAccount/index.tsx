import { useState, useContext } from "react";
import Link from "next/link";
import Field from "@/components/Field";
import { CreateUser } from "src/services/api.service";
import Singin from "@/templates/SignInPage/Form/SignIn/index";
import { CreateUserWithEmailAndPassword } from "@/auth/firebaseAuth";
import { TiLockClosed } from "react-icons/ti";
import { FaLocationCrosshairs, FaPhoneVolume } from "react-icons/fa6";
import { ImCancelCircle, ImLocation2, ImSpinner9 } from "react-icons/im";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { RiUser3Fill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import Notify from "@/components/Notify";
// import { FaPhoneVolume } from "react-icons/fa";
import { AuthContext } from "@/context/auth-context";

type CreateAccountProps = {};

const CreateAccount = ({}: CreateAccountProps) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [zipcode, setZipcode] = useState<number | any>();
  const [phone, setPhone] = useState<number | any>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<any>();
  const [confirmpassword, setConfirmpassword] = useState<any>();
  const [createPage, setCreatePage] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);

  const handleCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!email) return setError("Email is required");
    if (password !== confirmpassword) {
      return setError("Passwords do not match.");
    }
    if (password.length < 8) {
      setError("Password should have at least 8 characters.");
      return;
    }
    setLoading(true);
    let user;
    await CreateUserWithEmailAndPassword(email, password)
      .then(async (userCredential: any) => {
        user = userCredential.user;
        register(userCredential.user);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);

        if (e.message.includes("auth/email-already-in-use"))
          return toast((t) => (
            <Notify className="!gap-3 !bg-red-500">
              <ImCancelCircle className="text-xl text-n-1" />
              <div>Email already exist</div>
            </Notify>
          ));
        else
          return toast((t) => (
            <Notify className="!gap-3 !bg-red-500">
              <ImCancelCircle className="text-xl text-n-1" />
              <div>Please contact support</div>
            </Notify>
          ));
      });
  };
  const register = async (user: any) => {
    let body = {
      email: email,
      company: company,
      firebaseId: user.uid,
    };
    let result;
    try {
      result = await CreateUser(body);
    } catch (e: any) {
      console.log(e);
      setLoading(false);
      return toast((t) => (
        <Notify className="!gap-3 !bg-red-500">
          <ImCancelCircle className="text-xl text-n-1" />
          <div>{e.message}</div>
        </Notify>
      ));
    }
    if (result.success) {
      setLoading(false);
      return authContext.setAuthState({
        user: result.user,
        token: user.accessToken,
      });
    }
  };
  return (
    <div>
      {createPage ? (
        <p className="text-center text-lg font-bold ">
          Successfully created account. Click above sign in.
        </p>
      ) : (
        <form action="" onSubmit={handleCreateAccount}>
          {/* <Field
            className="mb-4"
            classInput=" bg-transparent border-n-3/50 dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
            placeholder="First Name *"
            customIcon={<FaUserAlt className="text-xl" />}
            type="string"
            value={firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setError("");
              setFirstName(e.target.value);
            }}
            required
          /> */}
          {/* <Field
            className="mb-4"
            classInput=" bg-transparent border-n-3/50 dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
            placeholder="Last Name"
            type="string"
            customIcon={<FaUserAlt className="text-xl" />}
            value={lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setError("");
              setLastName(e.target.value);
            }}
          /> */}
          <Field
            className="mb-4"
            classInput=" bg-transparent border-n-3/50 dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
            placeholder="Email *"
            customIcon={<MdEmail className="text-2xl" />}
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setError("");
              setEmail(e.target.value);
            }}
            required
          />
          <Field
            className="mb-4"
            classInput=" bg-transparent border-n-3/50 dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
            placeholder="Company"
            customIcon={<HiOutlineOfficeBuilding className="text-2xl" />}
            type="string"
            value={company}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setError("");
              setCompany(e.target.value);
            }}
          />
          {/* <Field
            className="mb-4"
            classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
            placeholder="Zipcode"
            customIcon={<FaLocationCrosshairs className="text-xl" />}
            type="number"
            value={zipcode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setError("");
              setZipcode(e.target.value);
            }}
          /> */}
          {/* <Field
            className="mb-4"
            classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
            placeholder="Phone Number *"
            customIcon={<FaPhoneVolume className="text-xl" />}
            type="number"
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setError("");
              setPhone(e.target.value);
            }}
            required
          /> */}
          <Field
            className="mb-6"
            classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
            placeholder="Password *"
            customIcon={<TiLockClosed className="text-2xl" />}
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setError("");
              setPassword(e.target.value);
            }}
            required
          />
          <Field
            className="mb-6"
            classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
            placeholder="Confirm Password *"
            customIcon={<TiLockClosed className="text-2xl" />}
            type="password"
            value={confirmpassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setError("");
              setConfirmpassword(e.target.value);
            }}
            required
          />
          {error && <p className="text-red-500 mb-3">{error}</p>}
          <button
            className="btn bg-primary-1 border-0 btn-large w-full mb-6"
            type="submit"
          >
            {loading && (
              <ImSpinner9
                className="animate-spin h-5 w-5 ml-2 text-n-1 fill-n-1"
                style={{ fill: "white" }}
              />
            )}
            Create Account
          </button>
          <div className="text-center caption1 text-n-4">
            By creating an account, you agree to our{" "}
            <Link
              className="text-n-5 transition-colors hover:text-n-7 dark:text-n-3 dark:hover:text-n-1"
              href="/"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              className="text-n-5 transition-colors hover:text-n-7 dark:text-n-3 dark:hover:text-n-1"
              href="/"
            >
              Privacy & Cookie Statement
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateAccount;
