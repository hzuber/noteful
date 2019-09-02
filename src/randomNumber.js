

export default function RandomString(length){
    var string = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++){
      string += ( possible.charAt(Math.floor(Math.random() * possible.length)));
  
    }
    console.log("in the function" + string);
    return string;
}
