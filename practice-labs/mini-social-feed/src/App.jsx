import { useState } from 'react';

function PostCard({ post, onToggleLike, onAddComment }) {
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(post.id, commentText.trim());
    setCommentText('');
  };

  return (
    <article className="post-card">
      <div className="post-header">
        <div className="post-avatar">{post.author[0]}</div>
        <span>{post.author}</span>
      </div>

      <img src={post.image} alt={post.caption} className="post-image" />

      <div className="post-body">
        <div className="post-actions">
          <button
            className={`action-btn ${post.isLiked ? 'liked' : ''}`}
            onClick={() => onToggleLike(post.id)}
          >
            {post.isLiked ? '❤️ Liked' : '🤍 Like'} ({post.likesCount})
          </button>
        </div>

        <div className="post-caption">
          <strong>{post.author}</strong> {post.caption}
        </div>

        <div className="comment-list">
          {post.comments.map((c, i) => (
            <div key={i}>
              <strong>{c.user}:</strong> {c.text}
            </div>
          ))}
        </div>

        <form className="comment-input-row" onSubmit={handleCommentSubmit}>
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button
            type="submit"
            style={{ background: '#7257e8', color: '#fff', border: 'none', borderRadius: '6px', padding: '0 12px', cursor: 'pointer' }}
          >
            Post
          </button>
        </form>
      </div>
    </article>
  );
}

export default function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Alex Morgan',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
      caption: 'Alps morning reflection. Exploring with React components!',
      likesCount: 14,
      isLiked: false,
      comments: [
        { user: 'Maya', text: 'Stunning colors!' },
        { user: 'Marcus', text: 'Great frame.' },
      ],
    },
    {
      id: 2,
      author: 'Maya Chen',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80',
      caption: 'Minimalist Tokyo glass facade architecture.',
      likesCount: 22,
      isLiked: true,
      comments: [{ user: 'Alex', text: 'Love the geometric lines.' }],
    },
  ]);

  const [newCaption, setNewCaption] = useState('');
  const [newImage, setNewImage] = useState('');

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newCaption.trim()) return;

    const newPost = {
      id: Date.now(),
      author: 'Alex Morgan',
      image: newImage.trim() || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
      caption: newCaption.trim(),
      likesCount: 0,
      isLiked: false,
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setNewCaption('');
    setNewImage('');
  };

  const handleToggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const nextLiked = !p.isLiked;
          return {
            ...p,
            isLiked: nextLiked,
            likesCount: nextLiked ? p.likesCount + 1 : p.likesCount - 1,
          };
        }
        return p;
      })
    );
  };

  const handleAddComment = (postId, text) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [...p.comments, { user: 'Alex Morgan', text }],
          };
        }
        return p;
      })
    );
  };

  return (
    <div className="feed-container">
      <h1>Practice Lab 3: Mini Social Feed</h1>

      {/* Composer */}
      <form className="composer-card" onSubmit={handleCreatePost}>
        <textarea
          placeholder="Share something with the feed..."
          rows={2}
          value={newCaption}
          onChange={(e) => setNewCaption(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL (optional)..."
          value={newImage}
          onChange={(e) => setNewImage(e.target.value)}
          style={{ width: '100%', boxSizing: 'border-box', padding: '8px', marginBottom: '8px', border: '1px solid #efefef', borderRadius: '6px' }}
        />
        <button
          type="submit"
          style={{ width: '100%', padding: '10px', background: '#7257e8', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
        >
          Publish to Feed
        </button>
      </form>

      {/* Posts */}
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onToggleLike={handleToggleLike}
          onAddComment={handleAddComment}
        />
      ))}
    </div>
  );
}
