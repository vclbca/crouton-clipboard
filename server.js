var WebSocketServer = require('ws').Server
, wss = new WebSocketServer({port: 3333})
, fs = require('fs')
, os = require('os')
var dataFile = os.homedir() + '/.crouton-clipboard/data'

wss.on('connection', ws => {
  ws.on('message', msg => {
    fs.writeFile(dataFile, msg)
  })
  fs.watchFile(dataFile, () => {
    ws.send(fs.readFileSync(dataFile))
  })
  ws.on('close', ()=> fs.unwatchFile(dataFile))
})