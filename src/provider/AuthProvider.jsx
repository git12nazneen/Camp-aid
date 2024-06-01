import {  createContext, useEffect, useState } from "react";
import {  GoogleAuthProvider,  createUserWithEmailAndPassword,  getAuth,  onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../../firebase.config";



export const AuthContext = createContext(null);
const auth = getAuth(app)

const AuthProvider = ({children}) => {

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
        return updateProfile(auth.currentUser, {
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
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, createUser =>{
            // const userEmail = createUser?.email || user?.email;
            // const loggedUser = {email: userEmail};
            setUser(createUser)
            console.log('User ib auth state', createUser)
            setLoading(false)
            // if user exists then issue a token
            // if(createUser){
            //     axios.post( 'https://server-site-one-xi.vercel.app/jwt' ,loggedUser, {withCredentials: true})
            //     .then(res=>{
            //         console.log('token response',res.data)
            //     })
            // }else{
            //     axios.post('https://server-site-one-xi.vercel.app/logout', loggedUser, {
            //         withCredentials: true
            //     })
            //     .then(res=> console.log(res.data))
            // }
        })
        return()=>{
            unSubscribe();
        }
    },[])

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