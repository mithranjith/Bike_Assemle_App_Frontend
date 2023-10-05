import { useState } from "react";
import { Tab } from "@headlessui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import SignIn from "./SignIn";
import ForgotPassword from "./ForgotPassword";
import AdminSignIn from "./AdminSignIn";

const tabNav = ["User", "Admin"];

type FormProps = {};

const Form = ({}: FormProps) => {
  const [forgot, setForgot] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="w-full max-w-[40rem] m-auto">
      {forgot ? (
        <ForgotPassword onClick={() => setForgot(false)} />
      ) : (
        <>
          <Tab.Group
            defaultIndex={0}
            onChange={(index) => setActiveTab(index)} // Update the active tab index
          >
            <Tab.List className="flex mb-8 p-1 bg-n-2 rounded-xl dark:bg-n-7">
              {tabNav.map((button, index) => (
                <Tab
                  className="basis-1/2 h-10 rounded-[0.625rem] base2 font-semibold text-n-4 transition-colors outline-none hover:text-n-7 ui-selected:bg-n-1 ui-selected:text-n-7 ui-selected:shadow-[0_0.125rem_0.125rem_rgba(0,0,0,0.07),inset_0_0.25rem_0.125rem_#FFFFFF] tap-highlight-color dark:hover:text-n-1 dark:ui-selected:bg-n-6 dark:ui-selected:text-n-1 dark:ui-selected:shadow-[0_0.125rem_0.125rem_rgba(0,0,0,0.07),inset_0_0.0625rem_0.125rem_rgba(255,255,255,0.02)]"
                  key={index}
                >
                  {button}
                </Tab>
              ))}
            </Tab.List>

            <Tab.Panels>
              <Tab.Panel>
                <SignIn forgot={() => setForgot(true)} />
              </Tab.Panel>
              <Tab.Panel>
                <AdminSignIn />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </>
      )}
    </div>
  );
};

export default Form;
