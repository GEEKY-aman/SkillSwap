# SkillSwap

SkillSwap is a platform for developers and learners to exchange skills, collaborate on projects, and grow together. It features a modern React frontend and a robust Express backend with real-time capabilities.

## 🚀 Tech Stack

- **Frontend**: React (Vite), TypeScript, Tailwind CSS, Lucide Icons, Framer Motion
- **Backend**: Node.js, Express, MongoDB (with In-Memory fallback), Socket.io
- **Analytics**: Vercel Analytics

## 📂 Project Structure

The project is organized into two main workspaces:

- **`client/`**: The React frontend application.
- **`server/`**: The Express backend API and WebSocket server.

Managed by a root `package.json` for convenient orchestration.

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation
Install dependencies for both client and server from the root directory:

```bash
npm run install:all
```

### 🏃‍♂️ Running Locally
Start both the frontend and backend servers concurrently:

```bash
npm run dev
```

- **Frontend**: [http://localhost:5173](http://localhost:5173) (or 3000)
- **Backend**: [http://localhost:5001](http://localhost:5001)

> **Note**: If port 5001 is in use, you may need to kill the process utilizing it or restart your terminal.

## 🌍 Deployment

### Frontend (Vercel)
The `client` directory is configured for Vercel deployment.
1. Create a new project on Vercel.
2. Link your GitHub repository.
3. Set **Root Directory** to `client`.
4. Deploy.

### Backend (Render / Railway)
The `server` directory should be deployed to a provider supporting persistent Node.js processes (for WebSockets).
1. Create a new Web Service on Render/Railway.
2. Set **Root Directory** to `server`.
3. Build Command: `npm install`
4. Start Command: `node index.js`

## 📊 Analytics
Vercel Analytics is integrated into the client. Data collection begins automatically upon deployment to Vercel.

## 📄 License
This project is licensed under the ISC License.
