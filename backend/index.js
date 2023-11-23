const dotenv = require("dotenv");
const express = require("express");
const http = require("http");
const morgan = require("morgan");
const path = require("path");
const routerProf = require("./routes/professeur");
const routerChargement = require("./routes/chargement");
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
app.use(express.json());

app.use(cors());

const port = process.env.PORT || 3000;

const cliend_id = process.env.CLIENT_ID;
const cliend_secret = process.env.CLIENT_SECRET;
const domaine = process.env.DOMAINE;

app.use("/", routerProf);
app.use("/", routerChargement);

/*
app.get('/addCourse', async(req, res)=>{
    const options={
        method: "POST",
        url: "https://classroom.googleapis.com/v1/courses",
        headers: {
            Authorization: `Bearer ya29.a0AfB_byA8-9tQj2uw0GVF3PYOzPB-doQxXNIHIUQgp-Yyfea122V_NJY0bju8aXpICU6vtOytLJnx1yCtCtcEbtzRMg3eYCm-z5ELm-Uyu_dHxv95KoZ23JEh5fxCisa65wX1zLg7sW0Q-m-1PAebSRnY66ZPPjkT2gU1aCgYKAZASARESFQGOcNnC_iQPZIcLU9W4VlzoCC2loA0171`,
          },
        data:{
            "name": "cours de francais",
            "ownerId": "me"
        }
        
    }

    axios(options)
    .then(response => {
        console.log(response.data);
        res.send('ok')
      })
      .catch(error => {
        console.log(error);
        res.send("pas ok")
      });
})


app.get('/getRoleUser/:id_user', async(req, res)=>{
    const id_user = req.params.id_user
    const options = {
        method: 'GET',
        url: `https://testpfe.eu.auth0.com/api/v2/users/${id_user}/roles`,
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZBZ0NQUFF6MUtrMGtjS1NmeTFQNyJ9.eyJpc3MiOiJodHRwczovL3Rlc3RwZmUuZXUuYXV0aDAuY29tLyIsInN1YiI6ImdSRVdyQlA3N0RKclY5b1hwZlBQSjJibWxkYzZINTIzQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3Rlc3RwZmUuZXUuYXV0aDAuY29tL2FwaS92Mi8iLCJpYXQiOjE2OTg0MDU4MTksImV4cCI6MTY5ODQ5MjIxOSwiYXpwIjoiZ1JFV3JCUDc3REpyVjlvWHBmUFBKMmJtbGRjNkg1MjMiLCJzY29wZSI6InJlYWQ6dXNlcnMgcmVhZDp1c2VyX2lkcF90b2tlbnMgcmVhZDpyb2xlcyByZWFkOmNsaWVudF9jcmVkZW50aWFscyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.nPjqvN2XXOpDZfbK0Px57L3agIqqJns5fo4n0RV9dWg-5fYt7m4j_MUO_qm6at0O0f0upWoETR3eim5Gq7kReM-awCCT4nl-A-xhWcklkQCktNc7REIBmdQK4oT1Z5-TkAub4PppFYibozP4px7jfGeE_r_xwoV912fwqVFOZBO7QoHzO-5LeZUgSgQIRV8RUe0xyCUcD-DQAmwRNtY_gd_VzhfZ0ukgVWoKZoiexOZeEvv_s83M8c8RAIkazkI4AS6gZCmV9Qo5bTG0YOft5x_IF9BuENQEQAQ66jAhvMtZZ-hXaeQFoyg0-LKIOcaqYeqckuUI2L6wl6Ygd6fAkw`,
          
        },
      };
  
    axios(options)
    .then(response => {
        res.send(response.data)
    })
    .catch(error => {
        res.send(error)
    });
})
*/

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

      //Lien qui explique pourquoi avec l'api qu'on utilise il est pas possible d'avoir de refreshtoken : https://community.auth0.com/t/having-trouble-enabling-allow-offline-access/30803/2
      //code: 'mettre le token que je recois au moment de l'authentification',
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

/*
//Mettre uniquement le grant type : authorizatiion_code (inutile il y est deja)
app.get('/updateClient', async(req, res)=>{
    var options = {
        method: 'PATCH',
        url:`https://${process.env.DOMAINE}/api/v2/clients/${process.env.CLIENT_ID}`,
        headers: {
          'content-type': 'application/json',
          authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZBZ0NQUFF6MUtrMGtjS1NmeTFQNyJ9.eyJpc3MiOiJodHRwczovL3Rlc3RwZmUuZXUuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTExNzE3ODUyMDU0MjM0MDUxNDU2IiwiYXVkIjpbImh0dHBzOi8vdGVzdHBmZS5ldS5hdXRoMC5jb20vYXBpL3YyLyIsImh0dHBzOi8vdGVzdHBmZS5ldS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjk4NDExODE0LCJleHAiOjE2OTg0OTgyMTQsImF6cCI6ImdSRVdyQlA3N0RKclY5b1hwZlBQSjJibWxkYzZINTIzIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.c01G12bTj-vjJXMVU8Hz7y8uxetloKpEluAiYTpaVEb5pfmPKw8kgWgwShzBXTlwOW-hpjKQrXJ1ZrgWLf0VKxqBEIH485yM4bIc2HvEWfIcbu4OgnNKGLyAhKKCLvg5z5E6bmjU0Sgdy-6egUniZooE0GSaN0zFp3s-khRdEcOh72TUH2J_RHqGMVZk2EopKt03D9l4whdRA7pmtykvEgs6UjreW-UcTYspbsXLFaxJfJ8V1GC6x85GFSA23muFIDcIgi6XLW7k_UvgH42BH9Us-bfSP1BcSinael4gEHfjQCphUvLX8j57fJ76zWwju4-7loiFm4_41kP7zQuK2A',
          'cache-control': 'no-cache'
        },
        data: {grant_types: ['authorization_code, client_credentials']}
      };
      
      axios(options)
      .then( response=> {
        console.log(response.data);
        res.send("ok")
      }).catch(error =>{
        console.error(error);
        res.send("pas ok")
      });
})*/

app.get("/getTokenGoogle/:tokenauth", async (req, res) => {
  /*console.log("okoktoken", req)
    let { token_type, access_token, refresh } = req.oidc.accessToken;
    console.log("prout", access_token, refresh)
    const products = await axios.get(`https://${process.env.DOMAINE}/api/v2/users`, {
        headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZBZ0NQUFF6MUtrMGtjS1NmeTFQNyJ9.eyJpc3MiOiJodHRwczovL3Rlc3RwZmUuZXUuYXV0aDAuY29tLyIsInN1YiI6ImdSRVdyQlA3N0RKclY5b1hwZlBQSjJibWxkYzZINTIzQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3Rlc3RwZmUuZXUuYXV0aDAuY29tL2FwaS92Mi8iLCJpYXQiOjE2OTg0MTYxMzAsImV4cCI6MTY5ODUwMjUzMCwiYXpwIjoiZ1JFV3JCUDc3REpyVjlvWHBmUFBKMmJtbGRjNkg1MjMiLCJzY29wZSI6InJlYWQ6dXNlcnMgdXBkYXRlOmNsaWVudHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgcmVhZDpyb2xlcyByZWFkOmNsaWVudF9jcmVkZW50aWFscyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.P2zFC_YrAZSb9KdVKQng7m0YIfzZdAKI0z15teKhHUD89E61zqi3Tq013NCrR1TC4oNvCr8uw-FI6dfVJ2WHnacWHCPBwj7xG2HZvHQQCANd3d6Q0jkpWb9fzQ83k4IR7ajvfLBmRz56My5wvhoC9mQZUMxC8AtVPPahK2d588FpDIjrt4Jy8oaZVG6QWmfiEAfqR9W2Iwle9UM_kCN46e3eGLwNP8QCoSOnZAZWVJA8l0LITcirpEpiBmzqGTUymk9_TZHJe1XcnoqSz30CwYDqpUJHAs814mI85zoKvMuSIXknUR75TgOmpO6yOihpUFTywQwCOwg1223O8iutsw`,            
        },
        
        
    });
    //console.log(products.data)
    //console.log(products.data[0].identities[0])
    res.send(`O: ${products.data[0].identities[0].access_token}`);
    */
  tokenAuth = req.params.tokenauth;
  console.log(req);
  const options2 = {
    method: "GET",
    url: `https://${domaine}/api/v2/users`,
    headers: {
      Authorization: `Bearer ${tokenAuth}`,
    },
  };
  await axios(options2)
    .then((response) => {
      console.log(response);
      res.send({ message: "réponse token google", message: response.data[0] });
    })
    .catch((error) => {
      res.send(error);
    });
});

/*
app.get('/getCalendarList', async (req, res) => {

    const options = { 
        method: "GET",
        url: "https://www.googleapis.com/calendar/v3/users/me/calendarList",
        headers: { Authorization: `Bearer ya29.a0AfB_byAZ4tlOkTnBbpHAsnQR1ZdJ1D2WGOuAdVpDR8fP6RFBNbEywKw1aKOiyHwmXsNEHAkqDs7BzQdQrF8gM-_6yZqyyq8bHxxbjZ3AT3QBEeadBZKrKIS5J_Y5_AmAsfGMYQ24_l7WoYRDMK7lzjH6lsY8e-oeEuIaCgYKAUMSARESFQGOcNnC61pRklEyLG8pkgiPFP61iQ0170`}
      };
      axios(options)
        .then(response => {
          console.log(response.data);
          res.send('ok')
        })
        .catch(error => {
          console.log(error);
          res.send("pas ok")
        });
});  */

app.post("/insertGoogleAgenda", async (req, res) => {
  const options = {
    method: "POST",
    url: "https://www.googleapis.com/calendar/v3/calendars",
    headers: {
      Authorization: `Bearer ya29.a0AfB_byCsRbFxRYwNdLuC94idRsVCdsmH4ztlRSfXET7-WghLkJmcljc0sLdcLIQ6vEm0VzSnPLpW_dqL-GPO61HCDCkLfmjSztIpxqqrhstXkcodZPYbIVyK3Hc3kCTpEy_E0rD-Fs39qDcPlIeMJ82Q6CzqL7v6ZUDlaCgYKAVcSARESFQGOcNnC8La3NQMtxx1fijpruVskKQ0171`,
    },
    data: {
      summary: req.body.summary,
      description: req.body.description,
    },
  };
  axios(options)
    .then((response) => {
      console.log(response.data);
      res.send("ok");
    })
    .catch((error) => {
      //console.log(error);
      console.log(req.body.summary);
      console.log(error);
      res.send("pas ok");
    });
});
/*
app.get('/insertEventInAgenda', async(req, res)=>{

    const options = { 
        method: "POST",
        url: "https://www.googleapis.com/calendar/v3/calendars/f3c6fd5e9bf041fe24d364e88d20dc505060f4ed7a29298fa143e8c3d5bcaaa4@group.calendar.google.com/events",
        headers: { Authorization: `Bearer ya29.a0AfB_byAZ4tlOkTnBbpHAsnQR1ZdJ1D2WGOuAdVpDR8fP6RFBNbEywKw1aKOiyHwmXsNEHAkqDs7BzQdQrF8gM-_6yZqyyq8bHxxbjZ3AT3QBEeadBZKrKIS5J_Y5_AmAsfGMYQ24_l7WoYRDMK7lzjH6lsY8e-oeEuIaCgYKAUMSARESFQGOcNnC61pRklEyLG8pkgiPFP61iQ0170`},
        data: {
            summary: 'Event TEST',
            location: 'Dijon',
            description: "Event test description à Dijon",
            start: {
                dateTime: '2023-10-27T09:00:00-07:00',
            },
            end: {
                dateTime: '2023-10-27T10:00:00-07:00',
            },
        }
      };
      axios(options)
        .then(response => {
          console.log(response.data);
          res.send('ok')
        })
        .catch(error => {
          console.log(error);
          res.send("pas ok")
        });

})

app.get('/', async (req, res) => {
    res.send(req.oidc.accessToken);
});
*/

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
