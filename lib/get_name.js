let name = ""
let marker = 0
module.exports = function split_name(m){
  for(let i of m){
    if(i=='|'){
      marker=1
    }
    else if(marker==0){
      name+=i
    }
  }
return name
}
