import React, { useState, useEffect } from "react";
import "./App.css";

import defaultBooks    from "./data/defaultBooks";
import Navbar          from "./components/Navbar";
import SearchFilterRow from "./components/SearchFilterRow";
import FeaturedBooks   from "./components/FeaturedBooks";
import BookList        from "./components/BookList";
import BookForm        from "./components/BookForm";
import Footer          from "./components/Footer";

const TOAST_ICONS = {
  success: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  error: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#EF4444" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#F59E0B" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#6366F1" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

function Toasts({ toasts }) {
  return (
    <div className="toast-stack">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          {TOAST_ICONS[t.type] || TOAST_ICONS.info}
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [books,            setBooks]            = useState([]);
  const [search,           setSearch]           = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy,           setSortBy]           = useState("Newest");
  const [showForm,         setShowForm]         = useState(false);
  const [editingBook,      setEditingBook]      = useState(null);
  const [toasts,           setToasts]           = useState([]);
  const [isLoading,        setIsLoading]        = useState(true);
  const [isLoggedIn,       setIsLoggedIn]       = useState(true);
  const [showProfile,      setShowProfile]      = useState(false);
  const [showSettings,     setShowSettings]     = useState(false);

  useEffect(() => {
    const loadData = () => {
      const saved = localStorage.getItem("bookshelf-books");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setBooks(parsed);
          } else {
            setBooks(defaultBooks);
          }
        } catch {
          setBooks(defaultBooks);
        }
      } else {
        setBooks(defaultBooks);
      }
      setIsLoading(false);
    };

    setTimeout(loadData, 400); // Simulate network request
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("bookshelf-books", JSON.stringify(books));
    }
  }, [books, isLoading]);

  useEffect(() => {
    const handler = (e) => { 
      if (e.key === "Escape") {
        setShowForm(false);
        setEditingBook(null);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const toast = (message, type = "info") => {
    const id = Date.now();
    setToasts((p) => [...p, { id, message, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 2600);
  };

  // Add or Edit
  const handleSaveBook = (book) => {
    if (editingBook) {
      setBooks((p) => p.map((b) => (b.id === book.id ? book : b)));
      toast(`"${book.title}" updated`, "success");
    } else {
      setBooks((p) => [book, ...p]);
      toast(`"${book.title}" added to library`, "success");
    }
    setEditingBook(null);
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const book = books.find((b) => b.id === id);
    if (window.confirm(`Are you sure you want to delete "${book?.title}"?`)) {
      setBooks((p) => p.filter((b) => b.id !== id));
      toast(`"${book?.title}" removed`, "error");
    }
  };

  const handleFavourite = (id) => {
    const book = books.find((b) => b.id === id);
    setBooks((p) =>
      p.map((b) => b.id === id ? { ...b, favorite: !b.favorite } : b)
    );
    if (book) {
      toast(
        book.favorite
          ? `"${book.title}" removed from favorites`
          : `"${book.title}" added to favorites`,
        "info"
      );
    }
  };

  const handleResetLibrary = () => {
    if (window.confirm("Are you sure you want to reset the library to default books? All your custom books will be lost.")) {
      localStorage.removeItem("bookshelf-books");
      setBooks(defaultBooks);
      toast("Library reset to default", "info");
    }
  };

  // 1. Search (Title + Author)
  // 2. Filter Category
  let processedBooks = books.filter((b) => {
    const s = search.toLowerCase();
    const matchSearch = b.title.toLowerCase().includes(s) || b.author.toLowerCase().includes(s);
    const matchCat = selectedCategory === "All" || b.category === selectedCategory;
    return matchSearch && matchCat;
  });

  // 3. Sort
  processedBooks.sort((a, b) => {
    if (sortBy === "A-Z")                 return a.title.localeCompare(b.title);
    if (sortBy === "Z-A")                 return b.title.localeCompare(a.title);
    if (sortBy === "Price: Low to High")  return a.price - b.price;
    if (sortBy === "Price: High to Low")  return b.price - a.price;
    if (sortBy === "Highest Rating")      return b.rating - a.rating;
    if (sortBy === "Lowest Rating")       return a.rating - b.rating;
    if (sortBy === "Oldest")              return +a.id - +b.id;
    return 0; // "Newest" — newest prepended, so natural order
  });

  // Recently Added (Top 6 from the original un-filtered/sorted list, which is prepended to)
  const recentlyAdded = [...books].slice(0, 6);

  const favCount = books.filter(b => b.favorite).length;

  return (
    <div className="app-shell">
      <Navbar
        totalBooks={books.length}
        favCount={favCount}
        onAddBook={() => {
          setEditingBook(null);
          setShowForm(true);
        }}
        isLoggedIn={isLoggedIn}
        onLogin={() => {
          setIsLoggedIn(true);
          toast("Logged in as Admin", "success");
        }}
        onLogout={() => {
          setIsLoggedIn(false);
          toast("Logged out successfully", "success");
        }}
        onShowProfile={() => setShowProfile(true)}
        onShowSettings={() => setShowSettings(true)}
      />

      <main className="dashboard-body">
        <SearchFilterRow
          search={search}
          setSearch={setSearch}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onReset={() => {
            setSearch("");
            setSelectedCategory("All");
            setSortBy("Newest");
          }}
        />

        {isLoading ? (
          <div className="empty-state">
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text)" }}>Loading books...</h3>
          </div>
        ) : (
          <>
            <FeaturedBooks 
              books={recentlyAdded} 
              onFavorite={handleFavourite} 
              isLoggedIn={isLoggedIn}
            />
            <BookList
              books={processedBooks}
              onDelete={handleDelete}
              onFavorite={handleFavourite}
              onEdit={handleEdit}
              search={search}
              isLoggedIn={isLoggedIn}
            />
          </>
        )}
      </main>

      <Footer />

      {showForm && (
        <BookForm
          initialData={editingBook}
          onSave={handleSaveBook}
          onClose={() => {
            setShowForm(false);
            setEditingBook(null);
          }}
        />
      )}

      <Toasts toasts={toasts} />

      {/* Profile Modal */}
      {showProfile && (
        <div className="modal-overlay" onClick={() => setShowProfile(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ width: 400 }}>
            <div className="modal-header">
              <div className="modal-header-text">
                <h2 className="modal-title">My Profile</h2>
              </div>
              <button className="modal-close" onClick={() => setShowProfile(false)}>×</button>
            </div>
            <div className="modal-body" style={{ textAlign: 'center' }}>
              <img src="https://api.dicebear.com/7.x/initials/svg?seed=SN&backgroundColor=6366f1&textColor=ffffff&fontSize=40" alt="Avatar" style={{ width: 80, height: 80, borderRadius: '50%', marginBottom: 16 }} />
              <h3 style={{ fontSize: 20, color: 'var(--text)', marginBottom: 4 }}>Saurav Niroula</h3>
              <p style={{ color: 'var(--text-sub)', fontSize: 14, marginBottom: 24 }}>Admin & Library Manager</p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                <div style={{ background: 'var(--bg)', padding: '10px 20px', borderRadius: 8 }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--purple)' }}>{books.length}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-sub)' }}>Books</div>
                </div>
                <div style={{ background: 'var(--bg)', padding: '10px 20px', borderRadius: 8 }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--red)' }}>{favCount}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-sub)' }}>Favorites</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="modal-overlay" onClick={() => setShowSettings(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ width: 400 }}>
            <div className="modal-header">
              <div className="modal-header-text">
                <h2 className="modal-title">Settings</h2>
              </div>
              <button className="modal-close" onClick={() => setShowSettings(false)}>×</button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)' }}>Email Notifications</span>
                <input type="checkbox" defaultChecked />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)' }}>Dark Mode</span>
                <input type="checkbox" />
              </div>
              <div style={{ padding: '20px 0 0', display: 'flex', justifyContent: 'center' }}>
                <button className="btn-modal btn-cancel" style={{ width: '100%', borderColor: 'var(--red)', color: 'var(--red)' }} onClick={() => { handleResetLibrary(); setShowSettings(false); }}>
                  Reset Library Data
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
