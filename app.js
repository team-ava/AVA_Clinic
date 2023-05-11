import dotenv from "dotenv";
import Express from "express";
import cookieParser from "cookie-parser";
import http from "http"
import {router} from "./src/router/index.js"
//import https from "https";

dotenv.config({ path: "./env/.env" });

function main(){

    const port = process.env.PORT || 443;
    const app = Express();

    app.use(Express.urlencoded({ extended: true }));
    app.use(Express.json());
    app.use(cookieParser());

    //app.use("/", Express.static("public"));
    app.use("/api", router);

    //Status 404 - caso nenhum endpoint seja encontrado
    app.use(function (req, res, next) {
        const html = `<html> <head> <meta charset="utf-8" /> <title>Not found</title>
            <meta http-equiv="refresh" content="0; URL='${req.baseUrl}/404/index.html'" /> </head>
            <body>404 ERROR</body> </html>`;

        res.status(404);
        const contentType = req.get("Content-Type");

        // response with json
        if (req.get("Content-Type") === "application/json") {
            res.json({ error: "Not found" });
            return;
        }
        // response with html page
        if (req.accepts("html")) {
            res.send(html);
            return;
        }

        // default to plain-text. send()
        res.type("txt").send("Not found");
    });

    // const privateKey = await fs.readFile("sslcert/key.pem");
    // const certificate = await fs.readFile("sslcert/cert.pem");
    // const credentials = { key: privateKey, cert: certificate };

    // https.createServer(credentials, app).listen(port, () => {
    //     console.log(`Servidor criado no ambiente:${process.env.NODE_ENV} na porta:${port}`);
    // });

    http.createServer(app).listen(port, () => {
        console.log(`Servidor criado em: http://${process.env.NODE_ENV}:${port}`);
    });

}

main();