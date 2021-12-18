const get_name = require('../lib/get_name.js')
const read     = require('../lib/read_data.js')
const write    = require('../lib/write_data.js')
const fs       = require("fs")
const path     = require("path")
const admin_id = 2023671991

let students = read(path.join(process.cwd(),"data",'students.json'))
let student_id = students.map(s => s.id)

module.exports = class Message_Controller {
  static controller(bot) {
    bot.on('text',(message)=>{
        let student = {
          id:message.from.id,
          user_name:message.from.first_name
        }
        if(message.text=='/start' && message.from.id!==admin_id && !student_id.includes(student.id)){
          students.push(student)
          write(path.join(process.cwd(),"data",'students.json'),students)
        }
        if(message.from.id!==admin_id && message.text!=='/start' ){
          bot.sendMessage(admin_id,"*"+message.from.first_name+"|👨‍🎓 \n*"+ message.text,{parse_mode:"Markdown"})
        }
        if( message.from.id==admin_id && message.reply_to_message.text){
           let who = students.find(s => s.user_name==get_name(message.reply_to_message.text))
           bot.sendMessage(who.id,message.text)
        }
        if(message.from.id==admin_id && message.reply_to_message.photo){
          let who = students.find(s => s.user_name==message.reply_to_message.caption)
          bot.sendMessage(who.id,message.text)
        }
        if(message.from.id==admin_id && message.reply_to_message.document){
          let who = students.find(s => s.user_name==message.reply_to_message.caption)
          bot.sendMessage(who.id,message.text)
        }
        if(message.from.id==admin_id && message.reply_to_message.voice){
          let who = students.find(s => s.user_name==message.reply_to_message.caption)
          bot.sendMessage(who.id,message.text)
        }
    })
  }
}
