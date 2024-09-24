import React from 'react';
import RotateIcon from '../imgs/rotate-right-icon.png';
import './Diagrams.css';

const Diagrams = () => {
    return (
        <div className="diagrams-container">
            <div className="diagrams-content">
                <div className="main-content">
                    {/* Фільтри */}
                    <div className="diagrams-filters">
                        {/* Активні фільтри (верхня частина) */}
                        <div className="diagrams-active-filters">
                            <span className="diagrams-filter-tag">MIAS <span className="diagrams-close-tag">✕</span></span>
                            <span className="diagrams-filter-tag">Буковина <span className="diagrams-close-tag">✕</span></span>
                        </div>

                        {/* Горизонтальний сепаратор */}
                        <div className="diagrams-horizontal-separator"></div>

                        {/* Дропдаун-фільтри (нижня частина) */}
                        <div className="diagrams-dropdown-filters">
                            <div className="diagrams-filter-item">Telegram</div>
                            <div className="diagrams-vertical-separator"></div>
                            <div className="diagrams-filter-item">Facebook</div>
                            <div className="diagrams-vertical-separator"></div>
                            <div className="diagrams-filter-item">Site</div>
                            <div className="diagrams-vertical-separator"></div>
                            <div className="diagrams-filter-item">Ключові слова</div>
                            <div className="diagrams-vertical-separator"></div>
                            <div className="diagrams-filter-item">Дата</div>
                            <div className="diagrams-vertical-separator"></div>
                            <div className="diagrams-filter-item">Тон новини</div>
                            <div className="diagrams-vertical-separator"></div>
                            <div className="diagrams-filter-item">Фільтр</div>
                            <div className="diagrams-vertical-separator"></div>
                            <div className="diagrams-reset-filter">
                                <img src={RotateIcon} alt="Rotate Icon" />
                            </div>
                        </div>
                    </div>

                    <div className="diagrams">
                        <div className="resources-diagram">
                            <h3>Ресурси</h3>
                            <div className="diagram-placeholder">Diagram 1</div>
                        </div>
                        <div className="time-diagram">
                            <h3>Час</h3>
                            <div className="diagram-placeholder">Diagram 2</div>
                        </div>
                    </div>

                    <div className="bottom-diagrams">
                        <div className="tone-diagram">
                            <h3>Тон новин</h3>
                            <div className="diagram-placeholder">Diagram 3</div>
                        </div>
                        <div className="keywords-diagram">
                            <h3>Кількість ключових слів</h3>
                            <div className="diagram-placeholder">Diagram 4</div>
                        </div>
                        <div className="custom-diagram">
                            <h3>Ключові слова</h3>
                            <div className="diagram-placeholder">Diagram 5</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Diagrams;
