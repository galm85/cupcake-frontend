import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../redux/actions/categories.actions';
import { Category, State } from '../utils/types';
import { capitilize } from '../utils/functions';

// images
import HomeBanner    from '../assets/homePageBanner.png';
import ChoclateCake2  from '../assets/choclate_cake.png';
import CupcakeMain  from '../assets/cupcakeMain.jpg';
import ChoclateCake   from '../assets/3699.png';
import HomeRestaurant from '../assets/homeRestaurant.jpg';
import Chef          from '../assets/chef.jpg';

const HomePage: React.FC = () => {

    const dispatch: any  = useDispatch();
    const navigate: any  = useNavigate();
    const categories: Category[] = useSelector((state: State) => state.categoriesReducer.categories);

    React.useEffect(() => {
        dispatch(getAllCategories());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="homepage-container">

            {/* ════════════════════════════════
                HERO
            ════════════════════════════════ */}
            <section className="hp-hero">

                {/* Background */}
                <div className="hp-hero-bg">
                    <img src={HomeBanner} alt="" />
                    <div className="hp-hero-overlay" />
                </div>

                {/* 2-column content grid */}
                <div className="hp-hero-grid">

                    {/* Left — text */}
                    <div className="hp-hero-body">
                        <span className="hp-eyebrow">✦ Artisan Bakery · Est. 2018</span>
                        <h1 className="hp-hero-title">
                            Handcrafted<br />
                            <em>with Love</em>
                        </h1>
                        <p className="hp-hero-sub">
                            Fresh baked daily, made to order. Because every bite
                            should feel like a celebration.
                        </p>
                        <div className="hp-hero-actions">
                            <Link to='/menu'>
                                <Button variant="contained" size="large" className="hp-btn-primary">
                                    Order Now
                                </Button>
                            </Link>
                            <Link to='/cupcakes'>
                                <Button variant="outlined" size="large" className="hp-btn-secondary">
                                    Our Cupcakes
                                </Button>
                            </Link>
                        </div>
                        <div className="hp-hero-trust">
                            <span>🎂 Fresh every morning</span>
                            <span>🌱 Vegan options</span>
                            <span>✨ Custom orders</span>
                        </div>
                    </div>

                    {/* Right — visual frame */}
                    <div className="hp-hero-visual">
                        <div className="hp-hero-frame">
                            <img src={CupcakeMain} alt="Our signature cupcakes" />

                            {/* Floating glassmorphism badges */}
                            <div className="hp-hero-badge hp-badge-top">
                                <strong>50+</strong>
                                <span>Unique Flavors</span>
                            </div>
                            <div className="hp-hero-badge hp-badge-bottom">
                                <strong>4.9★</strong>
                                <span>Customer Rating</span>
                            </div>
                        </div>

                        {/* Cake decoration overlapping the frame */}
                        {/* <div className="hp-hero-cake">
                            <img src={ChoclateCake} alt="" />
                        </div> */}
                    </div>

                </div>

                <div className="hp-scroll-hint"><span /></div>
            </section>

            {/* ════════════════════════════════
                STATS STRIP
            ════════════════════════════════ */}
            <div className="hp-stats">
                <div className="hp-stat"><strong>50+</strong><span>Cupcake Flavors</span></div>
                <div className="hp-stat-div" />
                <div className="hp-stat"><strong>250+</strong><span>Menu Items</span></div>
                <div className="hp-stat-div" />
                <div className="hp-stat"><strong>10+</strong><span>Locations</span></div>
                <div className="hp-stat-div" />
                <div className="hp-stat"><strong>4.9★</strong><span>Average Rating</span></div>
            </div>

            {/* ════════════════════════════════
                SHOP BY CATEGORY
            ════════════════════════════════ */}
            {categories && categories.length > 0 && (
                <section className="hp-categories">
                    <div className="hp-section-header">
                        <div>
                            <span className="hp-label">Browse</span>
                            <h2>Shop by Category</h2>
                        </div>
                        <Link to='/menu' className="hp-see-all">View all categories →</Link>
                    </div>
                    <div className="hp-categories-grid">
                        {categories.slice(0, 4).map((cat: Category) => (
                            <div
                                key={cat._id}
                                className="hp-cat-card"
                                role="button"
                                onClick={() => navigate(`/menu/${cat.title.toLowerCase()}`, { state: { categoryId: cat._id, catTitle: cat.title } })}
                                style={{ backgroundImage: `url(${cat.image})` }}
                            >
                                <div className="hp-cat-overlay" />
                                <span className="hp-cat-name">{capitilize(cat.title)}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* ════════════════════════════════
                SIGNATURE CUPCAKES  (split)
            ════════════════════════════════ */}
            <section className="hp-split hp-split-signature">
                <div className="hp-split-image">
                    <img src={CupcakeMain} alt="Our signature cupcakes" />
                </div>
                <div className="hp-split-content">
                    <span className="hp-label">Our Specialty</span>
                    <h2>Legendary Cupcakes, <em>Your Way</em></h2>
                    <p>
                        Every cupcake is made from scratch using only the finest ingredients.
                        Choose from over 50 flavors — classic vanilla, rich chocolate,
                        seasonal specials, and everything in between.
                    </p>
                    <ul className="hp-perks">
                        <li>Made fresh every morning</li>
                        <li>Vegan &amp; gluten-free options available</li>
                        <li>Custom orders warmly welcomed</li>
                    </ul>
                    <Link to='/cupcakes'>
                        <Button variant="contained">Explore Our Cupcakes</Button>
                    </Link>
                </div>
            </section>

            {/* ════════════════════════════════
                FULL MENU  (split reversed)
            ════════════════════════════════ */}
            <section className="hp-split hp-split-menu hp-split-reverse">
                <div className="hp-split-content hp-split-content-cream">
                    <span className="hp-label">250+ Dishes</span>
                    <h2>A Menu for Every Craving</h2>
                    <p>
                        From signature cupcakes to full celebration cakes — our menu has
                        something for every occasion, made to order, fresh every day.
                    </p>
                    <Link to='/menu'>
                        <Button variant="outlined">Browse Full Menu</Button>
                    </Link>
                </div>
                <div className="hp-split-image">
                    <img src={Chef} alt="Our chef at work" />
                </div>
            </section>

            {/* ════════════════════════════════
                RESTAURANT CTA  (full bleed)
            ════════════════════════════════ */}
            <section className="hp-restaurant">
                <img src={HomeRestaurant} alt="One of our restaurants" />
                <div className="hp-restaurant-box">
                    <span className="hp-label hp-label-light">10+ Locations</span>
                    <h2>Find a Place to Eat</h2>
                    <p>Dine in at one of our cosy bakeries across the city. Reserve a table or just walk in.</p>
                    <Link to='/restaurants'>
                        <Button variant="contained" className="hp-btn-primary">
                            Find a Restaurant
                        </Button>
                    </Link>
                </div>
            </section>

        </div>
    );
}

export default HomePage;
