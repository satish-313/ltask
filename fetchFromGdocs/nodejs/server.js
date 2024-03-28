const docs = require("@googleapis/docs");

const auth = new docs.auth.GoogleAuth({
    keyFilename: "./keys.json",
    scopes: ["https://www.googleapis.com/auth/documents"],
});

async function getData() {
    try {
        const authClient = await auth.getClient();

    const client = await docs.docs({
        version: "v1",
        auth: authClient,
    });

    const res = await client.documents.get({
        documentId: "1j_M9ZnrH8seuPIm-HCvdjAnx7pa7vNy0VMtU4CIh2yE",
    });
    console.log(res)
    } catch (error) {
        console.log('-----error----')
        console.log(error)
    }
    
}
getData();
