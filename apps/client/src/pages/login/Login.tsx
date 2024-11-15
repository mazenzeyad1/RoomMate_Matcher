import { Button } from "client/src/@/components/ui/button";
import { Form, Formik } from "formik";
import waveEmoji from "../../assets/waving-hand-sign.svg";
import spinner from "../../assets/spinner.svg";
import { signinSchema } from "./utils";
import { FormError } from "../../components/formError/FormError";
import CustomInput from "../../components/customInput/CustomInput";
import axios from "axios";
import { Routes } from "../../utils";
import { signIn } from "../../slices/AuthSlice";
import { useDispatch } from "react-redux";
import { useToast } from "client/src/@/components/ui/toast/use-toast";
import { useNavigate } from "react-router-dom";

interface ISignIn {
  email: string;
  password: string;
}

export const Login = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ email: "", password: "" } as ISignIn}
      validationSchema={signinSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        axios
          .post("http://localhost:4000/auth/login", { ...values })
          .then((res) => {
            if (res?.data?.token) {
              dispatch(
                signIn({
                  id: res.data.user.id,
                  email: res.data.user.email,
                  token: res.data.token,
                  name: res.data.name,
                })
              );
              resetForm();
              navigate(Routes.MY_LISTINGS);
            }
          })
          .catch((e) => {
            toast({
              title: "Could not sign in!",
              description: e.response.data.message,
            });
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <div className="w-full h-screen flex justify-center items-center">
          <Form className="p-10 rounded-2xl	bg-gray-300 md:w-2/4 w-3/4">
            <h1 className="text-xl flex font-bold justify-center items-center gap-2 mb-4">
              Login Now! <img className="w-10" src={waveEmoji} />
            </h1>
            <p className="text-md text-center mb-8">
              Log in to your existing account!
            </p>
            <div className="mb-4">
              <CustomInput
                name="email"
                label="Email"
                type="email"
                placeholder="john@email.com"
              />
              <FormError name="email" />
            </div>
            <div className="mb-6">
              <CustomInput
                label="Password"
                name="password"
                type="password"
                placeholder="******"
              />
              <FormError name="password" />
            </div>
            <div className="mb-6 text-md italic underline text-center">
              <a href={Routes.SIGN_UP}>No Account? Sign Up Instead</a>
            </div>
            <div className="text-center">
              <Button
                onClick={() => handleSubmit()}
                className="gap-1 w-1/2 h-10"
              >
                {isSubmitting && (
                  <img className="animate-spin w-4" src={spinner} />
                )}
                {isSubmitting ? "Logging In..." : "Log In"}
              </Button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};
