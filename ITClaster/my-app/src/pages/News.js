import React from 'react';
import RotateIcon from '../imgs/rotate-right-icon.png';
import './News.css';

const News = () => {
    return (
        <div className="news-page">

            {/* Фільтри */}
            <div className="news-filters">
                {/* Активні фільтри (верхня частина) */}
                <div className="news-active-filters">
                    <span className="news-filter-tag">MIAS <span className="news-close-tag">✕</span></span>
                    <span className="news-filter-tag">Буковина <span className="news-close-tag">✕</span></span>
                </div>

                {/* Горизонтальний сепаратор */}
                <div className="news-horizontal-separator"></div>

                {/* Дропдаун-фільтри (нижня частина) */}
                <div className="news-dropdown-filters">
                    <div className="news-filter-item">Telegram</div>
                    <div className="news-vertical-separator"></div>
                    <div className="news-filter-item">Facebook</div>
                    <div className="news-vertical-separator"></div>
                    <div className="news-filter-item">Site</div>
                    <div className="news-vertical-separator"></div>
                    <div className="news-filter-item">Ключові слова</div>
                    <div className="news-vertical-separator"></div>
                    <div className="news-filter-item">Дата</div>
                    <div className="news-vertical-separator"></div>
                    <div className="news-filter-item">Тон новини</div>
                    <div className="news-vertical-separator"></div>
                    <div className="news-filter-item">Фільтр</div>
                    <div className="news-vertical-separator"></div>
                    <div className="news-reset-filter">
                        <img src={RotateIcon} alt="Rotate Icon" />
                    </div>
                </div>
            </div>

            {/* Контейнер для списку новин та бокової панелі */}
            <div className="news-main-content">
                {/* Список новин */}
                <div className="news-list">
                    <div className="news-item">
                        <div className="news-text">Новина 1</div>
                    </div>
                    <div className="news-item">
                        <div className="news-text">Новина 2</div>
                    </div>
                    <div className="news-item">
                        <div className="news-text">Новина 3</div>
                    </div>
                    <div className="news-show-more">Показати більше</div>
                </div>

                {/* Правая колонка з секціями */}
                <div className="news-sidebar">
                    {/* Статистика */}
                    <div className="news-statistic-section">
                        <div className="news-statistic-title">Статистика за останні 24 години</div>
                        <div className="news-statistic-text">
                            Негативні: 57 (52.29%) <br></br> 
                            Позитивні: 22 (20.18%) <br></br>
                            Нейтральні: 30 (27.52%)
                        </div>
                    </div>

                    {/* Коментарі */}
                    <div className="news-comments-section">
                        <div className="news-comment-title">Коментарі</div>
                        <div className="news-comment">
                            <div className="news-bot-name">MIAS_BOT</div>
                            <div className="news-comment-text">
                                Lorem ipsum dolor sit amet, consectetur adipisci elit...
                            </div>
                        </div>
                        <div className="news-comment">
                            <div className="news-bot-name">MIAS_BOT</div>
                            <div className="news-comment-text">
                                Lorem ipsum dolor sit amet, consectetur adipisci elit...
                            </div>
                        </div>
                        <div className="news-show-more-comments">Показати більше</div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default News;
