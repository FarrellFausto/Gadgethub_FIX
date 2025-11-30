import { Heart, ShoppingBag } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useState } from 'react';

function WishlistPage({ wishlist, onToggleWishlist, onAddToCart }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleBuy = (product) => {
    const confirmation = window.confirm(
      `🛒 Beli ${product.name}?\n\nHarga: ${formatPrice(product.price)}`
    );
    if (confirmation) {
      alert('✅ Pesanan berhasil! Kami akan segera menghubungi Anda.');
    }
  };

  // Detail Product View
  if (selectedProduct) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '4rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
          padding: '2rem 0',
          color: 'white'
        }}>
          <div className="container">
            <button
              onClick={() => setSelectedProduct(null)}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1.5rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}
            >
              ← Kembali
            </button>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>
              {selectedProduct.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '0.25rem 1rem',
                borderRadius: '1rem',
                fontSize: '0.875rem'
              }}>
                {selectedProduct.category}
              </span>
              <span style={{ fontSize: '1.125rem' }}>⭐ {selectedProduct.rating}</span>
            </div>
          </div>
        </div>

        <div className="container" style={{ marginTop: '-2rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            <div>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                style={{
                  width: '100%',
                  borderRadius: '1rem',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
                }}
              />
            </div>

            <div>
              <div className="card" style={{ marginBottom: '1rem' }}>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '1rem'
                }}>
                  {formatPrice(selectedProduct.price)}
                </div>
                <p style={{ color: '#64748b', lineHeight: '1.75', marginBottom: '1.5rem' }}>
                  {selectedProduct.description}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <button
                    className="btn btn-primary"
                    style={{ width: '100%', fontSize: '1.125rem' }}
                    onClick={() => handleBuy(selectedProduct)}
                  >
                    🛒 Beli Sekarang
                  </button>
                  <button
                    className="btn"
                    style={{
                      width: '100%',
                      background: '#0f172a',
                      color: 'white',
                      fontWeight: '600',
                      padding: '0.75rem',
                      borderRadius: '0.75rem'
                    }}
                    onClick={() => onAddToCart(selectedProduct)}
                  >
                    + Tambah ke Keranjang
                  </button>
                </div>
              </div>

              <div className="card">
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>
                  Spesifikasi
                </h3>
                {Object.entries(selectedProduct.specs).map(([key, value]) => (
                  <div key={key} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.75rem 0',
                    borderBottom: '1px solid #e2e8f0'
                  }}>
                    <span style={{ color: '#64748b', textTransform: 'capitalize' }}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span style={{ fontWeight: '600', color: '#1e293b', textAlign: 'right' }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Wishlist Grid View
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '4rem' }}>
      <div style={{
        background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
        padding: '3rem 0',
        color: 'white'
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <Heart size={48} fill="white" />
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>
              My Wishlist
            </h1>
          </div>
          <p style={{ fontSize: '1.125rem', opacity: 0.9 }}>
            {wishlist.length} produk disimpan
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '2rem 1rem' }}>
        {wishlist.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
                {wishlist.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetail={() => setSelectedProduct(product)}
                onToggleWishlist={onToggleWishlist}
                    isInWishlist={() => true}
                    onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: '#64748b'
          }}>
            <div style={{
              width: '150px',
              height: '150px',
              background: 'linear-gradient(135deg, #dc262615 0%, #ef444405 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 2rem'
            }}>
              <Heart size={80} style={{ color: '#cbd5e1' }} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem', color: '#1e293b' }}>
              Wishlist Kosong
            </h3>
            <p style={{ marginBottom: '2rem', fontSize: '1.125rem' }}>
              Belum ada produk yang kamu simpan
            </p>
            <button
              className="btn btn-primary"
              onClick={() => window.location.href = '#products'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1rem',
                padding: '0.75rem 1.5rem'
              }}
            >
              <ShoppingBag size={20} />
              Mulai Belanja
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default WishlistPage;