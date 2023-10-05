import { useState, useContext, useEffect } from "react";
import { AdminSignin } from "src/services/api.service";
import Field from "@/components/Field";
import { ImCancelCircle, ImSpinner9 } from "react-icons/im";
import { AuthContext } from "@/context/auth-context";
import Notify from "@/components/Notify";
import toast from "react-hot-toast";

type SignInProps = {
  forgot: () => void;
};

const AdminSignIn = ({ forgot }: SignInProps) => {
  const [userName, setuserName] = useState<string>("");
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    let result, body;
    body = {
      email: userName,
      password: password,
    };
    try {
      result = await AdminSignin(body);
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
    // return setLoading(false);
  };

  useEffect(() => {
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

export default AdminSignIn;
