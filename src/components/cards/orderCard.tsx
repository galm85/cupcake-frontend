import React from 'react';
import { CurrentOrder, Order } from '../../utils/types';

type Props = {
    order: Order;
}

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
    pending:   { label: 'Pending',   cls: 'oc-status-pending'   },
    active:    { label: 'Active',    cls: 'oc-status-active'    },
    delivered: { label: 'Delivered', cls: 'oc-status-delivered' },
    cancelled: { label: 'Cancelled', cls: 'oc-status-cancelled' },
};

const OrderCard: React.FC<Props> = ({ order }) => {

    const [items, setItems] = React.useState<CurrentOrder[]>([]);

    React.useEffect(() => {
        try { setItems(JSON.parse(order.items)); }
        catch { setItems([]); }
    }, [order.items]);

    const statusKey = order.status?.toLowerCase() ?? '';
    const status    = STATUS_MAP[statusKey] ?? { label: order.status ?? 'Unknown', cls: 'oc-status-pending' };
    const shortId   = order._id?.slice(-7).toUpperCase() ?? '—';
    const date      = order.createdAt
        ? new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
        : '—';

    return (
        <div className="oc-card">

            {/* ── Header ── */}
            <div className="oc-header">
                <div className="oc-header-left">
                    <span className="oc-id">#{shortId}</span>
                    <span className="oc-date">{date}</span>
                </div>
                <span className={`oc-status ${status.cls}`}>{status.label}</span>
            </div>

            {/* ── Items ── */}
            <div className="oc-items">
                {items.map((item: CurrentOrder) => (
                    <div className="oc-item" key={item._id}>
                        {item.image && (
                            <img src={item.image} alt={item.title} className="oc-item-img" />
                        )}
                        <span className="oc-item-title">{item.title}</span>
                        <span className="oc-item-qty">×{item.amount}</span>
                        <span className="oc-item-price">${(item.price * item.amount).toFixed(2)}</span>
                    </div>
                ))}
            </div>

            {/* ── Footer ── */}
            <div className="oc-footer">
                <div className="oc-meta">
                    {order.address && (
                        <p><span>Delivered to</span> {order.address}, {order.city}</p>
                    )}
                    {order.paymentMethod && (
                        <p><span>Payment</span> {order.paymentMethod}</p>
                    )}
                </div>
                <div className="oc-total">
                    <span>Order total</span>
                    <strong>${order.totalAmount?.toFixed(2)}</strong>
                </div>
            </div>

        </div>
    );
};

export default OrderCard;
