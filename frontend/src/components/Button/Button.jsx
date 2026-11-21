import styles from "./Button.module.css"
import { useState } from "react"

export default function Button({children, color, colorHovered, textColor}){
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseEnter = () =>{
        setIsHovered(true)
    }

    const handleMouseLeave = () =>{
        setIsHovered(false)
    }

    const backgroundColor = isHovered ? colorHovered : color
    return(
        <div className={styles['button-container']}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{background: backgroundColor}}
        >
            <p className={styles['button-text']} style={{color: textColor}}>{children}</p>
        </div>
    )
}