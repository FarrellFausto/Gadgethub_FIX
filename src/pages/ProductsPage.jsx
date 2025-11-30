// import ProductCard from "../components/ProductCard";
// import { useState } from "react";
// import { Search, PlusCircle, X, Edit2, Trash2 } from "lucide-react";

// function ProductsPage({
//   products = [],
//   categories = [],
//   loading = false,
//   error = "",
//   onToggleWishlist,
//   isInWishlist,
//   onAddToCart,
//   onCreateProduct = async () => {},
//   onUpdateProduct = async () => {},
//   onDeleteProduct = async () => {},
// }) {
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [formError, setFormError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const initialFormState = {
//     name: "",
//     category: "",
//     price: "",
//     image: "",
//     rating: "",
//     description: "",
//     specs: "{}",
//   };
//   const [formData, setFormData] = useState(initialFormState);

//   const availableCategories = [
//     "All",
//     ...new Set(
//       (categories.length
//         ? categories
//         : products.map((product) => product.category)) || []
//     ),
//   ];

//   const filteredProducts = products.filter((product) => {
//     const matchCategory =
//       selectedCategory === "All" || product.category === selectedCategory;
//     const matchSearch = product.name
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     return matchCategory && matchSearch;
//   });

//   const openCreateForm = () => {
//     setIsFormVisible(true);
//     setEditingProduct(null);
//     setFormData(initialFormState);
//     setFormError("");
//   };

//   const openEditForm = (product) => {
//     setIsFormVisible(true);
//     setEditingProduct(product);
//     setFormError("");
//     setFormData({
//       name: product.name || "",
//       category: product.category || "",
//       price: product.price ?? "",
//       image: product.image || "",
//       rating: product.rating ?? "",
//       description: product.description || "",
//       specs: JSON.stringify(product.specs || {}, null, 2),
//     });
//   };

//   const handleFormChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     setFormError("");
//     try {
//       let parsedSpecs = {};
//       try {
//         parsedSpecs = formData.specs ? JSON.parse(formData.specs) : {};
//       } catch {
//         throw new Error("Format spesifikasi harus berupa JSON yang valid.");
//       }

//       const payload = {
//         name: formData.name.trim(),
//         category: formData.category.trim(),
//         price: Number(formData.price),
//         image: formData.image.trim(),
//         rating: formData.rating === "" ? 0 : Number(formData.rating),
//         description: formData.description.trim(),
//         specs: parsedSpecs,
//       };

//       if (!payload.name || !payload.category || Number.isNaN(payload.price)) {
//         throw new Error("Nama, kategori, dan harga wajib diisi dengan benar.");
//       }

//       if (Number.isNaN(payload.rating)) {
//         throw new Error("Rating harus berupa angka.");
//       }

//       setIsSubmitting(true);
//       if (editingProduct) {
//         await onUpdateProduct(editingProduct.id, payload);
//       } else {
//         await onCreateProduct(payload);
//       }
//       setIsFormVisible(false);
//       setEditingProduct(null);
//       setFormData(initialFormState);
//       setSelectedProduct(null);
//     } catch (err) {
//       setFormError(err.message || "Gagal menyimpan data.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDeleteProduct = async (product) => {
//     const confirmation = window.confirm(
//       `Hapus ${product.name}? Data tidak bisa dikembalikan.`
//     );
//     if (!confirmation) return;
//     try {
//       await onDeleteProduct(product.id);
//       setSelectedProduct(null);
//     } catch (err) {
//       alert(err.message || "Gagal menghapus produk.");
//     }
//   };

//   if (selectedProduct) {
//     return (
//       <div
//         style={{
//           minHeight: "100vh",
//           background: "#f8fafc",
//           paddingBottom: "4rem",
//         }}
//       >
//         <div
//           style={{
//             background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
//             padding: "2rem 0",
//             color: "white",
//           }}
//         >
//           <div className="container">
//             <button
//               onClick={() => setSelectedProduct(null)}
//               style={{
//                 background: "rgba(255, 255, 255, 0.2)",
//                 color: "white",
//                 border: "none",
//                 padding: "0.5rem 1.5rem",
//                 borderRadius: "0.5rem",
//                 cursor: "pointer",
//                 fontSize: "1rem",
//                 fontWeight: "600",
//                 marginBottom: "1rem",
//               }}
//             >
//               ← Kembali
//             </button>
//             <h1
//               style={{
//                 fontSize: "2.5rem",
//                 fontWeight: "800",
//                 marginBottom: "0.5rem",
//               }}
//             >
//               {selectedProduct.name}
//             </h1>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "1rem",
//                 flexWrap: "wrap",
//               }}
//             >
//               <div
//                 style={{ display: "flex", alignItems: "center", gap: "1rem" }}
//               >
//                 <span
//                   style={{
//                     background: "rgba(255, 255, 255, 0.2)",
//                     padding: "0.25rem 1rem",
//                     borderRadius: "1rem",
//                     fontSize: "0.875rem",
//                   }}
//                 >
//                   {selectedProduct.category}
//                 </span>
//                 <span style={{ fontSize: "1.125rem" }}>
//                   ⭐ {selectedProduct.rating}
//                 </span>
//               </div>
//               <div style={{ display: "flex", gap: "0.5rem" }}>
//                 <button
//                   className="btn"
//                   style={{
//                     display: "inline-flex",
//                     alignItems: "center",
//                     gap: "0.25rem",
//                     background: "white",
//                     color: "#7c3aed",
//                     fontWeight: 700,
//                   }}
//                   onClick={() => openEditForm(selectedProduct)}
//                 >
//                   <Edit2 size={16} />
//                   Edit
//                 </button>
//                 <button
//                   className="btn"
//                   style={{
//                     display: "inline-flex",
//                     alignItems: "center",
//                     gap: "0.25rem",
//                     background: "#fee2e2",
//                     color: "#dc2626",
//                     fontWeight: 700,
//                   }}
//                   onClick={() => handleDeleteProduct(selectedProduct)}
//                 >
//                   <Trash2 size={16} />
//                   Hapus
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="container" style={{ marginTop: "-2rem" }}>
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//               gap: "2rem",
//             }}
//           >
//             <div>
//               <img
//                 src={selectedProduct.image}
//                 alt={selectedProduct.name}
//                 style={{
//                   width: "100%",
//                   borderRadius: "1rem",
//                   boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
//                 }}
//               />
//             </div>

//             <div>
//               <div className="card" style={{ marginBottom: "1rem" }}>
//                 <div
//                   style={{
//                     fontSize: "2.5rem",
//                     fontWeight: "800",
//                     background:
//                       "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                     marginBottom: "1rem",
//                   }}
//                 >
//                   {new Intl.NumberFormat("id-ID", {
//                     style: "currency",
//                     currency: "IDR",
//                     minimumFractionDigits: 0,
//                   }).format(selectedProduct.price)}
//                 </div>
//                 <p
//                   style={{
//                     color: "#64748b",
//                     lineHeight: "1.75",
//                     marginBottom: "1.5rem",
//                   }}
//                 >
//                   {selectedProduct.description}
//                 </p>
//                 <div
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: "0.75rem",
//                   }}
//                 >
//                   <button
//                     className="btn btn-primary"
//                     style={{ width: "100%", fontSize: "1.125rem" }}
//                     onClick={() => {
//                       const confirmation = window.confirm(
//                         `🛒 Beli ${
//                           selectedProduct.name
//                         }?\n\nHarga: ${new Intl.NumberFormat("id-ID", {
//                           style: "currency",
//                           currency: "IDR",
//                           minimumFractionDigits: 0,
//                         }).format(selectedProduct.price)}`
//                       );
//                       if (confirmation) {
//                         alert(
//                           "✅ Pesanan berhasil! Kami akan segera menghubungi Anda."
//                         );
//                       }
//                     }}
//                   >
//                     🛒 Beli Sekarang
//                   </button>
//                   <button
//                     className="btn"
//                     style={{
//                       width: "100%",
//                       background: "#0f172a",
//                       color: "white",
//                       fontWeight: "600",
//                       padding: "0.75rem",
//                       borderRadius: "0.75rem",
//                     }}
//                     onClick={() => onAddToCart(selectedProduct)}
//                   >
//                     + Tambah ke Keranjang
//                   </button>
//                 </div>
//               </div>

//               <div className="card">
//                 <h3
//                   style={{
//                     fontSize: "1.25rem",
//                     fontWeight: "700",
//                     marginBottom: "1rem",
//                   }}
//                 >
//                   Spesifikasi
//                 </h3>
//                 {Object.entries(selectedProduct.specs).map(([key, value]) => (
//                   <div
//                     key={key}
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       padding: "0.75rem 0",
//                       borderBottom: "1px solid #e2e8f0",
//                     }}
//                   >
//                     <span
//                       style={{ color: "#64748b", textTransform: "capitalize" }}
//                     >
//                       {key.replace(/([A-Z])/g, " $1").trim()}
//                     </span>
//                     <span
//                       style={{
//                         fontWeight: "600",
//                         color: "#1e293b",
//                         textAlign: "right",
//                       }}
//                     >
//                       {value}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "#f8fafc",
//         paddingBottom: "4rem",
//       }}
//     >
//       <div
//         style={{
//           background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
//           padding: "3rem 0",
//           color: "white",
//         }}
//       >
//         <div className="container">
//           <h1
//             style={{
//               fontSize: "2.5rem",
//               fontWeight: "800",
//               marginBottom: "0.5rem",
//             }}
//           >
//             Semua Produk
//           </h1>
//           <p style={{ fontSize: "1.125rem", opacity: 0.9 }}>
//             {loading
//               ? "Memuat produk..."
//               : `${filteredProducts.length} produk tersedia`}
//           </p>
//         </div>
//       </div>

//       <div className="container" style={{ padding: "2rem 1rem" }}>
//         <div className="card" style={{ marginBottom: "2rem" }}>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginBottom: "1rem",
//             }}
//           >
//             <div>
//               <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>
//                 {editingProduct ? "Edit Produk" : "Tambah Produk"}
//               </h3>
//               <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
//                 Lengkapi form berikut untuk{" "}
//                 {editingProduct ? "memperbarui" : "menambah"} produk.
//               </p>
//             </div>
//             <button
//               className="btn"
//               style={{
//                 display: "inline-flex",
//                 alignItems: "center",
//                 gap: "0.35rem",
//                 background: isFormVisible ? "#fee2e2" : "#eef2ff",
//                 color: isFormVisible ? "#dc2626" : "#4338ca",
//                 fontWeight: 600,
//               }}
//               onClick={() => {
//                 if (isFormVisible && editingProduct) {
//                   setEditingProduct(null);
//                   setFormData(initialFormState);
//                   setFormError("");
//                 }
//                 setIsFormVisible((prev) => !prev);
//               }}
//             >
//               {isFormVisible ? <X size={18} /> : <PlusCircle size={18} />}
//               {isFormVisible ? "Tutup" : "Tambah Produk"}
//             </button>
//           </div>
//           {isFormVisible && (
//             <form
//               onSubmit={handleFormSubmit}
//               style={{ display: "grid", gap: "1rem" }}
//             >
//               <div style={{ display: "grid", gap: "0.5rem" }}>
//                 <label style={{ fontWeight: 600 }}>Nama Produk</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleFormChange}
//                   required
//                   style={{
//                     padding: "0.75rem 1rem",
//                     borderRadius: "0.75rem",
//                     border: "1px solid #e2e8f0",
//                   }}
//                 />
//               </div>
//               <div style={{ display: "grid", gap: "0.5rem" }}>
//                 <label style={{ fontWeight: 600 }}>Kategori</label>
//                 <input
//                   type="text"
//                   name="category"
//                   value={formData.category}
//                   onChange={handleFormChange}
//                   required
//                   style={{
//                     padding: "0.75rem 1rem",
//                     borderRadius: "0.75rem",
//                     border: "1px solid #e2e8f0",
//                   }}
//                 />
//               </div>
//               <div
//                 style={{
//                   display: "grid",
//                   gap: "1rem",
//                   gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//                 }}
//               >
//                 <div style={{ display: "grid", gap: "0.5rem" }}>
//                   <label style={{ fontWeight: 600 }}>Harga (IDR)</label>
//                   <input
//                     type="number"
//                     name="price"
//                     value={formData.price}
//                     onChange={handleFormChange}
//                     required
//                     min="0"
//                     style={{
//                       padding: "0.75rem 1rem",
//                       borderRadius: "0.75rem",
//                       border: "1px solid #e2e8f0",
//                     }}
//                   />
//                 </div>
//                 <div style={{ display: "grid", gap: "0.5rem" }}>
//                   <label style={{ fontWeight: 600 }}>Rating (0-5)</label>
//                   <input
//                     type="number"
//                     step="0.1"
//                     min="0"
//                     max="5"
//                     name="rating"
//                     value={formData.rating}
//                     onChange={handleFormChange}
//                     style={{
//                       padding: "0.75rem 1rem",
//                       borderRadius: "0.75rem",
//                       border: "1px solid #e2e8f0",
//                     }}
//                   />
//                 </div>
//               </div>
//               <div style={{ display: "grid", gap: "0.5rem" }}>
//                 <label style={{ fontWeight: 600 }}>URL Gambar</label>
//                 <input
//                   type="url"
//                   name="image"
//                   value={formData.image}
//                   onChange={handleFormChange}
//                   style={{
//                     padding: "0.75rem 1rem",
//                     borderRadius: "0.75rem",
//                     border: "1px solid #e2e8f0",
//                   }}
//                 />
//               </div>
//               <div style={{ display: "grid", gap: "0.5rem" }}>
//                 <label style={{ fontWeight: 600 }}>Deskripsi</label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleFormChange}
//                   rows={3}
//                   style={{
//                     padding: "0.75rem 1rem",
//                     borderRadius: "0.75rem",
//                     border: "1px solid #e2e8f0",
//                   }}
//                 />
//               </div>
//               <div style={{ display: "grid", gap: "0.5rem" }}>
//                 <label style={{ fontWeight: 600 }}>Spesifikasi (JSON)</label>
//                 <textarea
//                   name="specs"
//                   value={formData.specs}
//                   onChange={handleFormChange}
//                   rows={4}
//                   style={{
//                     padding: "0.75rem 1rem",
//                     borderRadius: "0.75rem",
//                     border: "1px solid #e2e8f0",
//                     fontFamily: "monospace",
//                   }}
//                 />
//                 <small style={{ color: "#94a3b8" }}>
//                   Contoh: {'{ "chip": "A17 Pro", "battery": "4000mAh" }'}
//                 </small>
//               </div>
//               {formError && (
//                 <div
//                   style={{
//                     background: "#fee2e2",
//                     color: "#dc2626",
//                     padding: "0.75rem 1rem",
//                     borderRadius: "0.75rem",
//                   }}
//                 >
//                   {formError}
//                 </div>
//               )}
//               <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
//                 <button
//                   type="submit"
//                   className="btn btn-primary"
//                   disabled={isSubmitting}
//                   style={{ minWidth: "150px" }}
//                 >
//                   {isSubmitting
//                     ? "Menyimpan..."
//                     : editingProduct
//                     ? "Simpan Perubahan"
//                     : "Tambah Produk"}
//                 </button>
//                 {editingProduct && (
//                   <button
//                     type="button"
//                     className="btn"
//                     style={{
//                       background: "#f1f5f9",
//                       color: "#0f172a",
//                       fontWeight: 600,
//                     }}
//                     onClick={() => {
//                       setEditingProduct(null);
//                       setFormData(initialFormState);
//                     }}
//                   >
//                     Batal Edit
//                   </button>
//                 )}
//               </div>
//             </form>
//           )}
//         </div>

//         {/* Search Bar */}
//         <div style={{ marginBottom: "2rem" }}>
//           <div
//             style={{
//               background: "white",
//               padding: "1rem",
//               borderRadius: "1rem",
//               boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
//               marginBottom: "1.5rem",
//             }}
//           >
//             <div style={{ position: "relative" }}>
//               <Search
//                 style={{
//                   position: "absolute",
//                   left: "1rem",
//                   top: "50%",
//                   transform: "translateY(-50%)",
//                   color: "#94a3b8",
//                 }}
//                 size={20}
//               />
//               <input
//                 type="text"
//                 placeholder="Cari produk..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 style={{
//                   width: "100%",
//                   padding: "0.75rem 1rem 0.75rem 3rem",
//                   border: "2px solid #e2e8f0",
//                   borderRadius: "0.75rem",
//                   fontSize: "1rem",
//                   outline: "none",
//                 }}
//               />
//             </div>
//           </div>

//           {/* Category Filter */}
//           <div
//             style={{
//               display: "flex",
//               gap: "0.75rem",
//               overflowX: "auto",
//               paddingBottom: "0.5rem",
//             }}
//           >
//             {availableCategories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setSelectedCategory(cat)}
//                 style={{
//                   background:
//                     selectedCategory === cat
//                       ? "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)"
//                       : "white",
//                   color: selectedCategory === cat ? "white" : "#64748b",
//                   border:
//                     selectedCategory === cat ? "none" : "2px solid #e2e8f0",
//                   padding: "0.5rem 1.5rem",
//                   borderRadius: "0.75rem",
//                   cursor: "pointer",
//                   fontSize: "0.875rem",
//                   fontWeight: "600",
//                   whiteSpace: "nowrap",
//                 }}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Products Grid */}
//         {loading && (
//           <div
//             style={{
//               textAlign: "center",
//               padding: "4rem 2rem",
//               color: "#64748b",
//             }}
//           >
//             Sedang memuat katalog produk...
//           </div>
//         )}

//         {error && !loading && (
//           <div
//             style={{
//               textAlign: "center",
//               padding: "4rem 2rem",
//               color: "#dc2626",
//             }}
//           >
//             {error}
//           </div>
//         )}

//         {!loading && !error && filteredProducts.length > 0 && (
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
//               gap: "2rem",
//             }}
//           >
//             {filteredProducts.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 product={product}
//                 onViewDetail={() => setSelectedProduct(product)}
//                 onToggleWishlist={onToggleWishlist}
//                 isInWishlist={isInWishlist}
//                 onAddToCart={onAddToCart}
//               />
//             ))}
//           </div>
//         )}

//         {!loading && !error && filteredProducts.length === 0 && (
//           <div
//             style={{
//               textAlign: "center",
//               padding: "4rem 2rem",
//               color: "#64748b",
//             }}
//           >
//             <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔍</div>
//             <h3
//               style={{
//                 fontSize: "1.5rem",
//                 fontWeight: "700",
//                 marginBottom: "0.5rem",
//               }}
//             >
//               Produk tidak ditemukan
//             </h3>
//             <p>Coba kata kunci atau kategori lain</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ProductsPage;

import ProductCard from "../components/ProductCard";
import { useState } from "react";
import { Search, PlusCircle, X, Edit2, Trash2 } from "lucide-react";

function ProductsPage({
  products = [],
  categories = [],
  loading = false,
  error = "",
  onToggleWishlist,
  isInWishlist,
  onAddToCart,
  onCreateProduct = async () => {},
  onUpdateProduct = async () => {},
  onDeleteProduct = async () => {},
}) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialFormState = {
    name: "",
    category: "",
    price: "",
    image: "",
    rating: "",
    description: "",
  };
  const [formData, setFormData] = useState(initialFormState);
  const [specFields, setSpecFields] = useState([]);

  const availableCategories = [
    "All",
    ...new Set(
      (categories.length
        ? categories
        : products.map((product) => product.category)) || []
    ),
  ];

  const filteredProducts = products.filter((product) => {
    const matchCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const openCreateForm = () => {
    setIsFormVisible(true);
    setEditingProduct(null);
    setFormData(initialFormState);
    setSpecFields([]);
    setFormError("");
  };

  const openEditForm = (product) => {
    setIsFormVisible(true);
    setEditingProduct(product);
    setFormError("");
    setFormData({
      name: product.name || "",
      category: product.category || "",
      price: product.price ?? "",
      image: product.image || "",
      rating: product.rating ?? "",
      description: product.description || "",
    });
    const specs = product.specs || {};
    setSpecFields(
      Object.entries(specs).map(([key, value]) => ({ key, value }))
    );
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    try {
      const parsedSpecs = {};
      specFields.forEach(({ key, value }) => {
        if (key.trim() && value.trim()) {
          parsedSpecs[key.trim()] = value.trim();
        }
      });

      const payload = {
        name: formData.name.trim(),
        category: formData.category.trim(),
        price: Number(formData.price),
        image: formData.image.trim(),
        rating: formData.rating === "" ? 0 : Number(formData.rating),
        description: formData.description.trim(),
        specs: parsedSpecs,
      };

      if (!payload.name || !payload.category || Number.isNaN(payload.price)) {
        throw new Error("Nama, kategori, dan harga wajib diisi dengan benar.");
      }

      if (Number.isNaN(payload.rating)) {
        throw new Error("Rating harus berupa angka.");
      }

      setIsSubmitting(true);
      if (editingProduct) {
        await onUpdateProduct(editingProduct.id, payload);
      } else {
        await onCreateProduct(payload);
      }
      setIsFormVisible(false);
      setEditingProduct(null);
      setFormData(initialFormState);
      setSpecFields([]);
      setSelectedProduct(null);
    } catch (err) {
      setFormError(err.message || "Gagal menyimpan data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (product) => {
    const confirmation = window.confirm(
      `Hapus ${product.name}? Data tidak bisa dikembalikan.`
    );
    if (!confirmation) return;
    try {
      await onDeleteProduct(product.id);
      setSelectedProduct(null);
    } catch (err) {
      alert(err.message || "Gagal menghapus produk.");
    }
  };

  if (selectedProduct) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          paddingBottom: "4rem",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
            padding: "2rem 0 4rem 0",
            color: "white",
          }}
        >
          <div className="container">
            <button
              onClick={() => setSelectedProduct(null)}
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                color: "white",
                border: "none",
                padding: "0.5rem 1.5rem",
                borderRadius: "0.5rem",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "600",
                marginBottom: "1.5rem",
                backdropFilter: "blur(10px)",
              }}
            >
              ← Kembali
            </button>
          </div>
        </div>

        <div className="container" style={{ marginTop: "-3rem" }}>
          <div className="card" style={{ padding: "2rem" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "3rem",
              }}
            >
              {/* Image Section */}
              <div>
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  style={{
                    width: "100%",
                    borderRadius: "1rem",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </div>

              {/* Product Info Section */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginBottom: "1rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        background:
                          "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
                        color: "white",
                        padding: "0.4rem 1rem",
                        borderRadius: "0.5rem",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                      }}
                    >
                      {selectedProduct.category}
                    </span>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        fontSize: "1rem",
                        fontWeight: "600",
                        color: "#64748b",
                      }}
                    >
                      ⭐ {selectedProduct.rating}
                    </span>
                  </div>
                  <h1
                    style={{
                      fontSize: "2rem",
                      fontWeight: "800",
                      marginBottom: "0.75rem",
                      color: "#0f172a",
                    }}
                  >
                    {selectedProduct.name}
                  </h1>
                  <div
                    style={{
                      fontSize: "2.25rem",
                      fontWeight: "800",
                      background:
                        "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      marginBottom: "1rem",
                    }}
                  >
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(selectedProduct.price)}
                  </div>
                </div>

                <div>
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: "700",
                      marginBottom: "0.5rem",
                      color: "#0f172a",
                    }}
                  >
                    Deskripsi
                  </h3>
                  <p
                    style={{
                      color: "#64748b",
                      lineHeight: "1.75",
                    }}
                  >
                    {selectedProduct.description || "Tidak ada deskripsi"}
                  </p>
                </div>

                {Object.keys(selectedProduct.specs).length > 0 && (
                  <div>
                    <h3
                      style={{
                        fontSize: "1rem",
                        fontWeight: "700",
                        marginBottom: "0.75rem",
                        color: "#0f172a",
                      }}
                    >
                      Spesifikasi
                    </h3>
                    <div
                      style={{
                        display: "grid",
                        gap: "0.5rem",
                      }}
                    >
                      {Object.entries(selectedProduct.specs).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "0.75rem",
                              background: "#f8fafc",
                              borderRadius: "0.5rem",
                            }}
                          >
                            <span
                              style={{
                                color: "#64748b",
                                textTransform: "capitalize",
                                fontWeight: "500",
                              }}
                            >
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </span>
                            <span
                              style={{
                                fontWeight: "600",
                                color: "#1e293b",
                              }}
                            >
                              {value}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    marginTop: "auto",
                  }}
                >
                  <button
                    className="btn btn-primary"
                    style={{
                      width: "100%",
                      fontSize: "1.125rem",
                      padding: "1rem",
                    }}
                    onClick={() => {
                      const confirmation = window.confirm(
                        `🛒 Beli ${
                          selectedProduct.name
                        }?\n\nHarga: ${new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(selectedProduct.price)}`
                      );
                      if (confirmation) {
                        alert(
                          "✅ Pesanan berhasil! Kami akan segera menghubungi Anda."
                        );
                      }
                    }}
                  >
                    🛒 Beli Sekarang
                  </button>
                  <button
                    className="btn"
                    style={{
                      width: "100%",
                      background: "#0f172a",
                      color: "white",
                      fontWeight: "600",
                      padding: "1rem",
                      borderRadius: "0.75rem",
                    }}
                    onClick={() => onAddToCart(selectedProduct)}
                  >
                    + Tambah ke Keranjang
                  </button>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      className="btn"
                      style={{
                        flex: 1,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        background: "#eef2ff",
                        color: "#4338ca",
                        fontWeight: 600,
                      }}
                      onClick={() => openEditForm(selectedProduct)}
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>
                    <button
                      className="btn"
                      style={{
                        flex: 1,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        background: "#fee2e2",
                        color: "#dc2626",
                        fontWeight: 600,
                      }}
                      onClick={() => handleDeleteProduct(selectedProduct)}
                    >
                      <Trash2 size={16} />
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        paddingBottom: "4rem",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
          padding: "3rem 0",
          color: "white",
        }}
      >
        <div className="container">
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "800",
              marginBottom: "0.5rem",
            }}
          >
            Semua Produk
          </h1>
          <p style={{ fontSize: "1.125rem", opacity: 0.9 }}>
            {loading
              ? "Memuat produk..."
              : `${filteredProducts.length} produk tersedia`}
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: "2rem 1rem" }}>
        <div className="card" style={{ marginBottom: "2rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>
                {editingProduct ? "Edit Produk" : "Tambah Produk"}
              </h3>
              <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
                Lengkapi form berikut untuk{" "}
                {editingProduct ? "memperbarui" : "menambah"} produk.
              </p>
            </div>
            <button
              className="btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                background: isFormVisible ? "#fee2e2" : "#eef2ff",
                color: isFormVisible ? "#dc2626" : "#4338ca",
                fontWeight: 600,
              }}
              onClick={() => {
                if (isFormVisible && editingProduct) {
                  setEditingProduct(null);
                  setFormData(initialFormState);
                  setSpecFields([]);
                  setFormError("");
                }
                setIsFormVisible((prev) => !prev);
              }}
            >
              {isFormVisible ? <X size={18} /> : <PlusCircle size={18} />}
              {isFormVisible ? "Tutup" : "Tambah Produk"}
            </button>
          </div>
          {isFormVisible && (
            <div style={{ display: "grid", gap: "1rem" }}>
              <div style={{ display: "grid", gap: "0.5rem" }}>
                <label style={{ fontWeight: 600 }}>Nama Produk</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  style={{
                    padding: "0.75rem 1rem",
                    borderRadius: "0.75rem",
                    border: "1px solid #e2e8f0",
                  }}
                />
              </div>
              <div style={{ display: "grid", gap: "0.5rem" }}>
                <label style={{ fontWeight: 600 }}>Kategori</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  required
                  style={{
                    padding: "0.75rem 1rem",
                    borderRadius: "0.75rem",
                    border: "1px solid #e2e8f0",
                  }}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gap: "1rem",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                }}
              >
                <div style={{ display: "grid", gap: "0.5rem" }}>
                  <label style={{ fontWeight: 600 }}>Harga (IDR)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleFormChange}
                    required
                    min="0"
                    style={{
                      padding: "0.75rem 1rem",
                      borderRadius: "0.75rem",
                      border: "1px solid #e2e8f0",
                    }}
                  />
                </div>
                <div style={{ display: "grid", gap: "0.5rem" }}>
                  <label style={{ fontWeight: 600 }}>Rating (0-5)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    name="rating"
                    value={formData.rating}
                    onChange={handleFormChange}
                    style={{
                      padding: "0.75rem 1rem",
                      borderRadius: "0.75rem",
                      border: "1px solid #e2e8f0",
                    }}
                  />
                </div>
              </div>
              <div style={{ display: "grid", gap: "0.5rem" }}>
                <label style={{ fontWeight: 600 }}>URL Gambar</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleFormChange}
                  style={{
                    padding: "0.75rem 1rem",
                    borderRadius: "0.75rem",
                    border: "1px solid #e2e8f0",
                  }}
                />
              </div>
              <div style={{ display: "grid", gap: "0.5rem" }}>
                <label style={{ fontWeight: 600 }}>Deskripsi</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows={3}
                  style={{
                    padding: "0.75rem 1rem",
                    borderRadius: "0.75rem",
                    border: "1px solid #e2e8f0",
                  }}
                />
              </div>
              <div style={{ display: "grid", gap: "0.75rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <label style={{ fontWeight: 600 }}>Spesifikasi</label>
                  <button
                    type="button"
                    className="btn"
                    style={{
                      padding: "0.4rem 1rem",
                      background: "#eef2ff",
                      color: "#4338ca",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                    }}
                    onClick={() =>
                      setSpecFields([...specFields, { key: "", value: "" }])
                    }
                  >
                    + Tambah Spesifikasi
                  </button>
                </div>
                {specFields.map((spec, index) => (
                  <div
                    key={index}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr auto",
                      gap: "0.5rem",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Nama (cth: Chip)"
                      value={spec.key}
                      onChange={(e) => {
                        const updated = [...specFields];
                        updated[index].key = e.target.value;
                        setSpecFields(updated);
                      }}
                      style={{
                        padding: "0.75rem 1rem",
                        borderRadius: "0.75rem",
                        border: "1px solid #e2e8f0",
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Nilai (cth: A17 Pro)"
                      value={spec.value}
                      onChange={(e) => {
                        const updated = [...specFields];
                        updated[index].value = e.target.value;
                        setSpecFields(updated);
                      }}
                      style={{
                        padding: "0.75rem 1rem",
                        borderRadius: "0.75rem",
                        border: "1px solid #e2e8f0",
                      }}
                    />
                    <button
                      type="button"
                      style={{
                        padding: "0.75rem",
                        background: "#fee2e2",
                        color: "#dc2626",
                        border: "none",
                        borderRadius: "0.75rem",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                      onClick={() => {
                        const updated = specFields.filter(
                          (_, i) => i !== index
                        );
                        setSpecFields(updated);
                      }}
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
                {specFields.length === 0 && (
                  <p
                    style={{
                      color: "#94a3b8",
                      fontSize: "0.875rem",
                      fontStyle: "italic",
                    }}
                  >
                    Belum ada spesifikasi. Klik tombol di atas untuk menambah.
                  </p>
                )}
              </div>
              {formError && (
                <div
                  style={{
                    background: "#fee2e2",
                    color: "#dc2626",
                    padding: "0.75rem 1rem",
                    borderRadius: "0.75rem",
                  }}
                >
                  {formError}
                </div>
              )}
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                  style={{ minWidth: "150px" }}
                  onClick={handleFormSubmit}
                >
                  {isSubmitting
                    ? "Menyimpan..."
                    : editingProduct
                    ? "Simpan Perubahan"
                    : "Tambah Produk"}
                </button>
                {editingProduct && (
                  <button
                    type="button"
                    className="btn"
                    style={{
                      background: "#f1f5f9",
                      color: "#0f172a",
                      fontWeight: 600,
                    }}
                    onClick={() => {
                      setEditingProduct(null);
                      setFormData(initialFormState);
                      setSpecFields([]);
                    }}
                  >
                    Batal Edit
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: "2rem" }}>
          <div
            style={{
              background: "white",
              padding: "1rem",
              borderRadius: "1rem",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              marginBottom: "1.5rem",
            }}
          >
            <div style={{ position: "relative" }}>
              <Search
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#94a3b8",
                }}
                size={20}
              />
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem 0.75rem 3rem",
                  border: "2px solid #e2e8f0",
                  borderRadius: "0.75rem",
                  fontSize: "1rem",
                  outline: "none",
                }}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              overflowX: "auto",
              paddingBottom: "0.5rem",
            }}
          >
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  background:
                    selectedCategory === cat
                      ? "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)"
                      : "white",
                  color: selectedCategory === cat ? "white" : "#64748b",
                  border:
                    selectedCategory === cat ? "none" : "2px solid #e2e8f0",
                  padding: "0.5rem 1.5rem",
                  borderRadius: "0.75rem",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  whiteSpace: "nowrap",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading && (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 2rem",
              color: "#64748b",
            }}
          >
            Sedang memuat katalog produk...
          </div>
        )}

        {error && !loading && (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 2rem",
              color: "#dc2626",
            }}
          >
            {error}
          </div>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {filteredProducts.map((product) => (
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

        {!loading && !error && filteredProducts.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 2rem",
              color: "#64748b",
            }}
          >
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔍</div>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                marginBottom: "0.5rem",
              }}
            >
              Produk tidak ditemukan
            </h3>
            <p>Coba kata kunci atau kategori lain</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
