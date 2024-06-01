import {  createContext, useEffect, useState } from "react";
import {  GoogleAuthProvider,  createUserWithEmailAndPassword,  getAuth,  onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../../firebase.config";
import UseAxiosPublic from "../hook/UseAxiosPublic";




export const AuthContext = createContext(null);
const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const axiosPublic = UseAxiosPublic()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();


    // create user
    const createUser = (email, password)=>{
        setLoading (true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // sign in user

    const signIn = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }


    // google login
    const googleLogin = () =>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // update user
    const updateUserProfile = (name, image) =>{
        return updateProfile(auth.createUser, {
            displayName:name,
            photoURL:image
        }).then(() => {
            // Profile updated!
            // ...
          }).catch((error) => {
            // An error occurred
            // ...
          });
    }

    const logOut = () =>{
        return signOut(auth)
        // swal('logout successfully')
     }


    // observer
    // useEffect(()=>{
    //     const unSubscribe = onAuthStateChanged(auth, createUser =>{
    //         const userEmail = createUser?.email || user?.email;
    //         const loggedUser = {email: userEmail};
    //         setUser(createUser)
    //         console.log('User ib auth state', createUser)
    //         setLoading(false)
    //         // if user exists then issue a token
    //         if(createUser){
    //             // get token and store
    //             const userInfo = {email: createUser.email};
    //             console.log('user infor', userInfo)
    //             axiosPublic.post('/jwt',userInfo)
    //             .then(res=>{
    //                 if(res.data.token){
    //                     localStorage.setItem('access-token', res.data.token);
    //                     setLoading(false)
    //                 }
    //             })
    //         }  else{
    //             // remove token .
    //             localStorage.removeItem('access-token')
    //             setLoading(false)
    //         }
    //         console.log('current user', createUser);
    //     })
    //     return()=>{
    //         unSubscribe();
    //     }
    // },[])

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged (auth,createUser=>{
           setUser(createUser)
           if(createUser){
               // get token and store
               const userInfo = {email: createUser.email};
               console.log('user infor', userInfo)
               axiosPublic.post('/jwt',userInfo)
               .then(res=>{
                   if(res.data.token){
                       localStorage.setItem('access-token', res.data.token);
                       setLoading(false)
                   }
               })
           }
           else{
               // remove token .
               localStorage.removeItem('access-token')
               setLoading(false)
           }
           console.log('current user', createUser);
         })
         return () =>{
           return unsubscribe()
         }
       },[axiosPublic])


    const authInfo = {
        googleLogin,
        signIn,
        createUser,
        user,
        loading,
        logOut,
        updateUserProfile
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;