import { Zap, Shield, Truck, Smartphone, Laptop, Headphones } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useMemo, useState } from 'react';

function HomePage({ products = [], categories = [], loading = false, error = '', onNavigate, onToggleWishlist, isInWishlist, onAddToCart }) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const featuredProducts = useMemo(() => products.slice(0, 6), [products]);

    const features = [
        { icon: Zap, title: 'Fast Delivery', desc: 'Same day delivery' },
        { icon: Shield, title: 'Garansi Resmi', desc: '100% original' },
        { icon: Truck, title: 'Free Shipping', desc: 'Min. 500k' }
    ];

    const defaultCategories = [
        { icon: Smartphone, name: 'Smartphone', color: '#7c3aed' },
        { icon: Laptop, name: 'Laptop', color: '#2563eb' },
        { icon: Headphones, name: 'Audio', color: '#dc2626' }
    ];

    const popularCategories = useMemo(() => {
        if (categories.length === 0) return defaultCategories;

        return categories.slice(0, 3).map((name, index) => {
            const palette = ['#7c3aed', '#2563eb', '#dc2626'];
            const iconSet = [Smartphone, Laptop, Headphones];
            return {
                icon: iconSet[index % iconSet.length],
                name,
                color: palette[index % palette.length]
            };
        });
    }, [categories]);

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

    return (
        <div style={{ background: '#f8fafc' }}>
            {/* Hero Section */}
            <div style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                color: 'white',
                padding: '4rem 0',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <h1 style={{
                        fontSize: '3.5rem',
                        fontWeight: '900',
                        marginBottom: '1rem',
                        lineHeight: '1.1'
                    }}>
                        Smart Shopping<br />for Smart People 🚀
                    </h1>
                    <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
                        Gadget & Elektronik terbaru dengan harga terbaik
                    </p>
                    <button
                        onClick={() => onNavigate('products')}
                        className="btn btn-primary"
                        style={{
                            background: 'white',
                            color: '#7c3aed',
                            fontSize: '1.125rem',
                            padding: '1rem 2rem'
                        }}
                    >
                        Lihat Semua Produk →
                    </button>
                </div>

                {/* Decorative elements */}
                <div style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '300px',
                    height: '300px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                    filter: 'blur(60px)'
                }}></div>
            </div>

            {/* Features */}
            <div className="container" style={{ padding: '3rem 1rem' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem',
                    marginBottom: '4rem'
                }}>
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div key={index} className="card" style={{ textAlign: 'center' }}>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                                    borderRadius: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1rem',
                                    color: 'white'
                                }}>
                                    <Icon size={32} />
                                </div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                                    {feature.title}
                                </h3>
                                <p style={{ color: '#64748b' }}>{feature.desc}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Categories */}
                <h2 style={{
                    fontSize: '2rem',
                    fontWeight: '800',
                    marginBottom: '1.5rem',
                    textAlign: 'center'
                }}>
                    Kategori Populer
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '4rem'
                }}>
                {popularCategories.map((cat, index) => {
                        const Icon = cat.icon;
                        return (
                            <div
                                key={index}
                                className="card"
                                style={{
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    background: `linear-gradient(135deg, ${cat.color}15 0%, ${cat.color}05 100%)`
                                }}
                            >
                                <Icon size={48} style={{ color: cat.color, margin: '0 auto 1rem' }} />
                                <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: cat.color }}>
                                    {cat.name}
                                </h3>
                            </div>
                        );
                    })}
                </div>

                {/* Featured Products */}
                <h2 style={{
                    fontSize: '2rem',
                    fontWeight: '800',
                    marginBottom: '1.5rem',
                    textAlign: 'center'
                }}>
                    Produk Unggulan ⭐
                </h2>

                {loading && (
                    <p style={{ textAlign: 'center', color: '#64748b' }}>
                        Memuat produk terbaru...
                    </p>
                )}

                {error && !loading && (
                    <p style={{ textAlign: 'center', color: '#dc2626' }}>
                        {error}
                    </p>
                )}

                {!loading && !error && featuredProducts.length === 0 && (
                    <p style={{ textAlign: 'center', color: '#64748b' }}>
                        Produk belum tersedia. Silakan coba lagi nanti.
                    </p>
                )}

                {!loading && !error && featuredProducts.length > 0 && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}>
                        {featuredProducts.map(product => (
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
                )}
            </div>
        </div>
    );
}

export default HomePage;