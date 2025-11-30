import { useMemo, useState } from 'react';
import { Tag, ArrowLeftCircle } from 'lucide-react';
import ProductCard from '../components/ProductCard';

function CategoriesPage({
  products = [],
  categories = [],
  loading = false,
  error = '',
  onToggleWishlist,
  isInWishlist,
  onAddToCart,
}) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const availableCategories = useMemo(() => {
    if (categories.length > 0) return categories;
    return [...new Set(products.map((product) => product.category))];
  }, [categories, products]);

  const categorizedProducts = useMemo(() => {
    if (!activeCategory || activeCategory === 'All') return products;
    return products.filter((product) => product.category === activeCategory);
  }, [products, activeCategory]);

  if (selectedProduct) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '4rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)',
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
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '1rem'
                }}>
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0
                  }).format(selectedProduct.price)}
                </div>
                <p style={{ color: '#64748b', lineHeight: '1.75', marginBottom: '1.5rem' }}>
                  {selectedProduct.description}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <button
                    className="btn btn-primary"
                    style={{ width: '100%', fontSize: '1.125rem' }}
                    onClick={() => {
                      const confirmation = window.confirm(
                        `🛒 Beli ${selectedProduct.name}?\n\nHarga: ${new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          minimumFractionDigits: 0
                        }).format(selectedProduct.price)}`
                      );
                      if (confirmation) {
                        alert('✅ Pesanan berhasil! Kami akan segera menghubungi Anda.');
                      }
                    }}
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

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#7c3aed', fontWeight: 600 }}>Memuat kategori...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="card" style={{ maxWidth: '420px', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '0.5rem', color: '#dc2626' }}>Gagal memuat</h3>
          <p style={{ color: '#64748b' }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '4rem' }}>
      <div
        style={{
          background: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)',
          color: 'white',
          padding: '3rem 0',
        }}
      >
        <div className="container">
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '0.5rem' }}>Kategori Produk</h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.85 }}>
            Jelajahi koleksi gadget berdasarkan kategori favoritmu.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '2rem 1rem' }}>
        {!activeCategory && (
          <>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem', color: '#0f172a' }}>
              Pilih kategori
            </h2>
            {availableCategories.length > 0 ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '1.5rem',
                }}
              >
                {availableCategories.map((category) => {
                  const count = products.filter((product) => product.category === category).length;
                  return (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className="card"
                      style={{
                        textAlign: 'left',
                        border: '2px solid #e0f2fe',
                        background: '#f0f9ff',
                        cursor: 'pointer',
                      }}
                    >
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '12px',
                          background: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '1rem',
                          color: '#0284c7',
                        }}
                      >
                        <Tag size={24} />
                      </div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.25rem', color: '#0f172a' }}>
                        {category}
                      </h3>
                      <p style={{ color: '#0ea5e9', fontWeight: 600 }}>{count} produk tersedia</p>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="card" style={{ textAlign: 'center', color: '#64748b' }}>
                Kategori belum tersedia. Tambahkan data produk melalui API untuk memulai.
              </div>
            )}
          </>
        )}

        {activeCategory && (
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <button
                  onClick={() => setActiveCategory(null)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#0ea5e9',
                    fontWeight: '700',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    marginBottom: '0.5rem',
                  }}
                >
                  <ArrowLeftCircle size={20} />
                  Semua kategori
                </button>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a' }}>
                  {activeCategory}
                </h2>
                <p style={{ color: '#64748b' }}>
                  {categorizedProducts.length} produk dalam kategori ini
                </p>
              </div>
            </div>

            {categorizedProducts.length > 0 ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '2rem',
                }}
              >
                {categorizedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetail={() => setSelectedProduct(product)}
                    onToggleWishlist={onToggleWishlist}
                    isInWishlist={isInWishlist}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  padding: '3rem 1.5rem',
                  background: 'white',
                  borderRadius: '1rem',
                  boxShadow: '0 4px 6px rgba(15, 23, 42, 0.1)',
                }}
              >
                <p style={{ color: '#64748b' }}>Belum ada produk untuk kategori ini.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoriesPage;

