import { useState, useEffect } from "react"; // Import useState
import { useSelector } from "react-redux";
import { ListingCard } from "../../components/listingCard/ListingCard";
import { useNavigate } from "react-router-dom";
import CreateListingModal from "./create-listings"; // Make sure to import CreateListingModal
import axios from "axios";

const tagValues = ["furnished", "utilities", "transport", "pet", "smoking"];

export const MyListings = () => {
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [myListings, setMyListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onClickHandler = (id: string) => {
    navigate(`${id}`);
  };

  const fetch = () => {
    if (user) {
      axios
        .get(`http://localhost:4000/listing/user/${user.id}/owner`)
        .then((res) => {
          const listings = res.data.map((listing) => {
            const tags = tagValues.filter((tagValue) => listing[tagValue]);
            return {
              ...listing,
              tags: listing.tags?.length > 0 ? listing.tags : tags,
            };
          });
          setMyListings(listings);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const openModal = () => setIsModalOpen(true); // Function to open the modal
  const closeModal = () => {
    setIsModalOpen(false);
    fetch();
  }; // Function to close the modal

  useEffect(() => {
    setIsLoading(true);
    fetch();
  }, [user]);
  return (
    <div className="flex flex-col pt-10 pb-10 pl-20">
      <h1 className="text-3xl font-bold mb-8">
        View Your Listings here, {user.name}!
      </h1>
      <div className="gap-10 pb-10 flex flex-row flex-wrap ">
        {myListings?.length ? (
          myListings.map((listing, idx) => (
            <ListingCard
              onClick={() => onClickHandler(listing._id)}
              key={listing.description}
              listing={listing}
            />
          ))
        ) : (
          <h2 className="text-xl flex w-full justify-center font-bold mb-4">
            Need a roommate? Create a listing!
          </h2>
        )}
        {isLoading && <ListingCard variant="loading" />}
        <ListingCard
          onClick={openModal} // Set this to open the modal
          variant="add"
        />
      </div>
      <CreateListingModal open={isModalOpen} onClose={closeModal} />
    </div>
  );
};
