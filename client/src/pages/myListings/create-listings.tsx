import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useToast } from "client/src/@/components/ui/toast/use-toast";
import { useSelector } from "react-redux";
import CustomInput from "../../components/customInput/CustomInput";
import { FormError } from "../../components/formError/FormError";
import { Tag } from "../../components/tag/Tag";
import { Button } from "client/src/@/components/ui/button";
import { default as spinner } from "../../assets/spinner.svg";

const tagValues = ["furnished", "utilities", "transport", "pet", "smoking"];

// Yup validation schema
const validationSchema = Yup.object().shape({
  description: Yup.string().required("Description is required"),
  location: Yup.string().required("Location is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive")
    .integer("Price must be an integer"),
  furnished: Yup.boolean(),
  utilities: Yup.boolean(),
  transport: Yup.boolean(),
  pet: Yup.boolean(),
  smoking: Yup.boolean(),
  image: Yup.mixed().required("An image is required"),
});

const CreateListingModal = ({ open, onClose }) => {
  const { toast } = useToast();
  const userId = useSelector((state) => state.auth.id);

  return (
    <Formik
      initialValues={{
        description: "",
        location: "",
        price: "",
        furnished: false,
        utilities: false,
        transport: false,
        pet: false,
        smoking: false,
        image: null,
      }}
      validateOnMount
      validateOnBlur
      validateOnChange
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        axios
          .post(
            "http://localhost:4000/listing",
            { ...values, owner: userId },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((response) => {
            toast({
              variant: "success",
              title: "Success",
              description: "Created listing successfully",
            });
          })
          .catch((error) => {
            toast({
              variant: "error",
              title: "Failure",
              description: error,
            });
          })
          .finally(() => {
            setSubmitting(false);
            onClose();
            resetForm();
          });
      }}
    >
      {({
        setFieldValue,
        isSubmitting,
        handleSubmit,
        resetForm,
        isValid,
        values,
      }) => (
        <Modal open={open} onClose={onClose}>
          <Form onSubmit={handleSubmit}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 800,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                pt: 2,
                pb: 2,
              }}
            >
              <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                Create Listing
              </Typography>
              <div className="mb-4 flex-grow">
                <CustomInput
                  name="description"
                  label="Description"
                  placeholder="Big apartment"
                />
                <FormError name="phone" />
              </div>
              <div className="mb-4 flex-grow">
                <CustomInput
                  name="location"
                  label="Location"
                  placeholder="523 Rue Avenue"
                />
                <FormError name="phone" />
              </div>
              <div className="mb-4 flex-grow">
                <CustomInput
                  name="price"
                  type="number"
                  label="Price"
                  placeholder="750"
                />
                <FormError name="phone" />
              </div>
              <div className="mb-5 flex-grow">
                <CustomInput
                  type="file"
                  label="Listing Picture"
                  name="anything"
                  onChange={(e) => setFieldValue("image", e.target.files[0])}
                />
              </div>
              <div className="flex flex-wrap justify-center gap-2 mb-5">
                {tagValues.map((value) => (
                  <Tag
                    key={value}
                    value={value}
                    text={value}
                    state={values[value]}
                    onClick={(state) => setFieldValue(value, state)}
                  />
                ))}
              </div>
              <div className="flex w-full justify-end	 gap-10">
                <Button
                  type="button"
                  color="secondary"
                  onClick={() => {
                    onClose();
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex justify-center gap-2 items-center"
                  type="submit"
                  disabled={!isValid && !isSubmitting}
                >
                  {isSubmitting && (
                    <img
                      className="animate-spin w-4"
                      src={spinner}
                      alt="Spinner"
                    />
                  )}
                  {isSubmitting ? "Creating Listing..." : "Submit"}
                </Button>
              </div>
            </Box>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

export default CreateListingModal;
