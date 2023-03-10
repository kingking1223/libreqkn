import React, { useState } from 'react'

import { UserList } from './'
import { CloseCreateChannel } from '../assets'

const ChannelNameInput = ({ channelName = '', setChannelName, }) => {
  const handleChange = (e) => {
      e.preventDefault()
      setChannelName(e.target.value)
  }

  return (
      <div className='channel-name-input__wrapper'>
          <p>Name</p>
          <input value={channelName} onChange={handleChange} placeholder="Channel Name" />
          <p>Add Members</p>
      </div>
  )
}

const EditChannel = ({ setIsEditing }) => {
    // const { channel } = useChatContext()
    // const [ channelName, setChannelName ] = useState(channel?.data?.name)
    // const [ selectedUsers, setSelectedUsers ] = useState([])

    // const updateChannel = async (e) => {
    //     e.preventDefault()

    //     try {
    //         const nameChanged = channelName !== (channel.data.name || channel.data.id)

    //         if (nameChanged) {
    //             await channel.update({ name: channelName }, { text: `Channel Name Changed to: ${channelName}`})
    //         }

    //         if (selectedUsers.length) {
    //             await channel.addMembers(selectedUsers)
    //         }

    //         setChannelName(null)
    //         setIsEditing(false)
    //         selectedUsers([])
    //     } catch (error) {
    //         console.log(error)
    //         alert("Error. Check console by Pressing F12 and selecting \"Console\".")
    //     }
        
    // }

    return (
        <div className='edit-channel__container'>
            {/* <div className='edit-channel__header'>
                <p>Edit Channel</p>
                <CloseCreateChannel setIsEditing={setIsEditing} />
            </div>
            <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>
            <UserList setSelectedUsers={setSelectedUsers} />
            <div className='edit-channel__button-wrapper' onClick={updateChannel}>
                <p>Save Changes</p>
            </div> */}
        </div>
    )
}

export default EditChannel