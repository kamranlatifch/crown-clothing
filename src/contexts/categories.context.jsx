import { useState } from "react";
import { createContext, useEffect } from "react";
// import SHOP_DATA from '../../src/shop-data.js'
// import { addCollectionAndDocument } from "../utils/firebase/firebase.utils.js";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";
export const CategoriesContext=createContext({
    categoriesMap:{},
});

export const CategoriesProvider=({children})=>{

    const [categoriesMap,setCategoriesMap]=useState({})

    // useEffect(()=>{
    //     addCollectionAndDocument('categories',SHOP_DATA)
    // })
    //we will run this use effect just for once to upload data in our firestore ,,, rendering again and again will create trouble

    useEffect(()=>{
        const getCategoriesMap=async()=>{
           const categoryMap=await getCategoriesAndDocuments();
           console.log(categoryMap);
           setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    },[])

    const value={categoriesMap}
    return(
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}
