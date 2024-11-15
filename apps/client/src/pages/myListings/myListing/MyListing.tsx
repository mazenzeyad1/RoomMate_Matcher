import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import CustomInput from "../../../components/customInput/CustomInput";
import { Textarea } from "client/src/@/components/ui/textarea";
import { Label } from "client/src/@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "client/src/@/components/ui/table";
import { Modal, Input, Button } from 'antd';
import emailjs from 'emailjs-com';
import axios from "axios";
import { useToast } from "client/src/@/components/ui/toast/use-toast";

export const MyListing = () => {
  const { id } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [action, setAction] = useState('');
  const [applicantId, setApplicantId] = useState(0);
  const { toast } = useToast();

 // const listing = useMemo(() => (id ? myListings[parseInt(id, 10)] : myListings[0]), [id, myListings]);
 
 const showModal = (actionType, applicant) => {
  setAction(actionType);
  setApplicantId(applicant._id);
  setEmail(applicant.email);  // Set email directly from the applicant object
  setIsModalVisible(true);
};


  const [listing, setListing] = useState();
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (id) {
      axios.get(`http://localhost:4000/listing/${id}`).then((res) => {
        setListing(res.data);
      });
      axios
        .get(`http://localhost:4000/listing/${id}/applicants`)
        .then((res) => {
          setApplicants(res.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id]);

  const handleEmailSend = () => {
    const templateId = action === 'accept' ? 'template_uytjhsy' : 'template_r1hupue';
    emailjs.send('service_6s2f1ks', templateId, { to_email: email, applicant_name: "anyname", listing_location: listing.location }, 'QWMkXgL51rQo4-6sg')
      .then((response) => {
       
        
        setApplicants(applicants.filter(x=> x.email!=email));
        setIsModalVisible(false);
        setEmail('');
        if(action==='accept'){
        
      
          axios.put(`http://localhost:4000/listing/${id}/user/${applicantId}/match`).then((res) => {
            toast({
              title: "Successful!",
              description: "Acceptance email sent successfully to: "+email,
            });
          });
        }
          else{        
           
          console.log(applicantId)
          axios.delete(`http://localhost:4000/listing/${id}/applicant/${applicantId}`).then((res) => {
           setListing(res)
           toast({
            title: "Successful!",
            description: "rejection email sent successfully to: "+email,
          });
          });}
      }, (error) => {
        toast({
          title: "rejected!",
          description: "email sent successfully to: "+email,
        });
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEmail('');
  };

  return (
    <div className="flex flex-col justify-center items-center">

      <h1 className="text-3xl pt-10 text-center font-bold mb-8">
        Listing: {listing?.location}
      </h1>
      <div className="flex justify-center">
        <img
          src={listing?.imageUrl}
          alt="Listing Image"
          className="mb-4 max-h-96	"
        />
      </div>
      {listing && (
        <Formik initialValues={{ ...listing }}>
          {({ handleSubmit, isSubmitting, values }) => (
            <div className="w-full mt-20 mb-10 flex justify-center items-center">
              <Form className="p-10 rounded-2xl bg-gray-300 w-1/2 ">
                <h1 className="text-xl flex font-bold justify-center items-center gap-2 mb-4">
                  Listing's Info
                </h1>
                <div className="mb-4">
                  <CustomInput
                    required
                    name="location"
                    label="Address*"
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <Label>Description*</Label>
                  <Textarea
                    name="description"
                    disabled
                    value={values.description}
                  />
                </div>
                <div className="mb-4">
                  <CustomInput label="Price*" name="price" disabled />
                </div>
                {values?.tags?.map((tag, idx) => (
                  <div className="mb-4" key={idx}>
                    <CustomInput
                      label={`Tag ${idx + 1}`}
                      value={tag}
                      disabled
                    />
                  </div>
                ))}
              </Form>
            </div>
          )}
        </Formik>
      )}
      <div className="flex flex-col w-1/2 mb-10 justify-center mt-8">
        <h1 className="text-xl font-bold text-center gap-2 mb-4">
          Applications
        </h1>
        <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Phone #</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
       
        <TableBody>
        {applicants.map((applicant) => (
  <TableRow key={applicant.id}>
    <TableCell className="font-medium">{applicant.name}</TableCell>
    <TableCell>{applicant.phone}</TableCell>
    <TableCell>{applicant.message}</TableCell>
    <TableCell>
      <button
        onClick={() => showModal('accept', applicant)}
        className="text-white bg-green-500 hover:bg-green-700 px-3 py-1 rounded transition duration-300">
        Accept
      </button>
      <button
        onClick={() => showModal('reject', applicant)}
        className="text-white bg-red-500 hover:bg-red-700 ml-2 px-3 py-1 rounded transition duration-300">
        Reject
      </button>
    </TableCell>
  </TableRow>
))}
          {/* Repeat the <TableRow> for other entries */}
        </TableBody>
      </Table>
      <Modal title={`${action.charAt(0).toUpperCase() + action.slice(1)} Applicant`} visible={isModalVisible} onCancel={handleCancel} onOk={handleEmailSend}>
        <p>Enter the email address to notify:</p>
        <Input placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
      </Modal>
      </div>
    </div>
  );
};
