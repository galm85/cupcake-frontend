import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersPerUser } from '../redux/actions/orders.actions';
import { Order, State, User } from '../utils/types';
import { useNavigate } from 'react-router-dom';
import OrderCard from '../components/cards/orderCard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const ProfilePage: React.FC = () => {

    const navigate: any  = useNavigate();
    const dispatch: any  = useDispatch();
    const user: User     = useSelector((state: State) => state.usersReducer.currentUser);
    const { ordersHistory } = useSelector((state: State) => state.ordersReducer);

    React.useEffect(() => {
        if (user) {
            dispatch(getAllOrdersPerUser(user._id));
        } else {
            navigate('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!user) return null;

    const totalSpent  = ordersHistory?.reduce((sum: number, o: Order) => sum + (o.totalAmount ?? 0), 0) ?? 0;
    const memberSince = user.createdAt
        ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : '—';

    return (
        <div className="profile-page">

            {/* ════════════════════════════════
                PROFILE HEADER
            ════════════════════════════════ */}
            <div className="pp-header">
                <div className="pp-header-bg" />
                <div className="pp-header-content">

                    <div className="pp-avatar-wrap">
                        <img src={user.image} alt={user.firstName} />
                    </div>

                    <div className="pp-header-info">
                        <h1>{user.firstName} {user.lastName}</h1>
                        <p className="pp-email">{user.email}</p>
                        {user.isAdmin && (
                            <span className="pp-admin-badge">Admin</span>
                        )}
                    </div>

                </div>
            </div>

            {/* ════════════════════════════════
                STATS STRIP
            ════════════════════════════════ */}
            <div className="pp-stats">
                <div className="pp-stat">
                    <div className="pp-stat-icon">
                        <ShoppingBagIcon fontSize="small" />
                    </div>
                    <div className="pp-stat-text">
                        <strong>{ordersHistory?.length ?? 0}</strong>
                        <span>Orders Placed</span>
                    </div>
                </div>
                <div className="pp-stat-div" />
                <div className="pp-stat">
                    <div className="pp-stat-icon">
                        <AttachMoneyIcon fontSize="small" />
                    </div>
                    <div className="pp-stat-text">
                        <strong>${totalSpent.toFixed(2)}</strong>
                        <span>Total Spent</span>
                    </div>
                </div>
                <div className="pp-stat-div" />
                <div className="pp-stat">
                    <div className="pp-stat-icon">
                        <CalendarTodayIcon fontSize="small" />
                    </div>
                    <div className="pp-stat-text">
                        <strong>{memberSince}</strong>
                        <span>Member Since</span>
                    </div>
                </div>
            </div>

            {/* ════════════════════════════════
                ORDER HISTORY
            ════════════════════════════════ */}
            <div className="pp-orders">

                <div className="pp-section-header">
                    <span className="hp-label">Account</span>
                    <h2>Order History</h2>
                </div>

                {ordersHistory && ordersHistory.length > 0 ? (
                    <div className="pp-orders-list">
                        {ordersHistory.map((order: Order) => (
                            <OrderCard key={order._id} order={order} />
                        ))}
                    </div>
                ) : (
                    <div className="pp-empty">
                        <span className="pp-empty-icon">🛍️</span>
                        <h3>No orders yet</h3>
                        <p>Your order history will appear here once you place your first order.</p>
                    </div>
                )}

            </div>

        </div>
    );
};

export default ProfilePage;
