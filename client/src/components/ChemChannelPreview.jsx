import React from 'react';
import { useChatContext } from 'stream-chat-react';

const GroupPreview = ({ channel, course }) => {
    if (channel?.data?.course === "chem") {
        return (
            <p className='channel-preview__item_chem'>
                # {channel?.data?.name || channel?.data?.id}
            </p>
        )
    }
}

const ChemChannelPreview = ({ setActiveChannel, setIsCreating, setIsEditing, setToggleContainer, channel, type }) => {
    const { channel: activeChannel, client } = useChatContext();

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
                <GroupPreview channel={channel}/>
            </div>
        </>
    )
}

export default ChemChannelPreview