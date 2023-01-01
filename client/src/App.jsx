import React, { useState, useMemo } from 'react';
// import { StreamChat } from 'stream-chat';
// import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import Tooltip from '@mui/material/Tooltip';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/functions'
import { ChannelListContainer, ChannelContainer, Auth, Settings, LeftBar } from './components'
import './App.css'
import 'stream-chat-react/dist/css/index.css'

const cookies = new Cookies()
const app = firebase.initializeApp({
    apiKey: "AIzaSyDFQGoA47CxHASOb2nUcPGpxJZu-nCiMGs",
    authDomain: "libreqkn.firebaseapp.com",
    projectId: "libreqkn",
    storageBucket: "libreqkn.appspot.com",
    messagingSenderId: "774106742827",
    appId: "1:774106742827:web:8bc2d397c5dc38c159ea6e",
    databaseURL: "https://libreqkn-default-rtdb.asia-southeast1.firebasedatabase.app/"
})

const acceptedUserId = ["X4KpdwSYZ9h4URxazoUyvCsey3d2", "g9Ua0lSO3marNKNJNH1pfRgV48U2"]
const acceptedUserEmail = [
    "t18ce@school.cdgfss.edu.hk", 
    "cdg220055@school.cdgfss.edu.hk", 
    "cdg220083@school.cdgfss.edu.hk", 
    "cdg220094@school.cdgfss.edu.hk", 
    "cdg220102@school.cdgfss.edu.hk", 
    "cdg220108@school.cdgfss.edu.hk"
]
const databaseUserId = [
    "18ce",
    "cdg220055",
    "cdg220083",
    "cdg220094",
    "cdg220102",
    "cdg220108"
]

const auth = getAuth(app);
const firestore = firebase.firestore();
const database = getDatabase()

const googleLogin = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
}

const App = () => {
    const [ createType, setCreateType ] = useState('')
    const [ isCreating, setIsCreating ] = useState(false)
    const [ isEditing, setIsEditing ] = useState(false)
    const [ currentMode, setCurrentMode ] = useState("main")
    const [ isLightMode, setIsLightMode ] = useState(false)
    const [ isDev, setIsDev ] = useState(false)
    const [user] = useAuthState(auth)
    const [ currentChannel, setCurrentChannel ] = useState("cl")
    const [ userId, setuserId ] = useState('')
    const [ numberOfDirect, setNumberOfDirect ] = useState(0)

    const logout = () => {
        setuserId('')
        auth.signOut()
    }

    onAuthStateChanged(auth, (user) => {
        try {
        if (user) {
            if (acceptedUserEmail.includes(user.email)) {
            setuserId(databaseUserId[acceptedUserEmail.indexOf(user.email)])
            } else {
            alert("Account not found")
            logout()
            }
        }
        } catch (e) {
        console.log(e)
        alert("Error occured. Please check console.")
        }
    })

    //TODO: Fix bug. Now no matter what all courses gets rendered even if /user/id/course is false.
    const checkLesson = async (checkerid, checkCourse) => {
        await get(child(ref(database), `/user/${checkerid}/${checkCourse}`)).then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val()
            } else {
                alert("Data not found.")
                console.log("No data available");
                return false
            }
            }).catch((error) => {
            alert("Error occured. Please check console.")
            console.error(error);
            return null
        });
    }

    if (!user) return <Auth googleLogin={googleLogin} />

    if (currentMode === "settings") {
        return (
        <div className='app__wrapper'>
            <LeftBar logout={logout} setCurrentMode={setCurrentMode} />
            <Settings isLightMode={isLightMode} setIsLightMode={setIsLightMode} isDev={isDev} setIsDev={setIsDev} />
        </div>
        )
    }

    return (
        <div className='app__wrapper'>
        <LeftBar logout={logout} setCurrentMode={setCurrentMode} />
        <ChannelListContainer 
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            setCreateType={setCreateType}
            setIsEditing={setIsEditing}
            isDev={isDev}
            currentChannel={currentChannel}
            setCurrentChannel={setCurrentChannel}
            userId={userId}
            checkLesson={(userId, checkCourse) => checkLesson}
            numberOfDirect={numberOfDirect}
            setNumberOfDirect={setNumberOfDirect}
        />
        <ChannelContainer 
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            createType={createType}
        />
        </div>
    )
}

export default App