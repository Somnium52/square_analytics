import {Link} from "react-router-dom"
import styles from "./Header.module.css"
import Button from "../Button/Button"
import { useAuth } from "../../context/AuthContext"

export default function Header(){
    const {isAuthenticated, logout} = useAuth()

    return(
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
                        <Button color="var(--color-blue)" colorHovered="var(--color-blue-hovered)">Sign In</Button>
                    )}
                </nav>
            </div>
        </div>
    )
}