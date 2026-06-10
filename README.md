# AI Customer Support Assistant Platform

An AI-powered SaaS customer support platform that allows businesses to create and deploy intelligent customer support assistants trained on their own knowledge base.

## Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes

### Business Admin Dashboard
- Total Conversations
- Open Tickets
- Resolved Tickets
- Escalated Tickets
- AI Resolution Rate

### Knowledge Base Management
- Upload Documents
  - PDF
  - DOCX
  - TXT
  - Markdown
- View Uploaded Documents
- Delete Documents
- Re-index Knowledge Base

### AI Processing Pipeline
- Document Parsing
- Text Chunking
- Embedding Generation
- Vector Storage
- Semantic Search

### AI Configuration
- Bot Name Configuration
- Welcome Message Configuration
- Personality Selection
  - Professional
  - Friendly
  - Technical

### Customer Chat Widget
- Real-time AI Chat
- Suggested Questions
- Knowledge Base Retrieval
- Context-Aware Responses

### Ticket Management
- Automatic Ticket Creation
- Ticket Status Tracking
  - Open
  - In Progress
  - Resolved
  - Closed
- Priority Management

### Intelligent Escalation
- Refund Request Detection
- Legal Complaint Detection
- Human Assistance Request Detection
- Angry Customer Detection

### Conversation Management
- Store Customer Messages
- Store AI Responses
- Store Escalation Events
- Conversation Search

### Analytics Dashboard
- Total Conversations
- Open Tickets
- Resolved Tickets
- Escalated Tickets
- AI Resolution Rate

---

# Tech Stack

## Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS

## Backend
- Node.js
- Express.js
- JWT Authentication
- Multer

## Database
- MongoDB
- Mongoose

## AI
- Google Gemini API
- Vector Embeddings
- Retrieval Augmented Generation (RAG)

---

# Project Structure

## Backend

```text
backend
│
├── config
│   └── db.js
│
├── controllers
│   ├── authController.js
│   ├── documentController.js
│   ├── chatController.js
│   ├── ticketController.js
│   ├── analyticsController.js
│   └── aiConfigController.js
│
├── middleware
│   ├── authMiddleware.js
│   └── uploadMiddleware.js
│
├── models
│   ├── User.js
│   ├── Business.js
│   ├── Document.js
│   ├── DocumentChunk.js
│   ├── Conversation.js
│   ├── Message.js
│   ├── Ticket.js
│   ├── EscalationEvent.js
│   └── AIConfig.js
│
├── routes
│   ├── authRoutes.js
│   ├── documentRoutes.js
│   ├── chatRoutes.js
│   ├── ticketRoutes.js
│   ├── analyticsRoutes.js
│   └── aiConfigRoutes.js
│
├── services
│   ├── geminiService.js
│   ├── embeddingService.js
│   ├── chatService.js
│   └── escalationService.js
│
├── uploads
│
└── server.js
```

## Frontend

```text
frontend
│
├── src
│
├── api
│   └── axios.js
│
├── components
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── ProtectedRoute.jsx
│   ├── TicketTable.jsx
│   ├── ConversationTable.jsx
│   ├── DocumentTable.jsx
│   ├── ChatWidget.jsx
│   ├── FloatingChatWidget.jsx
│   └── StatCard.jsx
│
├── layouts
│   └── DashboardLayout.jsx
│
├── pages
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Documents.jsx
│   ├── AIConfig.jsx
│   ├── Tickets.jsx
│   ├── Conversations.jsx
│   └── Analytics.jsx
│
├── routes
│   └── AppRoutes.jsx
│
└── App.jsx
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

## Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
```

Start Backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# API Endpoints

## Authentication

### Register

```http
POST /api/auth/register
```

### Login

```http
POST /api/auth/login
```

### Get Current User

```http
GET /api/auth/me
```

---

## Documents

### Upload Document

```http
POST /api/documents/upload
```

### Get Documents

```http
GET /api/documents
```

### Delete Document

```http
DELETE /api/documents/:id
```

---

## AI Configuration

### Get Config

```http
GET /api/config
```

### Update Config

```http
PUT /api/config
```

---

## Chat

### Ask Question

```http
POST /api/chat/ask
```

Request:

```json
{
  "question": "What is your refund policy?"
}
```

---

## Tickets

### Get Tickets

```http
GET /api/tickets
```

### Update Ticket Status

```http
PATCH /api/tickets/:id
```

---

## Conversations

### Get Conversations

```http
GET /api/conversations
```

### Get Messages

```http
GET /api/conversations/:id/messages
```

---

## Analytics

### Dashboard Analytics

```http
GET /api/analytics/dashboard
```

---

# AI Workflow

1. Upload Documents
2. Extract Text
3. Split into Chunks
4. Generate Embeddings
5. Store in Database
6. Retrieve Relevant Chunks
7. Generate Context
8. Send Context to Gemini
9. Return AI Response

---

# Escalation Workflow

The system automatically creates tickets when:

- Refund requested
- Payment failed
- Human requested
- Legal complaint
- Customer anger detected

Priority:

- HIGH
- MEDIUM
- LOW

---

# Future Improvements

- Multi-Tenant SaaS
- Pinecone Integration
- Human Handoff
- Website Embeddable Script
- WhatsApp Integration
- Email Integration
- Live Chat Dashboard
- Advanced Analytics

---

# Author

Piyush Mishra

B.Tech Computer Science Engineering

AI Customer Support Assistant Platform
