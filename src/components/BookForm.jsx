import React, { useState, useEffect } from "react";

const CATEGORIES = [
  "All",
  "Design & UX",
  "Programming",
  "Business & Management",
  "Recruitment",
  "Self Help",
  "History",
  "Football",
  "Science",
  "Novel"
];

const EMPTY = {
  title: "", author: "", category: "Programming",
  price: "", rating: 0, cover: "",
};

function BookForm({ initialData, onSave, onClose }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleStar = (s) => {
    setForm((p) => ({ ...p, rating: s }));
    if (errors.rating) setErrors((p) => ({ ...p, rating: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim())  e.title  = "Required";
    if (!form.author.trim()) e.author = "Required";
    if (!form.cover.trim())  e.cover  = "Image URL is required";
    if (!form.price || isNaN(+form.price) || +form.price < 0)
      e.price = "Invalid price";
    if (!form.rating) e.rating = "Required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    onSave({
      id: initialData ? initialData.id : Date.now().toString(),
      title:    form.title.trim(),
      author:   form.author.trim(),
      category: form.category,
      price:    parseInt(form.price, 10),
      rating:   form.rating,
      cover:    form.cover.trim(),
      favorite: initialData ? initialData.favorite : false,
    });
    setForm(EMPTY);
    setErrors({});
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, cover: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        
        <div className="modal-header">
          <div className="modal-header-text">
            <h2 className="modal-title">{initialData ? "Edit Book" : "Add Book"}</h2>
            <p className="modal-subtitle">{initialData ? "Update your book information below." : "Add a new book to your library."}</p>
          </div>
          <button className="modal-close" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          
          <div className="modal-body">
            {/* Row 1: Cover */}
            <div className="form-group" style={{ marginBottom: 24 }}>
              <label htmlFor="cover">Cover URL or Upload <span className="required-star">*</span></label>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div className="input-with-icon" style={{ flex: 1 }}>
                  <span className="input-icon-left">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </span>
                  <input
                    id="cover"
                    name="cover"
                    type="text"
                    placeholder="https://..."
                    value={form.cover}
                    onChange={handleChange}
                    style={errors.cover ? { borderColor: "var(--red)" } : {}}
                  />
                </div>
                <label className="btn-upload-cover">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Upload Cover
                  <input 
                    type="file" 
                    accept="image/*" 
                    style={{ display: 'none' }} 
                    onChange={handleFileUpload} 
                  />
                </label>
              </div>
              {errors.cover && <span className="form-error">{errors.cover}</span>}
            </div>

            {/* Row 2: Title & Author */}
            <div className="form-row">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="title">Title <span className="required-star">*</span></label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={form.title}
                  onChange={handleChange}
                  style={errors.title ? { borderColor: "var(--red)" } : {}}
                />
                {errors.title && <span className="form-error">{errors.title}</span>}
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="author">Author <span className="required-star">*</span></label>
                <input
                  id="author"
                  name="author"
                  type="text"
                  value={form.author}
                  onChange={handleChange}
                  style={errors.author ? { borderColor: "var(--red)" } : {}}
                />
                {errors.author && <span className="form-error">{errors.author}</span>}
              </div>
            </div>

            {/* Row 3: Category & Price */}
            <div className="form-row">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="category">Category <span className="required-star">*</span></label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  {CATEGORIES.map((c) => c !== "All" && (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="price">Price (NPR) <span className="required-star">*</span></label>
                <div className="input-with-prefix">
                  <span className="input-prefix">NPR</span>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="1"
                    value={form.price}
                    onChange={handleChange}
                    style={errors.price ? { borderColor: "var(--red)" } : {}}
                  />
                </div>
                {errors.price && <span className="form-error">{errors.price}</span>}
              </div>
            </div>

            {/* Row 4: Rating */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Rating <span className="required-star">*</span></label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div className="stars-row" style={{ display: 'flex', gap: '8px' }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      style={{ 
                        background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                        color: s <= form.rating ? '#FBBF24' : '#9CA3AF'
                      }}
                      onClick={() => handleStar(s)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill={s <= form.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    </button>
                  ))}
                </div>
                <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)' }}>
                  {form.rating > 0 ? `${form.rating}.0 / 5` : '0.0 / 5'}
                </span>
              </div>
              <span style={{ fontSize: '13px', color: 'var(--text-sub)', marginTop: '4px' }}>Click on the stars to set the rating</span>
              {errors.rating && <span className="form-error">{errors.rating}</span>}
            </div>

          </div>

          <div className="modal-footer">
            <button type="button" className="btn-modal btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-modal btn-submit">
              {initialData ? "Update Book" : "Save Book"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default BookForm;
