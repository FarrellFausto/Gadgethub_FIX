import {
  Home,
  ShoppingBag,
  Heart,
  User,
  Grid2X2,
  ShoppingCart,
} from "lucide-react";

function BottomNav({
  currentPage,
  onNavigate,
  wishlistCount = 0,
  cartCount = 0,
}) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "products", label: "Produk", icon: ShoppingBag },
    // { id: 'categories', label: 'Kategori', icon: Grid2X2 },
    { id: "cart", label: "Keranjang", icon: ShoppingCart },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "profile", label: "Profil", icon: User },
  ];

  return (
    <nav
      className="bottom-nav"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "white",
        borderTop: "1px solid #e2e8f0",
        display: "flex",
        justifyContent: "space-around",
        padding: "0.5rem 0",
        zIndex: 100,
      }}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              background: "transparent",
              border: "none",
              color: isActive ? "#7c3aed" : "#94a3b8",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: "0.75rem",
              fontWeight: 600,
              gap: "0.25rem",
              position: "relative",
            }}
          >
            <Icon size={20} />
            {item.label}
            {item.id === "wishlist" && wishlistCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: 2,
                  right: 18,
                  background: "#dc2626",
                  color: "white",
                  fontSize: "0.65rem",
                  borderRadius: "50%",
                  minWidth: "18px",
                  height: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {wishlistCount}
              </span>
            )}
            {item.id === "cart" && cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: 2,
                  right: 18,
                  background: "#f59e0b",
                  color: "white",
                  fontSize: "0.65rem",
                  borderRadius: "50%",
                  minWidth: "18px",
                  height: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}

export default BottomNav;
