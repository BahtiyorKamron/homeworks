const get_name = require('../lib/get_name.js')
const read     = require('../lib/read_data.js')
const write    = require('../lib/write_data.js')
const fs       = require("fs")
const path     = require("path")
const admin_id = 2023671991
let students   = read(path.join(process.cwd(),"data",'students.json'))
let student_id = students.map(s => s.id)


module.exports = class Photo_Controller {
  static controller(bot) {
    bot.on('photo',photo=>{
      if(photo.from.id!==admin_id){
        bot.sendPhoto(admin_id, photo.photo[0].file_id,{caption:photo.from.first_name})
      }
      if(photo.reply_to_message.photo && photo.from.id==admin_id){
        let who = students.find(s => s.user_name==photo.reply_to_message.caption)
        bot.sendPhoto(who.id,photo.photo[0].file_id)
      }
      if(photo.reply_to_message.voice && photo.from.id==admin_id){
        let who = students.find(s => s.user_name==photo.reply_to_message.caption)
        bot.sendPhoto(who.id,photo.photo[0].file_id)
      }
      if(photo.reply_to_message.document && photo.from.id==admin_id){
        let who = students.find(s => s.user_name==photo.reply_to_message.caption)
        bot.sendPhoto(who.id,photo.photo[0].file_id)
      }
      if(photo.from.id==admin_id && photo.reply_to_message.text){
        let who = students.find(s => s.user_name==get_name(photo.reply_to_message.text))
        bot.sendPhoto(who.id,photo.photo[0].file_id)
      }

    })
  }
}
