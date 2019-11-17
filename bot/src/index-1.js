// Nachi's code
// -----------


var express = require("express");
var app = express();
var FBBotFramework = require("fb-bot-framework");
var HashMap = require('hashmap');

// Initialize
var bot = new FBBotFramework({
page_token: "EAAKLPvppuegBAGm3ZAShrZCuTM0ZBtfUYmcolwXpFv7sspWILV3S7ZC0WYF9D7COeYZC9fRL4CEJdl6DzQFxSuHSIJyorjZC9uS6iFpUxecJCd60DY3T0fwWZCutaAfZCKmvpvSbHJMns2nH56OF1cMBZBz3Cw6CfttdUCpDM8C05FwZDZD",
verify_token: "verify_token"
});
// Setup Express middleware for /webhook
app.use("/webhook", bot.middleware());
// Setup listener for incoming messages

let map=new HashMap();
let readyCount=0;
bot.on("message", function(userId, message){
    console.log('-->',JSON.stringify(message));
    if(!map.has(userId) && message!="🐽")
    {
        bot.sendTextMessage(userId, "Hey! Use '🐽' emoji to start the game :P");
    }
    else if(!map.has(userId) && message=="🐽")
    {
        bot.sendTextMessage(userId, "Hey! Welcome to the game, please enter the player name :D");
        map.set(userId,{name:null,img:null, msgs:[], readyFlag:false})
        console.log('sdku0', map.get(userId));
    }
    else if(map.has(userId) && (map.get(userId))['name']==null)
    {
        let userInfoObj={name:JSON.stringify(message),img:null, msgs:[], readyFlag:false}
        map.set(userId,userInfoObj)
        console.log('sdku1', map.get(userId));
        bot.sendTextMessage(userId, "Great, you're almost set! Now upload a funny pic of yours :P");
    }
    else if(map.has(userId) && (map.get(userId))['name']!=null && (map.get(userId))['img']==null)
    {
        bot.sendTextMessage(userId, "Please upload a display picture first :P");
    }
    else if(map.size==2 && readyCount==2)
    {
        
    }

    // bot.sendTextMessage(userId, "Hey Goeeyyy");
    // bot.sendImageMessage(userId, "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500")
});

bot.on("attachment", function(userId, file){
    console.log('-->',JSON.stringify(file));
    if(map.has(userId) && (map.get(userId))['name']!=null && (map.get(userId))['img']==null)
    {
        let userInfoObj=map.get(userId);
        userInfoObj['img']=((file[0])['payload'])['url']
        userInfoObj['readyFlag']=true
        map.set(userId,userInfoObj)
        console.log('sdku2', map.get(userId));
        let str="Awesome, "+(map.get(userId))['name']+" Now Game Time! 😎"
        bot.sendTextMessage(userId, str);
        bot.sendImageMessage(userId, (map.get(userId))['img'])
        readyCount++;
    }
});

app.get("/", function (req, res){
res.send("hello world");
});
//Make Express listening
app.listen(4000); 