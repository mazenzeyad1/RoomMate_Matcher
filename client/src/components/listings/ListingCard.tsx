const ListingCard = ({listing}) => {

    if(!listing) {
        return <div className="text-center py-5">Listing not found!</div>;
    }

    return (
        <div className="card shadow-sm w-100">
            <img
                src={listing.image}
                alt={listing.title}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }} />
            <div className="card-body text-start">
                <h5 className="card-title fw-bold">{listing.title}</h5>
                <p className="card-text text-muted mb-3">${listing.price_per_month} per month</p>
                <p className="cart-text text-muted mb-3">Rooms available: {listing.number_of_rooms_available}</p>
                <div className="d-flex flex-wrap gap-2">
                    {listing.tags.map((tag, index) => (
                        <span
                        key={index}
                        className="badge bg-secondary text-light"
                        >
                        {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ListingCard;