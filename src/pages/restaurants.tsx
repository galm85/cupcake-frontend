import { Grid } from '@mui/material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BreadCrumbs, { BreadCrumbsLink } from '../components/Breadcrumbs';
import RestaurantCard from '../components/cards/restaurantCard';
import { getAllRestaurants } from '../redux/actions/restaurants.actions';
import { Restaurant, State } from '../utils/types';

import HomeRestaurant from '../assets/homeRestaurant.jpg';

const breadLinks: BreadCrumbsLink[] = [
    { label: 'Home', link: '/' },
];

const RestaurantsPage: React.FC = () => {

    const dispatch: any = useDispatch();
    const restaurants: Restaurant[] = useSelector((state: State) => state.restaurantsReducer.restaurants);

    React.useEffect(() => {
        dispatch(getAllRestaurants());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const eventCount = restaurants?.filter(r => r.events).length ?? 0;

    return (
        <div className="restaurant-page">

            {/* ════════════════════════════════
                HERO
            ════════════════════════════════ */}
            <div className="rp-hero">
                <img src={HomeRestaurant} alt="Our restaurants" />
                <div className="rp-hero-overlay" />
                <div className="rp-hero-content">
                    <BreadCrumbs currentPage="Restaurants" links={breadLinks} />
                    <h1>Our Restaurants</h1>
                    <p>Find a CupCake Factory near you — cosy spaces for dining, takeaway, and private events.</p>
                </div>
            </div>

            {/* ════════════════════════════════
                STATS STRIP
            ════════════════════════════════ */}
            <div className="rp-stats">
                <div className="rp-stat">
                    <strong>{restaurants?.length || '—'}</strong>
                    <span>Locations</span>
                </div>
                <div className="rp-stat-div" />
                <div className="rp-stat">
                    <strong>7</strong>
                    <span>Days a Week</span>
                </div>
                <div className="rp-stat-div" />
                <div className="rp-stat">
                    <strong>{eventCount || '—'}</strong>
                    <span>Event Venues</span>
                </div>
                <div className="rp-stat-div" />
                <div className="rp-stat">
                    <strong>Dine In</strong>
                    <span>&amp; Take Away</span>
                </div>
            </div>

            {/* ════════════════════════════════
                LOCATION GRID
            ════════════════════════════════ */}
            <div className="rp-grid">

                <div className="rp-grid-header">
                    <span className="hp-label">Find Us</span>
                    <h2>All Locations</h2>
                </div>

                {restaurants && restaurants.length > 0 ? (
                    <Grid container spacing={3}>
                        {restaurants.map((restaurant: Restaurant) => (
                            <Grid item xs={12} sm={6} md={4} key={restaurant._id}>
                                <RestaurantCard restaurant={restaurant} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <div className="rp-empty">
                        <span>📍</span>
                        <h3>Loading locations…</h3>
                    </div>
                )}

            </div>

        </div>
    );
};

export default RestaurantsPage;
