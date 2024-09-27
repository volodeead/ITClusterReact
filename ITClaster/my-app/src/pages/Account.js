import React, { useState, useEffect } from 'react';
import './Account.css';
import addIcon from '../imgs/free-icon-font-add.png';
import pencilIcon from '../imgs/free-icon-font-pencil.png';
import trashIcon from '../imgs/free-icon-font-trash.png';
import markAllIcon from '../imgs/Mark-All-icon.png';

// Фейковий запит до API з логуванням запиту та відповіді
const fakeFetch = (url, method = 'GET', body = null) => {
    console.log(`Запит: ${method} ${url}`);
    if (body) console.log(`Тіло запиту: `, body);
    
    return new Promise((resolve) => {
        setTimeout(() => {
            let fakeResponse;

            if (url === '/get_accounts' && method === 'GET') {
                fakeResponse = [
                    { id: 1, name: "@miasi_bot", link: "https://t.me/miasi_bot" },
                    { id: 2, name: "@example_bot", link: "https://t.me/example_bot" }
                ];
            }

            if (url === '/get_comments' && method === 'GET') {
                fakeResponse = [
                    { id: 1, author: "John Doe", text: "This is a Telegram comment", source: "Telegram" },
                    { id: 2, author: "Jane Smith", text: "This is a Facebook comment", source: "Facebook" },
                    { id: 3, author: "Mark Lee", text: "Another Telegram comment", source: "Telegram" },
                    { id: 4, author: "Anna Brown", text: "Another Facebook comment", source: "Facebook" }
                ];
            }

            if (url === '/add_account' && method === 'POST') {
                fakeResponse = { success: true, account: body };
            }

            if (url === '/remove_account' && method === 'DELETE') {
                fakeResponse = { success: true, removedId: body.id };
            }

            if (url === '/edit_account' && method === 'POST') {
                fakeResponse = { success: true, updatedAccount: body };
            }

            console.log(`Відповідь на запит ${method} ${url}:`, fakeResponse);
            resolve({ status: 200, data: fakeResponse });
        }, 1000);
    });
};

const Account = () => {
    const [accounts, setAccounts] = useState([]);
    const [selectedAccounts, setSelectedAccounts] = useState({});
    const [showAccountForm, setShowAccountForm] = useState(false);
    const [newAccount, setNewAccount] = useState({ name: "", link: "" });
    const [editMode, setEditMode] = useState(false);
    const [comments, setComments] = useState([]);
    const [filter, setFilter] = useState("All");

    // Завантажуємо акаунти та коментарі
    useEffect(() => {
        fakeFetch('/get_accounts').then((response) => setAccounts(response.data));
        fakeFetch('/get_comments').then((response) => setComments(response.data));
    }, []);

    // Оновлюємо стан для виділених акаунтів
    const handleCheckboxChange = (id) => {
        setSelectedAccounts(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // Видалення вибраних акаунтів
    const removeSelectedAccounts = () => {
        const selectedIds = Object.keys(selectedAccounts).filter(id => selectedAccounts[id]);
        
        if (selectedIds.length === 0) {
            console.log('Немає вибраних акаунтів для видалення.');
            return;
        }

        // Видаляємо кожен вибраний акаунт
        Promise.all(selectedIds.map(id => 
            fakeFetch('/remove_account', 'DELETE', { id }).then((response) => {
                if (response.status === 200 && response.data.success) {
                    setAccounts(prevAccounts => prevAccounts.filter(account => account.id !== parseInt(id)));
                }
            })
        )).then(() => {
            console.log('Видалено всі вибрані акаунти.');
            setSelectedAccounts({}); // Очищення вибору після видалення
        });
    };

    // Додавання акаунту
    const handleAddOrEditAccount = () => {
        if (editMode) {
            const accountToEdit = accounts.find(account => selectedAccounts[account.id]);
            if (accountToEdit) {
                const updatedAccount = { ...accountToEdit, name: newAccount.name, link: newAccount.link };
                fakeFetch('/edit_account', 'POST', updatedAccount).then((response) => {
                    if (response.status === 200 && response.data.success) {
                        setAccounts(accounts.map(account =>
                            account.id === updatedAccount.id ? updatedAccount : account
                        ));
                    }
                });
            }
        } else {
            const newAccountToAdd = { id: accounts.length + 1, name: newAccount.name, link: newAccount.link };
            fakeFetch('/add_account', 'POST', newAccountToAdd).then((response) => {
                if (response.status === 200 && response.data.success) {
                    setAccounts([...accounts, newAccountToAdd]);
                }
            });
        }
        setNewAccount({ name: "", link: "" });
        setShowAccountForm(false);
        setEditMode(false);
    };

    // Показати форму для редагування акаунту
    const handleEditAccount = () => {
        const accountToEdit = accounts.find(account => selectedAccounts[account.id]);
        if (accountToEdit) {
            setNewAccount(accountToEdit);
            setShowAccountForm(true);
            setEditMode(true);
        }
    };

    // Показати форму для додавання акаунту
    const toggleAccountForm = () => {
        setShowAccountForm(!showAccountForm);
        setEditMode(false);
        setNewAccount({ name: "", link: "" });
    };

    // Фільтрація коментарів
    const filteredComments = comments.filter(comment => filter === "All" || comment.source === filter);

    return (
        <div className="account-container">
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
                    <div className="Button" onClick={toggleAccountForm}>
                        <img src={addIcon} alt="Add Icon" />
                    </div>
                    <div className="Separator"></div>
                    <div className="Button" onClick={handleEditAccount}>
                        <img src={pencilIcon} alt="Edit Icon" />
                    </div>
                    <div className="Separator"></div>
                    <div className="Button" onClick={removeSelectedAccounts}>
                        <img src={trashIcon} alt="Trash Icon" />
                    </div>
                </div>

                {/* Список акаунтів */}
                <div className="accounts-list">
                    {accounts.map((account) => (
                        <div key={account.id} className="account-item">
                            <input
                                type="checkbox"
                                checked={!!selectedAccounts[account.id]}
                                onChange={() => handleCheckboxChange(account.id)}
                            />
                            <div className="account-placeholder"></div>
                            <div className="account-info">
                                <span className="account-name">{account.name}</span>
                                <a href={account.link} className="account-link">{account.link}</a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Форма для додавання або редагування акаунту */}
                {showAccountForm && (
                    <div className="add-account-form">
                        <h3>{editMode ? 'Редагувати акаунт' : 'Додати акаунт'}</h3>
                        <input
                            type="text"
                            placeholder="Назва акаунту"
                            value={newAccount.name}
                            onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Посилання на акаунт"
                            value={newAccount.link}
                            onChange={(e) => setNewAccount({ ...newAccount, link: e.target.value })}
                        />
                        <button onClick={handleAddOrEditAccount}>{editMode ? 'Редагувати' : 'Додати'}</button>
                    </div>
                )}
            </section>

            <section className="comments-section">
                <div className="comments-header">
                    <h2 className="comments-title">Коментарі</h2>
                    <div className="SwitchComments">
                        <div className={`ToggleComments ${filter === "All" ? 'active' : ''}`} onClick={() => setFilter("All")}>
                            Всі
                        </div>
                        <div className={`ToggleComments ${filter === "Telegram" ? 'active' : ''}`} onClick={() => setFilter("Telegram")}>
                            Telegram
                        </div>
                        <div className={`ToggleComments ${filter === "Facebook" ? 'active' : ''}`} onClick={() => setFilter("Facebook")}>
                            Facebook
                        </div>
                    </div>
                </div>

                <ul className="comments-list">
                    {filteredComments.map((comment) => (
                        <li key={comment.id} className="comment-item">
                            <p className="comment-author">{comment.author}</p>
                            <p className="comment-text">{comment.text}</p>
                            <div className="separator"></div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Account;
