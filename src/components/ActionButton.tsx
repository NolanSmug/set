import './ActionButton.css'

export interface ActionButtonProps {
    imageSrc: string
    label?: string
    onClick?: () => void
    small?: boolean
    disabled?: boolean
}

function ActionButton({ imageSrc, label, onClick, small, disabled }: ActionButtonProps) {
    return (
        <div className="action-button">
            <button className={`action-button-container ${disabled ? 'disabled' : ''}`} type="button">
                <img src={imageSrc} className={`icon ${small ? 'small-button' : ''}`} alt={label} onClick={onClick} />
                <p className="label">{label}</p>
            </button>
        </div>
    )
}

export default ActionButton
