import { readFile, open } from "node:fs/promises";
import EventEmitter from "node:events";

class ChunkEmitter extends EventEmitter {}
const chunkEmitter = new ChunkEmitter();

export async function sendData(idx) {
    try {
        // const data = await readFile("./para.txt", { encoding: "utf8" ,});
        // console.log(data.slice(0,9));
        const fh = await open("./para.txt");
        const rs = fh.createReadStream({ start: 0, end: idx });
        rs.on("data", (chunk) => {
            chunkEmitter.emit("chunk", chunk.toString());
        });
    } catch (err) {
        console.error(err.message);
    }
    return chunkEmitter;
}
