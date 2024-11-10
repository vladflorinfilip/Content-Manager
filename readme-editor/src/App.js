import React from 'react';
import ReadmeEditor from './ReadmeEditor';
import './App.css';

function App() {
    return (
        <div className='App'>
            <header className='App-title'>README Editor</header>
            <p className="App-description">
                This is a content editor for the README file of a to-do list application located in the GitHub repository: <a href="https://github.com/vladlumfilip/To-Do-List" target="_blank" rel="noopener noreferrer">https://github.com/vladlumfilip/To-Do-List</a>. <br />
                The content editor allows management to edit and update the README file without going into the application code base.<br />
            </p>
            <h2>Instructions</h2>
            <p className="App-description" style={{ textAlign: 'left', margin: '0 auto', maxWidth: '1275px' }}>
                Curently, the page displays the README file how it is shown in the GitHub repository. To edit, scroll down and press the Edit button. <br />
                When editing the README file, it's important to remember some key markdown commands to ensure your content is well-formatted and easy to read. <br />
                For inline code snippets, you can use backticks like this: `code`. <br />
                If you need to include multiple lines of code, you can use triple backticks to create a code block, like this: ```. <br />
                For headings, you can use the # symbol. A single # creates a main title, while ## creates a subtitle. Additionally, you can use ### for sub-subtitles. <br />
                For lists, you can use - or * for unordered lists and 1. for ordered lists. To emphasize text, you can use * or _ for italics, and ** or __ for bold. <br />
                Horizontal lines can be added using --- or ***. By keeping these commands in mind, you can create a well-structured and visually appealing README file.<br />
                Once you press Save, the contents will automatically be submitted to the GitHub repository as a new commit with the message 'Updated README file from content manager'. <br />
            </p>
            <hr className='App-bar' />
            <ReadmeEditor />
        </div>
    );
}

export default App;
