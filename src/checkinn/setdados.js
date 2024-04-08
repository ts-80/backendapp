const express = require("express");

const routerSetDados = express.Router();

const getAuthSheets = require("../conexao");

// const sendEmail = require("./email");

const nodemailer = require("nodemailer");

// configuração smtp
const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "thiagosiloe@gmail.com",
    pass: process.env.PASS,
  },
});

routerSetDados.use(express.json());

routerSetDados.post("/", async (req, res) => {
  const values = req.body;
  const info = values["values"];
  const dados = [];

  for (let i = 0; i < info.length; i++) {
    dados.push(info[i]);
  }
  
  const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

 
  const range = "checkIn!A:K";

  const valueInputOption = "USER_ENTERED";

  const row = await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range,
    valueInputOption,
    resource: values,
  });

  
  //função que envia email
  let enviarEmail = () => {
    transport
      .sendMail({
        from: "thiagosiloe@gmail.com",
        to: `${dados[0][9]}`,
        subject: "Cadastro de hospede 🛎️🛎️🛎️",
        html: `<div style="display: grid; grid-template-columns:1fr ;align-items: center; width: auto; padding-left: 20px; border-radius: 10px; border: none ;background-color: rgb(245, 167, 23); justify-content: center; align-items: center; ">
          <h1 style="display: flex; flex-direction: column;">Olá ${dados[0][8]}!</h1> <br>
          <h1 style="display: flex; flex-direction: column;"> O cadastro do hospede ${dados[0][4]} foi registrado com sucesso! <br> Apartamento: ${dados[0][1]} - Condomínio:
          ${dados[0][0]} - Pedíodo ${dados[0][2]} à ${dados[0][3]}.</h1 ></div>`,
        text: "Cadastro de hospede 🛎️🛎️🛎️",
        // attachments: [{
        //     filename: `${info.NUMERO}.png`,
        //     path: `./${info.NUMERO}.png`
        // }]
      })
      .then(() =>
        console.log("Email enviado com sucesso para:", `${dados[0][9]}`)
      )
      .catch((err) => console.log("email não foi enviado", err));
  };

  enviarEmail();

  console.log(dados);
  res.send(row.data);
});

module.exports = routerSetDados;
