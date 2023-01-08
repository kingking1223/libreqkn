//TODO: fix bug
import React, { useState, useEffect } from 'react';

import { ResultsDropdown } from './'
import { SearchIcon } from '../assets';

const ChannelSearch = ({ setToggleContainer }) => {
    // const { client, setActiveChannel } = useChatContext()
    // const [query, setQuery] = useState('');
    // const [loading, setLoading] = useState(false);
    // const [teamChannel, setTeamChannel] = useState([])
    // const [directChannel, setDirectChannel] = useState([])

    // useEffect(() => {
    //     if (!query) {
    //         setTeamChannel([])
    //         setDirectChannel([])
    //     }
    // }, [query])

    // const getChannels = async (text) => {
    //     try {
    //         const channelResponse = client.queryChannels({
    //             type: 'team', 
    //             name: { $autocomplete: text }, 
    //             members: { $in: [client.userID]}
    //         })
    //         const userResponse = client.queryUsers({
    //             id: { $ne: client.userID },
    //             name: { $autocomplete: text }
    //         })

    //         const [channels, { users }] = await Promise.all([channelResponse, userResponse])

    //         if (channels.length) setTeamChannel(channels)
    //         if (users.length) setDirectChannel(channels)
    //     } catch (error) {
    //         setQuery('');
    //     }
    // } 

    // const onSearch = (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     setQuery(e.target.value);
    //     getChannels(e.target.value);
    // }

    // const setChannel = (c) => {
    //     setQuery('')
    //     setActiveChannel(c)
    // }

    return (
        <div className="channel-search__container">
            {/* <div className="channel-search__input__wrapper">
                <div className="channel-search__input__icon">
                    <SearchIcon />
                </div>
                <input 
                    className="channel-search__input__text" 
                    placeholder="Search" 
                    type="text" 
                    value={query}  
                    onChange={onSearch}
                />
            </div>
            { query && (
                <ResultsDropdown 
                    teamChannel={teamChannel}
                    directChannel={directChannel}
                    loading={loading}
                    setChannel={setChannel}
                    setQuery={setQuery}
                    setToggleContainer={setToggleContainer}
                />
            )} */}
        </div>
    )
}

export default ChannelSearch