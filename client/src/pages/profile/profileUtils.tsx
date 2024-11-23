import * as Yup from "yup";

export const profileSchema = Yup.object().shape({
  name: Yup.string().required("Name is required!"),
  email: Yup.string().email("Invalid email").required("Email is required!"),
  newPassword: Yup.string().required("Password is required!"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required!"),
  age: Yup.number()
    .positive("Age must be positive")
    .integer("Age must be a whole number")
    .required("Age is required!"),
  description: Yup.string(),
  Drinking: Yup.boolean(),
  Smoking: Yup.boolean(),
  GoingOut: Yup.boolean(),
  Gym: Yup.boolean(),
  Walking: Yup.boolean(),
  Football: Yup.boolean(),
  Reading: Yup.boolean(),
  Cooking: Yup.boolean(),
  Gaming: Yup.boolean(),
  Nature: Yup.boolean(),
});
