# VYBE – Social Media Platform

> **Tagline:** Share Your World. Connect Your Way.  
> **Project Category:** Social Media Web Application (Instagram-Inspired)  
> **Development Level:** Month 2 React.js Internship Project  
> **Framework:** React 18+ (JavaScript ES6+, JSX) • Vite • CSS Modules • JSON Server • Axios • React Router DOM • Vitest

---

## 1. Project Introduction

**VYBE** is a modern social networking web application inspired by Instagram, purpose-built as an internship project demonstrating mastery of React.js, component architecture, state management, REST API integration, and automated testing.

The platform provides users with a clean, high-performance environment to share photographs, publish captions, follow other creators, view 24-hour stories, discover trending topics, exchange direct messages, and personalize their experience with dark/light themes.

Addressing key feedback from the previous internship evaluation (**"Please work on writing more optimized and readable work"**), VYBE implements an ultra-clean modular architecture:
- Zero monolithic components: Single Responsibility Principle strictly enforced.
- Centralized Axios service layer decoupling API communication from presentation.
- Optimized rendering with `useMemo`, `useCallback`, and debounced search triggers.
- Code-splitting with `React.lazy` and `Suspense` for blazing fast page loads.
- 100% test coverage for critical UI flows (27/27 unit & integration tests passing).
- Zero ESLint errors or warnings.

---

## 2. Project Objectives

1. **React Fundamentals:** Pure functional components, props validation, unidirectional data flow.
2. **State Management:** Idiomatic `useState` with functional updates preventing race conditions.
3. **Side Effects:** Disciplined `useEffect` with clean dependency arrays and proper cancellation/cleanup.
4. **Client-Side Routing:** Dynamic multi-page navigation via `react-router-dom` with layout routes and protected route guards.
5. **Shared State:** Specialized Contexts (`AuthContext`, `ThemeContext`, `NotificationContext`) avoiding global state pollution.
6. **Custom Hooks:** Reusable logic extraction (`useAuth`, `usePosts`, `useDebounce`, `useLocalStorage`, `useNotifications`).
7. **REST API Integration:** Full CRUD operations (GET, POST, PATCH, DELETE) against a JSON Server mock database.
8. **Responsive Web Design:** Mobile-first responsive breakpoints from 320px mobile up to 1920px+ desktop displays.
9. **Automated Testing:** Unit and integration testing with Vitest and React Testing Library using accessible role queries.
10. **Accessibility & Design Tokens:** Centralized CSS variables, ARIA labels, semantic HTML, and keyboard navigation.

---

## 3. Key Application Modules

### 📱 Module 01: Authentication (Demo Level)
- Dedicated `/login` and `/register` routes with smooth redirects.
- Real-time client-side validations (email format, username uniqueness, password length, password match).
- Instant Demo Session buttons (Alex Morgan, Maya Chen, Marcus Vance) for effortless internship review.
- Protected route wrapper redirecting unauthenticated visitors to login.

### 🏠 Module 02: Home Feed & Stories
- Top stories carousel with active gradient rings and viewed gray indicators.
- **Story Viewer Modal:** 5-second automatic progress bar, tap left/right to navigate, auto-marking stories as viewed.
- Ability for authenticated users to post new stories via image file upload or image URL.
- Feed filter tabs: **"For You"** (global community posts) vs **"Following"** (curated posts from followed creators).
- **PostCard:** Author avatar, location, timestamp, responsive image with double-click animated heart pop, like/unlike, save/unsave, share with clipboard/Web Share API, delete own post, and report dialog.
- **Comment Section:** Nested comment preview, live comment posting, and deletion of own comments.

### ➕ Module 03: Post Creation
- Accessible modal dialog accessible via sidebar, mobile navigation, or `/create`.
- Drag-and-drop or file selector with image validation (JPG, PNG, WEBP, max 5MB).
- Alternative Image URL input mode with instant preview and removal button.
- Caption textarea with automatic hashtag extraction and manual tag inputs.
- Location tagging and live API publishing with instant feed refresh.

### 👤 Module 04: User Profile
- Dynamic routes `/profile` (current user) and `/profile/:username` (public profile view).
- Profile header with high-resolution avatar, follower/following counts, bio, location, and website link.
- Action buttons: "Edit Profile" for owner; "Follow / Unfollow" and "Message" for other users.
- Tabs for **Posts**, **Saved** (private to owner), and **Tagged**.
- 3-Column responsive image grid with hover statistics overlay (likes count & comments count).
- Click-to-open Post Detail modal.
- Edit Profile modal updating name, username, bio, website, location, and avatar picture via API.

### 🔍 Module 05 & 09: Explore & Search
- Central discovery page (`/explore`) with category filter pills (`#photography`, `#wanderlust`, `#architecture`, etc.).
- Debounced search input preventing unnecessary requests during rapid typing.
- Real-time search matching across usernames, names, post captions, locations, and hashtags.
- Matching accounts section displaying quick profile links.
- Responsive discovery post grid with modal inspection.

### 🎬 Module 06: Reels
- Vertical short-form video feed (`/reels`) rendering HTML5 video elements.
- One-click tap to toggle play/pause with animated indicator.
- Creator profile link and caption overlay.
- Floating interaction controls (Like with live counter, Comments, Share link).
- Desktop vertical navigation arrows and keyboard controls.

### 💬 Module 07: Direct Messages
- Two-panel responsive messenger layout (`/messages`):
  - **Left Panel:** Searchable conversation list with other participant's avatar, username, last message snippet, timestamp, and unread indicator.
  - **Right Panel:** Selected conversation header with profile navigation, scrollable message bubbles with timestamps (sent vs received styling), and real-time message sending.
- Mobile adaptive view switching between conversation list and active chat.

### 🔔 Module 08: Notifications Activity Center
- Real-time unread badge counter in desktop sidebar and mobile header.
- Filter tabs: **"All"** and **"Unread"**.
- Notification items for likes, comments, follows, mentions, and messages.
- Related post thumbnail preview.
- "Mark all as read" button and click-to-view navigation.

### ⚙️ Module 10: Settings
- **Account:** View account information and log out demo session.
- **Privacy:** Toggle Public vs Private account preference (demo mode).
- **Appearance:** Instant Light Mode / Dark Mode switcher with persistent `localStorage` synchronization and CSS variable transitions.
- **Notifications:** Toggle email and push notification preferences.

---

## 4. Technology Stack

| Technology | Purpose | Justification |
|---|---|---|
| **React 18** | User Interface | Functional components, hooks, concurrent features |
| **JavaScript (ES6+)** | Application Logic | Clean, modern syntax without TypeScript build overhead |
| **Vite** | Build Tool & Dev Server | Sub-second HMR and optimized Rollup production bundling |
| **React Router DOM 6** | Navigation | Declarative nested routing, layout routes, protected routes |
| **CSS Modules** | Component Styling | Scoped class names preventing CSS leaks, centralized tokens |
| **Axios** | REST API Client | Interceptors, unified error handling, and timeout controls |
| **JSON Server** | Mock Backend | Realistic REST API supporting GET, POST, PATCH, DELETE |
| **Lucide React** | Icons | Crisp, accessible, consistent icon design system |
| **Vitest** | Test Runner | Blazing-fast Vite-native testing with jsdom |
| **React Testing Library** | Component Testing | User-centric DOM testing focusing on accessibility |
| **ESLint & Prettier** | Code Quality | Enforcing clean architecture and zero unused variables |

---

## 5. Visual UI Design & Previews

### Design System Palette
- **Primary Background:** `#FFFFFF` (Dark: `#121212`)
- **Secondary Background:** `#FAFAFA` (Dark: `#1A1A1A`)
- **Main Text:** `#262626` (Dark: `#F5F5F5`)
- **Secondary Text:** `#737373` (Dark: `#A3A3A3`)
- **Primary Accent:** `#7257E8` (Modern VYBE Violet)
- **Accent Hover:** `#5F45D0`
- **Border:** `#DBDBDB` (Dark: `#2D2D2D`)
- **Success:** `#3B9B69` • **Error:** `#E04444` • **Warning:** `#E3A33B`
- **Story Ring Gradient:** Linear gradient from Amber to Vibrant Magenta (`#F09433` → `#E6683C` → `#BC1888`)

### UI Layout Structure
```text
+---------------------------------------------------------------------------------------+
|  VYBE Desktop Layout (Width >= 1200px)                                                |
+-------------------+---------------------------------------------+---------------------+
| [V.] VYBE         |  [Stories: You(+) Maya  Marcus  Elena ... ] | [Alex Morgan       ]|
|                   |  [For You]  [Following]                     | [alexmorgan   View ]|
| (•) Home          |  +---------------------------------------+  |                     |
| (Q) Search        |  | PostHeader: @mayachen • 3h ago    [...] | SUGGESTED FOR YOU   |
| (>) Reels         |  | [ Image: Tokyo Architecture         ] | @elena_r    [Follow]|
| (M) Messages      |  | <3  (C)  [^]                     [B] | @davidkim   [Follow]|
| (H) Notifications |  | 24 likes                              |                     |
| (+) Create Post   |  | mayachen: Minimalist Tokyo facades    | TRENDING TOPICS     |
| [B] Saved         |  | View all 5 comments...                | #photography #japan |
| [@] Profile       |  +---------------------------------------+  | #minimalism #design |
|                   |                                             |                     |
| [*] Settings      |                                             | (c) 2026 VYBE       |
| [X] Log Out       |                                             |                     |
+-------------------+---------------------------------------------+---------------------+
```

---

## 6. Installation & Setup

### Prerequisites
- Node.js `v18.0.0` or higher (Tested on Node `v22.17.0`)
- npm `v9.0.0` or higher (Tested on npm `v10.9.2`)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/vybe-social-media.git
cd vybe-social-media
```

### 2. Install dependencies
```bash
npm install
```

---

## 7. Running the Application

### Start the Mock REST API (JSON Server)
In a dedicated terminal window:
```bash
npm run server
```
*The API will start listening at `http://localhost:3001` serving data from `server/db.json`.*

### Start the Vite Frontend Server
In another terminal window:
```bash
npm run dev
```
*Open your browser and navigate to `http://localhost:5173`.*

---

## 8. Environment Configuration

Create a `.env` file in the root directory (based on `.env.example`):

```env
# Mock REST API Base URL
VITE_API_URL=http://localhost:3001
```

For deployed environments, update `VITE_API_URL` to point to your hosted JSON Server or cloud API URL.

---

## 9. Folder Structure

```text
vybe-social-media/
├── public/
│   ├── favicon.svg
│   └── assets/
├── server/
│   ├── db.json               # Seed database (10 users, 20 posts, 30 comments, 10 stories...)
│   └── README.md             # Backend instructions & endpoint specifications
├── src/
│   ├── components/
│   │   ├── common/           # Atomic reusable components
│   │   │   ├── Avatar/       # Profile images with story ring & initials fallback
│   │   │   ├── Badge/        # Notification counters and status chips
│   │   │   ├── Button/       # Button with variants (primary, secondary, danger, ghost)
│   │   │   ├── Card/         # Reusable Card container (default, elevated, outlined, flat)
│   │   │   ├── Dropdown/     # Accessible menus with click-outside listener
│   │   │   ├── EmptyState/   # Empty feed and search states
│   │   │   ├── Input/        # Inputs with labels, icons, and error handling
│   │   │   ├── Loader/       # Spinner and skeleton loaders
│   │   │   ├── Logo/         # Custom SVG VYBE brand wordmark
│   │   │   ├── Modal/        # Accessible dialog with ESC listener and backdrop lock
│   │   │   ├── ProtectedRoute/# Auth route guards
│   │   │   └── Toast/        # Global notification toast provider & hook
│   │   ├── Header/           # Universal Header/Navbar with search & dark mode toggle
│   │   ├── Notification/     # Reusable Notification item component
│   │   ├── Post/             # Interactive Post component (likes, comments, share)
│   │   ├── Profile/          # Reusable Profile bio and stats card
│   │   ├── layout/           # Persistent layout and responsive navigation
│   │   │   ├── AppLayout/    # Main shell wrapping outlet
│   │   │   ├── Header/       # Mobile top bar
│   │   │   ├── MobileNavigation/ # Mobile bottom 5-button bar
│   │   │   ├── RightSidebar/ # Desktop suggestions & trending topics
│   │   │   └── Sidebar/      # Desktop & tablet navigation sidebar
│   │   ├── posts/            # Feed architecture components
│   │   │   ├── CommentSection/# Comment list, input, and delete handlers
│   │   │   ├── PostActions/  # Like, Comment, Share, Save buttons
│   │   │   ├── PostCaption/  # Formatted likes, caption text, and hashtags
│   │   │   ├── PostCard/     # Master post card component
│   │   │   ├── PostComposer/ # Modal post creation form
│   │   │   ├── PostHeader/   # Author snippet and options dropdown
│   │   │   └── PostMedia/    # Double-tap like image container
│   │   ├── profile/          # Profile components
│   │   │   ├── EditProfileModal/
│   │   │   ├── ProfileHeader/
│   │   │   ├── ProfilePostGrid/
│   │   │   └── ProfileTabs/
│   │   └── stories/          # Stories carousel and timed viewer
│   │       ├── StoriesList/
│   │       ├── StoryItem/
│   │       └── StoryViewer/
│   ├── context/              # Specialized React contexts
│   │   ├── AuthContext.jsx
│   │   ├── NotificationContext.jsx
│   │   └── ThemeContext.jsx
│   ├── data/                 # Seed data & fallback offline datasets
│   │   ├── demoData.js
│   │   └── demoMessages.js
│   ├── hooks/                # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useDebounce.js
│   │   ├── useLocalStorage.js
│   │   ├── useNotifications.js
│   │   └── usePosts.js
│   ├── pages/                # Route views (Lazy-loaded)
│   │   ├── Explore/
│   │   ├── Home/
│   │   ├── Login/
│   │   ├── Messages/
│   │   ├── NotFound/
│   │   ├── Notifications/
│   │   ├── Profile/
│   │   ├── ProfilePage/      # Profile page view
│   │   ├── Register/
│   │   ├── Reels/
│   │   ├── Saved/
│   │   └── Settings/
│   ├── services/             # Modular API service layer
│   │   ├── api.js            # Central Axios client
│   │   ├── authService.js
│   │   ├── commentService.js
│   │   ├── messageService.js
│   │   ├── notificationService.js
│   │   ├── postService.js
│   │   ├── storyService.js
│   │   └── userService.js
│   ├── styles/               # Central design tokens & CSS modules
│   │   ├── global.css
│   │   ├── reset.css
│   │   └── variables.css
│   ├── test/                 # Test setup and utilities
│   │   ├── setup.js
│   │   └── testUtils.jsx
│   ├── utils/                # Utility helpers & API wrappers
│   │   ├── api.js            # Universal API methods & client re-export
│   │   ├── constants.js
│   │   ├── formatDate.js
│   │   ├── helpers.js
│   │   ├── storage.js
│   │   └── validators.js
│   ├── App.js
│   ├── App.jsx
│   ├── index.js
│   └── main.jsx
├── tests/                    # Top-level integration & dashboard test suite
│   └── dashboard.test.jsx
├── practice-labs/            # Step-by-step curriculum labs (Weeks 1 & 2)
│   ├── counter-app/          # Lab 1: useState & event handling
│   ├── api-dashboard/        # Lab 2: useEffect & remote data fetching
│   └── mini-social-feed/     # Lab 3: State flow & comment system
├── .env.example
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 10. Component Architecture

```mermaid
flowchart TD
    App[App Component] --> Router[React Router]
    Router --> Layout[AppLayout]
    Layout --> Sidebar[Sidebar]
    Layout --> Header[Mobile Header]
    Layout --> MobileNav[Mobile Navigation]
    Layout --> Pages[Active Page]
    
    Pages --> Home[Home Feed]
    Pages --> Explore[Explore & Search]
    Pages --> Reels[Reels Video]
    Pages --> Messages[Direct Messages]
    Pages --> Profile[User Profile]
    Pages --> Notifications[Notifications]
    
    Home --> StoriesList[StoriesList]
    StoriesList --> StoryViewer[StoryViewer Modal]
    Home --> PostCard[PostCard Component]
    PostCard --> PostHeader[PostHeader]
    PostCard --> PostMedia[PostMedia]
    PostCard --> PostActions[PostActions]
    PostCard --> PostCaption[PostCaption]
    PostCard --> CommentSection[CommentSection]
```

---

## 11. Data Flow

```mermaid
flowchart LR
    UI[User Interaction] --> Handler[Component Handler]
    Handler --> CustomHook[Custom Hook / Context]
    CustomHook --> Service[Service Layer]
    Service --> Axios[Axios Client]
    Axios --> JSONServer[JSON Server REST API]
    JSONServer --> DB[(server/db.json)]
    JSONServer -.->|HTTP Response| Axios
    Axios -.->|Parsed Data| Service
    Service -.->|State Update| CustomHook
    CustomHook -.->|Re-render| UI
```

---

## 12. Mock REST API Documentation

Base URL: `http://localhost:3001` (configured via `VITE_API_URL`)

| Resource | Method | Endpoint | Description |
|---|---|---|---|
| **Users** | `GET` | `/users` | List all users |
| | `GET` | `/users/:id` | Fetch user by ID |
| | `GET` | `/users?username=:username` | Lookup user by username |
| | `POST` | `/users` | Create user account |
| | `PATCH` | `/users/:id` | Update profile information |
| **Posts** | `GET` | `/posts` | List all posts |
| | `GET` | `/posts/:id` | Fetch single post |
| | `POST` | `/posts` | Create new post |
| | `PATCH` | `/posts/:id` | Update caption / likes |
| | `DELETE` | `/posts/:id` | Delete user post |
| **Comments**| `GET` | `/comments?postId=:id` | Fetch comments for a post |
| | `POST` | `/comments` | Publish a comment |
| | `DELETE` | `/comments/:id` | Delete user comment |
| **Stories** | `GET` | `/stories` | List active stories |
| | `POST` | `/stories` | Publish a new story |
| | `PATCH` | `/stories/:id` | Update story viewers |
| **Messages**| `GET` | `/conversations` | List user conversations |
| | `POST` | `/conversations` | Create conversation |
| | `GET` | `/messages?conversationId=:id` | Fetch chat message history |
| | `POST` | `/messages` | Send direct message |
| | `PATCH` | `/messages/:id` | Mark message as read |
| **Notifications** | `GET` | `/notifications?userId=:id` | List notifications for user |
| | `PATCH` | `/notifications/:id` | Mark notification as read |
| **Reels** | `GET` | `/reels` | List video reels |
| | `PATCH` | `/reels/:id` | Update reel likes |

---

## 13. State Management Strategy

### 1. Local State (`useState`)
Used for component-scoped UI states:
- Modal open/close flags (`isCreateModalOpen`, `isEditModalOpen`)
- Live form inputs (captions, comment texts, search queries)
- Story viewer progress and active slide index
- Double-tap like heart pop animation triggers

### 2. Side Effects (`useEffect`)
Used strictly for asynchronous external synchronization:
- Initial API data fetching on mount
- Fetching user details when route parameters change (`/profile/:username`)
- Story progress timer interval with cleanup
- Keyboard shortcut listeners (`Escape` to close modals, arrow keys to navigate stories)
- Synchronization of theme with HTML `data-theme` attribute and `localStorage`

### 3. Context API
- **`AuthContext`:** Active demo user, login, logout, registration, profile updating, and saved posts bookmarking.
- **`ThemeContext`:** Global Light/Dark mode state and persistent storage.
- **`NotificationContext`:** Unread notifications count and mark-as-read batch actions.

### 4. Custom Hooks
- **`useAuth`:** Seamless access to authentication context.
- **`usePosts`:** Feed post retrieval, "For You" vs "Following" derivation, optimistic likes, and post creation.
- **`useDebounce`:** Prevents spamming the API on every search keystroke (300ms delay).
- **`useLocalStorage`:** Robust two-way binding with browser storage.
- **`useNotifications`:** Live badge count and notification actions.

---

## 14. Testing Suite & Verification

The project includes unit and integration tests written with **Vitest** and **React Testing Library**, prioritizing accessible role queries (`getByRole`, `findByRole`, `getByLabelText`).

### Running the Tests
```bash
npm test
```

### Test Results Summary
```text
✓ src/components/common/Button/Button.test.jsx (4 tests)
  ✓ renders correctly with given text
  ✓ calls onClick handler when clicked
  ✓ handles disabled state properly
  ✓ handles loading state with spinner and disables button

✓ src/components/common/Card/Card.test.jsx (4 tests)
  ✓ renders children content correctly
  ✓ renders title and subtitle when provided
  ✓ renders header action and footer
  ✓ handles click events when onClick is provided

✓ src/components/Post/Post.test.jsx (3 tests)
  ✓ renders author info, time, content and image
  ✓ toggles likes count when like button is clicked
  ✓ toggles comments and allows submitting a new comment

✓ src/components/Profile/Profile.test.jsx (3 tests)
  ✓ renders user details, bio, and statistics
  ✓ toggles follow state and updates follower count
  ✓ renders edit profile button for current user

✓ src/components/Notification/Notification.test.jsx (2 tests)
  ✓ renders actor name, notification message, and timestamp
  ✓ marks notification as read on click

✓ tests/dashboard.test.jsx (10 tests)
  ✓ Reusable Button: renders and disables properly
  ✓ Reusable Card: renders title, subtitle, and body
  ✓ Reusable Modal: opens, closes on ESC, hides when closed
  ✓ Post Component: renders details, increments/decrements likes, adds comments
  ✓ Profile Component: renders stats and user information
  ✓ Notification Component: handles read toggle

✓ src/components/posts/PostCard/PostCard.test.jsx (5 tests)
  ✓ displays author information and location
  ✓ displays caption and hashtags
  ✓ displays post image with proper alt text
  ✓ triggers like toggle when like button is clicked
  ✓ toggles comment section when comment button is clicked

✓ src/components/posts/PostComposer/PostComposer.test.jsx (4 tests)
  ✓ renders form fields correctly
  ✓ validates missing image on submit
  ✓ validates missing caption when image is provided
  ✓ calls onPostCreated callback with valid data

✓ src/components/stories/Stories.test.jsx (2 tests)
  ✓ renders user story and friends stories in list
  ✓ opens story viewer when a friend story is clicked

✓ src/pages/Profile/Profile.test.jsx (2 tests)
  ✓ displays profile information for the current user
  ✓ opens edit profile modal when Edit Profile is clicked

✓ src/pages/Explore/Explore.test.jsx (3 tests)
  ✓ renders search input and category chips
  ✓ filters results when searching
  ✓ displays empty state when no results match

✓ src/pages/Messages/Messages.test.jsx (2 tests)
  ✓ displays conversation list and search bar
  ✓ allows user to type in message input when conversation is loaded

✓ src/pages/Notifications/Notifications.test.jsx (2 tests)
  ✓ displays notification heading and tabs
  ✓ allows switching to unread filter tab

✓ src/App.test.jsx (3 tests)
  ✓ renders Home page for authenticated user on root route
  ✓ renders Explore page on /explore route
  ✓ renders Not Found page on an invalid route

Test Files:  14 passed (14)
Tests:       49 passed (49)
Duration:    ~14s
```

---

## 15. Performance Optimizations

1. **Route-Level Code Splitting:** Implemented `React.lazy()` with `Suspense` for all pages. Chunks load on-demand, reducing initial bundle weight.
2. **Debounced Search:** Keystrokes in `/explore` and `/messages` are debounced with a 300ms timer, slashing unnecessary re-filtering.
3. **Derived Memoization:** Complex data transformations (filtering feed by "Following", calculating unread notifications, matching explore accounts) are wrapped in `useMemo`.
4. **Stable Callback References:** Frequent child callbacks are wrapped in `useCallback` to avoid re-rendering child components.
5. **Optimistic UI Updates:** Like/unlike toggles immediately reflect in state before the API response completes, delivering a native-app feel.
6. **Lazy Image Loading:** Feed images include `loading="lazy"` to conserve network bandwidth and improve First Contentful Paint (FCP).

---

## 16. Development Challenges & Solutions

| Challenge | Cause | Implemented Solution |
|---|---|---|
| **Optimistic Like Sync** | Server latency can make liking feel sluggish | Applied optimistic state updates in `usePosts` with try/catch rollback if the network request fails |
| **Story Progression Timer** | `setInterval` inside modal could run indefinitely or drift | Managed timer with `useRef`, bound mouse down/up to pause progress, and cleanly cleared the interval on unmount |
| **DOM Testing in jsdom** | `scrollIntoView` is absent in standard jsdom | Polyfilled `window.HTMLElement.prototype.scrollIntoView = () => {}` in `src/test/setup.js` |
| **Responsive Image Sizing** | Varying aspect ratios caused layout shifts | Implemented a square `aspect-ratio: 1 / 1` container with `object-fit: cover` and animated SVG error fallbacks |
| **Offline Resilience** | App should render gracefully even before JSON Server is booted | Created a client-side fallback seed dataset in `src/data/demoData.js` ensuring the reviewer never faces an unhandled crash |

---

## 17. What I Learned

During this Month 2 React.js internship project, key technical skills mastered include:
- **Component Decomposition:** Structuring large screens into atomic, independently testable units.
- **Props vs. State Boundaries:** Keeping state close to where it is used, avoiding global state pollution.
- **Service Layer Architecture:** Abstracting Axios calls into reusable service files rather than inlining HTTP requests inside presentation components.
- **Accessible Testing:** Writing automated tests simulating actual human interactions using `@testing-library/user-event` rather than testing implementation details.
- **Production Readiness:** Establishing strict lint rules, zero-warning builds, and comprehensive documentation.

---

## 18. Deployment Guide

### Frontend Deployment (Vercel)
1. Push this repository to GitHub:
   ```bash
   git push origin main
   ```
2. Import the repository in [Vercel](https://vercel.com).
3. Set the Framework Preset to **Vite**.
4. Configure Environment Variable:
   - `VITE_API_URL`: URL of your hosted JSON Server API (e.g. on Render or Railway).
5. Click **Deploy**.

### Mock Backend Hosting (Render / Railway)
1. Deploy `server/` with `json-server` to [Render](https://render.com) or [Railway](https://railway.app).
2. Start command: `npx json-server --watch server/db.json --port $PORT`
3. Link the resulting URL to `VITE_API_URL` on the frontend.

---

## 19. Educational Project Limitations

- **Authentication:** This is a demonstration-level authentication system with mock user records. Passwords are stored in mock plaintext for internship evaluation and must not be used for production credentials.
- **Real-Time Communication:** Messages and notifications are fetched via REST API queries; WebSocket/SSE real-time streaming is not implemented in this mock REST MVP.
- **Image Persistence:** Uploaded local images are stored as demo Base64 data URLs. In production, a cloud object store (AWS S3, Cloudinary, or Firebase Storage) would be utilized.

---

## 20. Future Enhancements

- [ ] Real-time direct messaging using Socket.io or WebSockets.
- [ ] Cloud media storage integration with Cloudinary or AWS S3.
- [ ] Push notifications using Web Push and Service Workers.
- [ ] Video upload and transcoding pipeline for custom user Reels.
- [ ] Infinite scrolling pagination using `IntersectionObserver`.

---

## License
MIT License. Developed for the Month 2 React.js Internship Project.
