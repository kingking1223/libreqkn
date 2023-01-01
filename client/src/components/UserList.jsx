import React, { useEffect, useState } from 'react'

import { InviteIcon } from '../assets'

const ListContainer = ({ children }) => {
    return (
        <div className="user-list__container">
            <div className='user-list__header'>
                <p>User</p>
                <p>Invite</p>
            </div>
            {children}
        </div>
    )
}

const UserItem = ({ user, setSelectedUsers }) => {
    const [selected, setSelected] = useState(false)

    const handleSelect = () => {
        if (selected) {
            setSelectedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id))
        } else {
            setSelectedUsers((prevUsers) => [ ...prevUsers, user.id ])
        }

        setSelected((prevSelected) => !prevSelected)
    }

    return (
        <div className='user-item__wrapper' onClick={handleSelect}>
            <div className='user-item__name-wrapper'>
                <p className='user-item__name'>{user.name || user.id}</p>
            </div>
            {selected ? <InviteIcon /> : <div className='user-item__invite-empty' />}
        </div>
    )
}

const UserList = ({ setSelectedUsers }) => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [listEmpty, setListEmpty] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const getUsers = async () => {
            if (loading) return

            setLoading(true)
            try {
                
            } catch (error) {
                setError(true)
                console.log(error)
            }
            setLoading(false)
        }
    }, [])

    if (error) {
        return (
            <ListContainer>
                <div className='user-list__message'>
                    Error: Load failed. Please refresh and retry.
                </div>
            </ListContainer>
        )
    }

    if (listEmpty) {
        return (
            <ListContainer>
                <div className='user-list__message'>
                    No users found.
                </div>
            </ListContainer>
        )
    }

    return (
        <ListContainer>
            {loading ? <div className="user-list__message">
                Loading Users...
            </div> : (
                users?.map((user, i) => (
                    <UserItem index={i} key={user.id} user={user} setSelectedUsers={setSelectedUsers}/>
                ))
            )}
        </ListContainer>
    )
}

export default UserList