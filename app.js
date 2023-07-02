const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/signup.html");
});

app.post("/", (request, response) => {
    const bodyData = request.body;
    const firstName = bodyData.firstName;
    const lastName = bodyData.lastName;
    const email = bodyData.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName, 
                    LNAME: lastName,
                },
            },
        ],
    };
    const jsonData = JSON.stringify(data);
    const listId = "a97edd5b6d";
    const url = `https://us21.api.mailchimp.com/3.0/lists/${listId}/`;
    const method = "POST";
    const apiKey = "thettunkyaw10:76c3c2660324436c937c1785d453244e-us21";
    const options = {
        method: method,
        auth: apiKey,
    };

    const httpsRequest = https.request(url, options, (httpResponse) => {
        // httpResponse.on("data", (data) => {
        //     console.log(JSON.parse(data));
        // });

        if(response.statusCode === 200) {
            response.sendFile(__dirname + "/success.html");
        } else {
            response.sendFile(__dirname + "/failure.html");
        }
    });
    httpsRequest.write(jsonData);
    httpsRequest.end();
});

app.post("/redirect", (request, response) => {
    response.redirect("/");
});
app.listen(process.env.PORT || 3000, () => console.log("Server is running on port 3000."));