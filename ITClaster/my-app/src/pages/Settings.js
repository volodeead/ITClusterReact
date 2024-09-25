import React, { useState, useEffect } from 'react';
import './Settings.css';
import addIcon from '../imgs/free-icon-font-add.png';
import pencilIcon from '../imgs/free-icon-font-pencil.png';
import trashIcon from '../imgs/free-icon-font-trash.png';

// Функція для імітації запиту до API
const fakeFetch = (url, method = 'GET', body = null) => {
    console.log(`Запит: ${method} ${url}`);
    if (body) console.log(`Вміст запиту:`, body);

    return new Promise((resolve) => {
        setTimeout(() => {
            let fakeResponse;

            if (url === '/get_resources' && method === 'GET') {
                fakeResponse = [
                    { id: 1, name: "Resource 1", link: "http://resource1.com" },
                    { id: 2, name: "Resource 2", link: "http://resource2.com" },
                    { id: 3, name: "Resource 3", link: "http://resource3.com" },
                ];
            }

            if (url === '/get_keywords' && method === 'GET') {
                fakeResponse = [
                    { id: 1, keyword: "MIAS" },
                    { id: 2, keyword: "Буковина" }
                ];
            }

            if (url === '/add_resource' && method === 'POST') {
                fakeResponse = { success: true, id: body.id, name: body.name, link: body.link };
            }

            if (url === '/remove_resources' && method === 'POST') {
                fakeResponse = { success: true, deletedIds: body.ids };
            }

            if (url === '/edit_resource' && method === 'POST') {
                fakeResponse = { success: true, id: body.id, name: body.name, link: body.link };
            }

            if (url === '/add_keyword' && method === 'POST') {
                fakeResponse = { success: true, id: body.id, keyword: body.keyword };
            }

            if (url === '/remove_keywords' && method === 'POST') {
                fakeResponse = { success: true, deletedIds: body.ids };
            }

            if (url === '/edit_keyword' && method === 'POST') {
                fakeResponse = { success: true, id: body.id, keyword: body.keyword };
            }

            console.log(`Відповідь запиту:`, fakeResponse);
            resolve({ status: 200, data: fakeResponse });
        }, 1000);
    });
};

const Settings = () => {
    const [resources, setResources] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const [selectedResources, setSelectedResources] = useState({});
    const [selectedKeywords, setSelectedKeywords] = useState({});
    const [showResourceForm, setShowResourceForm] = useState(false);
    const [showKeywordForm, setShowKeywordForm] = useState(false); // Для форми ключових слів
    const [newResource, setNewResource] = useState({ name: '', link: '' });
    const [newKeyword, setNewKeyword] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editingKeyword, setEditingKeyword] = useState(false);

    useEffect(() => {
        fakeFetch('/get_resources').then((response) => setResources(response.data));
        fakeFetch('/get_keywords').then((response) => setKeywords(response.data));
    }, []);

    const handleAddOrEditResource = () => {
        if (newResource.name && newResource.link) {
            if (editMode) {
                const resourceToEdit = Object.keys(selectedResources).find(id => selectedResources[id]);
                const editedResource = { id: parseInt(resourceToEdit), name: newResource.name, link: newResource.link };

                fakeFetch('/edit_resource', 'POST', editedResource).then((response) => {
                    if (response.status === 200 && response.data.success) {
                        const updatedResources = resources.map(resource =>
                            resource.id === editedResource.id ? editedResource : resource
                        );
                        setResources(updatedResources);
                    }
                });

                setEditMode(false);
            } else {
                const newRes = { id: resources.length + 1, name: newResource.name, link: newResource.link };
                fakeFetch('/add_resource', 'POST', newRes).then((response) => {
                    if (response.status === 200 && response.data.success) {
                        setResources([...resources, newRes]);
                    }
                });
            }
            setNewResource({ name: '', link: '' });
            setShowResourceForm(false);
        }
    };

    const handleAddOrEditKeyword = () => {
        if (newKeyword) {
            if (editingKeyword) {
                const keywordToEdit = Object.keys(selectedKeywords).find(id => selectedKeywords[id]);
                const editedKeyword = { id: parseInt(keywordToEdit), keyword: newKeyword };

                fakeFetch('/edit_keyword', 'POST', editedKeyword).then((response) => {
                    if (response.status === 200 && response.data.success) {
                        const updatedKeywords = keywords.map(keyword =>
                            keyword.id === editedKeyword.id ? editedKeyword : keyword
                        );
                        setKeywords(updatedKeywords);
                    }
                });

                setEditingKeyword(false);
            } else {
                const newKey = { id: keywords.length + 1, keyword: newKeyword };
                fakeFetch('/add_keyword', 'POST', newKey).then((response) => {
                    if (response.status === 200 && response.data.success) {
                        setKeywords([...keywords, newKey]);
                    }
                });
            }
            setNewKeyword('');
            setShowKeywordForm(false);
        }
    };

    const toggleResourceForm = () => {
        setShowResourceForm(!showResourceForm);
        setEditMode(false);
        setNewResource({ name: '', link: '' });
    };

    const toggleKeywordForm = () => {
        setShowKeywordForm(!showKeywordForm);
        setEditingKeyword(false);
        setNewKeyword('');
    };

    const removeSelectedResources = () => {
        const selectedIds = Object.keys(selectedResources).filter(id => selectedResources[id]);

        if (selectedIds.length > 0) {
            fakeFetch('/remove_resources', 'POST', { ids: selectedIds }).then((response) => {
                if (response.status === 200 && response.data.success) {
                    setResources(resources.filter(resource => !selectedIds.includes(resource.id.toString())));
                    setSelectedResources({});
                }
            });
        }
    };

    const removeSelectedKeywords = () => {
        const selectedIds = Object.keys(selectedKeywords).filter(id => selectedKeywords[id]);

        if (selectedIds.length > 0) {
            fakeFetch('/remove_keywords', 'POST', { ids: selectedIds }).then((response) => {
                if (response.status === 200 && response.data.success) {
                    setKeywords(keywords.filter(keyword => !selectedIds.includes(keyword.id.toString())));
                    setSelectedKeywords({});
                }
            });
        }
    };

    const handleCheckboxChange = (id, type) => {
        if (type === 'resource') {
            setSelectedResources({
                ...selectedResources,
                [id]: !selectedResources[id]
            });
        } else if (type === 'keyword') {
            setSelectedKeywords({
                ...selectedKeywords,
                [id]: !selectedKeywords[id]
            });
        }
    };

    const handleEditResource = () => {
        const selectedIds = Object.keys(selectedResources).filter(id => selectedResources[id]);

        if (selectedIds.length === 1) {
            const resourceToEdit = resources.find(resource => resource.id === parseInt(selectedIds[0]));
            if (resourceToEdit) {
                setNewResource({ name: resourceToEdit.name, link: resourceToEdit.link });
                setEditMode(true);
                setShowResourceForm(true);
            }
        }
    };

    const handleEditKeyword = () => {
        const selectedIds = Object.keys(selectedKeywords).filter(id => selectedKeywords[id]);

        if (selectedIds.length === 1) {
            const keywordToEdit = keywords.find(keyword => keyword.id === parseInt(selectedIds[0]));
            if (keywordToEdit) {
                setNewKeyword(keywordToEdit.keyword);
                setEditingKeyword(true);
                setShowKeywordForm(true);
            }
        }
    };

    return (
        <div className="container-settings">
            <div className="MonitoringSettings">
                <div className="title">Ресурси для моніторингу</div>

                <div className="Switch">
                    <div className="Toggle">
                        <div className="Telegram">Telegram</div>
                    </div>
                    <div className="Toggle">
                        <div className="Facebook">Facebook</div>
                    </div>
                </div>

                <div className="NavSettingsMonitoringSettings">
                    <div className="Button" onClick={toggleResourceForm}>
                        <img src={addIcon} alt="Add Icon" />
                    </div>
                    <div className="Separator"></div>
                    <div className="Button" onClick={handleEditResource}>
                        <img src={pencilIcon} alt="Edit Icon" />
                    </div>
                    <div className="Separator"></div>
                    <div className="Button" onClick={removeSelectedResources}>
                        <img src={trashIcon} alt="Trash Icon" />
                    </div>
                </div>

                <div className="content-settins">
                    <ul className="resource-settins-ul">
                        {resources.map((resource) => (
                            <li key={resource.id} className="resource-item">
                                <input
                                    type="checkbox"
                                    checked={!!selectedResources[resource.id]}
                                    onChange={() => handleCheckboxChange(resource.id, 'resource')}
                                />
                                {resource.name} - <a href={resource.link}>{resource.link}</a>
                            </li>
                        ))}
                    </ul>

                    {showResourceForm && (
                        <div className="add-resource-form">
                            <h3>{editMode ? 'Редагувати ресурс' : 'Додати ресурс'}</h3>
                            <input
                                type="text"
                                placeholder="Назва..."
                                value={newResource.name}
                                onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Посилання..."
                                value={newResource.link}
                                onChange={(e) => setNewResource({ ...newResource, link: e.target.value })}
                            />
                            <button onClick={handleAddOrEditResource}>{editMode ? 'Редагувати' : 'Додати'}</button>
                        </div>
                    )}
                </div>


            </div>

            <div className="KeyWords">
                <div className="title">Ключові слова</div>

                <div className="NavSettingsKeyWords">
                    <div className="Button" onClick={toggleKeywordForm}>
                        <img src={addIcon} alt="Add Icon" />
                    </div>
                    <div className="Separator"></div>
                    <div className="Button" onClick={handleEditKeyword}>
                        <img src={pencilIcon} alt="Edit Icon" />
                    </div>
                    <div className="Separator"></div>
                    <div className="Button" onClick={removeSelectedKeywords}>
                        <img src={trashIcon} alt="Trash Icon" />
                    </div>
                </div>

                <div className="content-settins">
                    <ul className="resource-settins-ul">
                        {keywords.map((keyword) => (
                            <li key={keyword.id} className="resource-item">
                                <input
                                    type="checkbox"
                                    checked={!!selectedKeywords[keyword.id]}
                                    onChange={() => handleCheckboxChange(keyword.id, 'keyword')}
                                />
                                {keyword.keyword}
                            </li>
                        ))}
                    </ul>

                    {showKeywordForm && (
                        <div className="add-resource-form">
                            <h3>{editingKeyword ? 'Редагувати ключове слово' : 'Додати ключове слово'}</h3>
                            <input
                                type="text"
                                placeholder="Ключове слово..."
                                value={newKeyword}
                                onChange={(e) => setNewKeyword(e.target.value)}
                            />
                            <button onClick={handleAddOrEditKeyword}>
                                {editingKeyword ? 'Редагувати' : 'Додати'}
                            </button>
                        </div>
                    )}
                </div>


            </div>
        </div>
    );
};

export default Settings;
