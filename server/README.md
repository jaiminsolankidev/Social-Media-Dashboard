# VYBE Mock REST API Server

This server runs on [JSON Server](https://github.com/typicode/json-server) to provide a full REST API for development and testing.

## Starting the Server

```bash
npm run server
```

The API will be available at:
`http://localhost:3001`

## Available Endpoints

- `GET /users` - List all users
- `GET /users/:id` - Get user by ID
- `GET /users?username=:username` - Filter user by username
- `POST /users` - Create user
- `PATCH /users/:id` - Update user
- `GET /posts` - List all posts
- `POST /posts` - Create post
- `PATCH /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post
- `GET /comments` - List comments (filter with `?postId=:postId`)
- `POST /comments` - Add comment
- `DELETE /comments/:id` - Delete comment
- `GET /stories` - List stories
- `POST /stories` - Add story
- `GET /notifications` - List notifications
- `PATCH /notifications/:id` - Update notification read status
- `GET /conversations` - List conversations
- `POST /conversations` - Create conversation
- `GET /messages` - List messages (filter with `?conversationId=:id`)
- `POST /messages` - Send message
- `GET /reels` - List reels
- `PATCH /reels/:id` - Update reel (likes)

## Note on Deployment
For production deployment, this mock API should be deployed to a cloud platform like Render, Railway, or Vercel Serverless Functions, and the client's `VITE_API_URL` configured accordingly.
