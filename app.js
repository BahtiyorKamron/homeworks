const Telegram = require('node-telegram-bot-api')
const get_name = require('./lib/get_name.js')
const Token = your_token
const read = require('./lib/read_data.js')
const write = require('./lib/write_data.js')
const fs = require("fs")
const path = require("path")
const Message_Controller = require('./controllers/message_controllers.js')
const Photo_Controller = require('./controllers/photo_controllers.js')
const File_Controller = require('./controllers/file_controllers.js')
const Sticker_Controller = require('./controllers/sticker_controllers.js')
const Voice_Controller = require('./controllers/voice_controllers.js')
const admin_id = your_telegram_id
const options = {
  polling:true
}
let students = read(path.join(process.cwd(),"data",'students.json'))
let student_id = students.map(s => s.id)
const bot = new Telegram(Token,options)
Message_Controller.controller(bot)
Photo_Controller.controller(bot)
File_Controller.controller(bot)
Sticker_Controller.controller(bot)
Voice_Controller.controller(bot)
