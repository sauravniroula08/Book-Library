import React from "react";

/**
 * BookCard Component
 * Props: book (object), onDelete (fn), onFavorite (fn)
 *
 * Demonstrates:
 *  - Props (receiving book data + handler functions)
 *  - Event Handling (onClick for delete & favorite)
 *  - Conditional Rendering (favorite button icon)
 */
function BookCard({ book, onDelete, onFavorite }) {
  const { id, title, author, category, price, rating, cover, favorite } = book;

  // Render star icons based on rating
  const renderStars = (r) => {
    const full = Math.round(r);
    return (
      <div className="book-rating-stars">
        {[1, 2, 3, 4, 5].map((s) => (
          <span key={s} className="star">
            {s <= full ? "⭐" : "☆"}
          </span>
        ))}
        <span style={{ marginLeft: 4, color: "var(--text-secondary)" }}>
          {r}
        </span>
      </div>
    );
  };

  return (
    <div className="book-card" id={`book-card-${id}`}>
      {/* ── Cover ── */}
      <div className="book-cover-wrap">
        {cover ? (
          <img
            className="book-cover-img"
            src={cover}
            alt={title}
            onError={(e) => {
              e.target.style.display = "none";
              document.getElementById(`fallback-${id}`).style.display = "flex";
            }}
          />
        ) : null}
        <div
          id={`fallback-${id}`}
          className="book-cover-fallback"
          style={{ display: cover ? "none" : "flex" }}
        >
          📖
        </div>

        {/* Favorite overlay button */}
        <button
          className={`fav-overlay-btn ${favorite ? "favorited" : ""}`}
          onClick={() => onFavorite(id)}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          title={favorite ? "Remove favorite" : "Add favorite"}
          id={`fav-btn-${id}`}
        >
          {/* Conditional Rendering: filled vs outline heart */}
          {favorite ? "❤️" : "🤍"}
        </button>

        {/* Category badge */}
        <span className="category-badge">{category}</span>
      </div>

      {/* ── Body ── */}
      <div className="book-card-body">
        <h3 className="book-card-title" title={title}>
          {title}
        </h3>
        <p className="book-card-author">by {author}</p>

        <div className="book-card-meta">
          <span className="book-price">${price}</span>
          {renderStars(rating)}
        </div>
      </div>

      {/* ── Action Buttons ── */}
      <div className="book-card-actions">
        {/* Favorite Button — Conditional Rendering */}
        <button
          className={`btn-fav ${favorite ? "favorited" : ""}`}
          onClick={() => onFavorite(id)}
          id={`fav-action-btn-${id}`}
        >
          {favorite ? "❤️ Favorited" : "🤍 Favorite"}
        </button>

        {/* Delete Button */}
        <button
          className="btn-delete"
          onClick={() => onDelete(id)}
          id={`delete-btn-${id}`}
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default BookCard;
