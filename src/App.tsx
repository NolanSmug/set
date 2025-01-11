import { useEffect, useMemo } from 'react'

import Game from './logic/Game'
import Board from './components/Board'
import './App.css'
import { useUIContext } from './contexts/UIContext'

function App() {
    const { darkMode } = useUIContext()

    useEffect(() => {
        document.body.classList.toggle('dark-mode', darkMode)
    }, [darkMode])

    const game = useMemo(() => {
        const newGame = new Game()
        newGame.drawBoard()
        return newGame
    }, [])

    return <Board game={game} />
}

export default App
