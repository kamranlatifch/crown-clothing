
import {signInWithGooglePopup} from '../../../utils/firebase/firebase.utils';
import { createUserDocumentFromAuth } from '../../../utils/firebase/firebase.utils';
import SignUpForm from '../../sign-up-form/sign-up-form.component';

import SignInForm from '../../sign-in-form/sign-in-form.component';
const Authentication=()=>{
    const logGoogleUser=async()=>{
        const {user}=await signInWithGooglePopup();
       const userDocRef=await  createUserDocumentFromAuth(user);
       
    // //    const logGoogleRedirectUser=async()=>{
    // //     const {user}=await signInWithGoogleRedirect();
    // //     console.log({user});
       
    // };

    };
    return(
        <div>
            <h1>Sign In Page</h1>
            <SignInForm/>
            <button onClick={logGoogleUser}>Sign in with google popup</button>
            {/* <button onClick={logGoogleRedirectUser}>Sign in with google Redirect</button> */}

            <SignUpForm/>
        </div>
    )
}
export default Authentication;