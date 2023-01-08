import React from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useCollectionData } from 'react-firebase-hooks/functions'

import { ChannelInner, CreateDirect, EditChannel, TeamMessage } from './'

const ChannelContainer = ({ isCreating, setIsCreating, isEditing, setIsEditing, createType }) => {

    if (isCreating) {
        return (
            <div className="channel_container">
                <CreateDirect createType={createType} setIsCreating={setIsCreating} />
            </div>
        )
    }

    if (isEditing) {
        return (
            <div className="channel_container">
                <EditChannel setIsEditing={setIsEditing} />
            </div>
        )
    }

    const EmptyState = () => (
        <div className="channel-empty__container">
            <p className="channel-empty__first">This is the the start of your chat.</p>
            <p className="channel-empty__second">Send message from here.</p>

        </div>
    )
    
    // TODO: Custom msgteam ui
    return (
        <div className="channel__container">
            <p>test</p>
        </div>
    )
}

export default ChannelContainer