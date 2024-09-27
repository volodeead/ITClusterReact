import React, { useState, useEffect } from 'react';
import RotateIcon from '../imgs/rotate-right-icon.png';
import './News.css';

// Fake Fetch for API simulation
const fakeFetch = (url, method = 'POST', body = null) => {
    console.log(`Request URL: ${url}, Method: ${method}, Body:`, body);
    return new Promise((resolve) => {
        setTimeout(() => {
            let fakeResponse = {};
            if (url === '/filter_news') {
                const { tags } = body;
                // Fake news with tags
                const allNews = [
                    { id: 1, text: 'Новина 1 про MIAS', tone: 'Негативний', tags: ['Ключові слова'], comments: [{ id: 1, text: 'Коментар 1 для новини 1', bot: 'MIAS_BOT' }, { id: 2, text: 'Коментар 2 для новини 1', bot: 'MIAS_BOT' }] },
                    { id: 2, text: 'Новина 2 про Буковину', tone: 'Позитивний', tags: ['Тон новини'], comments: [{ id: 3, text: 'Коментар 1 для новини 2', bot: 'BUKOVINA_BOT' }, { id: 4, text: 'Коментар 2 для новини 2', bot: 'BUKOVINA_BOT' }] },
                    { id: 3, text: 'Новина 3 про MIAS і Буковину', tone: 'Нейтральний', tags: ['Telegram', 'Facebook'], comments: [{ id: 5, text: 'Коментар 1 для новини 3', bot: 'MIAS_BOT' }, { id: 6, text: 'Коментар 2 для новини 3', bot: 'BUKOVINA_BOT' }] },
                    { id: 4, text: 'Новина 4 про Telegram', tone: 'Позитивний', tags: ['Telegram'], comments: [{ id: 7, text: 'Коментар 1 для новини 4', bot: 'Telegram_BOT' }] },
                    { id: 5, text: 'Новина 5 про Facebook', tone: 'Нейтральний', tags: ['Facebook'], comments: [{ id: 8, text: 'Коментар 1 для новини 5', bot: 'Facebook_BOT' }] },
                    { id: 6, text: 'Новина 6 про MIAS', tone: 'Негативний', tags: ['Ключові слова'], comments: [{ id: 9, text: 'Коментар 1 для новини 6', bot: 'MIAS_BOT' }] },
                    { id: 7, text: 'Новина 7 про Буковину', tone: 'Негативний', tags: ['Дата'], comments: [{ id: 10, text: 'Коментар 1 для новини 7', bot: 'BUKOVINA_BOT' }] },
                    { id: 8, text: 'Новина 8 про MIAS і Буковину', tone: 'Позитивний', tags: ['Тон новини'], comments: [{ id: 11, text: 'Коментар 1 для новини 8', bot: 'MIAS_BOT' }, { id: 12, text: 'Коментар 2 для новини 8', bot: 'BUKOVINA_BOT' }] },
                    { id: 9, text: 'Новина 9 про щось нове', tone: 'Нейтральний', tags: ['Facebook'], comments: [{ id: 13, text: 'Коментар 1 для новини 9', bot: 'FB_BOT' }] },
                    { id: 10, text: 'Новина 10 про ще одну подію', tone: 'Позитивний', tags: ['Telegram'], comments: [{ id: 14, text: 'Коментар 1 для новини 10', bot: 'TG_BOT' }] }
                ];
                

                // Filter news based on selected tags
                fakeResponse = tags.length === 0 ? allNews : allNews.filter(news => tags.some(tag => news.tags.includes(tag)));
            }
            console.log(`Response from ${url}:`, fakeResponse);
            resolve({ status: 200, data: fakeResponse });
        }, 1000);
    });
};

const News = () => {
    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    // Fetch all news on page load
    useEffect(() => {
        fakeFetch('/filter_news', 'POST', { tags: [] }).then((response) => {
            setNews(response.data);
            setFilteredNews(response.data);
        });
    }, []);

    // Handle tag selection
    const handleTagClick = (tag) => {
        const updatedTags = selectedTags.includes(tag)
            ? selectedTags.filter((t) => t !== tag)
            : [...selectedTags, tag];

        setSelectedTags(updatedTags);

        // Make a fake API call to filter news based on selected tags
        fakeFetch('/filter_news', 'POST', { tags: updatedTags }).then((response) => {
            setFilteredNews(response.data);
        });
    };

    // Reset filters
    const resetFilters = () => {
        setSelectedTags([]);
        fakeFetch('/filter_news', 'POST', { tags: [] }).then((response) => {
            setFilteredNews(response.data);
        });
    };

    const [newsStats, setNewsStats] = useState({
        negative: 0,
        positive: 0,
        neutral: 0,
    });

    useEffect(() => {
        // Імітація отримання статистики з новин
        const calculateNewsStats = () => {
            let negative = 0;
            let positive = 0;
            let neutral = 0;

            filteredNews.forEach(newsItem => {
                // Імітуємо підрахунок на основі тегів або будь-яких інших даних
                if (newsItem.tone.includes('Негативний')) {
                    negative++;
                } else if (newsItem.tone.includes('Позитивний')) {
                    positive++;
                } else {
                    neutral++;
                }
            });

            // Оновлення стану статистики
            setNewsStats({
                negative: negative,
                positive: positive,
                neutral: neutral
            });
        };

        // Виклик функції при фільтрації новин
        calculateNewsStats();
    }, [filteredNews]); // Зміна статистики кожного разу при зміні новин

    // Get comments for filtered news
    const filteredComments = filteredNews.flatMap((n) => n.comments);

    return (
        <div className="news-page">
            {/* Фільтри */}
            <div className="news-filters">
                <div className="news-active-filters">
                    {selectedTags.map((tag, index) => (
                        <span className="news-filter-tag" key={index} onClick={() => handleTagClick(tag)}>
                            {tag} <span className="news-close-tag">✕</span>
                        </span>
                    ))}
                </div>
                <div className="news-horizontal-separator"></div>
                <div className="news-dropdown-filters">
                    <div className="news-filter-item" onClick={() => handleTagClick('Telegram')}>Telegram</div>
                    <div className="news-vertical-separator"></div>
                    <div className="news-filter-item" onClick={() => handleTagClick('Facebook')}>Facebook</div>
                    <div className="news-vertical-separator"></div>
                    <div className="news-filter-item" onClick={() => handleTagClick('Site')}>Site</div>
                    <div className="news-vertical-separator"></div>
                    <div className="news-filter-item" onClick={() => handleTagClick('Ключові слова')}>Ключові слова</div>
                    <div className="news-vertical-separator"></div>
                    <div className="news-filter-item" onClick={() => handleTagClick('Дата')}>Дата</div>
                    <div className="news-vertical-separator"></div>
                    <div className="news-filter-item" onClick={() => handleTagClick('Тон новини')}>Тон новини</div>
                    <div className="news-vertical-separator"></div>
                    <div className="news-filter-item" onClick={() => handleTagClick('Фільтр')}>Фільтр</div>
                    <div className="news-vertical-separator"></div>
                    <div className="news-reset-filter" onClick={resetFilters}>
                        <img src={RotateIcon} alt="Rotate Icon" />
                    </div>
                </div>
            </div>

            {/* Контент новин */}
            <div className="news-main-content">
                <div className="news-list">
                    {filteredNews.map((newsItem) => (
                        <div className="news-item" key={newsItem.id}>
                            <div className="news-text">{newsItem.text}</div>
                        </div>
                    ))}
                    <div className="news-show-more">Показати більше</div>
                </div>

                {/* Бокова панель */}
                <div className="news-sidebar">

                    {/* Статистика */}
                    <div className="news-stat-section">
                        <div className="news-stat-title">Статистика за 24 години</div>
                        <div className="news-stat-content">
                            <p>Загальна кількість новин за ключовими словами за останні 24 години:</p>
                            <p>
                                Негативні: <span className="negative-stat">{newsStats.negative} ({((newsStats.negative / filteredNews.length) * 100).toFixed(2)}%)</span><br />
                                Позитивні: <span className="positive-stat">{newsStats.positive} ({((newsStats.positive / filteredNews.length) * 100).toFixed(2)}%)</span><br />
                                Нейтральні: <span className="neutral-stat">{newsStats.neutral} ({((newsStats.neutral / filteredNews.length) * 100).toFixed(2)}%)</span>
                            </p>
                        </div>
                    </div>
                    {/* Коментарі */}
                    <div className="news-comments-section">
                        <div className="news-comment-title">Коментарі</div>
                        {filteredComments.map((comment) => (
                            <div className="news-comment" key={comment.id}>
                                <div className="news-bot-name">{comment.bot}</div>
                                <div className="news-comment-text">{comment.text}</div>
                            </div>
                        ))}
                        <div className="news-show-more-comments">Показати більше</div>
                    </div>



                </div>
            </div>
        </div>
    );
};

export default News;
