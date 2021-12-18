const get_name = require('../lib/get_name.js')
const read     = require('../lib/read_data.js')
const write    = require('../lib/write_data.js')
const fs       = require("fs")
const path     = require("path")
const admin_id = 2023671991
let students   = read(path.join(process.cwd(),"data",'students.json'))
let student_id = students.map(s => s.id)


module.exports = class Voice_Controllers {
  static controller(bot) {
    bot.on('voice',voice=>{
      if(voice.from.id!==admin_id){
        bot.sendVoice(admin_id,voice.voice.file_id,{caption:voice.from.first_name})
      }
      if(voice.reply_to_message.voice && voice.from.id==admin_id){
        let who = students.find(s => s.user_name==voice.reply_to_message.caption)
        bot.sendVoice(who.id,voice.voice.file_id)
      }
      if(voice.reply_to_message.photo &&  voice.from.id==admin_id){
        let who = students.find(s => s.user_name==(voice.reply_to_message.caption))
        bot.sendVoice(who.id,voice.voice.file_id)
      }
      if(voice.reply_to_message.document &&  voice.from.id==admin_id){
        let who = students.find(s => s.user_name==(voice.reply_to_message.caption))
        console.log(who);
        bot.sendVoice(who.id,voice.voice.file_id)
      }
      if(voice.reply_to_message.text && voice.from.id==admin_id){
        let who = students.find(s => s.user_name==get_name(voice.reply_to_message.text))
        bot.sendVoice(who.id,voice.voice.file_id)
      }

    })
  }
}
