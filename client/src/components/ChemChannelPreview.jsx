import React from 'react';

const GroupPreview = ({ userId, channelName, checkLesson, isAllowedInChem }) => {
    if (true) {
        return (
            <p className='channel-preview__item'>
                # {channelName}
            </p>
        )
    }
}

const ChemChannelPreview = ({ setActiveChannel, setIsCreating, setIsEditing, setToggleContainer, channel, type, userId, checkLesson, checkLessonHander, isAllowedInChem }) => {
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
                <GroupPreview 
                    userId={userId} 
                    isAllowedInChem={isAllowedInChem}
                    checkLesson={(checkerId, checkCourse) => checkLesson} 
                    checkLessonHander={(checkerId, checkCourse) => checkLessonHander} 
                    channelName="chem-assignment"
                />
            </div>

            <div className='channel-preview__wrapper'
            onClick={(setIsCreating, setIsEditing, setActiveChannel, setToggleContainer) => handleChannelClick}>
                <GroupPreview 
                    userId={userId} 
                    isAllowedInChem={isAllowedInChem}
                    checkLesson={(checkerId, checkCourse) => checkLesson}
                    checkLessonHander={(checkerId, checkCourse) => checkLessonHander} 
                    channelName="chem-discussion"
                />
            </div>

            <div className='channel-preview__wrapper'
            onClick={(setIsCreating, setIsEditing, setActiveChannel, setToggleContainer) => handleChannelClick}>
                <GroupPreview 
                    userId={userId} 
                    isAllowedInChem={isAllowedInChem}
                    checkLesson={(checkerId, checkCourse) => checkLesson}
                    checkLessonHander={(checkerId, checkCourse) => checkLessonHander} 
                    channelName="chem-lecture"/>
            </div>
        </>
    )
}

export default ChemChannelPreview