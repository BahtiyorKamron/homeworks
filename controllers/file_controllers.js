const get_name = require('../lib/get_name.js')
const read     = require('../lib/read_data.js')
const write    = require('../lib/write_data.js')
const fs       = require("fs")
const path     = require("path")
const admin_id = 2023671991
let students   = read(path.join(process.cwd(),"data",'students.json'))
let student_id = students.map(s => s.id)

module.exports = class File_Controller {
  static controller(bot) {
    bot.on('document',file=>{
      if(file.from.id!==admin_id){
        bot.sendDocument(admin_id,file.document.file_id,{caption:file.from.first_name})
      }
      if(file.reply_to_message.photo && file.from.id==admin_id ){
        let who = students.find(s => s.user_name==file.reply_to_message.caption)
        bot.sendDocument(who.id,file.document.file_id)
      }
      if(file.reply_to_message.voice && file.from.id==admin_id){
        let who = students.find(s => s.user_name==file.reply_to_message.caption)
        bot.sendDocument(who.id,file.document.file_id)
      }
      if(file.reply_to_message.document && file.from.id==admin_id){
        let who = students.find(s => s.user_name==file.reply_to_message.caption)
        bot.sendDocument(who.id,file.document.file_id)
      }
      if(file.from.id==admin_id && file.reply_to_message.text){
        let who = students.find(s => s.user_name==get_name(file.reply_to_message.text))
        bot.sendDocument(who.id,file.document.file_id)
      }

    })
  }
}
