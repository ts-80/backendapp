const express = require("express");

const routerDeletDados = express.Router();

const getAuthSheets = require("../conexao");

routerDeletDados.use(express.json());

routerDeletDados.post("/", async (req, res) => {
    const requests= []
    requests.push({
        deleteDimension: {
          range: {
            sheetId: 0,
            dimension: "ROWS",
            startIndex: 1,
            endIndex: 2,
          },
        },
      })

  //   requests.push(req.body);

  //   const info = values["values"];
  //   const dados = [];

  //   for (let i = 0; i < info.length; i++) {
  //     dados.push(info[i]);
  //   }

  const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

  //   const range = "checkIn!A3:L3";

  //   const valueInputOption = "USER_ENTERED";

  const batchUpdateRequest = {requests:requests}
  const row = await googleSheets.spreadsheets.values.batchUpdate({
    auth,
    spreadsheetId,
    resource: batchUpdateRequest
  });

  res.send(row.data);
});

module.exports = routerDeletDados;
