import styles from "./Button.module.css"
import { useState } from "react"

export default function Button({children, backColor, backColorHovered, textColor, textColorHovered, onClick, isLong, isDisabled}){
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseEnter = () =>{
        setIsHovered(true)
    }

    const handleMouseLeave = () =>{
        setIsHovered(false)
    }

    const backgroundColor = isHovered ? backColorHovered : backColor
    const fontColor = isHovered ? textColorHovered : textColor
    return(
        <button className={styles['button-container']}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{background: isDisabled ? backColorHovered : backgroundColor, width: isLong ? "100%" : null, cursor: isDisabled ? "not-allowed" : "pointer"}}
            onClick={onClick}
            disabled={isDisabled}
        >
            <p className={styles['button-text']} style={{color: fontColor}}>{children}</p>
        </button>
    )
}