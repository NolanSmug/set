import { CardData } from '../logic/CardData'
import ActionButton from './ActionButton'
import Card from './Card'

import './GameOverScreen.css'

import RESET_BUTTON_W from '../images/refresh-icon-w.svg'
import RESET_BUTTON_B from '../images/refresh-icon-b.svg'

interface GameOverScreenProps {
    refreshBoard: () => void
    darkMode: boolean
    foundSets: CardData[][]
}

const GameOverScreen = ({ refreshBoard, darkMode, foundSets }: GameOverScreenProps) => (
    <div className="game-over">
        {foundSets.length === 27 ? <h1>PERFECT GAME</h1> : <h1>Game Complete!</h1>}

        <ActionButton imageSrc={darkMode ? RESET_BUTTON_W : RESET_BUTTON_B} label="Play Again" onClick={refreshBoard} />
        <div className="found-sets-container">
            <h2 style={{ marginBottom: 0 }}>Sets Found: {foundSets.length}</h2>
            <hr></hr>
            {foundSets.length > 0 &&
                foundSets.map((set, index) => (
                    <div key={index} className="found-set">
                        {index + 1}
                        {set.map((card, index) => (
                            <Card
                                key={index}
                                color={card.colorToString()}
                                shape={card.shapeToString()}
                                number={card.getNumber()}
                                shading={card.shadingToString()}
                                isInSetGroup
                            />
                        ))}
                    </div>
                ))}
        </div>
    </div>
)

export default GameOverScreen
