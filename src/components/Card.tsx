import React from 'react'
import './Card.css'

export interface CardProps {
    color: string
    shape: string
    number: number
    shading: string
    onClick?: () => void
    isSelected?: boolean
    isInvalid?: boolean
    isInSetGroup?: boolean
}

const Card: React.FC<CardProps> = ({ color, shape, number, shading, onClick, isSelected, isInvalid, isInSetGroup }) => {
    function colorToHex(color: string): string {
        switch (color) {
            case 'red':
                return '#e34230'
            case 'green':
                return '#24b862'
            case 'purple':
                return '#8e44ad'
            default:
                return '#000000'
        }
    }
    const getShape = (shape: string, color: string) => {
        const patternId = `stripes-${color}`
        color = colorToHex(color)

        const stripedPattern = (
            <defs>
                <pattern id={patternId} patternUnits="userSpaceOnUse" width="5" height="10">
                    <line x1="0" y1="0" x2="0" y2="10" stroke={color} strokeWidth="4" />
                </pattern>
            </defs>
        )

        switch (shape) {
            case 'diamond':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -10 120 120" width="50" height="100">
                        {stripedPattern}
                        <polygon
                            points="5,50 50,135 95,50 50,-35"
                            fill={shading === 'solid' ? color : shading === 'striped' ? `url(#${patternId})` : 'none'}
                            stroke={shading === 'solid' ? 'none' : color}
                            strokeWidth={5}
                        />
                    </svg>
                )

            case 'oval':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="5 0 50 100" width={40} height={100}>
                        {stripedPattern}
                        <rect
                            x="10"
                            y="10"
                            width={40}
                            height={80}
                            rx="20"
                            ry="20"
                            fill={shading === 'solid' ? color : shading === 'striped' ? `url(#${patternId})` : 'none'}
                            stroke={shading === 'solid' ? 'none' : color}
                            strokeWidth={3}
                        />
                    </svg>
                )
            case 'squiggle':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 0 70 100" width={50} height={80}>
                        {stripedPattern} {/* Apply the striped pattern */}
                        <path
                            d="M38.4,63.4c0,16.1,11,19.9,10.6,28.3c-0.5,9.2-21.1,12.2-33.4,3.8s-15.8-21.2-9.3-38c3.7-7.5,4.9-14,4.8-20 c0-16.1-11-19.9-10.6-28.3C1,0.1,21.6-3,33.9,5.5s15.8,21.2,9.3,38C40.4,50.6,38.5,57.4,38.4,63.4z"
                            fill={shading === 'solid' ? color : shading === 'striped' ? `url(#${patternId})` : 'none'}
                            stroke={shading !== 'none' ? color : 'none'}
                            strokeWidth={3}
                        />
                    </svg>
                )

            default:
                return null
        }
    }

    return (
        <div
            className={`card ${isSelected ? 'selected' : ''} ${isInvalid ? 'invalid' : ''} ${isInSetGroup ? 'in-set-group' : ''}`}
            onClick={onClick}
        >
            {Array.from({ length: number + 1 }, (_, index) => (
                <div className="shape" key={index}>
                    {getShape(shape, color)}
                </div>
            ))}
        </div>
    )
}

export default Card
