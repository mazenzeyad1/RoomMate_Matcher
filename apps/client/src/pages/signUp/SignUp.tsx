import { Button } from "client/src/@/components/ui/button";
import "../../index.css";
import { Form, Formik } from "formik";
import { default as spinner } from "../../assets/spinner.svg";
import { signupSchema } from "./utils";
import axios from "axios";
import { useToast } from "client/src/@/components/ui/toast/use-toast";
import { UserInfo } from "./subcomponents/UserInfo";
import { UserPreferences } from "./subcomponents/UserPreferences";
import { useState } from "react";
import arrow from "../../assets/arrow.svg";
import { Routes } from "../../utils";
import { useNavigate } from "react-router-dom";

interface ISignUp {
  name: string;
  email: string;
  image: string;
  password: string;
  description: string;
  age?: number;
  phone?: number;
  Drinking: boolean;
  Smoking: boolean;
  GoingOut: boolean;
  Gym: boolean;
  Walking: boolean;
  Football: boolean;
  Reading: boolean;
  Cooking: boolean;
  Gaming: boolean;
  Nature: boolean;
}
export const SignUp = () => {
  const { toast } = useToast();
  const [showUserPreferences, setShowUserPreferences] = useState(false);
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={
        {
          email: "",
          password: "",
          name: "",
          image: "",
          description: "",
          age: undefined,
          phone: undefined,
          Drinking: false,
          Smoking: false,
          GoingOut: false,
          Gym: false,
          Walking: false,
          Football: false,
          Reading: false,
          Cooking: false,
          Gaming: false,
          Nature: false,
        } as ISignUp
      }
      validationSchema={signupSchema}
      validateOnMount
      validateOnBlur
      validateOnChange
      onSubmit={(values, { setSubmitting, resetForm }) => {
        axios
          .post(
            "http://localhost:4000/user",
            { ...values },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
            toast({
              title: "Signed Up!",
              description: "Signed up successfully! Log in to get started!",
              variant: "success",
            });
            resetForm();
            navigate(Routes.LISTINGS);
          })
          .catch((e) => {
            toast({
              title: "Could not sign up!",
              description: e.response.data.message,
              variant: "error",
            });
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
    >
      {({ handleSubmit, errors, isSubmitting, isValid, setFieldValue }) => (
        <div className="w-full h-screen flex justify-center items-center">
          <Form className="p-10 rounded-2xl	bg-gray-300 md:w-2/4 w-3/4 h-[600px] md:h-[550px]">
            {showUserPreferences ? (
              <UserPreferences setFieldValue={setFieldValue} />
            ) : (
              <UserInfo />
            )}
            <>
              {!showUserPreferences ? (
                <div className="flex justify-end w-full">
                  <Button
                    disabled={Object.keys(errors).some((key) =>
                      ["name", "email", "password"].includes(key)
                    )}
                    onClick={(e) => {
                      setShowUserPreferences(true);
                    }}
                    type="button"
                    className="flex-inline flex-row items-center gap-2 md:w-1/3 w-full h-10 px-4" // Adjust the padding value as needed
                  >
                    Continue
                    <img
                      src={arrow}
                      style={{ transform: "rotate(180deg)" }}
                      alt="Right Arrow"
                    />
                  </Button>
                </div>
              ) : (
                <div className="flex gap-24 justify-between">
                  <Button
                    type="button"
                    onClick={() => setShowUserPreferences(false)}
                    className="flex-inline flex-row items-center gap-2 w-1/2 h-10"
                  >
                    <img src={arrow} alt="Right Arrow" />
                    Previous
                  </Button>
                  <Button
                    type="submit"
                    disabled={!isValid}
                    onClick={() => handleSubmit()}
                    className="flex justify-center gap-2 items-center w-1/2 h-10"
                  >
                    {isSubmitting && (
                      <img
                        className="animate-spin w-4"
                        src={spinner}
                        alt="Spinner"
                      />
                    )}
                    {isSubmitting ? "Signing you up..." : "Submit"}
                  </Button>
                </div>
              )}
            </>
          </Form>
        </div>
      )}
    </Formik>
  );
};
