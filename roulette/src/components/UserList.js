import React from 'react';

function UserList({ user }) {
    return (
        <div className='UserList'>
            <p>{user.nick}</p>
        </div>
    )
}

export default UserList;