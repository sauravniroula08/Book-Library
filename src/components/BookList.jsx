import React from "react";

function getCategoryInitial(category) {
  const map = {
    "Design & UX": { letter: "D", class: "D" },
    "Programming": { letter: "P", class: "P" },
    "Business & Management": { letter: "B", class: "B" },
    "Business": { letter: "B", class: "B" },
    "Recruitment": { letter: "R", class: "R" },
    "Self Help": { letter: "S", class: "S" },
    "History": { letter: "H", class: "H" },
    "Football": { letter: "F", class: "F" },
    "Novel": { letter: "N", class: "N" },
    "Science": { letter: "S", class: "S" },
  };
  return map[category] || { letter: category.charAt(0).toUpperCase(), class: "N" };
}

function RatingStars({ rating }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(
        <svg key={i} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      );
    } else if (i === fullStars + 1 && hasHalf) {
      stars.push(
        <svg key={i} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          <path d="M12 2v15.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#F59E0B" />
        </svg>
      );
    } else {
      stars.push(
        <svg key={i} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      );
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <div style={{ display: 'flex', gap: 2 }}>{stars}</div>
      <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-sub)' }}>{rating} / 5</span>
    </div>
  );
}

function BookCard({ book, onDelete, onFavorite, onEdit, isLoggedIn }) {
  const catInfo = getCategoryInitial(book.category);

  return (
    <div className="list-row">
      <div className="col-title">
        {book.cover ? (
          <img src={book.cover} alt={book.title} className="row-cover" />
        ) : (
          <div className="row-cover" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#9CA3AF">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )}
        <div>
          <div className="row-title-text">{book.title}</div>
          <div className="row-author-text">{book.author}</div>
          <div style={{ fontSize: 12, color: 'var(--purple)', marginTop: 4, fontWeight: 600 }}>NPR {book.price.toLocaleString()}</div>
        </div>
      </div>

      <div className="col-rating">
        <RatingStars rating={book.rating} />
      </div>

      <div className="col-category">
        <div className={`cat-circle ${catInfo.class}`}>{catInfo.letter}</div>
        <span className="cat-text">{book.category}</span>
      </div>

      <div className="col-status">
        {isLoggedIn && (
          <>
            <button 
              className="btn-icon" 
              onClick={() => onFavorite(book.id)}
              title={book.favorite ? "Unfavorite" : "Favorite"}
              style={{ color: book.favorite ? 'var(--red)' : 'var(--text-light)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill={book.favorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={book.favorite ? 0 : 2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            
            {/* Edit Button */}
            <button 
              className="btn-icon" 
              onClick={() => onEdit(book)}
              title="Edit book"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>

            {/* Delete Button */}
            <button 
              className="btn-icon danger" 
              onClick={() => onDelete(book.id)}
              title="Remove book"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function BookList({ books, onDelete, onFavorite, onEdit, search, isLoggedIn }) {
  return (
    <div className="list-container" id="all-books-list">
      <div className="list-header">
        <div className="header-col">
          Title 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
        <div className="header-col">Rating</div>
        <div className="header-col">Category</div>
        <div className="header-col">Status / Actions</div>
      </div>

      <div className="list-body">
        {books.length === 0 ? (
          <div className="empty-state">
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>
              No Books Found
            </h3>
            <p>
              {search 
                ? `No results match "${search}".` 
                : "Your library is empty. Click Add Book to get started."}
            </p>
          </div>
        ) : (
          books.map((book) => (
            <BookCard 
              key={book.id}
              book={book}
              onDelete={onDelete}
              onFavorite={onFavorite}
              onEdit={onEdit}
              isLoggedIn={isLoggedIn}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default BookList;
