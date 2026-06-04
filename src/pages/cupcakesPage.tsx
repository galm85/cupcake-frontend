import { Button, Grid } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RotateText from '../components/rotateText';
import { getCupcakes } from '../redux/actions/products.actions';
import { Product, State } from '../utils/types';
import CupcakeCard from '../components/cards/cupcakeCard';
import BreadCrumbs from '../components/Breadcrumbs';

import CakesBanner  from '../assets/cakesbanner.jpg';
import Chef         from '../assets/chef.jpg';
import EventImg     from '../assets/event.jpg';
import CupcakeMain  from '../assets/cupcakeMain.jpg';

const CupcakePage: React.FC = () => {

    const dispatch: any = useDispatch();
    const cupcakes: Product[] = useSelector((state: State) => state.productsReducer.products);
    const [hoverImage, setHoverImage] = React.useState<string>('');
    const [isDesktop, setIsDesktop] = React.useState(false);

    React.useEffect(() => {
        dispatch(getCupcakes());
        setIsDesktop(window.innerWidth > 960);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="cupcake-page">

            {/* ════════════════════════════════
                HERO
            ════════════════════════════════ */}
            <div className="cp-hero">
                <img src={CakesBanner} alt="Our cupcakes" />
                <div className="cp-hero-overlay" />
                <div className="cp-hero-content">
                    <BreadCrumbs
                        currentPage="Our Cupcakes"
                        links={[{ label: 'Home', link: '/' }]}
                    />
                    <h1>Our Cupcakes</h1>
                    <p>50+ legendary flavors, handcrafted every morning from scratch.</p>
                    <Link to='/menu'>
                        <Button variant="contained" className="hp-btn-primary">
                            Browse Full Menu
                        </Button>
                    </Link>
                </div>
            </div>

            {/* ════════════════════════════════
                STATS STRIP
            ════════════════════════════════ */}
            <div className="cp-stats">
                <div className="cp-stat"><strong>50+</strong><span>Unique Flavors</span></div>
                <div className="cp-stat-div" />
                <div className="cp-stat"><strong>100%</strong><span>Made From Scratch</span></div>
                <div className="cp-stat-div" />
                <div className="cp-stat"><strong>Daily</strong><span>Freshly Baked</span></div>
                <div className="cp-stat-div" />
                <div className="cp-stat"><strong>Vegan</strong><span>Options Available</span></div>
            </div>

            {/* ════════════════════════════════
                ROTATING SHOWCASE
            ════════════════════════════════ */}
            <section className="cp-showcase">
                <div className="cp-showcase-inner">
                    <RotateText
                        text="OVER-250-CAKES-TYPES-"
                        space={7} name="cake"
                        image={CakesBanner}
                        radius={240} fontSize={1.2}
                    />
                    <RotateText
                        text="HOME-MADE-CUPCAKES-"
                        space={7} name="berry"
                        image={Chef}
                        radius={280} fontSize={1.2}
                    />
                    <RotateText
                        text="CAKES-FOR-EVERY-EVENT-"
                        space={7} name="event"
                        image={EventImg}
                        radius={240} fontSize={1.2}
                    />
                </div>
            </section>

            {/* ════════════════════════════════
                PRODUCT GRID
            ════════════════════════════════ */}
            <section className="cp-products">

                <div className="cp-products-header">
                    <div>
                        <span className="hp-label">Our Selection</span>
                        <h2>All Cupcakes</h2>
                    </div>
                    <p className="cp-count">
                        {cupcakes?.length ?? 0} flavors available today
                    </p>
                </div>

                <Grid container spacing={4}>

                    {/* Cupcake cards — 2-col grid */}
                    <Grid item xs={12} md={7}>
                        <Grid container spacing={3}>
                            {cupcakes && cupcakes.map((cupcake: Product) => (
                                <Grid
                                    item xs={12} sm={6}
                                    key={cupcake._id}
                                    onMouseEnter={() => setHoverImage(cupcake.image)}
                                    onMouseLeave={() => setHoverImage('')}
                                >
                                    <CupcakeCard cupcake={cupcake} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                    {/* Sticky preview panel — desktop only */}
                    {isDesktop && (
                        <Grid item md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
                            <div className="cp-sticky-panel">
                                <img
                                    src={hoverImage || CupcakeMain}
                                    alt="Featured cupcake"
                                    className={`cp-sticky-img${hoverImage ? ' active' : ''}`}
                                />
                                {!hoverImage && (
                                    <div className="cp-sticky-hint">
                                        <span>Hover a cupcake to preview</span>
                                    </div>
                                )}
                            </div>
                        </Grid>
                    )}

                </Grid>
            </section>

        </div>
    );
}

export default CupcakePage;
