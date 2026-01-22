import React from 'react';
import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';

export const Whiteboard: React.FC = () => {
    return (
        <div className="w-full h-full relative bg-white">
            <Tldraw
                persistenceKey="skillswap-whiteboard"
                inferDarkMode={false} // Force light mode for now or sync with app theme
            />
        </div>
    );
};
