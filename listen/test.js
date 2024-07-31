const http = require("http")
const https = http.createServer();

https.on("request", (req,res) => res.end("ok"))
https.on("listening", () => {
	console.log(`listening on http://localhost:${https.address().port} on ${https.address().address}`)
})

https.listen("8080")