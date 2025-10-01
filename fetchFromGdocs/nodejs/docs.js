const docs = require("@googleapis/docs");
const {docs_v1} = require("googleapis")

const auth = new docs.auth.GoogleAuth({
    keyFilename: "./keys.json",
    scopes: ["https://www.googleapis.com/auth/documents"],
});

const auth2 = docs

async function getData() {
    try {
        const authClient = await auth.getClient();

        const client = await docs.docs({
            version: "v1",
            auth: authClient,
        });
        // 1j_M9ZnrH8seuPIm-HCvdjAnx7pa7vNy0VMtU4CIh2yE
        const res = await client.documents.get({
            documentId: "1ucghRTeyrLVlAqyPlHHVJjwis3AiQfPmXxcd0oSyZSQ",
        });
        console.log(JSON.stringify(res.data));
    } catch (error) {
        console.log("-----error----");
        console.log(error);
    }
}
getData();
