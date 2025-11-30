import { Star, Eye, Heart, ShoppingCart } from "lucide-react";

function ProductCard({
  product,
  onViewDetail,
  onToggleWishlist,
  isInWishlist = () => false,
  onAddToCart,
}) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    const added = onToggleWishlist(product);
    alert(added ? "❤️ Added to wishlist!" : "💔 Removed from wishlist");
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart?.(product);
  };

  const isFavorite = isInWishlist(product.id);

  return (
    <div className="card" style={{ cursor: "pointer" }} onClick={onViewDetail}>
      <div
        style={{
          width: "100%",
          height: "200px",
          borderRadius: "0.75rem",
          overflow: "hidden",
          marginBottom: "1rem",
          position: "relative",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        />

        <div
          style={{
            position: "absolute",
            top: "0.75rem",
            right: "0.75rem",
            background: "#7c3aed",
            color: "white",
            padding: "0.25rem 0.75rem",
            borderRadius: "1rem",
            fontSize: "0.875rem",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          <Star size={14} fill="currentColor" />
          {product.rating}
        </div>

        <button
          onClick={handleFavorite}
          style={{
            position: "absolute",
            top: "0.75rem",
            left: "0.75rem",
            width: "36px",
            height: "36px",
            background: "rgba(255, 255, 255, 0.95)",
            border: "none",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Heart
            size={18}
            fill={isFavorite ? "#dc2626" : "none"}
            stroke={isFavorite ? "#dc2626" : "#64748b"}
          />
        </button>
      </div>

      <div
        style={{
          background: "#f1f5f9",
          color: "#7c3aed",
          padding: "0.25rem 0.75rem",
          borderRadius: "0.5rem",
          fontSize: "0.75rem",
          fontWeight: "600",
          display: "inline-block",
          marginBottom: "0.75rem",
        }}
      >
        {product.category}
      </div>

      <h3
        style={{
          fontSize: "1.125rem",
          fontWeight: "700",
          marginBottom: "0.5rem",
          color: "#1e293b",
        }}
      >
        {product.name}
      </h3>

      <p
        style={{
          color: "#64748b",
          fontSize: "0.875rem",
          marginBottom: "1rem",
          lineHeight: "1.5",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {product.description}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "800",
            background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {formatPrice(product.price)}
        </div>

        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            width: "fit-content",
          }}
        >
          {/* <button className="btn btn-primary" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            fontSize: '0.875rem'
          }} onClick={(e) => {
            e.stopPropagation();
            onViewDetail();
          }}>
            <Eye size={16} />
            Detail
          </button> */}
          <button
            className="btn"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              padding: "0.5rem 0.75rem",
              fontSize: "0.75rem",
              background: "#0f172a",
              color: "white",
            }}
            onClick={handleAddToCart}
          >
            <ShoppingCart size={16} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
