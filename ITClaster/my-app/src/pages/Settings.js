import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './Settings.css';

import addIcon from '../imgs/free-icon-font-add.png';
import pencilIcon from '../imgs/free-icon-font-pencil.png';
import trashIcon from '../imgs/free-icon-font-trash.png';

const Settings = () => {
    return (
        <div>
            <div className="container-settings">
                <div className="MonitoringSettings">
                    {/* Заголовок */}
                    <div className="title">
                        Ресурси для моніторингу
                    </div>

                    {/* Switch */}
                    <div className="Switch">
                        <div className="Toggle">
                            <div className="Telegram">Telegram</div>
                        </div>
                        <div className="Toggle">
                            <div className="Facebook">Facebook</div>
                        </div>
                    </div>

                    {/* Меню керування */}
                    <div className="NavSettingsMonitoringSettings">
                        <div className="Button">
                            <img src={addIcon} alt="Add Icon" />
                        </div>
                        <div className="Separator"></div>
                        <div className="Button">
                            <img src={pencilIcon} alt="Edit Icon" />
                        </div>
                        <div className="Separator"></div>
                        <div className="Button">
                            <img src={trashIcon} alt="Trash Icon" />
                        </div>
                    </div>

                    {/* Контент */}
                    <div className="content-settins">
                        {/* Ваш контент тут */}
                    </div>

                </div>

                <div className="KeyWords">
                    <div className="title">Ключові слова</div>

                    {/* Меню керування */}
                    <div className="NavSettingsKeyWords">
                        <div className="Button">
                            <img src={addIcon} alt="Add Icon" />
                        </div>
                        <div className="Separator"></div>
                        <div className="Button">
                            <img src={pencilIcon} alt="Edit Icon" />
                        </div>
                        <div className="Separator"></div>
                        <div className="Button">
                            <img src={trashIcon} alt="Trash Icon" />
                        </div>
                    </div>

                </div>


            </div>
        </div>
    );
};

export default Settings;
