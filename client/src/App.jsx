import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import Tooltip from '@mui/material/Tooltip';

import { ChannelListContainer, ChannelContainer, Auth, Settings, LeftBar } from './components'
import './App.css'
import 'stream-chat-react/dist/css/index.css'
const cookies = new Cookies()

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

const App = () => {
  const [ createType, setCreateType ] = useState('')
  const [ isCreating, setIsCreating ] = useState(false)
  const [ isEditing, setIsEditing ] = useState(false)
  const [ currentMode, setCurrentMode ] = useState("main")
  const [ isLightMode, setIsLightMode ] = useState(false)
  const [ isDev, setIsDev ] = useState(false)

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

  console.log(isLightMode)

  if (!authToken) return <Auth />

  if (currentMode === "settings") {
    return (
      <div className='app__wrapper'>
        <Chat client={client} theme="team light">
            <LeftBar logout={logout} setCurrentMode={setCurrentMode} />
            <Settings isLightMode={isLightMode} setIsLightMode={setIsLightMode}/>
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