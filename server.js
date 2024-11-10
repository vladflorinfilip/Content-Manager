require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const simpleGit = require('simple-git');
const path = require('path');
const fs = require('fs');

const app = express();
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'vladlumfilip';
const REPO_NAME = 'To-Do-List';
const REMOTE_BRANCH = 'master';

// Path to the different repository
const REPO_PATH = path.resolve(__dirname, '../to_do_list'); // Adjust this path as needed

const git = simpleGit(REPO_PATH);

app.use(bodyParser.json());

// GET /api/readme - Fetch the README file and return its raw contents
app.get('/api/readme', async (req, res) => {
    try {
        console.log('Received GET request for /api/readme');
        const response = await axios.get(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/README.md`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3.raw',
            },
        });
        console.log('Read and fetched README file for display and edit');
        res.send(response.data);
    } catch (error) {
        console.error('Error reading README file:', error.response ? error.response.data : error.message);
        res.status(500).send('Error reading README file');
    }
});

// POST /api/readme - Update the README file with new content
app.post('/api/readme', async (req, res) => {
    console.log('Received POST request for /api/readme');
    const content = req.body.content;
    const filePath = path.join(REPO_PATH, 'README.md'); // Path to the README file in your repository

    try {
        // Checkout the branch
        await git.checkout(REMOTE_BRANCH);

        // Pull the latest changes from the remote repository
        await git.pull('origin', REMOTE_BRANCH);

        // Write the new content to the README file
        fs.writeFileSync(filePath, content, 'utf8');

        // Merge branches
        await git.merge(['--strategy-option=ours']);

        // Add the file to the staging area
        await git.add(filePath);

        // Commit the changes
        await git.commit('Updates README file');

        // Push the changes to the remote repository
        await git.push('origin', REMOTE_BRANCH);

        console.log('README updated successfully')
        res.send('README updated successfully');
    } catch (error) {
        console.error('Error updating README file:', error.message);
        res.status(500).send('Error updating README file');
    }
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});