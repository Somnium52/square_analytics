import styles from "./InputField.module.css"

export default function InputField({label, type="text", name, value, onChange, error, isDisable}){
    return(
        <div className={styles['input-container']}>
            <label>{label}</label><br />
            <input 
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className={styles['input-field']}
            placeholder={label}
            disabled={isDisable}
            />
            {error && <span style={{color: "red", fontSize: "0.8em"}}>{error}</span>}
        </div>
    )
}