const dotenv = require("dotenv");
const express = require("express");
const http = require("http");
const morgan = require("morgan");
const path = require("path");
const routerProf = require("./routes/professeur");
const routerChargement = require("./routes/chargement");
const routerAdmin = require("./routes/admin");
const routerUser = require("./routes/user");
const { auth } = require("express-openid-connect");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

dotenv.load();

const app = express();

mongoose
  .connect(process.env.DATABASE, {})
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
  })
);

app.use(cors());

const port = process.env.PORT || 3000;

const cliend_id = process.env.CLIENT_ID;
const cliend_secret = process.env.CLIENT_SECRET;
const domaine = process.env.DOMAINE;

app.use("/", routerProf);
app.use("/", routerChargement);
app.use("/", routerAdmin);
app.use("/", routerUser);

app.post("/getRoleUser2", async (req, res) => {
  //const id_user = req.params.id_user;
  const { id_user_auth, idtoken } = req.body;
  const options = {
    method: "GET",
    url: `https://${domaine}/api/v2/users/${id_user_auth}/roles`,
    headers: {
      "content-Type": "application/json",
      Authorization: `Bearer ${idtoken}`,
    },
  };

  await axios(options)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.post("/getTokenAuth", async (req, res) => {
  const options = {
    method: "POST",
    url: `https://${domaine}/oauth/token`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      client_id: cliend_id,
      client_secret: cliend_secret,
      audience: `https://${domaine}/api/v2/`,
      grant_type: "client_credentials",
    },
  };
  await axios(options)
    .then((response) => {
      res.status(200).json({
        token_access: response.data.access_token,
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

app.post("/getTokenGoogle", async (req, res) => {
  const { tokenauth } = req.body;
  console.log(tokenauth);
  const options2 = {
    method: "GET",
    url: `https://${domaine}/api/v2/users`,
    headers: {
      Authorization: `Bearer ${tokenauth}`,
    },
  };
  await axios(options2)
    .then((response) => {
      console.log("Repons", response);
      res.status(200).json({
        success: true,
        message: response.data,
      });
    })
    .catch((error) => {
      res.status(401).json({ success: false, message: error });
    });
});

app.get("/getCalendarList", async (req, res) => {
  const options = {
    method: "GET",
    url: "https://www.googleapis.com/calendar/v3/users/me/calendarList",
    headers: {
      Authorization: `Bearer ya29.a0AfB_byAYnaTMRzBufrY5XvnmFjBdXbjGXmjIXMyhNMU-fXdhwfnJR304dLU-yqoFbAp_WBUXVw4LxtOESaBetksdlXpZkewobfolRRbxzm0laWap_8LnjbGLFEsZaEuIccnUki1GvTuTvBnhP0X3BVj8H0BITIKCHW25aCgYKATYSARESFQHGX2Mi3WyUUrZjRnIHvUVz15Ry9g0171`,
    },
  };
  axios(options)
    .then((response) => {
      console.log(response.data);
      res.send("ok");
    })
    .catch((error) => {
      console.log(error);
      res.send("pas ok");
    });
});

app.post("/insertGoogleAgenda", async (req, res) => {
  const { token_google, summary } = req.body;
  const options = {
    method: "POST",
    url: "https://www.googleapis.com/calendar/v3/calendars",
    headers: {
      Authorization: `Bearer ${token_google}`,
    },
    data: {
      summary: summary,
    },
  };
  await axios(options)
    .then((response) => {
      res.status(200).json({ success: true, message: response.data });
    })
    .catch((error) => {
      res.status(401).json({ success: false, message: error });
    });
});

app.post("/insertEventInAgenda", async (req, res) => {
  const { token_google, id_agenda } = req.body;
  const options = {
    method: "POST",
    url: `https://www.googleapis.com/calendar/v3/calendars/${id_agenda}/events`,
    headers: {
      Authorization: `Bearer ${token_google}`,
    },
    data: {
      summary: "Event TEST",
      location: "Dijon",
      description: "Event test description à Dijon",
      start: {
        dateTime: "2023-12-30T09:00:00-07:00",
      },
      end: {
        dateTime: "2023-12-30T10:00:00-07:00",
      },
    },
  };
  axios(options)
    .then((response) => {
      console.log(response.data);
      res.send("ok");
    })
    .catch((error) => {
      console.log(error);
      res.send("pas ok");
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
