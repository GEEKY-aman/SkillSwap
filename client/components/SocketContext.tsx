import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';

interface SocketContextType {
    socket: Socket | null;
    onlineUsers: string[];
    sendMessage: (receiverId: string, text: string) => void;
    emitTyping: (receiverId: string) => void;
    emitStopTyping: (receiverId: string) => void;
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    onlineUsers: [],
    sendMessage: () => { },
    emitTyping: () => { },
    emitStopTyping: () => { },
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, token } = useAuth();
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        if (!token || !user) {
            // Disconnect if logged out
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
            return;
        }

        const SOCKET_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5001/api').replace('/api', '');

        const newSocket = io(SOCKET_URL, {
            auth: { token },
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 2000,
        });

        newSocket.on('connect', () => {
            console.log('🔌 Socket connected:', newSocket.id);
        });

        newSocket.on('connect_error', (err) => {
            console.error('Socket connection error:', err.message);
        });

        newSocket.on('online_users', (users: string[]) => {
            setOnlineUsers(users);
        });

        socketRef.current = newSocket;

        return () => {
            newSocket.disconnect();
            socketRef.current = null;
        };
    }, [token, user]);

    const sendMessage = useCallback((receiverId: string, text: string) => {
        socketRef.current?.emit('send_message', { receiverId, text });
    }, []);

    const emitTyping = useCallback((receiverId: string) => {
        socketRef.current?.emit('typing', { receiverId });
    }, []);

    const emitStopTyping = useCallback((receiverId: string) => {
        socketRef.current?.emit('stop_typing', { receiverId });
    }, []);

    return (
        <SocketContext.Provider value={{
            socket: socketRef.current,
            onlineUsers,
            sendMessage,
            emitTyping,
            emitStopTyping,
        }}>
            {children}
        </SocketContext.Provider>
    );
};
