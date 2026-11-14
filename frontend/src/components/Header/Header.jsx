import styles from "./Header.module.css"

export default function Header(){
    return(
        <div className={styles["header-container"]}>
            <div className={styles["logo-container"]}>
                <p>LOGO</p>
            </div>
            <div className={styles["nav-container"]}>
                <nav>
                    
                </nav>
            </div>
        </div>
    )
}