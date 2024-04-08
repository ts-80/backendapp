const express = require("express");

const router = express.Router();

const getAuthSheets = require(".././conexao");

router.get("/", async (req, res) => {
  try {
    const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

    const metadata = await googleSheets.spreadsheets.get({
      auth,
      spreadsheetId,
    });

    res.send(metadata.data);
  } catch (err) {
    console.log("erro", err);
  }
});

// router.get("/hospedes", async (req, res) => {

//     const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

//     const dados = await googleSheets.spreadsheets.values.get({
//       auth,
//       spreadsheetId,
//       range: 'checkIn',
//     })
//     res.send(dados);

// });

module.exports = router;
