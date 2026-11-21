# 📘 Social Media Dashboard – Plain English Guide

> A simple guide explaining how this project is structured and how every component works.

---

## 🌟 1. What is This Project?

This is a **Social Media Dashboard** built with **React**:
1. **Header / Navbar**: Top bar with brand logo, search input, links to sections, and dark/light mode toggle.
2. **Profile**: Shows user avatar, bio, follower count, and follow/unfollow toggle.
3. **Posts**: Feed of cards with photos, captions, interactive ❤️ **Like counters**, and a 💬 **Comment box**.
4. **Notifications**: Alerts when other users interact with your content.
5. **Messages**: Direct chat conversation threads.

---

## 🧩 2. Visual Component Flow

```text
[App.jsx]
  ├── <Header />              (Always visible at top: Brand, Search, Nav, Theme)
  └── <Routes>
        ├── "/"               ──> <Home />           (Post creator + feed of <Post />)
        ├── "/profile"        ──> <ProfilePage />    (<Profile /> + user's posts)
        ├── "/notifications"  ──> <Notifications />  (Activity feed of <Notification />)
        └── "/messages"       ──> <Messages />       (Two-panel chat conversation list)
```

---

## 📁 3. File & Folder Guide

| Folder / File | What it does |
|---|---|
| **`src/App.jsx`** | The main router and layout. Holds theme state and sets up page routes. |
| **`src/main.jsx`** | Mounts React to the HTML DOM inside `<BrowserRouter>`. |
| **`src/components/Header/`** | The top navigation bar with search bar and dark/light mode button. |
| **`src/components/Post/`** | The social post card with ❤️ Like counter, comment form, and share button. |
| **`src/components/Profile/`** | The user profile card displaying avatar, stats, and follow/unfollow toggle. |
| **`src/components/Notification/`** | Notification alert item showing who liked or commented on your content. |
| **`src/components/common/`** | Reusable UI building blocks: `Button/`, `Card/`, and `Modal/`. |
| **`src/pages/`** | Full-screen pages loaded by the router (`Home/`, `ProfilePage/`, `Notifications/`, `Messages/`). |
| **`src/hooks/useLocalStorage.js`** | Helper hook that syncs state with the browser's `localStorage`. |
| **`src/utils/api.js`** | Self-contained mock API layer with zero external dependencies. |
| **`tests/dashboard.test.jsx`** | Automated unit tests covering all components and interactions. |

---

## 💡 4. Common Questions

### How do Likes work?
Inside `src/components/Post/Post.jsx`, the component uses the `useState` hook:
```javascript
const [likes, setLikes] = useState(post.likes);
const [isLiked, setIsLiked] = useState(false);
```
Clicking the like button calls `handleLike`, which toggles `isLiked` and updates `likes` by `+1` or `-1`.

### How does Dark Mode work?
Inside `src/App.jsx`, the app uses `useLocalStorage`:
```javascript
const [theme, setTheme] = useLocalStorage('smd_theme', 'dark');
```
When clicked, it updates the `data-theme` attribute on the HTML document, which switches colors defined in `src/styles/variables.css`.
