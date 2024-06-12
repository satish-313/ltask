import { createSocket } from "node:dgram";
import readline from "node:readline";

let currLine = [];
const server = createSocket("udp4");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
if (!process.argv[2] || !process.argv[3]) {
    throw new Error("pls enter source and destination port");
}
const sPort = process.argv[2];
const dPort = process.argv[3];

server.on("message", (msg, info) => {
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

// in case any error in server
server.on("error", (err) => {
    console.log(`server error: ${err.stack}`);
});
// listening port address is localhost
server.on("listening", () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

process.stdin.on("data", (msg) => {
    let val = msg.toString().charCodeAt(0);
    // console.log("msg",val)
    if (val >= 32 && val <= 126) {
        currLine.push(String.fromCharCode(val));
    } else if (val === 127) {
        currLine.pop();
    }
});

rl.on("line", (line) => {
    currLine = [];
    server.send(line, dPort, "127.0.0.1", (err) => {
        if (err) console.log(err);
    });
});

// assing any port
server.bind(sPort);
