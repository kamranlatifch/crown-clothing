import { useState } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import "../sign-in-form/sign-in-form.styles.scss"
import SignUpForm from "../sign-up-form/sign-up-form.component";

import Button from "../button/button.component";

const defaultFormField={
    email:'',
    password:'',
    

}
const SignInForm=()=>{
    const[formFields,setFormFields]=useState(defaultFormField);
    const {email,password}=formFields; //destructuring the values to use according to own  

  


    const resetFormFields=()=>{
        setFormFields(defaultFormField); //this function is to make fields empty
    }

    const handleSubmit= async(event)=>{
        event.preventDefault();


        try{
            const {user}= await signInAuthUserWithEmailAndPassword(email, password);
           
           resetFormFields();


        } catch(error){
            if(error.code=='auth/wrong-password'){
                alert("Incorrect password for email");
            } else if(error.code=='auth/user-not-found')
            {
                alert("No user is accociated with this E-Mail.")
            }
            console.log(error);
            
        }


        

    }


    const handleChange=(event)=>{  //general function takes an input event whenever the text changes,
        const {name,value}=event.target;
        setFormFields({...formFields,[name]:value});

    }
    

return (

    <div className="sign-up-container">
      <h2>Already have an account?</h2>
            <span>Sign in with your email and password
            </span>
      
        <form onSubmit={handleSubmit}>
           
            <label>Email</label>
            <input type="email" required onChange={handleChange} name="email" value={email}/>

            <label>Password</label>
            <input type="password" required onChange={handleChange} name="password" value={password}/>

            
            <Button type="submit">Sign In</Button>

    
        </form>
    
    </div>
)

}
export default SignInForm;