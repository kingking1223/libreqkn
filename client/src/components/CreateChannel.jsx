import React, { useState } from 'react'
import { useChatContext } from 'stream-chat-react'

import { UserList } from './'
import { CloseCreateChannel } from '../assets'

const ChannelNameInput = ({ channelName = '', setChannelName, }) => {
    const handleChange = (e) => {
        e.preventDefault()
        setChannelName(e.target.value)
    }

    return (
        <div className='channel-name-input__wrapper'>
            <p>Name</p>
            <input value={channelName} onChange={handleChange} placeholder="Channel Name" />
            <p>Add Members</p>
        </div>
    )
}

const CreateChannel = ({ createType, setIsEditing}) => {
    const [ channelName, setChannelName ] = useState('')

    return (
        <div className='create-channel__containe'>
            <div className="create-channel__header">
                <p>{createType === "team" ? 'Create a New Channel' : "Send a Direct Message"}</p>
                <CloseCreateChannel setIsCreating={setIsEditing} />
            </div>
            {createType === "team" && <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>}
            <UserList />
        </div>
    )
}

export default CreateChannel