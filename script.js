const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const server = http.createServer(async (req, res) => {
    let requestedPath = req.url.replace(/\/$/, '');

    if (requestedPath === '') requestedPath = '/index'

    const filePath = path.join(__dirname, requestedPath + '.html');

    const contentType = 'text/html';

    try {
        const content = await fs.readFile(filePath);
        res.writeHead(200, {'Content-Type': contentType})
        res.end(content);
    } catch(err) {
        try {
            const notFoundContent = await fs.readFile(path.join(__dirname, '404.html'));
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(notFoundContent);
        } catch {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        }
}
})

server.listen(3000, () => {
    console.log('Server running at https://localhost:3000');
})