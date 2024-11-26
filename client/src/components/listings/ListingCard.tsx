const ListingCard = ({listing}) => {

    if(!listing) {
        return <div className="text-center py-5">Listing not found!</div>;
    }

    return (
<div className="card listing-card">
            <div className="position-relative overflow-hidden">
                <img
                    src={listing.image}
                    alt={listing.title}
                    className="card-img-top"
                />
                <span className="price-badge">
                    ${listing.price_per_month}
                    <small className="d-block opacity-75">per month</small>
                </span>
            </div>
            <div className="card-body">
                <h5 className="card-title fw-bold mb-3">{listing.title}</h5>
                <div className="d-flex align-items-center mb-3">
                    <i className="bi bi-door-open me-2"></i>
                    <span className="text-muted">
                        {listing.number_of_rooms_available} {listing.number_of_rooms_available === 1 ? 'Room' : 'Rooms'} Available
                    </span>
                </div>
                <div className="d-flex flex-wrap gap-2">
                    {listing.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="badge bg-light"
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