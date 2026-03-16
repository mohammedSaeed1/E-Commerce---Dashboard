import axios from "axios"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import * as Yup from "yup"

const BASE_URL = "https://nti-ecommerce.vercel.app/api/v1/products";

export default function Products() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [mode, setMode] = useState(null) 
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [coverPreview, setCoverPreview] = useState(null)
  const [imagesPreview, setImagesPreview] = useState([])

  // ── FORMIK ──
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      price:"",
      description:"",
      stock: "",
      category: "",
      subCategory: "",
      brand: "",
      imageCover:"",
      images: [],
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required").min(2, "At least 2 characters"),
      price: Yup.number().required("Price is required").min(0, "Must be positive"),
      description: Yup.string().required("Description is required").min(5, "At least 5 characters"),
      stock: Yup.number().required("Stock is required").min(0, "Must be positive"),
      category: Yup.string().required("Category is required").length(24, "Invalid ID"),
      subCategory: Yup.string().required("SubCategory is required").length(24, "Invalid ID"),
      brand: Yup.string().required("Brand is required").length(24, "Invalid ID"),
    }),
    onSubmit: (values) => {
      mode === "add" ? addProduct(values) : updateProduct(values)
    },
  })

  function getAllProducts() {
    setLoading(true)
    axios.get(`${BASE_URL}`)
      .then(res => {
        console.log(res.data);
        setProducts(res.data.Products)
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }

  function addProduct(values) {
    setSubmitLoading(true)
    const formData = new FormData()
    formData.append("title", values.title)
    formData.append("price", values.price)
    formData.append("description", values.description)
    formData.append("stock", values.stock)
    formData.append("category", values.category)
    formData.append("subCategory", values.subCategory)
    formData.append("brand", values.brand)
    if (values.imageCover) formData.append("imageCover", values.imageCover)
    values.images.forEach(img => formData.append("images", img))
    axios.post(`${BASE_URL}`, formData)
      .then((res) => { getAllProducts(); closeModal(); console.log(res.data); })
      .catch(err => console.error(err))
      .finally(() => setSubmitLoading(false))
  }

  function updateProduct(values) {
    setSubmitLoading(true)
    const formData = new FormData()
    formData.append("title", values.title)
    formData.append("price", values.price)
    formData.append("description", values.description)
    formData.append("stock", values.stock)
    formData.append("category", values.category)
    formData.append("subCategory", values.subCategory)
    formData.append("brand", values.brand)
    if (values.imageCover) formData.append("imageCover", values.imageCover)
    values.images.forEach(img => formData.append("images", img))
    axios.put(`${BASE_URL}/products/${selectedProduct._id}`, formData)
      .then(() => { getAllProducts(); closeModal() })
      .catch(err => console.error(err))
      .finally(() => setSubmitLoading(false))
  }

  function deleteProduct() {
    axios.delete(`${BASE_URL}/${selectedProduct._id}`)
      .then(() => { getAllProducts(); setShowDeleteModal(false) })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  // ── HELPERS ──
  function openAdd() {
    setSelectedProduct(null)
    setCoverPreview(null)
    setImagesPreview([])
    setMode("add")
  }

  function openEdit(product) {
    setSelectedProduct(product)
    setCoverPreview(product.imageCover || null)
    setImagesPreview(product.images || [])
    setMode("update")
  }

  function openDelete(product) {
    setSelectedProduct(product)
    setShowDeleteModal(true)
  }

  function closeModal() {
    setMode(null)
    setSelectedProduct(null)
    setCoverPreview(null)
    setImagesPreview([])
    formik.resetForm()
  }

  function handleCoverChange(e) {
    const file = e.target.files[0]
    if (file) {
      formik.setFieldValue("imageCover", file)
      setCoverPreview(URL.createObjectURL(file))
    }
  }

  function handleImagesChange(e) {
    const files = Array.from(e.target.files).slice(0, 20)
    formik.setFieldValue("images", files)
    setImagesPreview(files.map(f => URL.createObjectURL(f)))
  }

  function removeImage(index) {
    const updatedFiles = formik.values.images.filter((_, i) => i !== index)
    const updatedPreviews = imagesPreview.filter((_, i) => i !== index)
    formik.setFieldValue("images", updatedFiles)
    setImagesPreview(updatedPreviews)
  }

  // ── UI HELPERS ──
  const Err = ({ msg }) => (
    <p className="text-[11px] text-[rgba(187,225,250,0.6)] mt-1.5 pl-1 flex items-center gap-1">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(187,225,250,0.6)" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      </svg>
      {msg}
    </p>
  )

  const inputClass = (field) =>
    `w-full px-4 py-2.5 bg-[rgba(27,38,44,0.7)] rounded-xl text-[#bbe1fa] text-[13px] outline-none placeholder:text-[rgba(187,225,250,0.2)] border ${formik.touched[field] && formik.errors[field] ? "border-[rgba(187,225,250,0.4)]" : "border-[rgba(50,130,184,0.2)]"}`



  const Label = ({ text, required }) => (
    <label className="block text-[11px] font-semibold tracking-widest uppercase text-[rgba(187,225,250,0.5)] mb-1.5">
      {text} {required && <span className="text-[#3282b8]">*</span>}
    </label>
  )

  const SectionCard = ({ icon, title, children }) => (
    <div className="bg-[#0f4c75] border border-[rgba(50,130,184,0.2)] rounded-2xl p-5">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-7 h-7 bg-[rgba(50,130,184,0.2)] rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <span className="text-[13px] font-bold text-[#bbe1fa]">{title}</span>
      </div>
      {children}
    </div>
  )

  return (
    <div className="bg-[#1b262c] min-h-screen p-4 md:p-6">

      {/* PAGE HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <div className="text-xl font-bold text-[#bbe1fa]">Products</div>
          <div className="text-[13px] text-[rgba(187,225,250,0.4)] mt-1">Manage your store products</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[rgba(50,130,184,0.1)] border border-[rgba(50,130,184,0.2)] rounded-full px-3.5 py-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3282b8" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" />
            </svg>
            <span className="text-[12px] font-semibold text-[#3282b8]">{products.length} Products</span>
          </div>
          <div onClick={openAdd} className="flex items-center gap-1.5 bg-[#3282b8] rounded-xl px-4 py-2 cursor-pointer hover:opacity-90 transition-opacity">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#bbe1fa" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-[12px] font-semibold text-[#bbe1fa]">Add Product</span>
          </div>
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex items-center justify-center gap-3 py-20">
          <div className="w-6 h-6 border-2 border-[#3282b8] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-[13px] text-[rgba(187,225,250,0.4)]">Loading products...</span>
        </div>
      )}

      {/* EMPTY */}
      {!loading && products.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#0f4c75] border border-[rgba(50,130,184,0.2)] flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(187,225,250,0.3)" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" />
            </svg>
          </div>
          <p className="text-[14px] text-[rgba(187,225,250,0.35)]">No products yet</p>
          <div onClick={openAdd} className="text-[13px] text-[#3282b8] cursor-pointer hover:underline">+ Add your first product</div>
        </div>
      )}

      {/* PRODUCTS GRID */}
      {!loading && products.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product, i) => (
            <div key={product._id || i} className="bg-[#0f4c75] border border-[rgba(50,130,184,0.2)] rounded-2xl overflow-hidden hover:border-[rgba(50,130,184,0.45)] transition-all group">

              {/* Image */}
              <div className="relative w-full aspect-square bg-[rgba(27,38,44,0.6)]">
                {product.imageCover ? (
                  <img src={product.imageCover} alt={product.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(50,130,184,0.4)" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}

                {/* Hover actions */}
                <div className="absolute inset-0 bg-[rgba(15,30,40,0.75)] opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                  <div onClick={() => openEdit(product)} className="w-9 h-9 rounded-xl bg-[#3282b8] flex items-center justify-center cursor-pointer hover:opacity-80 transition-all">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#bbe1fa" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div onClick={() => openDelete(product)} className="w-9 h-9 rounded-xl bg-[rgba(27,38,44,0.9)] border border-[rgba(187,225,250,0.15)] flex items-center justify-center cursor-pointer hover:opacity-80 transition-all">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(187,225,250,0.7)" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                </div>

                {/* Stock badge */}
                <div className="absolute top-2 right-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${product.stock > 0 ? "bg-[rgba(50,130,184,0.9)] text-[#bbe1fa]" : "bg-[rgba(27,38,44,0.9)] text-[rgba(187,225,250,0.5)]"}`}>
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="px-3 py-2.5">
                <div className="text-[13px] font-semibold text-[#bbe1fa] truncate">{product.title}</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[13px] font-bold text-[#3282b8]">${product.price}</span>
                  <span className="text-[11px] text-[rgba(187,225,250,0.35)] truncate ml-2">
                    {product.category?.name || ""}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD / UPDATE MODAL */}
      {mode && (
        <div onClick={closeModal} className="fixed inset-0 bg-[rgba(15,30,40,0.85)] flex items-center justify-center z-50 px-4 py-6">
          <div onClick={(e) => e.stopPropagation()} className="bg-[#1b262c] border border-[rgba(50,130,184,0.25)] rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(50,130,184,0.2)] sticky top-0 bg-[#1b262c] z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#3282b8] flex items-center justify-center">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#bbe1fa" strokeWidth="2">
                    {mode === "add"
                      ? <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      : <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    }
                  </svg>
                </div>
                <span className="text-[14px] font-bold text-[#bbe1fa]">
                  {mode === "add" ? "Add New Product" : `Update — ${selectedProduct?.title}`}
                </span>
              </div>
              <div onClick={closeModal} className="w-7 h-7 rounded-lg bg-[rgba(27,38,44,0.7)] border border-[rgba(50,130,184,0.2)] flex items-center justify-center cursor-pointer hover:bg-[rgba(27,38,44,0.9)] transition-all">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(187,225,250,0.5)" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="p-5 grid grid-cols-1 md:grid-cols-[1fr_260px] gap-5">

                {/* LEFT */}
                <div className="flex flex-col gap-4">

                  {/* Basic Info */}
                  <SectionCard
                    icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3282b8" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                    title="Basic Information"
                  >
                    <div className="mb-4">
                      <Label text="Product Title" required />
                      <input type="text" name="title" placeholder="e.g. iPhone 15 Pro" value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur} className={inputClass("title")} />
                      {formik.touched.title && formik.errors.title && <Err msg={formik.errors.title} />}
                    </div>
                    <div>
                      <Label text="Description" required />
                      <textarea name="description" placeholder="Write a product description..." rows={3} value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`${inputClass("description")} resize-none`} />
                      {formik.touched.description && formik.errors.description && <Err msg={formik.errors.description} />}
                    </div>
                  </SectionCard>

                  {/* Price & Stock */}
                  <SectionCard
                    icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3282b8" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                    title="Pricing & Stock"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label text="Price" required />
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] text-[rgba(187,225,250,0.4)] font-semibold">$</span>
                          <input type="number" name="price" placeholder="0.00" min="0" step="0.01" value={formik.values.price} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`${inputClass("price")} pl-7`} />
                        </div>
                        {formik.touched.price && formik.errors.price && <Err msg={formik.errors.price} />}
                      </div>
                      <div>
                        <Label text="Stock" required />
                        <input type="number" name="stock" placeholder="0" min="0" value={formik.values.stock} onChange={formik.handleChange} onBlur={formik.handleBlur} className={inputClass("stock")} />
                        {formik.touched.stock && formik.errors.stock && <Err msg={formik.errors.stock} />}
                      </div>
                    </div>
                  </SectionCard>

    
                </div>

                {/* RIGHT — Images */}
                <div className="flex flex-col gap-4">

                  {/* Cover */}
                  <div className="bg-[#0f4c75] border border-[rgba(50,130,184,0.2)] rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-[rgba(50,130,184,0.2)] rounded-lg flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3282b8" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-[12px] font-bold text-[#bbe1fa]">Cover Image</span>
                    </div>

                    <label htmlFor="imageCover" className="block cursor-pointer">
                      <div className={`w-full aspect-square rounded-xl border-[1.5px] border-dashed overflow-hidden flex flex-col items-center justify-center transition-all ${coverPreview ? "border-[rgba(50,130,184,0.4)]" : "border-[rgba(50,130,184,0.25)] hover:border-[rgba(50,130,184,0.5)] bg-[rgba(27,38,44,0.4)] hover:bg-[rgba(27,38,44,0.6)]"}`}>
                        {coverPreview ? (
                          <img src={coverPreview} alt="cover" className="w-full h-full object-cover" />
                        ) : (
                          <div className="flex flex-col items-center gap-2 p-3 text-center">
                            <div className="w-10 h-10 bg-[rgba(50,130,184,0.15)] rounded-xl flex items-center justify-center">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3282b8" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                              </svg>
                            </div>
                            <span className="text-[11px] text-[rgba(187,225,250,0.4)]">Upload cover</span>
                          </div>
                        )}
                      </div>
                    </label>
                    <input id="imageCover" type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />
                    {coverPreview && (
                      <div onClick={() => { formik.setFieldValue("imageCover", null); setCoverPreview(null) }} className="flex items-center justify-center gap-1.5 mt-2 text-[11px] text-[rgba(187,225,250,0.4)] cursor-pointer hover:text-[rgba(187,225,250,0.7)] transition-all">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        Remove
                      </div>
                    )}
                  </div>

                  {/* Extra Images */}
                  <div className="bg-[#0f4c75] border border-[rgba(50,130,184,0.2)] rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-[rgba(50,130,184,0.2)] rounded-lg flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3282b8" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                            <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                          </svg>
                        </div>
                        <span className="text-[12px] font-bold text-[#bbe1fa]">Images</span>
                      </div>
                      <span className="text-[10px] text-[rgba(187,225,250,0.35)] bg-[rgba(27,38,44,0.5)] px-2 py-0.5 rounded-full">
                        {imagesPreview.length}/20
                      </span>
                    </div>

                    <label htmlFor="images" className="flex items-center justify-center gap-2 py-3 border-[1.5px] border-dashed border-[rgba(50,130,184,0.25)] rounded-xl bg-[rgba(27,38,44,0.4)] hover:border-[rgba(50,130,184,0.5)] hover:bg-[rgba(27,38,44,0.6)] cursor-pointer transition-all mb-3">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3282b8" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      <span className="text-[11px] text-[rgba(187,225,250,0.4)]">Upload images</span>
                    </label>
                    <input id="images" type="file" accept="image/*" multiple className="hidden" onChange={handleImagesChange} />

                    {imagesPreview.length > 0 && (
                      <div className="grid grid-cols-3 gap-1.5">
                        {imagesPreview.map((src, i) => (
                          <div key={i} className="relative group aspect-square rounded-lg overflow-hidden bg-[rgba(27,38,44,0.5)]">
                            <img src={src} alt={`img-${i}`} className="w-full h-full object-cover" />
                            <div onClick={() => removeImage(i)} className="absolute inset-0 bg-[rgba(15,30,40,0.7)] opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-all">
                              <div className="w-6 h-6 bg-[rgba(27,38,44,0.9)] rounded-lg flex items-center justify-center">
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(187,225,250,0.8)" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitLoading}
                    className="w-full py-3 bg-[#3282b8] rounded-xl text-[#bbe1fa] text-[13px] font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity border-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#bbe1fa] border-t-transparent rounded-full animate-spin"></div>
                        {mode === "add" ? "Adding..." : "Saving..."}
                      </>
                    ) : (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#bbe1fa" strokeWidth="2.2">
                          {mode === "add"
                            ? <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            : <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          }
                        </svg>
                        {mode === "add" ? "Add Product" : "Save Changes"}
                      </>
                    )}
                  </button>

                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDeleteModal && selectedProduct && (
        <div onClick={() => setShowDeleteModal(false)} className="fixed inset-0 bg-[rgba(15,30,40,0.85)] flex items-center justify-center z-50 px-4">
          <div onClick={(e) => e.stopPropagation()} className="bg-[#0f4c75] border border-[rgba(50,130,184,0.25)] rounded-2xl p-6 w-full max-w-xs text-center">
            <div className="w-12 h-12 rounded-2xl bg-[rgba(27,38,44,0.8)] border border-[rgba(50,130,184,0.15)] flex items-center justify-center mx-auto mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(187,225,250,0.4)" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            {selectedProduct.imageCover && (
              <img src={selectedProduct.imageCover} alt={selectedProduct.title} className="w-16 h-16 rounded-xl object-cover mx-auto mb-3" />
            )}
            <div className="text-[15px] font-bold text-[#bbe1fa] mb-1.5">Delete Product?</div>
            <div className="text-[13px] text-[rgba(187,225,250,0.4)] leading-relaxed mb-5">
              Are you sure you want to delete{" "}
              <span className="text-[#bbe1fa] font-semibold">{selectedProduct.title}</span>?
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div onClick={deleteProduct} className="py-2.5 bg-[rgba(187,225,250,0.08)] border border-[rgba(187,225,250,0.15)] rounded-xl text-[rgba(187,225,250,0.6)] text-[13px] font-semibold cursor-pointer hover:bg-[rgba(187,225,250,0.12)] transition-all">
                Yes, Delete
              </div>
              <div onClick={() => setShowDeleteModal(false)} className="py-2.5 bg-[#3282b8] rounded-xl text-[#bbe1fa] text-[13px] font-semibold cursor-pointer hover:opacity-90 transition-opacity">
                Keep it
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}