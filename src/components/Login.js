import { checkValidData, checkValidEmailPassword } from "../utils/validate";
import Header from "./Header";
import { useState,useRef } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";

const Login = () => {
    const dispatch = useDispatch();

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () => {
        //Validate the form data
        let message;
        if(!isSignInForm){
        message = checkValidData(name.current.value,email.current.value,password.current.value);
        }
        else{
        message = checkValidEmailPassword(email.current.value,password.current.value);
        }
        setErrorMessage(message);


        if(message !== null) return ;

        //Sign In /Sign Up Logic
        if(!isSignInForm){
           //Sign Up Logic
           createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
               .then((userCredential) => {
                   const user = userCredential.user;

                   updateProfile(user,{
                    displayName: name.current.value,
                    photoURL: USER_AVATAR,
                   })
                     .then(() => {
                        const { uid, email, displayName,photoURL} = auth.currentUser;
                        dispatch(
                            addUser({ 
                                uid:uid, 
                                email:email, 
                                displayName: displayName, 
                                photoURL: photoURL})
                            );
                     })
                     .catch((error) => {
                        setErrorMessage(error.message);
                     });
                })
              .catch((error) => {
                   const errorCode = error.code;
                   const errorMessage = error.message;
                   setErrorMessage(errorCode + "-" + errorMessage);
                });
            }
        else{
           //Sign In Logic
           signInWithEmailAndPassword(auth, email.current.value, password.current.value)
              .then((userCredential) => {
                 // Signed in 
                 //const user = userCredential.user;
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" + errorMessage);
              });
        }
    }

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    return <div>
        <Header />
        <div className="absolute">
            <img 
                src={BG_URL}
                alt="BackgroundImg"
             />
        </div>

        <form onSubmit={ (e) => e.preventDefault()} className="w-4/12 absolute p-12 bg-black my-32 mx-auto left-0 right-0 text-white bg-opacity-80">
            <h1 className="font-bold text-3xl py-4">
                { isSignInForm ? "Sign In" : "Sign Up" }
            </h1>
            {
                !isSignInForm && (
                  <input
                    ref={name}
                    type="text" 
                    placeholder="Full Name" 
                    className="p-4 my-4 w-full bg-gray-700" 
                 />
                )
            }
            <input
               ref = {email}
               type="text" 
               placeholder="Email Address" 
               className="p-4 my-4 w-full bg-gray-700" 
            />
            <input 
               ref = {password}
               type="password" 
               placeholder="Password" 
               className="p-4 my-4 w-full bg-gray-700" 
            />
            <p className="text-red-700 font-bold text-lg p-2">{errorMessage}</p>
            <button className="p-4 my-4 w-full bg-red-700" onClick={handleButtonClick}>
               { isSignInForm ? "Sign In" : "Sign Up" }
            </button>
            <p className="py-4 cursor-pointer" onClick={ toggleSignInForm }>
            { isSignInForm ? "New to Netflix? Sign Up Now" : "Already a user! Sign In Now" }
            </p>
        </form>
    </div>
};

export default Login;