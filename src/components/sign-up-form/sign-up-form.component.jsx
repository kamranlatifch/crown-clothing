import { useState } from "react";
import Button from "../button/button.component";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import "./sign-up-form.styles.scss"
import FormInput from "../form-input/form-input.component";
const defaultFormField={
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''


}
const SignUpForm=()=>{
    const[formFields,setFormFields]=useState(defaultFormField);
    const {displayName,email,password,confirmPassword}=formFields; //destructuring the values to use according to own  
  
   

    const resetFormFields=()=>{
        setFormFields(defaultFormField); //this function is to make fields empty
    }

    const handleSubmit= async(event)=>{
        event.preventDefault();

        if(password !== confirmPassword)
        {
            alert("Password do not match");
            return;
        }

        try{
            const {user}= await createAuthUserWithEmailAndPassword(
            email,
            password);
           
           await createUserDocumentFromAuth(user,{displayName});
           resetFormFields();


        } catch(error){
            if(error.code=='auth/email-already-in-use'){
                alert('Can not create user, email already in use');
            } else{
                
            console.error("User creation encountered an error",error);
            
        }


        }

    }


    const handleChange=(event)=>{  //general function takes an input event whenever the text changes,
        const {name,value}=event.target;
        setFormFields({...formFields,[name]:value});

    }
    


return (

    <div className="sign-up-container">
      <h2>Don't Have An Account?</h2>
            <span>Sign Up With Your Email and Password
            </span>
        <form onSubmit={handleSubmit}>
            <FormInput
            label='Display Name' type="text" required onChange={handleChange} name="displayName" 
            value={displayName}/>
            <FormInput
            
            label='Email' type="email" required onChange={handleChange} name="email" value={email}/>

            <FormInput
            label='Password'
            type="password" required onChange={handleChange} name="password" value={password}/>

            <FormInput 
            label='Password'
             type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
            <Button type="submit">Sign Up</Button>

    
        </form>
    </div>
)

}
export default SignUpForm;