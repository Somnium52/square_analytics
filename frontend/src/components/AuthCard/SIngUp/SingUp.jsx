import styles from '../AuthCard.module.css'
import InputField from '../../InputField/InputField'
import { useState } from 'react'
import Button from '../../Button/Button'

export default function SingUp(){
    const [userData, setUserData] = useState({
        email: "",
        pass: "",
        confPass: ""
    })
    const [info, setInfo] = useState(null)
    const [infoColor, setInfoColor] = useState("")
    const changeInfo = (text, color="white") =>{
        setInfo(text)
        setInfoColor(color)
    }

    const [isSubmitting, setIsSubmitting] = useState(false)
    
    const EMAIL_REGREX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    const handleChange = (e) =>{
        const {name, value} = e.target
        setUserData(prev => ({...prev, [name]: value}))
    }

    const validateData = () =>{
        if(!EMAIL_REGREX.test(userData.email.trim())){
            changeInfo("Please enter a valid email address", "red")
            return false
        }
        if(userData.pass.trim().length < 8){
            changeInfo("Password must be at least 8 characters", "red")
            return false
        }
        if(userData.pass != userData.confPass){
            changeInfo("Passwords don't match", "red")
            return false
        }
        changeInfo(null)
        return true
    }
 
    const handleSumbit = async (e) =>{
        e.preventDefault()
        if(validateData()){
            setIsSubmitting(true)
            try{
                const res = await fetch("http://localhost:8000/singup-submit",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: userData.email,
                        password: userData.pass,
                    })
                })

                const serverRes = await res.json()

                if(serverRes.success){
                    console.log(serverRes.message)
                    changeInfo(serverRes.message || "User has been created successfully", "green")
                }
                else{
                    changeInfo(serverRes.message || "This email is already registered", "red")
                }
            }
            catch(err){
                console.error("Sign Up request failed:", err)
                changeInfo("Can't connect to server", "red")
            }
            finally{
                setIsSubmitting(false)
            }
        }
    }

    return(
        <form onSubmit={handleSumbit}>
            <h2>Sing Up</h2><br />
            <InputField 
                label="Email"
                name="email"
                type='email'
                value={userData.email}
                onChange={handleChange}
                isDisable={isSubmitting}
            />
            <InputField 
                label="Password"
                name="pass"
                type='password'
                value={userData.pass}
                onChange={handleChange}
                isDisable={isSubmitting}
            />
            <InputField 
                label="Confirm Password"
                name="confPass"
                type='password'
                value={userData.confPass}
                onChange={handleChange}
                isDisable={isSubmitting}
            />
            <p style={{textAlign: 'center', fontSize: "0.8em", color: infoColor}}>{info}</p>
            <br />
            <Button backColor="var(--color-blue)" backColorHovered="var(--color-blue-hovered)" isLong={true} isDisabled={isSubmitting}><b>SIGN UP</b></Button>
            {isSubmitting ? (<div className={styles['loader']}/>) : (null)}
        </form>
    )
}