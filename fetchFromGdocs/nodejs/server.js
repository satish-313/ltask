const { google } = require("googleapis");
const fs = require("node:fs").promises;
const path = require("node:path");
const { authenticate } = require("@google-cloud/local-auth");

const cred_path = path.join(__dirname, "/cred_desktop.json");
const scopes = ["drive.readonly"];

async function authorize() {
    try {
        const client = await authenticate({
            scopes: scopes,
            keyfilePath: cred_path,
        });
        return client;
    } catch (error) {
        console.log("auth error", error);
        return null;
    }
}

async function listFiles(auth) {
    const drive = google.drive({ version: "v3", auth });
    try {
        const res = await drive.files.list({
            pageSize: 10,
            fields: "nextPageToken, files(id, name)",
        });
        const { files } = res.data;
        console.log("Files:", files);
    } catch (err) {
        console.error("The API returned an error: " + err);
    }
}

async function main() {
    const authClient = await authorize();
    if (authClient) {
        await listFiles(authClient);
    }
}

main().catch(console.error);
