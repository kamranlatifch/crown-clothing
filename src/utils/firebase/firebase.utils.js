// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
    } from 'firebase/auth';


import {getFirestore,doc,getDoc,setDoc,collection,writeBatch,query,getDocs} from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAM1fx-W247K9gRgsJwj3Pu1nYr0j__Qko",
  authDomain: "crwn-clothing-db-81145.firebaseapp.com",
  projectId: "crwn-clothing-db-81145",
  storageBucket: "crwn-clothing-db-81145.appspot.com",
  messagingSenderId: "311459384790",
  appId: "1:311459384790:web:66b45d641adcdff9126877"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider= new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:"select_account"
});

export const auth=getAuth();
export const signInWithGooglePopup= ()=> signInWithPopup(auth,provider);
// export const signInWithGoogleRedirect=()=> signInWithRedirect(auth,provider);
export const db=getFirestore();//in order to access data base,it will tell firebase when we want to get a document 

export const addCollectionAndDocument= async (collectionKey,objectsToAdd)=>{
    const collectionRef=collection(db,collectionKey);
     const batch=writeBatch(db);

     objectsToAdd.forEach((object)=>{
        const docRef=doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef,object);
     });
     await batch.commit();
     console.log("done");

    //seek for concept of transaction
}
export const getCategoriesAndDocuments= async ()=>{
    const collectionRef=collection(db,'categories');
    const q=query(collectionRef);
    const querySnapshot=await getDocs(q);

    const categoryMap=querySnapshot.docs.reduce((acc,docSnapshot)=>{
        const {title,items}=docSnapshot.data();
        acc[title.toLowerCase()]=items;
        return acc;
    },{})
return categoryMap;

}




//in order to use it below
export const createUserDocumentFromAuth= async (userAuth,additionalInformation={})=>{
    if(!userAuth); //to protect our code
    const userDocRef=doc(db,'users',userAuth.uid);
    console.log(userDocRef);
    const userSnapshot= await getDoc(userDocRef);
    console.log(userSnapshot.exists());
    //if user data does not exist 
    //create/set the document with the data form user Auth in my collection
    if(!userSnapshot.exists()){
        const{displayName,email}=userAuth;
        const createdAt=new Date();
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        }catch(error){
           console.log('Error creating the user', error.message);
        }
    }
    
    //Check if user data exists

    return userDocRef;


}
export const createAuthUserWithEmailAndPassword= async(email,password)=>{
    if(!email || !password) return;//to protect our code

    return await createUserWithEmailAndPassword(auth,email,password)
}

export const signInAuthUserWithEmailAndPassword= async(email,password)=>{
    if(!email || !password) return;//to protect our code

    return await signInWithEmailAndPassword(auth,email,password)
}
export const signOutUser=async()=>await signOut(auth);

export const onAuthStateChangedListener=(callback)=>{
    onAuthStateChanged(auth,callback); 
}