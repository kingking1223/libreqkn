import React from 'react';

const chemaccepted = [
    "18ce",
    "cdg220055",
    "cdg220102",
    "cdg220108"
]

const GroupPreview = ({ userId, checkLesson, channelName }) => {
    if (checkLesson(userId, "isChem")) {
        return (
            <p className='channel-preview__item_chem'>
                # {channelName}
            </p>
        )
    }
}

const ChemChannelPreview = ({ setActiveChannel, setIsCreating, setIsEditing, setToggleContainer, channel, type, userId, checkLesson }) => {
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
            <div className='channel-preview__wrapper'
            onClick={(setIsCreating, setIsEditing, setActiveChannel, setToggleContainer) => handleChannelClick}>
                <GroupPreview userId={userId} checkLesson={(userId, checkCourse) => checkLesson} channelName="chem-assignment"/>
            </div>

            <div className='channel-preview__wrapper'
            onClick={(setIsCreating, setIsEditing, setActiveChannel, setToggleContainer) => handleChannelClick}>
                <GroupPreview userId={userId} checkLesson={(userId, checkCourse) => checkLesson} channelName="chem-discussion"/>
            </div>

            <div className='channel-preview__wrapper'
            onClick={(setIsCreating, setIsEditing, setActiveChannel, setToggleContainer) => handleChannelClick}>
                <GroupPreview userId={userId} checkLesson={(userId, checkCourse) => checkLesson} channelName="chem-lecture"/>
            </div>
        </>
    )
}

export default ChemChannelPreview