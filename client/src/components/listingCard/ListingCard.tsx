import { Card, CardContent, CardHeader } from "client/src/@/components/ui/card";
import locationIcon from "../../assets/location.svg";

export const Tag = ({ text }: { text: string }) => {
  return (
    <span className="bg-gray-200 text-gray-800 rounded-full py-1 px-2 inline-flex items-center	 text-center">
      {text}
    </span>
  );
};
export const ListingCard = ({
  onClick,
  listing,
  variant = "default",
}: {
  onClick?: any;
  variant?: "add" | "default" | "loading";
  listing?: any;
}) => {
  return (
    <Card
      onClick={onClick}
      className={`w-1/5 min-w-[300px] max-h-[400px] transition-transform duration-300 transform ${variant === "default" ? "hover:scale-105" : ""} hover:cursor-pointer`}
    >
      {listing?.imageUrl ? (
        <CardHeader>
          <div className="bg-gray-100 border-b-2 border-yellow-500 flex justify-center items-center h-48 relative overflow-hidden">
            <img
              className="block h-48 w-full object-cover"
              src={listing.imageUrl}
            />
          </div>
        </CardHeader>
      ) : variant === "loading" ? (
        <CardHeader>
          <div className="w-full h-56 bg-gray-300 animate-pulse mb-2" />
        </CardHeader>
      ) : null}
      {variant === "add" ? (
        <CardContent className="h-full flex justify-center items-center">
          <img
            src="https://img.icons8.com/color/240/add--v1.png"
            alt="add--v1"
          />
        </CardContent>
      ) : variant === "loading" ? (
        <CardContent>
          <div className="flex flex-col justify-center items-center h-full">
            <div className="h-4 w-full mb-2 bg-gray-300 animate-pulse" />
            <div className="flex justify-center w-full flex-wrap flex-row gap-2">
              <div className="h-6 rounded-full w-1/4 py-1 px-2 inline-flex items-center	 text-center bg-gray-300 animate-pulse" />
              <div className="h-6 rounded-full w-1/4 py-1 px-2 inline-flex items-center	 text-center bg-gray-300 animate-pulse" />
              <div className="h-6 rounded-full w-1/4 py-1 px-2 inline-flex items-center	 text-center bg-gray-300 animate-pulse" />
            </div>
          </div>
        </CardContent>
      ) : (
        <CardContent>
          <div className="flex justify-center gap-2 mb-2">
            <img className="w-6" src={locationIcon} />
            {listing.location}
          </div>
          <div className="flex justify-center flex-wrap gap-2">
            <Tag text={`$${listing.price}`} />
            {listing?.tags?.map?.((tag: string) => {
              return <Tag text={tag} />;
            })}
          </div>
        </CardContent>
      )}
    </Card>
  );
};
