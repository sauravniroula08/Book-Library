import React from "react";

const CATEGORY_COLORS = {
  "Self Help":              { bg: "#EDE9FE", color: "#7C3AED" },
  "Programming":            { bg: "#DBEAFE", color: "#1D4ED8" },
  "Design & UX":            { bg: "#FCE7F3", color: "#BE185D" },
  "Business & Management":  { bg: "#D1FAE5", color: "#065F46" },
  "Recruitment":            { bg: "#FEF3C7", color: "#92400E" },
  "History":                { bg: "#F3F4F6", color: "#374151" },
  "Football":               { bg: "#DCFCE7", color: "#15803D" },
  "Science":                { bg: "#E0F2FE", color: "#0369A1" },
  "Novel":                  { bg: "#FEE2E2", color: "#B91C1C" },
};

function StarRating({ rating }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24"
          fill={i <= Math.round(rating) ? "#F59E0B" : "none"}
          stroke={i <= Math.round(rating) ? "#F59E0B" : "#D1D5DB"}
          strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span style={{ fontSize: 12, fontWeight: 600, color: '#F59E0B', marginLeft: 2 }}>{rating}</span>
    </div>
  );
}

function FeaturedBooks({ books, onFavorite, isLoggedIn }) {
  const featured = books.slice(0, 6);
  if (featured.length === 0) return null;

  return (
    <section className="featured-section">
      <div className="featured-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="featured-accent-bar"></div>
          <h2 className="featured-title">Recently Added Books</h2>
        </div>
        <button 
          className="featured-view-all"
          onClick={() => {
            const list = document.getElementById('all-books-list');
            if (list) {
              list.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          View All Books
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div className="featured-strip">
        {featured.map((book) => {
          const catStyle = CATEGORY_COLORS[book.category] || { bg: "#F3F4F6", color: "#374151" };
          return (
            <div key={book.id} className="featured-card">
              {/* Cover */}
              <div className="featured-cover">
                {book.cover
                  ? <img src={book.cover} alt={book.title} />
                  : <div className="featured-cover-placeholder">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#9CA3AF"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    </div>
                }
              </div>

              {/* Meta */}
              <div className="featured-meta">
                {/* Favorite */}
                {isLoggedIn && (
                  <button 
                    className="featured-fav-btn"
                    onClick={() => onFavorite(book.id)}
                    title={book.favorite ? "Unfavorite" : "Favorite"}
                    style={{ color: book.favorite ? 'var(--red)' : 'var(--text-light)' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill={book.favorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={book.favorite ? 0 : 2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                )}

                <p className="f-title" title={book.title}>{book.title}</p>
                <p className="f-author">{book.author}</p>

                {/* Category badge */}
                <span className="f-category-badge" style={{ background: catStyle.bg, color: catStyle.color }}>
                  {book.category}
                </span>

                <StarRating rating={book.rating} />
                <p className="f-price">NPR {book.price?.toLocaleString()}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FeaturedBooks;
