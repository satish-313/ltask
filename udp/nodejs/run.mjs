import dgram from "node:dgram";
import { sendData } from "./read.mjs";
import process from "node:process";

const server = dgram.createSocket("udp4");

server.on("error", (err) => {
    console.log(`server error: ${err.stack}`);
});

server.on("message", (msg, info) => {
    console.log(
        `server got :from \u001b[38;5;9m${
            info.address
        }\u001b[0m : port \u001b[38;5;9m${
            info.port
        }\u001b[0m  \n\u001b[38;5;75m${msg.subarray(
            0,
            msg.length - 1
        )}\u001b[0m `
    );
});

server.on("listening", () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

// let Emitter = await sendData(10);

// Emitter.on("chunk", (msg) => {
//     console.log(msg.length);
//     server.send(msg, 1920, "127.0.0.1");
// });

process.stdin.on("data", (msg) => {
    server.send(msg, 1920, "127.0.0.1");
});

server.bind(1921);
