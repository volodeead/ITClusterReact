import React from 'react';
import Sidebar from '../components/Sidebar';
import addIcon from '../imgs/free-icon-font-add.png';
import pencilIcon from '../imgs/free-icon-font-pencil.png';
import trashIcon from '../imgs/free-icon-font-trash.png';
import './Account.css';

const Account = () => {
    return (
        <div className="account-container">
            <Sidebar />
            <section className="accounts-section">
                <div className="accounts-header">
                    <h2>Акаунти</h2>

                    {/* Switch */}
                    <div className="SwitchAccount">
                        <div className="Toggle">
                            <div className="Telegram">Telegram</div>
                        </div>
                        <div className="Toggle">
                            <div className="Facebook">Facebook</div>
                        </div>
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
                    <div className="Separator"></div>
                    <div className="Button">
                        <div className="placeholder"></div>
                    </div>
                    <div className="Separator"></div>
                </div>

                {/* Оновлений список акаунтів */}
                <div className="accounts-list">
                    <div className="account-item">
                        <div className="account-placeholder"></div>
                        <div className="account-info">
                            <span className="account-name">@miasi_bot</span>
                            <a href="https://t.me/miasi_bot" className="account-link">https://t.me/miasi_bot</a>
                        </div>
                    </div>
                </div>

                <div className="accounts-list">
                    <div className="account-item">
                        <div className="account-placeholder"></div>
                        <div className="account-info">
                            <span className="account-name">@miasi_bot</span>
                            <a href="https://t.me/miasi_bot" className="account-link">https://t.me/miasi_bot</a>
                        </div>
                    </div>
                </div>

                <div className="accounts-list">
                    <div className="account-item">
                        <div className="account-placeholder"></div>
                        <div className="account-info">
                            <span className="account-name">@miasi_bot</span>
                            <a href="https://t.me/miasi_bot" className="account-link">https://t.me/miasi_bot</a>
                        </div>
                    </div>
                </div>

            </section>

            <div className="comments-section">
                <div className="comments-header">
                    <h2 className="comments-title">Коментарі</h2>
                    <div className="SwitchComments">
                        <div className="ToggleComments">
                            <div className="AllComments">Всі</div>
                        </div>
                        <div className="ToggleComments">
                            <div className="Telegram">Telegram</div>
                        </div>
                        <div className="ToggleComments">
                            <div className="Facebook">Facebook</div>
                        </div>
                    </div>
                </div>

                <ul className="comments-list">
                    <li className="comment-item">
                        <p className="comment-author">John Doe</p>
                        <p className="comment-text">This is the first comment. It's really insightful!</p>
                    </li>
                    <div className="separator"></div>
                    <li className="comment-item">
                        <p className="comment-author">Jane Smith</p>
                        <p className="comment-text">I totally agree with this point. Great discussion!</p>
                    </li>
                    <div className="separator"></div>
                    <li className="comment-item">
                        <p className="comment-author">Mark Lee</p>
                        <p className="comment-text">Interesting perspective. I have a few thoughts on this as well.</p>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Account;
