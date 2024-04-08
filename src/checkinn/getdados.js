const express = require("express");


const routerDados = express.Router();

const getAuthSheets = require('../conexao')




routerDados.get('/', async (req, res) => {
  
    const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

    const dados = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: 'checkIn',
    })

    const infoTemp = []
    const infoData = []
    let contador = 0
    
    let conversor = arr => arr.reduce((acc, [key, valor]) => {
        acc[key] = valor
        return acc
    }, {})

    for(let i=1;i<dados.data.values.length;i++){

        for(let j =0 ;j<dados.data.values[0].length;j++){

            if(contador<10){
                let data = [dados.data.values[0][j],dados.data.values[i][j]]
                infoTemp.push(data)
                contador++
            }
            
            contador = 0
            // console.log(data)
        }
        let data = conversor(infoTemp)
        
        infoData.push(data)
        
    }

    
        console.log(infoData)
  
    
    res.json({data:infoData});
  
});

module.exports = routerDados;