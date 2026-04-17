import React from 'react'
import Profile from '../profile/Profile'
import Calender from '../calender/Calender'

const SideBar = () => {
    return (
        <div className="space-y-6">
            <Profile />
            <Calender />
        </div>
    )
}

export default SideBar