import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './ReadmeEditor.module.css';

const ReadmeEditor = () => {
    const [content, setContent] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetch('/api/readme')
            .then(response => response.text())
            .then(data => setContent(data));
    }, []);

    const handleSave = () => {
        fetch('/api/readme', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
        })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                setIsEditing(false);
            });
    };

    return (
        <div className={styles.container}>
            {isEditing ? (
                <textarea
                    className={styles.textarea}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
            ) : (
                <ReactMarkdown>{content}</ReactMarkdown>
            )}
            <button className={styles.button} onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Cancel' : 'Edit'}
            </button>
            {isEditing && <button className={styles.button} onClick={handleSave}>Save</button>}
        </div>
    );
};

export default ReadmeEditor;