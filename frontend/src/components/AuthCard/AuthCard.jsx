import styles from "./AuthCard.module.css"
import SingIn from "./SingIn/SingIn"
import SingUp from "./SIngUp/SingUp"


export default function AuthCard({action, onClose}){
    return(
        <div className={styles['popup-overlay']}>
            <button className={styles['close-button']} onClick={onClose}>&times;</button>
            <div className={styles['card-container']}>
                {action == "singup" && <SingUp />}
                {action == "singin" && <SingIn />}
            </div>
        </div>
    )
}