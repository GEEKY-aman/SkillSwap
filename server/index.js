const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins for dev
        methods: ["GET", "POST"]
    }
});

// Import routes
const projectRoutes = require('./routes/projectRoutes');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const hackathonRoutes = require('./routes/hackathonRoutes');
const courseRoutes = require('./routes/courseRoutes');
const quizRoutes = require('./routes/quizRoutes');
const profileRoutes = require('./routes/profileRoutes');
const postRoutes = require('./routes/postRoutes');
const messageRoutes = require('./routes/messageRoutes');
const roomRoutes = require('./routes/roomRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const userRoutes = require('./routes/userRoutes');

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/hackathons', hackathonRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/users', userRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error Middleware (must be after routes)
app.use(notFound);
app.use(errorHandler);

// --- Real-time Chat with Socket.io ---
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Message = require('./models/Message');

// Map of userId -> socketId for online tracking
const onlineUsers = new Map();

// Authenticate sockets via JWT
io.use(async (socket, next) => {
    try {
        const token = socket.handshake.auth?.token || socket.handshake.query?.token;
        if (!token) return next(new Error('Authentication required'));

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if (!user) return next(new Error('User not found'));

        socket.userId = user._id.toString();
        socket.userName = user.name;
        next();
    } catch (err) {
        next(new Error('Invalid token'));
    }
});

io.on('connection', (socket) => {
    console.log(`✅ ${socket.userName} connected (${socket.id})`);

    // Track online user
    onlineUsers.set(socket.userId, socket.id);
    io.emit('online_users', Array.from(onlineUsers.keys()));

    // --- 1-on-1 Chat ---
    socket.on('send_message', async (data) => {
        try {
            const { receiverId, text } = data;
            if (!receiverId || !text) return;

            // Persist to DB
            const message = await Message.create({
                sender: socket.userId,
                receiver: receiverId,
                text,
            });
            const populated = await message.populate('sender', 'name avatar');

            // Send to receiver if they're online
            const receiverSocketId = onlineUsers.get(receiverId);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit('receive_message', populated);
            }

            // Send back to sender too (confirmation)
            socket.emit('message_sent', populated);
        } catch (err) {
            console.error('Socket send_message error:', err.message);
            socket.emit('message_error', { error: 'Failed to send message' });
        }
    });

    // Typing indicator
    socket.on('typing', (data) => {
        const receiverSocketId = onlineUsers.get(data.receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('user_typing', {
                userId: socket.userId,
                userName: socket.userName,
            });
        }
    });

    socket.on('stop_typing', (data) => {
        const receiverSocketId = onlineUsers.get(data.receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('user_stop_typing', {
                userId: socket.userId,
            });
        }
    });

    // --- LiveRooms (existing) ---
    socket.on('join_room', (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.userName} joined room ${roomId}`);
    });

    socket.on('room_message', (data) => {
        socket.to(data.room).emit('receive_room_message', data);
    });

    socket.on('code_change', (data) => {
        socket.to(data.room).emit('code_update', data.code);
    });

    // Disconnect
    socket.on('disconnect', () => {
        console.log(`❌ ${socket.userName} disconnected (${socket.id})`);
        onlineUsers.delete(socket.userId);
        io.emit('online_users', Array.from(onlineUsers.keys()));
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
