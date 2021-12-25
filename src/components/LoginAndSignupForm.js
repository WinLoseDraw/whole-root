import "./CSS/LoginAndSignupForm.css"

import { useState } from "react";
import { CSSTransition } from "react-transition-group";

const LoginAndSignupForm = ({ login, enterMainPage, events, onLogin, onSignup }) => {

    // Hooks
    const [LoginCredentials, setLoginCredentials] = useState({email: "", password: ""})
    const [SignUpDetails, setSignUpDetails] = useState({name: "", email: "", password: "", confPassword: ""})

    // Events
    const onLoginSubmit = e => { 
        
        e.preventDefault()

        if (events.checkLogin(LoginCredentials)){
            login()
        }
        
        setLoginCredentials({email: "", password: ""})
    }  

    const onSignupSubmit = e => {

        e.preventDefault()

        if (SignUpDetails.name === "" || SignUpDetails.password === "" || SignUpDetails.email === "" || SignUpDetails.confPassword === ""){
            return
        }
        

        if (SignUpDetails.password === SignUpDetails.confPassword){

            if (events.getSignupDetails(SignUpDetails)){
                onSignup.set(false)
            }
        }
    }

    return (
        <div className="form-container">
            <CSSTransition
                in={onLogin.get}
                timeout={500}
                classNames="fade"
                unmountOnExit
                onExited={() => {onSignup.set(true); setLoginCredentials({email: "", password: ""})}}>

                <form action="login" className="main-form" onSubmit={onLoginSubmit}>
                    
                    <label>LOG IN</label>

                    <input type="email" placeholder="Email"
                        value={LoginCredentials.email}
                        onChange={ e => setLoginCredentials({...LoginCredentials, email: e.target.value})} />

                    <input type="password" placeholder="Password" 
                        value={LoginCredentials.password}
                        onChange={ e => setLoginCredentials({...LoginCredentials, password: e.target.value})} />

                    <button type="submit">LOG IN</button>

                    <button type="button" onClick={() => enterMainPage()}>Back</button>
                </form>

            </CSSTransition>

            <CSSTransition
                in={onSignup.get}
                timeout={500}
                classNames="fade"
                unmountOnExit
                onExited={() => {onLogin.set(true); setSignUpDetails({name: "", email: "", password: "", confPassword: ""})}}>

                    <form action="signup" className="main-form" onSubmit={onSignupSubmit}>

                        <label>SIGN UP</label>

                        <input type="text" placeholder="Name" 
                            value={SignUpDetails.name}
                            onChange={e => setSignUpDetails({...SignUpDetails, name: e.target.value})}/>

                        <input type="email" placeholder="Email" 
                            value={SignUpDetails.email}
                            onChange={e => setSignUpDetails({...SignUpDetails, email: e.target.value})}/>

                        <input type="password" placeholder="Password" 
                            value={SignUpDetails.password}
                            onChange={e => setSignUpDetails({...SignUpDetails, password: e.target.value})}/>

                        <input type="password" placeholder="Confirm Password" 
                            value={SignUpDetails.confPassword}
                            onChange={e => setSignUpDetails({...SignUpDetails, confPassword: e.target.value})}/>

                        <button type="submit">SIGN UP</button>

                        <button type="button" onClick={() => enterMainPage()}>BACK</button>

                    </form>
            </CSSTransition>
        </div>
    )
}

export default LoginAndSignupForm
