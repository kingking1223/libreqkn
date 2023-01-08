import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import { letterSpacing } from '@mui/system';

const app = firebase.initializeApp({
    apiKey: "AIzaSyDFQGoA47CxHASOb2nUcPGpxJZu-nCiMGs",
    authDomain: "libreqkn.firebaseapp.com",
    projectId: "libreqkn",
    storageBucket: "libreqkn.appspot.com",
    messagingSenderId: "774106742827",
    appId: "1:774106742827:web:8bc2d397c5dc38c159ea6e",
    databaseURL: "https://libreqkn-default-rtdb.asia-southeast1.firebasedatabase.app/"
})

const database = getDatabase()

const DirectPreviewContent = ({ name }) => {
    return (
        <p className='channel-preview__item'>
            # {name}
        </p>
    )
}

const DirectPreviewHandler = ({ numberOfDirect, userId }) => {
    if (userId === "18ce") {
        return (
            <>
            {/* [...Array(numberOfDirect)].map((e, i) => <div className='channel-preview__wrapper' key={i}><DirectPreviewContent /></div>) */}
            <div className='channel-preview__wrapper'>
                <DirectPreviewContent name="King" />
            </div>
            <div className='channel-preview__wrapper'>
                <DirectPreviewContent name="Justin" />
            </div>
            <div className='channel-preview__wrapper'>
                <DirectPreviewContent name="Max" />
            </div>
        </>
        )
    } else if (userId === "cdg220055") {
        return (
            <>
                {/* [...Array(numberOfDirect)].map((e, i) => <div className='channel-preview__wrapper' key={i}><DirectPreviewContent /></div>) */}
                <div className='channel-preview__wrapper'>
                    <DirectPreviewContent name="Mr. Enoch Cheung" />
                </div>
                <div className='channel-preview__wrapper'>
                    <DirectPreviewContent name="Justin" />
                </div>
                <div className='channel-preview__wrapper'>
                    <DirectPreviewContent name="Max" />
                </div>
            </>
        )
    } else if (userId === "cdg220102") {
        return (
            <>
                {/* [...Array(numberOfDirect)].map((e, i) => <div className='channel-preview__wrapper' key={i}><DirectPreviewContent /></div>) */}
                <div className='channel-preview__wrapper'>
                    <DirectPreviewContent name="Mr. Enoch Cheung" />
                </div>
                <div className='channel-preview__wrapper'>
                    <DirectPreviewContent name="King" />
                </div>
                <div className='channel-preview__wrapper'>
                    <DirectPreviewContent name="Max" />
                </div>
            </>
        )
    } else {
        return (
            <>
            {/* [...Array(numberOfDirect)].map((e, i) => <div className='channel-preview__wrapper' key={i}><DirectPreviewContent /></div>) */}
            <div className='channel-preview__wrapper'>
                <DirectPreviewContent name="Mr. Enoch Cheung" />
            </div>
            <div className='channel-preview__wrapper'>
                <DirectPreviewContent name="King" />
            </div>
            <div className='channel-preview__wrapper'>
                <DirectPreviewContent name="Justin" />
            </div>
        </>
        )
    }
}

const DirectPreview = ({ setActiveChannel, setIsCreating, setIsEditing, setToggleContainer, channel, type, userId }) => {
    const [ numberOfDirect, setNumberOfDirect ] = useState(0)
    const [ opponentName, setOpponentName ] = useState([])

    const getNumberOfDirect = async (checkerid) => {
        let res = 0
        // setNumberOfDirect(0)
        const dmRef = ref(database, '/dm') 
        onValue(dmRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                if (childSnapshot.key.length === 18) {
                    if ((childSnapshot.key.slice(0, 9) === checkerid) || (childSnapshot.key.slice(9) === checkerid)) {
                        res++
                    } 
                } else if (childSnapshot.key.length === 13) {
                    if (((
                        childSnapshot.key.slice(0, 5) === checkerid) || 
                        (childSnapshot.key.slice(5) === checkerid)) || 
                        ((childSnapshot.key.slice(0, 9) === checkerid) || 
                        (childSnapshot.key.slice(9) === checkerid))) {
                            res++
                        }
                }
            });
            setNumberOfDirect(res)    
        }, {
            onlyOnce: true
        });
    }

    getNumberOfDirect(userId)

    const getUserNameById = async (id) => {
        get(child(ref(getDatabase()), `/user/${id}/dispName`)).then((snapshot) => {
        if (snapshot.exists()) {
            setOpponentName(snapshot.val());
        } else {
            alert("Error")
            console.log("No data available");
        }
        }).catch((error) => {
            alert("Error")
            console.error(error);
        });
    }

    const getOpponentName = async (checkerid) => {
        const dmRef = ref(database, '/dm') 
        onValue(dmRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                if (childSnapshot.key.length === 18) {
                    if ((childSnapshot.key.slice(0, 9) === checkerid) || (childSnapshot.key.slice(9) === checkerid)) {
                        // console.log(childSnapshot.val())
                        if (childSnapshot.val().creator === checkerid) {
                            getUserNameById(childSnapshot.val().receiver)
                        } else {
                            getUserNameById(childSnapshot.val().creator)
                        }
                    } 
                } else if (childSnapshot.key.length === 13) {
                    if (((
                        childSnapshot.key.slice(0, 5) === checkerid) || 
                        (childSnapshot.key.slice(5) === checkerid)) || 
                        ((childSnapshot.key.slice(0, 9) === checkerid) || 
                        (childSnapshot.key.slice(9) === checkerid))) {
                            if (childSnapshot.val().creator === checkerid) {
                                getUserNameById(childSnapshot.val().receiver)
                            } else {
                                getUserNameById(childSnapshot.val().creator)
                            }
                        }
                }
            });   
        }, {
            onlyOnce: true
        });
    }

    // getOpponentName(userId)
    // console.log(opponentName)

    const handleChannelClick = (setIsCreating, setIsEditing, setActiveChannel, setToggleContainer) => {
        setIsCreating(false)
        setIsEditing(false)
        setActiveChannel(channel)
        if (setToggleContainer) {
            setToggleContainer((prevState) => !prevState)
        }
    }

    return (
        <>
            <DirectPreviewHandler numberOfDirect={numberOfDirect} userId={userId}/>
        </>
    )
}

export default DirectPreview