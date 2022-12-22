import React from 'react'

import { AddChannel } from '../assets';

const TeamChannelList = ({ children, error = false, loading, type }) => {
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
            <p className='team-channel-list__header__title'>
                {type === 'team' ? "Channnels" : "Direct Messages"}
            </p>
            {/* TODO: add channel button*/}
        </div>
        {children}
    </div>
  )
}

export default TeamChannelList