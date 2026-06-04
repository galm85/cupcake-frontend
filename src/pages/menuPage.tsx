import * as React from 'react';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Category, State } from '../utils/types';
import { getAllCategories } from '../redux/actions/categories.actions';
import CategoryCard from '../components/cards/categoryCard';
import BreadCrumbs, { BreadCrumbsLink } from '../components/Breadcrumbs';

import MenuBanner from '../assets/menu.jpg';

const MenuPage: React.FC = () => {

    const dispatch: any = useDispatch();
    const { categories } = useSelector((state: State) => state.categoriesReducer);
    const [hoverImage, setHoverImage] = React.useState<string>('');
    const [isDesktop, setIsDesktop] = React.useState(false);

    const breadLinks: BreadCrumbsLink[] = [
        { label: 'Home', link: '/' },
    ];

    React.useEffect(() => {
        dispatch(getAllCategories());
        setIsDesktop(window.innerWidth > 960);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="menu-page">

            {/* ════════════════════════════════
                HERO
            ════════════════════════════════ */}
            <div className="mp-hero">
                <img src={MenuBanner} alt="Our menu" />
                <div className="mp-hero-overlay" />
                <div className="mp-hero-content">
                    <BreadCrumbs links={breadLinks} currentPage="Menu" />
                    <h1>Our Menu</h1>
                    <p>250+ dishes made fresh from scratch, every single day.</p>
                </div>
            </div>

            {/* ════════════════════════════════
                BROWSE
            ════════════════════════════════ */}
            <div className="mp-browse">

                <div className="mp-browse-header">
                    <div>
                        <span className="hp-label">Browse</span>
                        <h2>All Categories</h2>
                    </div>
                    {categories && (
                        <p className="mp-count">
                            {categories.length} {categories.length === 1 ? 'category' : 'categories'}
                        </p>
                    )}
                </div>

                <Grid container spacing={4} alignItems="flex-start">

                    {/* ── Category grid ── */}
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={2}>
                            {categories && categories.map((category: Category) => (
                                <Grid
                                    item xs={12} sm={6} md={4}
                                    key={category._id}
                                    className="mp-cat-item"
                                    onMouseEnter={() => setHoverImage(category.image)}
                                    onMouseLeave={() => setHoverImage('')}
                                >
                                    <CategoryCard category={category} fn={setHoverImage} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                    {/* ── Sticky preview panel (desktop only) ── */}
                    {isDesktop && (
                        <Grid item md={4} sx={{ display: { xs: 'none', md: 'block' } }}>
                            <div className="mp-sticky-panel">
                                <img
                                    src={hoverImage || MenuBanner}
                                    alt="Category preview"
                                    className={`mp-sticky-img${hoverImage ? ' active' : ''}`}
                                />
                                {!hoverImage && (
                                    <div className="mp-sticky-hint">
                                        <span>Hover a category to preview</span>
                                    </div>
                                )}
                            </div>
                        </Grid>
                    )}

                </Grid>
            </div>

        </div>
    );
};

export default MenuPage;
