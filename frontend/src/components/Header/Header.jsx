import {Link} from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import styles from "./Header.module.css"
import Button from "../Button/Button"
import AuthCard from "../AuthCard/AuthCard"

export default function Header(){
    const {isAuthenticated, logout} = useAuth()
    const [isAuthCardOpen, setIsAuthCardOpen] = useState(false)
    const [authCardAction, setAuthCardAction] = useState("")

    const handleAuthButton = (action) =>{
        setIsAuthCardOpen(true)
        setAuthCardAction(action)
    }

    const onClose = () =>{
        setIsAuthCardOpen(false)
    }

    return(
        <>
        {isAuthCardOpen ? (
            <AuthCard action={authCardAction} onClose={onClose}/>
        ) : (null)}
            
        <div className={styles["header-container"]}>
            <div className={styles["logo-container"]}>
                <Link to="/">
                    <img src="/public/logo/square-analytics.svg" alt="square analytics logo svg" className={styles["logo-img"]}/>
                </Link>
            </div>
            <div className={styles["nav-container"]}>
                <nav>
                    {isAuthenticated ? (
                        <p>Authenticated SIX SEVEN</p>
                    ) : (
                        <>
                        <Button backColor="var(--color-background)" backColorHovered="var(--color-background)" textColorHovered="var(--color-white-hovered)" onClick={() => handleAuthButton("singin")}>Sign In</Button>
                        <Button backColor="var(--color-blue)" backColorHovered="var(--color-blue-hovered)" onClick={() => handleAuthButton("singup")}>Sign Up</Button>
                        </>
                    )}
                </nav>
            </div>
        </div>
        </>
    )
}