import React from 'react'
import { Restaurant } from '../../utils/types';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

type Props = {
    restaurant: Restaurant;
}

const isDefined = (val: string) => val && val !== 'undefined';

const RestaurantCard: React.FC<Props> = ({ restaurant }) => {

    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address + ' ' + restaurant.city)}`;

    return (
        <div className="restaurant-card">

            {/* Image */}
            <div className="rc-image">
                <img src={restaurant.image} alt={`${restaurant.city} branch`} />
                {restaurant.events && (
                    <span className="rc-events-badge">Events</span>
                )}
            </div>

            {/* Body */}
            <div className="rc-body">

                <h3 className="rc-city">{restaurant.city}</h3>

                <div className="rc-info">
                    <div className="rc-info-row">
                        <LocationOnIcon />
                        <span>{restaurant.address}</span>
                    </div>
                    <div className="rc-info-row">
                        <PhoneIcon />
                        <span>{restaurant.phone}</span>
                    </div>
                </div>

                <div className="rc-hours">
                    <div className="rc-hours-title">
                        <AccessTimeIcon />
                        <span>Opening Hours</span>
                    </div>
                    <div className="rc-hours-grid">
                        <span className="rc-day">Sun – Thu</span>
                        <span className="rc-time">{restaurant.weekdayOpen} – {restaurant.weekdayClose}</span>

                        <span className="rc-day">Friday</span>
                        <span className="rc-time">
                            {isDefined(restaurant.friOpen)
                                ? `${restaurant.friOpen} – ${restaurant.friClose}`
                                : 'Closed'}
                        </span>

                        <span className="rc-day">Saturday</span>
                        <span className="rc-time">
                            {isDefined(restaurant.satOpen)
                                ? `${restaurant.satOpen} – ${restaurant.satClose}`
                                : 'Closed'}
                        </span>
                    </div>
                </div>

                <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rc-directions-btn"
                >
                    Get Directions →
                </a>

            </div>
        </div>
    );
}

export default RestaurantCard;
