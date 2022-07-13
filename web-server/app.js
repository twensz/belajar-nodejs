const fs = require('fs');
const http = require('http');

const htmlRender = (path, res) => {
    fs.readFile(path, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.write('error : file not found');
        } else {
            res.write(data);
        }
        res.end();
    });
}

http
    .createServer((req, res) => {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        const url = req.url;

        switch (url) {
            case '/about':
                htmlRender('./about.html', res);
                break;
            default:
                htmlRender('./home.html', res);
                break;
        }
    })

    .listen(3000, () => {
        console.log('Server is listening on port 3000');
    });