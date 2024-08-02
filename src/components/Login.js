import { checkValidData, checkValidEmailPassword } from "../utils/validate";
import Header from "./Header";
import { useState,useRef } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
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
                   console.log(user);
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
                 const user = userCredential.user;
                 console.log(user);
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
                src="https://assets.nflxext.com/ffe/siteui/vlv3/826348c2-cdcb-42a0-bc11-a788478ba5a2/13803d44-805f-4a74-9ad9-4fd16d76feb8/NP-en-20240729-POP_SIGNUP_TWO_WEEKS-perspective_WEB_9d54290e-dd19-45c2-8002-7a12a9dea821_small.jpg"
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