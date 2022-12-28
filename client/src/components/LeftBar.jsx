import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import Tooltip from '@mui/material/Tooltip';

import libreqknIcon from '../assets/libreqkn.jpg'
import SettingsIcon from '../assets/SettingsIcon.svg'
import LogoutIcon from '../assets/logout.png'

const LeftBar = ({ logout, setCurrentMode }) => (
    <div className="channel-list__sidebar">
        <Tooltip title="Main Menu">
            <div className="channel-list__sidebar__icon1">
                <div className="icon1__inner" onClick={() => setCurrentMode("main")}>
                    <img src={libreqknIcon} alt="Hospital" width="30" />
                </div>
            </div>
        </Tooltip>
        <Tooltip title="Settings">
            <div className="channel-list__sidebar__icon2">
                <div className="icon2__inner" onClick={() => setCurrentMode("settings")}>
                    <img src={SettingsIcon} alt="Settings" width="30" />
                </div>
            </div>
        </Tooltip>
        <Tooltip title="Log out">
            <div className="channel-list__sidebar__icon3">
                <div className="icon3__inner" onClick={logout}>
                    <img src={LogoutIcon} alt="Logout" width="30" />
                </div>
            </div>
        </Tooltip>
        {/* <div className='channel-list__sidebar__icon3'>
            <div className='icon1__inner'>
                <p>U</p>
            </div>
        </div> */}
    </div>
  );

export default LeftBar;