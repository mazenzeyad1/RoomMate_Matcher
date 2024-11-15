import { FormError } from "../../../components/formError/FormError";
import CustomInput from "../../../components/customInput/CustomInput";
import { Routes } from "../../../utils";
import waveEmoji from "../../../assets/waving-hand-sign.svg";

export const UserInfo = () => {
  return (
    <div>
      <h1 className="text-xl flex font-bold justify-center items-center gap-2 mb-4">
        Join Now! <img className="w-10" src={waveEmoji} />
      </h1>
      <p className="text-md text-center mb-8">
        Join Now to Meet New Roommates!
      </p>
      <div className="mb-4">
        <CustomInput name="name" label="Name" placeholder="John Doe" />
        <FormError name="name" />
      </div>
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
        <a href={Routes.LOGIN}>Already Signed Up? Sign In Instead</a>
      </div>
    </div>
  );
};
