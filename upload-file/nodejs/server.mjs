import http from "node:http";
import { randomFillSync } from "node:crypto";
import fs from "node:fs";
import busboy from "busboy";
import path from "node:path";

const random = (() => {
    const buf = Buffer.alloc(6);
    return () => randomFillSync(buf).toString("hex");
})();

const s = http.createServer((req, res) => {
    if (req.method === "POST") {
        const bb = busboy({ headers: req.headers });

        bb.on("file", (name, file, info) => {
            const saveTo = path.join(
                process.cwd() + "/upload/" + `busboy-upload-${random()}.${info.mimeType.split('/')[1]}`
            );
            file.pipe(fs.createWriteStream(saveTo));
        });
        bb.on("close", () => {
            res.end(`that's all folks`);
        });
        bb.on("error", (error) => {
            console.log(error);
        });
        req.pipe(bb);
    } else {
        fs.readFile("upload.html", (err, data) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            res.end();
        });
    }
});

s.listen(8000, () => console.log("server is listening on port 8000"));
