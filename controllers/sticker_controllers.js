const get_name = require('../lib/get_name.js')
const read     = require('../lib/read_data.js')
const write    = require('../lib/write_data.js')
const fs       = require("fs")
const path     = require("path")
const admin_id = 2023671991
let students   = read(path.join(process.cwd(),"data",'students.json'))
let student_id = students.map(s => s.id)



module.exports = class Sticker_Controllers {
   static controller(bot) {
     bot.on('sticker',sticker=>{

       if(sticker.from.id==admin_id && sticker.reply_to_message){
          let who = students.find(s => s.user_name==get_name(sticker.reply_to_message.text))
          bot.sendMessage(who.id, sticker.sticker.file_id)

       }else if (sticker.from.id!==admin_id){
         bot.sendSticker(admin_id , sticker.sticker.file_id)
       }

     })
  }
}
