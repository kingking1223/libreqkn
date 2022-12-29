import React from 'react'

import { AddChannel } from '../assets';

const HeaderText = ({ type, course }) => {
    if (type === "team") {
        if (course === "chem") {
            return <p className='team-channel-list__header__title'>Chemistry</p>
        } else if (course === "math") {
            return <p className='team-channel-list__header__title'>Mathematics</p>
        } else {
            return <p className='team-channel-list__header__title'>Programming</p>
        }
        // return <p className='team-channel-list__header__title'>Channels</p>
    } else {
        return <p className='team-channel-list__header__title'>Direct Messages</p>
    }
}

const TeamChannelList = ({ course, children, error = false, loading, type, isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer, isDev }) => {

    if (error) {
    return type === 'team' ? (
        <div className='team-channel-list'>
            <p className='team-channel-list__message'>
                Connection error occured. Please wait and retry.
            </p>
        </div>
    ) : null;
  }

  if (loading) {
    return type === 'team' ? (
        <div className='team-channel-list'>
            <p className='team-channel-list__message loading'>
                {type === "team" ? "Channels" : "Messages"} loading...
            </p>
        </div>
    ) : null;
  }

  return (
    <div className='team-channel-list'>
        <div className='team-channel-list__header'>
            <HeaderText 
                type={type}
                course={course}
            />
            {isDev === true &&
                <AddChannel 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType} 
                    setIsEditing={setIsEditing}
                    type={type === 'team' ? 'team' : 'messaging'}
                    setToggleContainer={setToggleContainer}
                    course={course}
                />
            }      
        </div>
        {children}
    </div>
  )
}

export default TeamChannelList