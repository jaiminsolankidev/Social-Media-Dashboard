export const initialConversations = [
  {
    id: "conv1",
    participants: ["u1", "u2"],
    updatedAt: "2026-11-09T10:15:00Z",
    lastMessage: "Keep me posted. We have plenty of studio space here for you."
  },
  {
    id: "conv2",
    participants: ["u1", "u3"],
    updatedAt: "2026-11-08T18:15:00Z",
    lastMessage: "Five Elephant it is. Talk soon Marcus!"
  }
];

export const initialMessages = [
  {
    id: "m1",
    conversationId: "conv1",
    senderId: "u2",
    text: "Hey Alex! Loved your latest post from the Dolomites.",
    isRead: true,
    createdAt: "2026-11-09T09:40:00Z"
  },
  {
    id: "m2",
    conversationId: "conv1",
    senderId: "u1",
    text: "Thanks Maya! The sunrise hike was freezing but totally worth it.",
    isRead: true,
    createdAt: "2026-11-09T09:55:00Z"
  },
  {
    id: "m3",
    conversationId: "conv1",
    senderId: "u2",
    text: "Are you planning to exhibit those prints in Tokyo next spring?",
    isRead: false,
    createdAt: "2026-11-09T10:15:00Z"
  }
];
