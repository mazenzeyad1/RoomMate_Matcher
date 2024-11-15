import { FormError } from "../../../components/formError/FormError";
import CustomInput from "../../../components/customInput/CustomInput";
import { Tag } from "../../../components/tag/Tag";

const tagValues = [
  "Drinking",
  "Smoking",
  "PetFriendly",
  "Gym",
  "Walking",
  "Football",
  "Reading",
  "Cooking",
  "Gaming",
  "Nature",
];

export const UserPreferences = ({
  setFieldValue,
}: {
  setFieldValue: (name: string, value: boolean) => void;
}) => {
  return (
    <div>
      <h1 className="text-xl flex font-bold justify-center items-center gap-2 mb-4">
        Let's get to know each other!
      </h1>
      <p className="text-md text-center mb-8">
        This basic information will help us match you with the appropriate
        roommates and listings.
      </p>
      <div className="mb-4">
        <CustomInput
          name="description"
          label="Description"
          placeholder="The Brogrammer"
        />
        <FormError name="description" />
      </div>
      <div className="mb-4">
        <CustomInput
          type="file"
          label="Profile Picture"
          name="anything"
          onChange={(e) => setFieldValue("image", e.target.files[0])}
        />
      </div>
      <div className="flex w-full gap-2">
        <div className="mb-4 flex-grow">
          <CustomInput name="age" label="Age" type="number" placeholder="18" />
          <FormError name="age" />
        </div>
        <div className="mb-4 flex-grow">
          <CustomInput
            name="phone"
            label="Phone Number"
            type="number"
            placeholder="1234567890"
          />
          <FormError name="phone" />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {tagValues.map((value) => (
          <Tag
            key={value}
            value={value}
            text={value}
            onClick={(state) => setFieldValue(value, state)}
          />
        ))}
      </div>
    </div>
  );
};
