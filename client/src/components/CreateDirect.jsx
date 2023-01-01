import React, { useState } from 'react'

import { UserList } from '.'
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

const CreateDirect = ({ createType, setIsCreating }) => {
    return (
        <div className='create-channel__containe'>
            <div className="create-channel__header">
                <p>Create Direct Message</p>
                <CloseCreateChannel setIsCreating={setIsCreating} />
            </div>
            <UserList />
            <div className="create-channel__button-wrapper" onClick={() => {}}>
                <p>Create</p>
            </div>
        </div>
    )
}

export default CreateDirect