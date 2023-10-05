import { useState, useContext, useEffect } from "react";
import { Signin, GetBikes } from "src/services/api.service";
import Field from "@/components/Field";
import Layout from "@/components/Layout";
import Main from "@/components/Layout";
import Router from "next/router";
import { LoginWithEmailAndPassword } from "@/auth/firebaseAuth";
import { ImCancelCircle, ImSpinner9 } from "react-icons/im";
import { AuthContext } from "@/context/auth-context";
import Notify from "@/components/Notify";
import toast from "react-hot-toast";
import Select from "@/components/Select";

type SignInProps = {
  forgot: () => void;
};

type BikesProps = {
  id: String;
  title: String;
};

const SignIn = ({ forgot }: SignInProps) => {
  const [userName, setuserName] = useState<string>("");
  const [bike, setBike] = useState<any>({
    id: "",
    title: "",
  });
  const [password, setPassword] = useState<string>();
  const [bikes, setBikes] = useState<BikesProps[]>([]);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    let result, body;
    body = {
      email: userName,
      password: password,
      bike: bike.id,
    };
    try {
      result = await Signin(body);
      setLoading(false);
    } catch (error: any) {
      console.log("Error on login...", error.message);
      return toast((t) => (
        <Notify className="!gap-3 !bg-red-500">
          <ImCancelCircle className="text-xl text-n-1" />
          <div>
            {typeof error?.message === "string"
              ? error?.message
              : "Invalid email or password."}
          </div>
        </Notify>
      ));
    }
    localStorage.setItem("token", result.token);
    authContext.getUser(result.token);
    return setLoading(false);
  };

  const getBikesList = async () => {
    let result;

    try {
      result = await GetBikes();

      if (typeof result !== "undefined" && result !== null) {
        if (result?.bikes?.length > 0) {
          let activeBikes;
          activeBikes = result.bikes.map((data: any) => {
            return {
              id: data._id,
              title: data.fullName,
            };
          });

          setBikes(activeBikes);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    getBikesList();
    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <form action="" onSubmit={handleSignIn}>
      <Field
        className="mb-4"
        classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
        placeholder="Username or email"
        icon="email"
        value={userName}
        onChange={(e: any) => setuserName(e.target.value)}
        required
      />
      <Field
        className="mb-2"
        classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
        placeholder="Password"
        icon="lock"
        type="password"
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
        required
      />
      <Select
        className="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent mb-2"
        classButton="dark:bg-transparent"
        classArrow="dark:fill-n-4"
        items={bikes}
        value={bike}
        onChange={setBike}
      />
      <button
        className="mb-6 base2 text-primary-1 transition-colors hover:text-purple-800"
        type="button"
        onClick={forgot}
      >
        Forgot password?
      </button>

      {error && <p className="text-red-500 mt-3">{error}</p>}
      <button
        className="btn bg-primary-1 border-0 btn-large w-full"
        type="submit"
      >
        {loading && (
          <ImSpinner9
            className="animate-spin h-5 w-5 ml-2 text-n-1 fill-n-1"
            style={{ fill: "white" }}
          />
        )}
        Sign in
      </button>
    </form>
  );
};

export default SignIn;
