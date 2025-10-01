import http from "node:http";

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        console.log('/')
    }
    if (req.url === '/hello') {
        console.log("/hello")
    }
    if (req.url === '/hello/p') {
        console.log('/hello p')
    }
    
    res.writeHead(200, { "Content-type": "text/plain" });
    res.end("okay");
});

server.listen(4000, "localhost", () =>
    console.log("server is running on port 4000")
);
