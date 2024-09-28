
import React, { useState, useEffect } from 'react';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import RotateIcon from '../imgs/rotate-right-icon.png';
import './Diagrams.css';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

// Функція для фейкових запитів до API
const fakeFetch = (url, method = 'POST', body = null) => {
    console.log(`Request URL: ${url}, Method: ${method}, Body:`, body);
    return new Promise((resolve) => {
        setTimeout(() => {
            let fakeResponse = {};

            // Фейкові дані для новин
            const allNews = [
                { id: 1, text: 'Новина 1 про MIAS', tone: 'Позитивний', tags: ['Telegram', 'Ключові слова'] },
                { id: 2, text: 'Новина 2 про Буковину', tone: 'Негативний', tags: ['Facebook', 'Тон новини'] },
                { id: 3, text: 'Новина 3 про Запарнюк', tone: 'Нейтральний', tags: ['Site', 'Дата'] },
                // Більше новин можна додати тут
            ];

            if (url === '/filter_diagram_news') {
                const { tags } = body;
                fakeResponse = tags.length === 0 ? allNews : allNews.filter(news => tags.some(tag => news.tags.includes(tag)));
            }

            console.log(`Response from ${url}:`, fakeResponse);
            resolve({ status: 200, data: fakeResponse });
        }, 1000);
    });
};

const Diagrams = () => {
    const [filteredNews, setFilteredNews] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    // Імітуємо отримання новин при завантаженні сторінки
    useEffect(() => {
        fakeFetch('/filter_diagram_news', 'POST', { tags: [] }).then((response) => {
            setFilteredNews(response.data);
        });
    }, []);

    // Обробка кліку на тег для фільтрації новин
    const handleTagClick = (tag) => {
        const updatedTags = selectedTags.includes(tag)
            ? selectedTags.filter((t) => t !== tag)
            : [...selectedTags, tag];

        setSelectedTags(updatedTags);

        // Отримуємо фільтровані новини
        fakeFetch('/filter_diagram_news', 'POST', { tags: updatedTags }).then((response) => {
            setFilteredNews(response.data);
        });
    };

    // Скидання фільтрів
    const resetFilters = () => {
        setSelectedTags([]);
        fakeFetch('/filter_diagram_news', 'POST', { tags: [] }).then((response) => {
            setFilteredNews(response.data);
        });
    };

    // Дані для стовпчастої діаграми (ресурси)
    const resourcesData = {
        labels: ['Telegram', 'Facebook', 'Site', 'Other'],
        datasets: [
            {
                label: 'Кількість новин',
                data: [
                    filteredNews.filter(news => news.tags.includes('Telegram')).length,
                    filteredNews.filter(news => news.tags.includes('Facebook')).length,
                    filteredNews.filter(news => news.tags.includes('Site')).length,
                    filteredNews.filter(news => !news.tags.includes('Telegram') && !news.tags.includes('Facebook') && !news.tags.includes('Site')).length
                ],
                backgroundColor: ['#36a2eb', '#ff6384', '#4bc0c0', '#9966ff'],
            },
        ],
    };

    // Дані для кругової діаграми (Тон новин)
    const toneData = {
        labels: ['Позитивний', 'Негативний', 'Нейтральний'],
        datasets: [
            {
                data: [
                    filteredNews.filter(news => news.tone === 'Позитивний').length,
                    filteredNews.filter(news => news.tone === 'Негативний').length,
                    filteredNews.filter(news => news.tone === 'Нейтральний').length,
                ],
                backgroundColor: ['#4BC0C0', '#FF6384', '#FFCE56'],
            },
        ],
    };

    // Дані для лінійної діаграми (Час)
    const timeData = {
        labels: ['1 год', '2 год', '3 год', '4 год', '5 год', '6 год'],
        datasets: [
            {
                label: 'Кількість новин по часу',
                data: [2, 5, 3, 6, 7, 4], // Фейкові дані
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
            },
        ],
    };

    // Дані для діаграми "Кількість ключових слів"
    const keywordsData = {
        labels: ['MIAS', 'Буковина', 'Інстаграм', 'Чернівці'],
        datasets: [
            {
                data: [30, 20, 15, 35],
                backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
            },
        ],
    };

    // Дані для кругової діаграми "Ключові слова"
    const pieData = {
        labels: ['Чернівці', 'Буковина', 'Інстаграм', 'Запаранюк'],
        datasets: [
            {
                data: [32, 24, 38, 6],
                backgroundColor: ['#4D90FE', '#0C4A6E', '#C084FC', '#94A3B8'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="diagrams-container">
            <div className="diagrams-content">
                <div className="main-content">
                    {/* Фільтри */}
                    <div className="diagrams-filters">
                        <div className="diagrams-active-filters">
                            {selectedTags.map((tag, index) => (
                                <span className="diagrams-filter-tag" key={index} onClick={() => handleTagClick(tag)}>
                                    {tag} <span className="diagrams-close-tag">✕</span>
                                </span>
                            ))}
                        </div>
                        <div className="diagrams-horizontal-separator"></div>
                        <div className="diagrams-dropdown-filters">
                            <div className="diagrams-filter-item" onClick={() => handleTagClick('Telegram')}>Telegram</div>
                            <div className="diagrams-vertical-separator"></div>
                            <div className="diagrams-filter-item" onClick={() => handleTagClick('Facebook')}>Facebook</div>
                            <div className="diagrams-vertical-separator"></div>
                            <div className="diagrams-filter-item" onClick={() => handleTagClick('Site')}>Site</div>
                            <div className="diagrams-vertical-separator"></div>
                            <div className="diagrams-filter-item" onClick={() => handleTagClick('Ключові слова')}>Ключові слова</div>
                            <div className="diagrams-vertical-separator"></div>
                            <div className="diagrams-filter-item" onClick={() => handleTagClick('Дата')}>Дата</div>
                            <div className="diagrams-vertical-separator"></div>
                            <div className="diagrams-filter-item" onClick={() => handleTagClick('Тон новини')}>Тон новини</div>
                            <div className="diagrams-vertical-separator"></div>
                            <div className="diagrams-filter-item" onClick={() => handleTagClick('Фільтр')}>Фільтр</div>
                            <div className="diagrams-vertical-separator"></div>
                            <div className="diagrams-reset-filter" onClick={resetFilters}>
                                <img src={RotateIcon} alt="Reset Filter" />
                            </div>
                        </div>
                    </div>

                    {/* Основний контент із діаграмами */}
                    <div className="diagrams">
                        <div className="resources-diagram">
                            <h3>Ресурси</h3>
                            <Bar data={resourcesData} />
                        </div>
                        <div className="time-diagram">
                            <h3>Час</h3>
                            <Line data={timeData} />
                        </div>
                    </div>

                    <div className="bottom-diagrams">
                        <div className="tone-diagram">
                            <h3>Тон новин</h3>
                            <Doughnut data={toneData} />
                        </div>
                        <div className="keywords-diagram">
                            <h3>Кількість ключових слів</h3>
                            <Doughnut data={pieData} />
                        </div>
                        <div className="custom-diagram">
                            <h3>Ключові слова</h3>
                            <Pie data={pieData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Diagrams;
