const http = require ('http');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader ('Content-type', 'text/html');
    res.end('<h1>Helloooooo World!</h1><p>Simple server with Node.js </p>');
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server started on https://localhost:${PORT}`);
});
