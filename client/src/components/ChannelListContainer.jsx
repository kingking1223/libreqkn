import React, { useState } from 'react';
// import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import Tooltip from '@mui/material/Tooltip';

import { ChannelSearch, TeamChannelList, ChemChannelPreview, MathChannelPreview, ProgChannelPreview, DirectPreview } from './';
import libreqknIcon from '../assets/libreqkn.jpg'
import SettingsIcon from '../assets/SettingsIcon.svg'
import LogoutIcon from '../assets/logout.png'

const cookies = new Cookies();


const CompanyHeader = () => (
    <div className="channel-list__header">
        <p className="channel-list__header__text">Libreqkn</p>
    </div>
)

const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team')
}

const customChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging')
}

const ChannelListContent = ({ 
    isCreating,
    setIsCreating, 
    setCreateType, 
    setIsEditing, 
    setToggleContainer, 
    isDev, 
    currentChannel, 
    setCurrentChannel,
    userId,
    checkLesson,
    checkDirect,
    numberOfDirect,
    setNumberOfDirect,
    getNumberOfDirect
}) => {

    return (
        <>
            {/* <SideBar logout={logout} setCurrentMode={setCurrentMode}/> */}
            <div className="channel-list__list__wrapper">
                <CompanyHeader />
                {/* <ChannelSearch setToggleContainer={setToggleContainer}/> */}
                <TeamChannelList 
                    type="team"
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType} 
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                    course="chem"
                    isDev={isDev}
                />
                <ChemChannelPreview 
                    setIsCreating={setIsCreating}
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                    type="team"
                    currentChannel={currentChannel}
                    setCurrentChannel={setCurrentChannel}
                    userId={userId}
                    checkLesson={(userId, checkCourse) => checkLesson}
                />
                <TeamChannelList 
                    type="team"
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType} 
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                    course="math"
                    isDev={isDev}
                />
                <MathChannelPreview 
                    setIsCreating={setIsCreating}
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                    type="team"
                    currentChannel={currentChannel}
                    setCurrentChannel={setCurrentChannel}
                    userId={userId}
                    checkLesson={(userId, checkCourse) => checkLesson}
                />
                <TeamChannelList 
                    type="team"
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType} 
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                    course="prog"
                    isDev={isDev}
                />
                <ProgChannelPreview 
                    setIsCreating={setIsCreating}
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                    type="team"
                    currentChannel={currentChannel}
                    setCurrentChannel={setCurrentChannel}
                    userId={userId}
                    checkLesson={(userId, checkCourse) => checkLesson}
                />
                <TeamChannelList 
                    type="messaging"
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType} 
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                    course="msg"
                    isDev={true}
                />
                <DirectPreview
                    setIsCreating={setIsCreating}
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                    type="messaging"
                    course="msg"
                    currentChannel={currentChannel}
                    setCurrentChannel={setCurrentChannel}
                    userId={userId}
                    checkDirect={(userId) => checkDirect}
                    numberOfDirect={numberOfDirect}
                    setNumberOfDirect={setNumberOfDirect}
                    getNumberOfDirect={(userId) => getNumberOfDirect}
                />
            </div>
        </>
    );
}

const ChannelListContainer = ({ 
    isCreating,
    setCreateType, 
    setIsCreating, 
    setIsEditing, 
    isDev, 
    currentChannel, 
    setCurrentChannel, 
    userId, 
    checkLesson, 
    checkDirect 
}) => {
    const [toggleContainer, setToggleContainer] = useState(false);

    return (
        <>
            <div className="channel-list__container">
              <ChannelListContent 
                isCreating={isCreating}
                setIsCreating={setIsCreating} 
                setCreateType={setCreateType} 
                setIsEditing={setIsEditing} 
                isDev={isDev}
                currentChannel={currentChannel}
                setCurrentChannel={setCurrentChannel}
                userId={userId}
                checkLesson={(userId, checkCourse) => checkLesson}
                checkDirect={(userId) => checkDirect}
              />
            </div>

            <div className="channel-list__container-responsive"
                style={{ left: toggleContainer ? "0%" : "-89%", backgroundColor: "#005fff"}}
            >
                <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>
                </div>
                <ChannelListContent 
                    setIsCreating={setIsCreating} 
                    setCreateType={setCreateType} 
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                    isDev={isDev}
                    currentChannel={currentChannel}
                    setCurrentChannel={setCurrentChannel}
                />
            </div>
        </>
    )

}

export default ChannelListContainer;