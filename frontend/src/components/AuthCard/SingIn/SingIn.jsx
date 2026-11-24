import styles from '../AuthCard.module.css'
import { useState } from 'react'
import Button from '../../Button/Button'
import InputField from '../../InputField/InputField'

export default function SingIn(){
    const [userData, setUserData] = useState({
        email: "",
        pass: "",
    })
    const [info, setInfo] = useState(null)
    const [infoColor, setInfoColor] = useState("")
    const changeInfo = (text, color="white") =>{
        setInfo(text)
        setInfoColor(color)
    }
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e) =>{
        const {name, value} = e.target
        setUserData(prev => ({...prev, [name]: value}))
    }

    const validateData = () =>{
        if(userData.email.trim() == ""){
            changeInfo("Please enter a email", "red")
            return false
        }
        if(userData.pass.trim() == ""){
            changeInfo("Please enter a password", "red")
            return false
        }
        changeInfo(null)
        return true
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(validateData()){
            setIsSubmitting(true)
            try{
                const res = await fetch("http://localhost:8000/singin-submit",{
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
                if (serverRes.success){
                    console.log(serverRes.message)
                    changeInfo(serverRes.message || "Sing In Successfully", "green")
                }
                else{
                    changeInfo(serverRes.message || "Wrong email or paswword", "red")
                }
            }
            catch(err){
                console.error("Sing In request failed:", err)
            }
            finally{
                setIsSubmitting(false)
            }
        }
    }

    return(
        <form onSubmit={handleSubmit}> 
            <h2>Sing In</h2><br />
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
            <p style={{textAlign: 'center', fontSize: "0.8em", color: infoColor}}>{info}</p>
            <br />
            <Button backColor="var(--color-blue)" backColorHovered="var(--color-blue-hovered)" isLong={true} isDisabled={isSubmitting}><b>SIGN IN</b></Button>
            {isSubmitting ? (<div className={styles['loader']}/>) : (null)}
    </form>
    )
}