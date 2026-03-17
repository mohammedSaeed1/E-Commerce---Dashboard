import axios from "axios"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import * as Yup from "yup"

const BASE_URL = "https://nti-ecommerce.vercel.app/api/v1/categories"

export default function Categories() {

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [mode, setMode] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: selectedCategory?.name || "",
      image: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required").min(2, "At least 2 characters"),
      image: mode === "add" ? Yup.mixed().required("Image is required") : Yup.mixed(),
    }),
    onSubmit: (values) => {
      mode === "add" ? addCategory(values) : updateCategory(values)
    },
  })

  function getAllCategories() {
    setLoading(true)
    axios.get(BASE_URL)
      .then((res) => {
        setCategories(res.data.categories)
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }

  function addCategory(values) {
    const formData = new FormData()
    formData.append("name", values.name)
    if (values.image) formData.append("image", values.image)
    axios.post(BASE_URL, formData)
      .then(() => { getAllCategories(); closeModal() })
      .catch((err) => console.error(err))
  }

  function updateCategory(values) {
    axios.put(`${BASE_URL}/${selectedCategory._id}`, { name: values.name })
      .then(() => { getAllCategories(); closeModal() })
      .catch((err) => console.error(err))
  }

  function deleteCategory() {
    axios.delete(`${BASE_URL}/${selectedCategory._id}`)
      .then(() => { getAllCategories(); setShowDeleteModal(false) })
      .catch((err) => console.error(err))
  }

  useEffect(() => { getAllCategories() }, [])

  function openAdd() {
    setSelectedCategory(null)
    setImagePreview(null)
    setMode("add")
  }

  function openEdit(cat) {
    setSelectedCategory(cat)
    setImagePreview(null)
    setMode("update")
  }

  function openDelete(cat) {
    setSelectedCategory(cat)
    setShowDeleteModal(true)
  }

  function closeModal() {
    setMode(null)
    setSelectedCategory(null)
    setImagePreview(null)
    formik.resetForm()
  }

  function handleImageChange(e) {
    const file = e.target.files[0]
    if (file) {
      formik.setFieldValue("image", file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const Err = ({ msg }) => (
    <p className="text-[11px] text-[rgba(187,225,250,0.6)] mt-1.5 pl-1">{msg}</p>
  )

  return (
    <div className="bg-[#1b262c] min-h-screen p-4 md:p-6">

      {/* PAGE HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <div className="text-xl font-bold text-[#bbe1fa]">Categories</div>
          <div className="text-[13px] text-[rgba(187,225,250,0.4)] mt-1">Manage your store product categories</div>
        </div>
        <div className="flex items-center gap-2 bg-[rgba(50,130,184,0.1)] border border-[rgba(50,130,184,0.2)] rounded-full px-3.5 py-1.5">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3282b8" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span className="text-[12px] font-semibold text-[#3282b8]">{categories.length} Categories</span>
        </div>
      </div>

      {/* TOP BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2 bg-[#0f4c75] border border-[rgba(50,130,184,0.2)] rounded-xl px-3 py-2">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(187,225,250,0.4)" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search categories..."
            className="bg-transparent border-none outline-none text-[#bbe1fa] text-[13px] w-36 sm:w-52 placeholder:text-[rgba(187,225,250,0.25)]"
          />
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-[12px] text-[rgba(187,225,250,0.45)] bg-[#0f4c75] border border-[rgba(50,130,184,0.15)] rounded-full px-3 py-1.5">
            {categories.length} total
          </span>
          <div onClick={openAdd} className="flex items-center gap-1.5 bg-[#3282b8] rounded-xl px-4 py-2 cursor-pointer hover:opacity-90 transition-opacity">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#bbe1fa" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-[12px] font-semibold text-[#bbe1fa]">Add Category</span>
          </div>
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex items-center justify-center gap-3 py-20">
          <div className="w-6 h-6 border-2 border-[#3282b8] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-[13px] text-[rgba(187,225,250,0.4)]">Loading categories...</span>
        </div>
      )}

      {/* EMPTY */}
      {!loading && categories.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#0f4c75] border border-[rgba(50,130,184,0.2)] flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(187,225,250,0.3)" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <p className="text-[14px] text-[rgba(187,225,250,0.35)]">No categories yet</p>
          <div onClick={openAdd} className="text-[13px] text-[#3282b8] cursor-pointer hover:underline">+ Add your first category</div>
        </div>
      )}

      {/* CARDS GRID */}
      {!loading && categories.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <div
              key={cat._id || i}
              className="bg-[#0f4c75] border border-[rgba(50,130,184,0.2)] rounded-2xl overflow-hidden hover:border-[rgba(50,130,184,0.45)] transition-all group"
            >
              {/* Image */}
              <div className="relative w-full aspect-square bg-[rgba(27,38,44,0.6)]">
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(50,130,184,0.4)" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}

                {/* Hover action overlay */}
                <div className="absolute inset-0 bg-[rgba(15,30,40,0.7)] opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                  <div
                    onClick={() => openEdit(cat)}
                    className="w-9 h-9 rounded-xl bg-[#3282b8] flex items-center justify-center cursor-pointer hover:opacity-80 transition-all"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#bbe1fa" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div
                    onClick={() => openDelete(cat)}
                    className="w-9 h-9 rounded-xl bg-[rgba(27,38,44,0.9)] border border-[rgba(187,225,250,0.15)] flex items-center justify-center cursor-pointer hover:opacity-80 transition-all"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(187,225,250,0.7)" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Name */}
              <div className="px-3 py-2.5">
                <div className="text-[13px] font-semibold text-[#bbe1fa] truncate">{cat.name}</div>
                <div className="text-[11px] text-[rgba(187,225,250,0.35)] mt-0.5 truncate">
                  {cat.slug || cat.name?.toLowerCase().replace(/\s+/g, "-")}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD / UPDATE MODAL */}
      {mode && (
        <div onClick={closeModal} className="fixed inset-0 bg-[rgba(15,30,40,0.85)] flex items-center justify-center z-50 px-4">
          <div onClick={(e) => e.stopPropagation()} className="bg-[#0f4c75] border border-[rgba(50,130,184,0.3)] rounded-2xl w-full max-w-sm max-h-[90vh] overflow-y-auto">

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(50,130,184,0.2)] sticky top-0 bg-[#0f4c75] z-10">
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
                  {mode === "add" ? "Add Category" : "Update Category"}
                </span>
              </div>
              <div onClick={closeModal} className="w-7 h-7 rounded-lg bg-[rgba(27,38,44,0.7)] border border-[rgba(50,130,184,0.2)] flex items-center justify-center cursor-pointer hover:bg-[rgba(27,38,44,0.9)] transition-all">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(187,225,250,0.5)" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>

            <div className="p-5">

              {/* Update banner */}
              {mode === "update" && selectedCategory && (
                <div className="flex items-center gap-3 bg-[rgba(27,38,44,0.5)] border border-[rgba(50,130,184,0.15)] rounded-xl p-3 mb-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-[rgba(50,130,184,0.2)]">
                    {selectedCategory.image
                      ? <img src={selectedCategory.image} alt={selectedCategory.name} className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3282b8" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                    }
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-semibold text-[#bbe1fa] truncate">{selectedCategory.name}</div>
                    <div className="text-[11px] text-[rgba(187,225,250,0.35)] mt-0.5">Editing this category</div>
                  </div>
                </div>
              )}

              <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">

                {/* Name */}
                <div>
                  <label className="block text-[11px] font-semibold tracking-widest uppercase text-[rgba(187,225,250,0.5)] mb-1.5">
                    Category Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Electronics"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-2.5 bg-[rgba(27,38,44,0.7)] rounded-xl text-[#bbe1fa] text-[13px] outline-none placeholder:text-[rgba(187,225,250,0.2)] border ${formik.touched.name && formik.errors.name ? "border-[rgba(187,225,250,0.4)]" : "border-[rgba(50,130,184,0.2)]"}`}
                  />
                  {formik.touched.name && formik.errors.name && <Err msg={formik.errors.name} />}
                </div>

                {/* Image — add only */}
                {mode === "add" && (
                  <div>
                    <label className="block text-[11px] font-semibold tracking-widest uppercase text-[rgba(187,225,250,0.5)] mb-1.5">
                      Category Image
                    </label>
                    <label htmlFor="image" className={`flex flex-col items-center justify-center gap-2 py-6 border-[1.5px] border-dashed rounded-xl cursor-pointer transition-all bg-[rgba(27,38,44,0.4)] hover:bg-[rgba(27,38,44,0.6)] ${formik.touched.image && formik.errors.image ? "border-[rgba(187,225,250,0.4)]" : "border-[rgba(50,130,184,0.25)] hover:border-[rgba(50,130,184,0.5)]"}`}>
                      {imagePreview ? (
                        <img src={imagePreview} alt="preview" className="w-20 h-20 rounded-xl object-cover" />
                      ) : (
                        <div className="w-10 h-10 bg-[rgba(50,130,184,0.15)] rounded-xl flex items-center justify-center">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3282b8" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      <span className="text-[12px] text-[rgba(187,225,250,0.45)]">
                        {imagePreview ? formik.values.image?.name : "Click to upload"}
                      </span>
                      {!imagePreview && <span className="text-[11px] text-[rgba(187,225,250,0.25)]">PNG, JPG up to 2MB</span>}
                    </label>
                    <input id="image" type="file" accept="image/*" className="hidden" onChange={handleImageChange} onBlur={formik.handleBlur} />
                    {formik.touched.image && formik.errors.image && <Err msg={formik.errors.image} />}
                    {imagePreview && (
                      <div
                        onClick={() => { formik.setFieldValue("image", null); setImagePreview(null) }}
                        className="flex items-center gap-1.5 mt-2 text-[11px] text-[rgba(187,225,250,0.4)] cursor-pointer hover:text-[rgba(187,225,250,0.7)] transition-all w-fit"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Remove image
                      </div>
                    )}
                  </div>
                )}

                {/* Buttons */}
                {mode === "add" ? (
                  <button type="submit" className="w-full py-3 bg-[#3282b8] rounded-xl text-[#bbe1fa] text-[13px] font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity border-none cursor-pointer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#bbe1fa" strokeWidth="2.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Category
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-2.5">
                    <div onClick={closeModal} className="py-3 bg-[rgba(27,38,44,0.7)] border border-[rgba(50,130,184,0.2)] rounded-xl text-[rgba(187,225,250,0.55)] text-[13px] font-semibold text-center cursor-pointer hover:bg-[rgba(27,38,44,0.9)] transition-all">
                      Cancel
                    </div>
                    <button type="submit" className="py-3 bg-[#3282b8] rounded-xl text-[#bbe1fa] text-[13px] font-semibold text-center hover:opacity-90 transition-opacity border-none w-full cursor-pointer">
                      Save Changes
                    </button>
                  </div>
                )}

              </form>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDeleteModal && selectedCategory && (
        <div onClick={() => setShowDeleteModal(false)} className="fixed inset-0 bg-[rgba(15,30,40,0.85)] flex items-center justify-center z-50 px-4">
          <div onClick={(e) => e.stopPropagation()} className="bg-[#0f4c75] border border-[rgba(50,130,184,0.25)] rounded-2xl p-6 w-full max-w-xs text-center">
            <div className="w-12 h-12 rounded-2xl bg-[rgba(27,38,44,0.8)] border border-[rgba(50,130,184,0.15)] flex items-center justify-center mx-auto mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(187,225,250,0.4)" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <div className="text-[15px] font-bold text-[#bbe1fa] mb-1.5">Delete Category?</div>
            <div className="text-[13px] text-[rgba(187,225,250,0.4)] leading-relaxed mb-5">
              Are you sure you want to delete{" "}
              <span className="text-[#bbe1fa] font-semibold">{selectedCategory.name}</span>?
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div onClick={deleteCategory} className="py-2.5 bg-[rgba(187,225,250,0.08)] border border-[rgba(187,225,250,0.15)] rounded-xl text-[rgba(187,225,250,0.6)] text-[13px] font-semibold cursor-pointer hover:bg-[rgba(187,225,250,0.12)] transition-all">
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