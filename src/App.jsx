import { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CategoriesPage from "./pages/CategoriesPage";
import ProfilePage from "./pages/ProfilePage";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import SplashScreen from "./pages/SplashScreen";
import {
  fetchProducts,
  fetchCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./services/api";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [wishlist, setWishlist] = useState([]);
  const [showSplash, setShowSplash] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [dataError, setDataError] = useState("");
  const [cartItems, setCartItems] = useState([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Hide splash screen after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const loadData = useCallback(async () => {
    try {
      setIsLoadingData(true);
      setDataError("");
      const [productData, categoryData] = await Promise.all([
        fetchProducts({ page: 1, limit: 6 }),
        fetchCategories(),
      ]);
      // Handle both old format (array) and new format (object with data and pagination)
      const products = Array.isArray(productData) ? productData : (productData.data || []);
      setProducts(products);
      setCategories(categoryData);
    } catch (error) {
      setDataError(error.message || "Gagal memuat data dari API");
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleToggleWishlist = (product) => {
    let willBeAdded = true;
    setWishlist((prevWishlist) => {
      const isInWishlist = prevWishlist.some((item) => item.id === product.id);
      if (isInWishlist) {
        willBeAdded = false;
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        return [...prevWishlist, product];
      }
    });
    return willBeAdded;
  };

  const handleAddToCart = (product) => {
    setCartItems((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    alert(`🛒 ${product.name} ditambahkan ke keranjang!`);
  };

  const handleUpdateCartQuantity = (productId, delta) => {
    setCartItems((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevCart) =>
      prevCart.filter((item) => item.id !== productId)
    );
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleCreateProduct = async (payload) => {
    await createProduct(payload);
    await loadData();
  };

  const handleUpdateProduct = async (id, payload) => {
    await updateProduct(id, payload);
    await loadData();
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    await loadData();
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        paddingBottom: "5rem",
      }}
    >
      {/* <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        wishlistCount={wishlist.length}
        cartCount={cartCount}
      /> */}

      {currentPage === "home" && (
        <HomePage
          products={products}
          categories={categories}
          loading={isLoadingData}
          error={dataError}
          onNavigate={setCurrentPage}
          onToggleWishlist={handleToggleWishlist}
          isInWishlist={isInWishlist}
          onAddToCart={handleAddToCart}
        />
      )}

      {currentPage === "products" && (
        <ProductsPage
          products={products}
          categories={categories}
          loading={isLoadingData}
          error={dataError}
          onToggleWishlist={handleToggleWishlist}
          isInWishlist={isInWishlist}
          onAddToCart={handleAddToCart}
          onCreateProduct={handleCreateProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      )}

      {/* {currentPage === "categories" && (
        <CategoriesPage
          products={products}
          categories={categories}
          loading={isLoadingData}
          error={dataError}
          onToggleWishlist={handleToggleWishlist}
          isInWishlist={isInWishlist}
          onAddToCart={handleAddToCart}
        />
      )} */}

      {currentPage === "wishlist" && (
        <WishlistPage
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
        />
      )}

      {currentPage === "profile" && <ProfilePage wishlist={wishlist} />}

      {currentPage === "cart" && (
        <CartPage
          items={cartItems}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveFromCart}
          onNavigate={setCurrentPage}
        />
      )}

      <BottomNav
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        wishlistCount={wishlist.length}
        cartCount={cartCount}
      />
    </div>
  );
}

export default App;
