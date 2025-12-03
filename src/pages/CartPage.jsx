import { ShoppingCart, Trash2, Minus, Plus } from 'lucide-react';

function CartPage({ items = [], onUpdateQuantity, onRemoveItem, onNavigate }) {
  const formatPrice = (price) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);

  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '4rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
          padding: '3rem 0',
          color: 'white'
        }}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <ShoppingCart size={48} />
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>Keranjang</h1>
              <p style={{ opacity: 0.9 }}>Belum ada item di keranjangmu</p>
            </div>
          </div>
        </div>
        <div className="container" style={{ padding: '3rem 1rem', textAlign: 'center' }}>
          <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
            Yuk mulai belanja dan tambahkan produk favorit ke keranjang.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => onNavigate('products')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            Lihat Produk
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '4rem' }}>
      <div style={{
        background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
        padding: '3rem 0',
        color: 'white'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ShoppingCart size={48} />
          <div>
            <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', fontWeight: '800' }}>Keranjang</h1>
            <p style={{ opacity: 0.9, fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>{items.length} produk disimpan</p>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '1rem', display: 'grid', gap: '1.5rem', gridTemplateColumns: '1fr' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', order: 1 }}>
          {items.map(item => (
            <div key={item.id} className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <img
                src={item.image}
                alt={item.name}
                style={{ width: 'clamp(70px, 18vw, 120px)', height: 'clamp(70px, 18vw, 120px)', borderRadius: '0.75rem', objectFit: 'cover', flexShrink: 0 }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.25rem' }}>{item.category}</p>
                    <h3 style={{ fontSize: 'clamp(0.875rem, 3vw, 1.25rem)', fontWeight: '700', color: '#0f172a' }}>{item.name}</h3>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#dc2626',
                      cursor: 'pointer'
                    }}
                    aria-label="Remove item"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <p style={{ color: '#64748b', margin: '0.5rem 0 1rem' }}>
                  {item.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: 'clamp(0.875rem, 3vw, 1.25rem)', color: '#0f172a' }}>
                    {formatPrice(item.price * item.quantity)}
                  </strong>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: '2px solid #e2e8f0',
                        background: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                      aria-label="Kurangi jumlah"
                    >
                      <Minus size={16} />
                    </button>
                    <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: '600', color: '#0f172a' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: 'none',
                        background: '#0f172a',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                      aria-label="Tambah jumlah"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ order: 2 }}>
          <div className="card" style={{ position: 'sticky', top: '6rem', height: 'fit-content' }}>
            <h3 style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', fontWeight: '700', marginBottom: '1rem' }}>Ringkasan Belanja</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: '#64748b' }}>
              <span>Total Item</span>
              <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: '#0f172a', fontWeight: '700', fontSize: 'clamp(1rem, 3vw, 1.25rem)' }}>
              <span>Total Harga</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <button
              className="btn btn-primary"
              style={{ width: '100%', marginBottom: '0.5rem' }}
              onClick={() => alert('✅ Checkout berhasil!')}
            >
              Checkout
            </button>
            <button
              className="btn"
              style={{
                width: '100%',
                background: '#f1f5f9',
                color: '#0f172a',
                fontWeight: '600'
              }}
              onClick={() => onNavigate('products')}
            >
              Lanjut Belanja
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;



