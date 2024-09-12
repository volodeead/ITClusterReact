import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

import addIcon from '../imgs/free-icon-font-add.png';
import pencilIcon from '../imgs/free-icon-font-pencil.png';
import trashIcon from '../imgs/free-icon-font-trash.png';

const Settings = () => {
    return (
        <div>
            <Navbar />
            <Sidebar />
            <div className="PagesSettings" style={{ width: 812, height: 1062, position: 'relative' }}>
                <div className="MonitoringSettings" style={{
                    width: 807, height: 954, left: 5, top: 0, position: 'absolute',
                    background: '#F4F6FB', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.25)', borderRadius: 15,
                    paddingTop: 20, paddingLeft: 40, paddingRight: 40, boxSizing: 'border-box'
                }}>
                    {/* Заголовок */}
                    <div style={{
                        color: 'black',
                        fontSize: '24px',
                        fontFamily: 'PT Serif Caption',
                        fontWeight: 400,
                        lineHeight: '24px',
                        letterSpacing: '1px',
                        position: 'absolute',
                        top: '20px', // Перевірте відступ
                        left: '20px', // Перевірте відступ
                        textAlign: 'left',
                        width: 'calc(100% - 40px)' // Враховуйте відступи
                    }}>
                        Ресурси для моніторингу
                    </div>

                    {/* Switch */}
                    <div className="Switch" style={{
                        position: 'absolute', top: 20, right: 20,
                        width: 200, height: 35, padding: '0px 4px', background: '#A2BCE0', borderRadius: 40,
                        display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: 4
                    }}>
                        <div className="Toggle" style={{
                            flex: '1 1 0', height: 20, padding: '4px 16px', background: 'white',
                            boxShadow: '0px 4px 8px -4px rgba(0, 0, 0, 0.25)', borderRadius: 32,
                            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8
                        }}>
                            <div className="Telegram" style={{
                                color: '#384459', fontSize: 15, fontFamily: 'PT Serif Caption', fontWeight: '400',
                                lineHeight: 24
                            }}>Telegram</div>
                        </div>
                        <div className="Toggle" style={{
                            flex: '1 1 0', height: 32, padding: '4px 16px', borderRadius: 32,
                            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8
                        }}>
                            <div className="Facebook" style={{
                                color: '#384459', fontSize: 15, fontFamily: 'Inter', fontWeight: '600',
                                lineHeight: 24
                            }}>Facebook</div>
                        </div>
                    </div>

                    {/* Меню керування */}
                    <div className="NavSettings" style={{
                        position: 'absolute',
                        top: 80,
                        left: 20,
                        right: 0,
                        textAlign: 'center',
                        width: 'calc(100% - 40px)',
                        height: 43,
                        padding: '0 130px', // Відступи зліва і справа
                        boxSizing: 'border-box', // Враховує відступи в загальній ширині
                        background: 'rgba(162, 188, 224, 0.30)',
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                        borderRadius: 7,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        {/* Кнопка Додати */}
                        <div className="Button" style={{
                            width: 54,
                            height: 26,
                            borderRadius: 5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <img src={addIcon} alt="Add Icon" style={{
                                width: 20,
                                height: 20
                            }} />
                        </div>

                        {/* Сепаратор */}
                        <div className="Separator" style={{
                            width: 1,
                            height: 30,
                            backgroundColor: 'rgba(64, 64, 64, 0.50)',
                            display: 'inline-block'
                        }}></div>

                        {/* Кнопка Редагувати */}
                        <div className="Button" style={{
                            width: 54,
                            height: 26,
                            borderRadius: 5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <img src={pencilIcon} alt="Edit Icon" style={{
                                width: 20,
                                height: 20
                            }} />
                        </div>

                        {/* Сепаратор */}
                        <div className="Separator" style={{
                            width: 1,
                            height: 30,
                            backgroundColor: 'rgba(64, 64, 64, 0.50)',
                            display: 'inline-block'
                        }}></div>

                        {/* Кнопка Видалити */}
                        <div className="Button" style={{
                            width: 54,
                            height: 26,
                            borderRadius: 5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <img src={trashIcon} alt="Trash Icon" style={{
                                width: 20,
                                height: 20
                            }} />
                        </div>
                    </div>


                    {/* Контент */}
                    <div style={{
                        position: 'absolute', bottom: 0, left: 5, right: 5,
                        height: 'calc(100% - 80px - 35px - 40px)', background: '#FFF'
                    }}>
                        {/* Ваш контент тут */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
