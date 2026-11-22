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
    const [error, setError] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    const EMAIL_REGREX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    const handleChange = (e) =>{
        const {name, value} = e.target
        setUserData(prev => ({...prev, [name]: value}))
    }

    const validateData = () =>{
        if(!EMAIL_REGREX.test(userData.email.trim())){
            setError("Please enter a valid email address")
            return false
        }
        if(userData.pass.trim().length < 8){
            setError("Password must be at least 8 characters")
            return false
        }
        if(userData.pass != userData.confPass){
            setError("Passwords don't match")
            return false
        }
        setError(null)
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
                }
                else{
                    setError(serverRes.message || "Sing Up Error")
                }
            }
            catch(err){
                console.error("Signup request failed:", err)
                setError("Can't connect to server")
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
            <p style={{textAlign: 'center', fontSize: "0.8em", color: "red"}}>{error}</p>
            <br />
            <Button backColor="var(--color-blue)" backColorHovered="var(--color-blue-hovered)" isLong={true} isDisabled={isSubmitting}><b>SIGN UP</b></Button>
            {isSubmitting ? (<div className={styles['loader']}/>) : (null)}
        </form>
    )
}