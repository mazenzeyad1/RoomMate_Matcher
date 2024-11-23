import { useNavigate } from "react-router-dom";
import { ListingCard } from "../../components/listingCard/ListingCard";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { Routes } from "../../utils";

export const AppliedTo = () => {
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [myListings, setMyListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onClickHandler = (idx: string) => {
    navigate(`/${idx}`, { replace: true });
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:4000/listing/user/${user.id}/applied`)
      .then((res) => {
        setIsLoading(false);
        setMyListings(res.data);
      });
  }, []);

  return (
    <div className="pt-10 pb-10 pl-20">
      <h1 className="text-3xl font-bold mb-8">
        View Your Applications here, {user.name}!
      </h1>
      <div className="gap-10 pb-10 flex flex-wrap w-full ">
        {!isLoading && myListings?.length
          ? myListings.map((listing, idx) => (
              <ListingCard
                onClick={() => onClickHandler(listing._id)}
                key={listing.description}
                listing={listing}
              />
            ))
          : !isLoading && (
              <div className="w-full p-10 text-center">
                <h2
                  onClick={() => navigate(Routes.LISTINGS)}
                  className="text-2xl underline text-center font-bold mb-4 cursor-pointer hover:text-blue-400"
                >
                  Start applying to view you applications
                </h2>
              </div>
            )}
        {isLoading && <ListingCard variant="loading" />}
      </div>
    </div>
  );
};
