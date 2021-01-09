import React from 'react';

function UserList({ users }) {
    return (
        <div className='UserList'>
            <h3>Users</h3>
            {users.map(u => <p key={u.id}>{u.nick}</p>)}
        </div>
    )
}


export default UserList;