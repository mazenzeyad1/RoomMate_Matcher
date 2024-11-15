import { useNavigate } from "react-router-dom";
import { ListingCard } from "../../components/listingCard/ListingCard";
import { useEffect, useState } from "react";
import axios from "axios";

const tagValues = ["furnished", "utilities", "transport", "pet", "smoking"];

export const Listings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onClickHandler = (id: string) => {
    navigate(`${id}`);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:4000/listing`)
      .then((res) => {
        const listings = res.data.map((listing) => {
          const tags = tagValues.filter((tagValue) => listing[tagValue]);
          return {
            ...listing,
            tags: listing.tags?.length > 0 ? listing.tags : tags,
          };
        });
        setListings(listings);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="gap-10 pt-10 pb-10 flex justify-center flex-wrap ">
      {!isLoading
        ? listings?.map((listing, idx) => (
            <ListingCard
              onClick={() => onClickHandler(listing._id)}
              key={idx}
              listing={listing}
            />
          ))
        : [...Array(10)].map((_, index) => (
            <ListingCard key={`mock-${index}`} variant="loading" />
          ))}
    </div>
  );
};
