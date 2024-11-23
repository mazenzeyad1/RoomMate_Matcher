import { ErrorMessage } from "formik";

export const FormError = ({ name }: { name: string }) => {
  return (
    <div className="mt-1 text-sm text-red-600">
      <ErrorMessage name={name} />
    </div>
  );
};
