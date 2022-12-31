import React from 'react';

const GroupPreview = ({ userId, checkLesson, channelName }) => {
    if (checkLesson(userId, "isMath")) {
        return (
            <p className='channel-preview__item_chem'>
                # {channelName}
            </p>
        )
    }
}

const MathChannelPreview = ({ setActiveChannel, setIsCreating, setIsEditing, setToggleContainer, channel, type, userId, checkLesson }) => {
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
                <GroupPreview userId={userId} checkLesson={(userId, checkCourse) => checkLesson} channelName="math-assignment"/>
            </div>
            <div className='channel-preview__wrapper'
            onClick={(setIsCreating, setIsEditing, setActiveChannel, setToggleContainer) => handleChannelClick}>
                <GroupPreview userId={userId} checkLesson={(userId, checkCourse) => checkLesson} channelName="math-discussion"/>
            </div>
            <div className='channel-preview__wrapper'
            onClick={(setIsCreating, setIsEditing, setActiveChannel, setToggleContainer) => handleChannelClick}>
                <GroupPreview userId={userId} checkLesson={(userId, checkCourse) => checkLesson} channelName="math-lecture"/>
            </div>
        </>
    )
}

export default MathChannelPreview