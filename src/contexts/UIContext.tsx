import React, { createContext, useContext, useState, ReactNode } from 'react'

interface UIContextProps {
    darkMode: boolean
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
    extraCards: boolean
    setExtraCards: React.Dispatch<React.SetStateAction<boolean>>
}

const UIContext = createContext<UIContextProps | undefined>(undefined)
export const UIProvider = ({ children }: { children: ReactNode }) => {
    const [darkMode, setDarkMode] = useState<boolean>(true)
    const [extraCards, setExtraCards] = useState<boolean>(false)

    return (
        <UIContext.Provider
            value={{
                darkMode,
                setDarkMode,
                extraCards,
                setExtraCards,
            }}
        >
            {children}
        </UIContext.Provider>
    )
}

export const useUIContext = () => {
    const context = useContext(UIContext)
    if (context === undefined) {
        throw new Error('useUIContext must be used within a UIProvider')
    }
    return context
}
