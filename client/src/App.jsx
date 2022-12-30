import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import Tooltip from '@mui/material/Tooltip';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
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
  appId: "1:774106742827:web:8bc2d397c5dc38c159ea6e"
})

const auth = getAuth(app);
const firestore = firebase.firestore();
const apiKey = process.env.REACT_APP_STREAM_API_KEY;

const client = StreamChat.getInstance(apiKey);

const authToken = cookies.get('token');

if (authToken) {
  client.connectUser({
    id: cookies.get('userId'),
    name: cookies.get('username'),
    fullName: cookies.get('fullName'),
    image: cookies.get('avatarURL'),
    hashedPassword: cookies.get('hashedPassword'),
    phoneNumber: cookies.get('phoneNumber'),
  }, authToken)
}

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

  const logout = () => {
    cookies.remove("token");
    cookies.remove('userId');
    cookies.remove('username');
    cookies.remove('fullName');
    cookies.remove('avatarURL');
    cookies.remove('hashedPassword');
    cookies.remove('phoneNumber');

    window.location.reload();
  }

  if (!user) return <Auth googleLogin={googleLogin} />

  if (currentMode === "settings") {
    return (
      <div className='app__wrapper'>
        <Chat client={client} theme="team light">
            <LeftBar logout={logout} setCurrentMode={setCurrentMode} />
            <Settings client={client} isLightMode={isLightMode} setIsLightMode={setIsLightMode} isDev={isDev} setIsDev={setIsDev} />
        </Chat>
    </div>
    )
  }

  return (
    <div className='app__wrapper'>
        <Chat client={client} theme="team light">
            <LeftBar logout={logout} setCurrentMode={setCurrentMode} />
            <ChannelListContainer 
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              isDev={isDev}
            />
            <ChannelContainer 
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              createType={createType}
            />
        </Chat>
    </div>
  )
}

export default App