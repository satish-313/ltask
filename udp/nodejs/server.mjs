import { createSocket } from "node:dgram";
import readline from "node:readline";

const server = createSocket("udp4");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let currLine = [];

server.on("error", (err) => {
    console.log(`server error: ${err.stack}`);
});

server.on("message", (msg, info) => {
    // let backSq = backspace();
    console.log(
        `\u001b[1K\u001b[${
            currLine.length
        }D\u001b[4m\u001b[38;5;75mserver got :from \u001b[38;5;9m${
            info.address
        }\u001b[0m\u001b[4m\u001b[38;5;75m : port \u001b[38;5;9m${
            info.port
        }\u001b[0m  \n\u001b[4m\u001b[38;5;75m${msg.subarray(
            0,
            msg.length
        )}\u001b[0m `
    );
    process.stdout.write(`${currLine.join("")}`);
});

server.on("listening", () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

process.stdin.on("data", (msg) => {
    let val = msg.toString().charCodeAt(0);
    if (val >= 32 && val <= 126) {
        currLine.push(String.fromCharCode(val));
    } else if (val === 127) {
        currLine.pop();
    }
});

rl.on("line", (line) => {
    currLine = [];
    server.send(line, 1921, "127.0.0.1", (err) => {
        if (err) console.log(err);
    });
});

server.bind(1920);

function backspace() {
    if (currLine.length === 0) {
        return "";
    }
    let s = "\x1b[1D";
    for (let i = 0; i < currLine.length; i++) {
        s += s;
    }
    return s;
}
