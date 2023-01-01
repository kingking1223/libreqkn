import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getDatabase, ref, child, get, onValue } from "firebase/database";

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

const DirectPreviewContent = () => {
    return (
        <p className='channel-preview__item'>
            # test
        </p>
    )
}

const DirectPreviewHandler = ({ numberOfDirect }) => {
    return (
        [...Array(numberOfDirect)].map((e, i) => <div className='channel-preview__wrapper' key={i}><DirectPreviewContent /></div>)
    )
}

const DirectPreview = ({ setActiveChannel, setIsCreating, setIsEditing, setToggleContainer, channel, type, userId }) => {
    const [ numberOfDirect, setNumberOfDirect ] = useState(0)

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

    const getOpponentName = async (checkerid) => {
        const dmRef = ref(database, '/dm') 
        onValue(dmRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                if (childSnapshot.key.length === 18) {
                    if ((childSnapshot.key.slice(0, 9) === checkerid) || (childSnapshot.key.slice(9) === checkerid)) {
                        console.log(childSnapshot.val())
                    } 
                } else if (childSnapshot.key.length === 13) {
                    if (((
                        childSnapshot.key.slice(0, 5) === checkerid) || 
                        (childSnapshot.key.slice(5) === checkerid)) || 
                        ((childSnapshot.key.slice(0, 9) === checkerid) || 
                        (childSnapshot.key.slice(9) === checkerid))) {
                        }
                }
            });   
        }, {
            onlyOnce: true
        });
    }

    getOpponentName("cdg220055")

    const handleChannelClick = (setIsCreating, setIsEditing, setActiveChannel, setToggleContainer) => {
        setIsCreating(false)
        setIsEditing(false)
        setActiveChannel(channel)
        if (setToggleContainer) {
            setToggleContainer((prevState) => !prevState)
        }
    }

    getNumberOfDirect(userId)

    return (
        <>
            <DirectPreviewHandler numberOfDirect={numberOfDirect} />
        </>
    )
}

export default DirectPreview