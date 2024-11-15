import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "client/src/@/components/ui/table";
import { Tag } from "../../../components/listingCard/ListingCard";
import { useSelector } from "react-redux";
import { Routes } from "../../../utils";
import { Textarea } from "client/src/@/components/ui/textarea";
import { Label } from "client/src/@/components/ui/label";
import { Button } from "client/src/@/components/ui/button";
import { useToast } from "client/src/@/components/ui/toast/use-toast";

export const Listing = () => {
  const auth = !!useSelector((state) => state.auth.token);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const [listing, setListing] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const userId = useSelector((state) => state.auth.id);
  useEffect(() => {
    setIsLoading(true);
    if (id) {
      axios
        .get(`http://localhost:4000/listing/${id}`)
        .then((res) => {
          setIsLoading(false);
          setListing(res.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id]);

  const handleSubmission = () => {
    setMessage("");

    axios
      .put(`http://localhost:4000/listing/${id}/user/${userId}/apply`)
      .then((res) => {
        toast({
          title: "Success!",
          description: "Candidate applied successfully!",
        });
        navigate(Routes.LISTINGS);
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Failed!",
          description: error?.response?.data?.message,
        });
      });
  };

  // Render placeholders while loading
  if (isLoading) {
    return (
      <div className="flex flex-col items-center mt-10 h-screen">
        <div className="bg-gray-300 h-96 w-1/2" />
        <div className="w-1/2">
          <div className="animate-pulse flex flex-col items-center">
            <div className="flex mt-2 mb-8 justify-center w-1/2 gap-3">
              <div className="h-6 rounded-full w-1/4 py-1 px-2 inline-flex items-center	 text-center bg-gray-300 animate-pulse" />
              <div className="h-6 rounded-full w-1/4 py-1 px-2 inline-flex items-center	 text-center bg-gray-300 animate-pulse" />
              <div className="h-6 rounded-full w-1/4 py-1 px-2 inline-flex items-center	 text-center bg-gray-300 animate-pulse" />
            </div>
            <div className="bg-gray-300 h-4 w-full mb-2" />
            <div className="bg-gray-300 h-4 w-full mb-2" />
            <div className="bg-gray-300 h-4 w-full mb-2" />
            <div className="bg-gray-300 h-4 w-full mb-2" />
            <div className="bg-gray-300 h-4 w-full mb-2" />
            <div className="bg-gray-300 h-4 w-full mb-2" />
          </div>
        </div>
        <div className="flex justify-center  ">
          <div className="w-1/2 mx-auto mt-10 ">
            <div className="animate-pulse">
              <div className="flex flex-row items-center gap-20 mb-4">
                <div>
                  <div className="bg-gray-200 h-8 w-40 mb-2"></div>
                  <div className="bg-gray-200 h-4 w-60 mb-2"></div>
                  <div className="bg-gray-200 h-4 w-96 mb-2"></div>
                  <div className="bg-gray-200 h-4 w-80"></div>
                </div>
                <div>
                  <div className="bg-gray-200 h-12 w-24"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render actual listing details
  return (
    <div className="flex justify-center items-center flex-col w-1/2 mx-auto mt-10 px-6">
      <div className="flex flex-col items-center mb-8">
        <img
          src={listing?.imageUrl}
          alt="Listing Image"
          className="mb-4 max-h-96	"
        />
        <div className="flex gap-3">
          {listing?.tags.map((tag, idx) => <Tag key={idx} text={tag} />)}
        </div>
      </div>
      <div className=" mb-8">
        <h1 className="text-2xl text-center font-bold mb-4">Description</h1>
        <p>{listing?.description}</p>
      </div>
      <Table className="w-full bg-gray-100 mb-10">
        <TableBody>
          <TableRow>
            <TableCell className="px-4 font-medium">Location</TableCell>
            <TableCell className="px-4">{listing?.location}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 font-medium">Price</TableCell>
            <TableCell className="px-4">{listing?.price}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className=" mb-8">
        <h1 className="text-2xl text-center font-bold mb-4">Let's do it!</h1>
        {!auth ? (
          <h2
            onClick={() => navigate(Routes.LOGIN)}
            className="text-lg underline text-center font-bold mb-4 cursor-pointer hover:text-blue-400"
          >
            Woah there! You've got to sign in first!
          </h2>
        ) : (
          <div className="flex flex-row mt-10 items-center gap-20 mb-4">
            <div>
              <Label>Send a message!</Label>
              <p>You don't have to, but it's recommended!</p>
              <Textarea
                name="message"
                placeholder="Hello! Let's live together."
                value={message}
              />
            </div>
            <Button onClick={handleSubmission}>Apply</Button>
          </div>
        )}
      </div>
    </div>
  );
};
