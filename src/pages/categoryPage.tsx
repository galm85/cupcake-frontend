import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByCategory } from '../redux/actions/products.actions';
import { getAllCategories } from '../redux/actions/categories.actions';
import { Category, Product, State } from '../utils/types';
import ProductCard from '../components/cards/productCard';
import { Grid, MenuItem, Select } from '@mui/material';
import BreadCrumbs, { BreadCrumbsLink } from '../components/Breadcrumbs';
import { capitilize } from '../utils/functions';

type FilterKey = 'all' | 'vegan' | 'gf';

const CategoryPage: React.FC = () => {

    const location: any = useLocation();
    const dispatch: any = useDispatch();

    const { categoryId, catTitle } = location.state;
    const { products } = useSelector((state: State) => state.productsReducer);
    const categories: Category[] = useSelector((state: State) => state.categoriesReducer.categories);

    const [sortBy, setSortBy] = React.useState<string>('default');
    const [filter, setFilter] = React.useState<FilterKey>('all');

    const currentCategory = categories?.find((c: Category) => c._id === categoryId);

    const breadLinks: BreadCrumbsLink[] = [
        { label: 'Home', link: '/' },
        { label: 'Menu', link: '/menu' },
    ];

    React.useEffect(() => {
        if (categoryId) dispatch(getProductsByCategory(categoryId));
        if (!categories || categories.length === 0) dispatch(getAllCategories());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const displayedProducts: Product[] = React.useMemo(() => {
        if (!products) return [];
        let list = [...products];

        if (filter === 'vegan') list = list.filter(p => p.isVegan);
        if (filter === 'gf')    list = list.filter(p => p.isGlutenFree);

        if (sortBy === 'price-asc')  list.sort((a, b) => a.price - b.price);
        if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
        if (sortBy === 'name')       list.sort((a, b) => a.title.localeCompare(b.title));

        return list;
    }, [products, sortBy, filter]);

    const filterBtns: { key: FilterKey; label: string }[] = [
        { key: 'all',   label: 'All' },
        { key: 'vegan', label: '🌱 Vegan' },
        { key: 'gf',    label: '🌾 Gluten-Free' },
    ];

    return (
        <div className="category-page">

            {/* ── Hero ── */}
            <div
                className="category-page-hero"
                style={currentCategory?.image ? { backgroundImage: `url(${currentCategory.image})` } : {}}
            >
                <div className="category-page-hero-overlay" />
                <div className="category-page-hero-content">
                    <BreadCrumbs currentPage={capitilize(catTitle)} links={breadLinks} />
                    <h1>{capitilize(catTitle)}</h1>
                    <p className="category-hero-count">
                        {products?.length ?? 0} {(products?.length ?? 0) === 1 ? 'item' : 'items'}
                    </p>
                </div>
            </div>

            {/* ── Toolbar ── */}
            <div className="category-page-toolbar">
                <div className="category-filter-chips">
                    {filterBtns.map(btn => (
                        <button
                            key={btn.key}
                            className={`category-filter-chip${filter === btn.key ? ' active' : ''}`}
                            onClick={() => setFilter(btn.key)}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>

                <div className="category-sort">
                    <span className="category-sort-label">Sort</span>
                    <Select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        size="small"
                        variant="outlined"
                        sx={{
                            minWidth: 170,
                            fontSize: 13,
                            fontFamily: 'Inter, sans-serif',
                            borderRadius: '8px',
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border)' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--rose-light)' },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--rose)' },
                        }}
                    >
                        <MenuItem value="default">Featured</MenuItem>
                        <MenuItem value="price-asc">Price: Low to High</MenuItem>
                        <MenuItem value="price-desc">Price: High to Low</MenuItem>
                        <MenuItem value="name">Name A–Z</MenuItem>
                    </Select>
                </div>
            </div>

            {/* ── Product grid ── */}
            <div className="category-page-grid">
                {displayedProducts.length > 0 ? (
                    <Grid container spacing={3}>
                        {displayedProducts.map((product: Product) => (
                            <Grid item xs={12} sm={6} md={4} key={product._id}>
                                <ProductCard catTitle={catTitle} product={product} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <div className="category-empty">
                        <span className="category-empty-icon">🍰</span>
                        <h3>No items found</h3>
                        <p>Try adjusting your filters.</p>
                    </div>
                )}
            </div>

        </div>
    );
}

export default CategoryPage;
