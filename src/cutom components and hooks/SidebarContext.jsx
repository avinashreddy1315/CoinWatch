// SidebarContext.jsx
import React, { createContext, useState, useContext } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [sidebar, setSidebar] = useState(false);

    return (
        <SidebarContext.Provider value={{ sidebar, setSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);
