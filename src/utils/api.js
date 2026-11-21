/**
 * Universal Mock API Layer for the Social Media Dashboard.
 * Provides clean CRUD methods with local storage persistence.
 */

// Initial Seed Data
export const DEFAULT_USER = {
  id: 'u1',
  name: 'Alex Morgan',
  username: 'alexmorgan',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  bio: 'Visual storyteller & landscape photographer 📸 | Capturing life one frame at a time.',
  website: 'https://alexmorgan.gallery',
  location: 'London, UK',
  stats: {
    posts: 12,
    followers: 1420,
    following: 380,
  },
};

export const DEFAULT_POSTS = [
  {
    id: 'p1',
    author: {
      id: 'u1',
      name: 'Alex Morgan',
      username: 'alexmorgan',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
    time: '2 hours ago',
    content: 'Golden hour in the Scottish Highlands. The light here during autumn is completely magical ✨🏔️',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    likes: 42,
    isLiked: false,
    comments: [
      { id: 'c1', author: 'Maya Lin', text: 'Incredible composition Alex! What lens did you use?', time: '1h ago' },
      { id: 'c2', author: 'Marcus Chen', text: 'Those autumn colors are unreal 🔥', time: '45m ago' },
    ],
  },
  {
    id: 'p2',
    author: {
      id: 'u2',
      name: 'Maya Lin',
      username: 'mayalin',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    },
    time: '4 hours ago',
    content: 'Exploring minimalist glassmorphism designs for a mobile design system. Simple, modern, and high contrast.',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80',
    likes: 89,
    isLiked: false,
    comments: [
      { id: 'c3', author: 'Alex Morgan', text: 'Love the frosted glass effect, so clean!', time: '2h ago' },
    ],
  },
  {
    id: 'p3',
    author: {
      id: 'u3',
      name: 'Marcus Chen',
      username: 'marcuschen',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    },
    time: '6 hours ago',
    content: 'Shipped a new React component library today! 100% test coverage with React Testing Library and zero dependencies. 🚀💻',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    likes: 124,
    isLiked: false,
    comments: [
      { id: 'c4', author: 'Sarah Jenkins', text: 'Huge congrats Marcus! Checking out the docs now.', time: '5h ago' },
    ],
  },
  {
    id: 'p4',
    author: {
      id: 'u4',
      name: 'Sarah Jenkins',
      username: 'sarahj',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    },
    time: '1 day ago',
    content: 'Coffee and code on a rainy Sunday morning. Working on the final submission for our React dashboard.',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
    likes: 56,
    isLiked: false,
    comments: [],
  },
];

export const DEFAULT_NOTIFICATIONS = [
  {
    id: 'n1',
    user: {
      name: 'Maya Lin',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    },
    text: 'liked your photo from Scottish Highlands.',
    time: '15m ago',
    type: 'like',
    isRead: false,
  },
  {
    id: 'n2',
    user: {
      name: 'Marcus Chen',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    },
    text: 'commented on your latest post: "Those autumn colors are unreal 🔥"',
    time: '45m ago',
    type: 'comment',
    isRead: false,
  },
  {
    id: 'n3',
    user: {
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    },
    text: 'started following you.',
    time: '2h ago',
    type: 'follow',
    isRead: true,
  },
  {
    id: 'n4',
    user: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    text: 'mentioned you in a comment.',
    time: '1d ago',
    type: 'mention',
    isRead: true,
  },
];

export const DEFAULT_CONVERSATIONS = [
  {
    id: 'conv1',
    user: {
      id: 'u2',
      name: 'Maya Lin',
      username: 'mayalin',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      status: 'online',
    },
    messages: [
      { id: 'm1', sender: 'Maya Lin', text: 'Hey Alex! Loved your new Highlands photos.', time: '10:30 AM', isOwn: false },
      { id: 'm2', sender: 'Alex Morgan', text: 'Thank you Maya! The lighting was incredible that morning.', time: '10:32 AM', isOwn: true },
      { id: 'm3', sender: 'Maya Lin', text: 'Are you free for a quick design review later this afternoon?', time: '10:35 AM', isOwn: false },
    ],
  },
  {
    id: 'conv2',
    user: {
      id: 'u3',
      name: 'Marcus Chen',
      username: 'marcuschen',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
      status: 'offline',
    },
    messages: [
      { id: 'm4', sender: 'Marcus Chen', text: 'Did you check the new React component library?', time: 'Yesterday', isOwn: false },
      { id: 'm5', sender: 'Alex Morgan', text: 'Yes, looking super clean! Great job.', time: 'Yesterday', isOwn: true },
    ],
  },
  {
    id: 'conv3',
    user: {
      id: 'u4',
      name: 'Sarah Jenkins',
      username: 'sarahj',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      status: 'online',
    },
    messages: [
      { id: 'm6', sender: 'Sarah Jenkins', text: 'Good luck with the final dashboard project submission!', time: '2 days ago', isOwn: false },
    ],
  },
];

// Helper functions with localStorage caching
function getStorage(key, fallback) {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota errors
  }
}

// Universal API Methods
export async function getPosts() {
  return getStorage('smd_posts', DEFAULT_POSTS);
}

export async function createPost(newPostData) {
  const posts = getStorage('smd_posts', DEFAULT_POSTS);
  const user = getStorage('smd_user', DEFAULT_USER);
  const newPost = {
    id: `p-${Date.now()}`,
    author: {
      id: user.id,
      name: user.name,
      username: user.username,
      avatar: user.avatar,
    },
    time: 'Just now',
    content: newPostData.content || '',
    image: newPostData.image || null,
    likes: 0,
    isLiked: false,
    comments: [],
  };

  const updated = [newPost, ...posts];
  setStorage('smd_posts', updated);
  return newPost;
}

export async function toggleLikePost(postId) {
  const posts = getStorage('smd_posts', DEFAULT_POSTS);
  const updated = posts.map((post) => {
    if (post.id === postId) {
      const willLike = !post.isLiked;
      return {
        ...post,
        isLiked: willLike,
        likes: willLike ? post.likes + 1 : Math.max(0, post.likes - 1),
      };
    }
    return post;
  });
  setStorage('smd_posts', updated);
  return updated.find((p) => p.id === postId);
}

export async function addCommentToPost(postId, commentText) {
  const posts = getStorage('smd_posts', DEFAULT_POSTS);
  const user = getStorage('smd_user', DEFAULT_USER);
  const updated = posts.map((post) => {
    if (post.id === postId) {
      const newComment = {
        id: `c-${Date.now()}`,
        author: user.name,
        text: commentText,
        time: 'Just now',
      };
      return {
        ...post,
        comments: [...(post.comments || []), newComment],
      };
    }
    return post;
  });
  setStorage('smd_posts', updated);
  return updated.find((p) => p.id === postId);
}

export async function getUserProfile() {
  return getStorage('smd_user', DEFAULT_USER);
}

export async function updateUserProfile(updates) {
  const user = getStorage('smd_user', DEFAULT_USER);
  const updated = { ...user, ...updates };
  setStorage('smd_user', updated);
  return updated;
}

export async function getNotifications() {
  return getStorage('smd_notifications', DEFAULT_NOTIFICATIONS);
}

export async function markAllNotificationsRead() {
  const notifications = getStorage('smd_notifications', DEFAULT_NOTIFICATIONS);
  const updated = notifications.map((n) => ({ ...n, isRead: true }));
  setStorage('smd_notifications', updated);
  return updated;
}

export async function getConversations() {
  return getStorage('smd_conversations', DEFAULT_CONVERSATIONS);
}

export async function sendMessage(conversationId, text) {
  const conversations = getStorage('smd_conversations', DEFAULT_CONVERSATIONS);
  const user = getStorage('smd_user', DEFAULT_USER);
  const updated = conversations.map((conv) => {
    if (conv.id === conversationId) {
      const newMsg = {
        id: `m-${Date.now()}`,
        sender: user.name,
        text,
        time: 'Just now',
        isOwn: true,
      };
      return {
        ...conv,
        messages: [...conv.messages, newMsg],
      };
    }
    return conv;
  });
  setStorage('smd_conversations', updated);
  return updated.find((c) => c.id === conversationId);
}

export default {
  getPosts,
  createPost,
  toggleLikePost,
  addCommentToPost,
  getUserProfile,
  updateUserProfile,
  getNotifications,
  markAllNotificationsRead,
  getConversations,
  sendMessage,
};
