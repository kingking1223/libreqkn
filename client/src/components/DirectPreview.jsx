import React from 'react';
import { useChatContext } from 'stream-chat-react';

const DirectPreview = ({ setActiveChannel, setIsCreating, setIsEditing, setToggleContainer, channel, type }) => {
    const { channel: activeChannel, client } = useChatContext();


    const DirectPreviewHandler = () => {
        const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);

        return (
            <div className="channel-preview__item single">
                <p>{members[0]?.user?.name || members[0]?.user?.id}</p>
            </div>
        )
    }

    return (
        <>
            <div className={
                channel?.id === activeChannel?.id
                    ? `channel-preview__wrapper__selected`
                    : `channel-preview__wrapper`
            }
            onClick={() => {
                setIsCreating(false)
                setIsEditing(false)
                setActiveChannel(channel)
                
                if (setToggleContainer) {
                    setToggleContainer((prevState) => !prevState)
                }
            }}
            >
                <DirectPreviewHandler />
            </div>
        </>
    )
}

export default DirectPreview