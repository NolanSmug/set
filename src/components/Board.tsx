import { useEffect, useState } from 'react'
import Game from '../logic/Game'
import Card from './Card'
import ActionButton from './ActionButton'
import GameOverScreen from './GameOverScreen'
import { useUIContext } from '../contexts/UIContext'

import './Board.css'

import RESET_BUTTON_W from '../images/refresh-icon-w.svg'
import RESET_BUTTON_B from '../images/refresh-icon-b.svg'
import D_MODE from '../images/dark-mode-icon.svg'
import L_MODE from '../images/light-mode-icon.svg'
import NO_SETS_W from '../images/no-sets-w.svg'
import NO_SETS_B from '../images/no-sets-b.svg'
import { CardData } from '../logic/CardData'

export interface BoardProps {
    game: Game
}

function Board({ game }: BoardProps) {
    const { darkMode, setDarkMode, extraCards, setExtraCards } = useUIContext()

    const [selectedCardIndexes, setSelectedCardIndexes] = useState<number[]>([])
    const [numSetsFound, setNumSetsFound] = useState<number>(0)
    const [alreadyDeductedScore, setAlreadyDeductedScore] = useState<boolean>(false)
    const [isGameOver, setIsGameOver] = useState<boolean>(false)
    const [isInvalidSet, setIsInvalidSet] = useState<boolean>(false)

    const board = game.getBoard()

    const refreshBoard = () => {
        setNumSetsFound(0)
        setSelectedCardIndexes([])
        setExtraCards(false)
        setAlreadyDeductedScore(false)
        setIsGameOver(false)
        game.generateDeck()
        game.drawBoard()
    }

    const checkNoSets = () => {
        if (!game.findSets()) {
            if (game.getDeck().length === 0) {
                setIsGameOver(true)
            } else {
                setExtraCards(true)
                game.drawThreeMoreCards() // draw 3 more cards if user is correct about no sets
            }
            setAlreadyDeductedScore(false)
        } else {
            if (!alreadyDeductedScore) setNumSetsFound((prev) => prev - 1)
            setAlreadyDeductedScore(true)
        }
    }

    useEffect(() => {
        if (selectedCardIndexes.length === 3) {
            const selectedCards: CardData[] = selectedCardIndexes.map((i) => board[i])

            const isSet: boolean = game.isSet(selectedCards)

            if (!isSet) setIsInvalidSet(true)

            setTimeout(() => {
                if (isSet) {
                    if (extraCards) {
                        game.removeSetOnBoard(selectedCards) // if 15 cards are on board, remove
                        setExtraCards(false)
                    } else {
                        game.replaceSetOnBoard(selectedCards) // if 12 cards are on board, replace
                    }
                    setNumSetsFound((prev) => prev + 1)
                    game.addSetToFoundSets(selectedCards)
                } else {
                    setNumSetsFound((prev) => prev - 1)
                }
                setSelectedCardIndexes([])
                setAlreadyDeductedScore(false)
                setIsInvalidSet(false)
            }, 250)
        }
    }, [selectedCardIndexes, game, board, extraCards, setExtraCards])

    const handleCardClick = (selectedIndex: number): void => {
        setSelectedCardIndexes(
            (currentSelected) =>
                currentSelected.includes(selectedIndex)
                    ? currentSelected.filter((cardIndex) => cardIndex !== selectedIndex) // if card is already selected, remove it
                    : [...currentSelected, selectedIndex] // else add it
        )
    }

    return (
        <div className="board-container">
            {isGameOver ? (
                <GameOverScreen refreshBoard={refreshBoard} darkMode={darkMode} foundSets={game.getFoundSets()} />
            ) : (
                <>
                    <h2>Sets Found: {numSetsFound}</h2>

                    <div className={extraCards ? 'board-15' : 'board-12'}>
                        {board.map((card, index) => (
                            <Card
                                key={index}
                                color={card.colorToString()}
                                shape={card.shapeToString()}
                                number={card.getNumber()}
                                shading={card.shadingToString()}
                                onClick={() => handleCardClick(index)}
                                isSelected={selectedCardIndexes.includes(index)}
                                isInvalid={isInvalidSet && selectedCardIndexes.includes(index)}
                            />
                        ))}
                    </div>
                    <div className="buttons-container">
                        <ActionButton
                            imageSrc={darkMode ? RESET_BUTTON_W : RESET_BUTTON_B}
                            label="Reset"
                            onClick={refreshBoard}
                        />
                        <ActionButton
                            imageSrc={darkMode ? L_MODE : D_MODE}
                            label="Theme"
                            onClick={() => setDarkMode((prev) => !prev)}
                        />
                        <ActionButton
                            imageSrc={darkMode ? NO_SETS_W : NO_SETS_B}
                            label="No Sets"
                            onClick={checkNoSets}
                            disabled={alreadyDeductedScore}
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default Board
