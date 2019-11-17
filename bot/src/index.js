var express = require('express');
var app = express();
var FBBotFramework = require('fb-bot-framework');
// Initialize
var bot = new FBBotFramework({
    page_token: 'EAAKLPvppuegBAGm3ZAShrZCuTM0ZBtfUYmcolwXpFv7sspWILV3S7ZC0WYF9D7COeYZC9fRL4CEJdl6DzQFxSuHSIJyorjZC9uS6iFpUxecJCd60DY3T0fwWZCutaAfZCKmvpvSbHJMns2nH56OF1cMBZBz3Cw6CfttdUCpDM8C05FwZDZD',
    /*101243721347996
    EAAThjJdzcvwBAFwFpWZAD17nWzgyjNbpUqHZALujxFCCZC6aJ9QU1Ui4SXX0SjNfVt8k99msCZBgcYI1ZBFcuOrbt6FjgbvI2ZCCyGKZBkZBqmyeSrTXXYLI3t9szQnhsNxsNowe2pair18bAZAVoQAL8fYujZCwsZAIraAnKhUht2iSatD83qDEs0K*/
    verify_token: 'verify_token'
});
// Setup Express middleware for /webhook
app.use('/webhook', bot.middleware());
// Setup listener for incoming messages
var HashMap = require('hashmap');
var map = new HashMap();
var msgmap = new HashMap();
var userArray = [];
var questionsMap = ['What starts with \'e\' and ends with \'e\' but  has only one letter in it?', 'How many American cents make up a dime?', 'How many colours are there in a rainbow?'];
var expectedAsnwersMap = ['envelope', '10', '7'];
var start = 0;
var maximum = 0;
var winner;
var max_Score = 0;
var questionsCount = 0;
var userNames = new HashMap();
var userCount = 0;
var answersCount = 0;


bot.on('message', function(userId, message){
    /*
    if(message.toString()=='hello'){
        bot.sendTextMessage(userId, 'Play !');
    }*/
    //var userCount = 0, questionsCount = 0, answersCount = 0;
    var resultsMap = new HashMap();
    if(message.includes("")){
        if(map.get(userId) == undefined){
            console.log('Its in undefined');
            map.set(userId, 0);
            msgmap.set(userId, message);
            userArray.push(userId);
            userNames.set(userId, message);
            console.log('user ID is : '+userId);
            console.log('Array after adding user is : '+ userArray[0]);
            resultsMap.set(userId, 0);
            userCount++;
            console.log('User log: '+ userCount);

            /* Number of players allowed */
            if(userCount==2) {
                console.log('Maximum users reached ! ');
                for (let user in userArray) {
                    bot.sendTextMessage(userArray[user], 'Game starts now ...');
                    bot.sendTextMessage(userArray[user], questionsMap[questionsCount]);
                    console.log(questionsMap[questionsCount]);
                    console.log('User ID from userArray' + userArray[user]);
                }
            }
        }

    }
    else if(message == 'play'){
        bot.sendTextMessage(userId, 'Your name and best face !');

        /* Reset to start of the game */
         start = 0;
         maximum = 0;
         winner;
         max_Score = 0;
         questionsCount = 0;
         userNames = new HashMap();
         userCount = 0;
         answersCount = 0;
    }
    else{
        console.log('In answer mode');
            var expectedans = expectedAsnwersMap[questionsCount];
                    console.log('The answer is: '+message);
        //userCount++;
        answersCount++;
                if(message==expectedans) {
                    var temp = map.get(userId);
                    console.log('Temporary score is: '+ temp);
                    console.log('In the winner counting ballot : ' + userId + ' and max score is: '+ max_Score);
                    map.set(userId, temp++);
                    if(temp>max_Score){
                        max_Score = temp;
                        winner = userId;
                    }
                }
        console.log('Im in answersCount '+ answersCount);
        console.log('Im in userCount ' + userCount);

        if (answersCount==userCount){
                    console.log('Im in answersCount ');
                    askQuestions();
                }
    }
    console.log(message.toString());
});

function askQuestions(){
    answersCount = 0;
    if(questionsMap[questionsCount]!=undefined) {
//        console.log('The next question count is: '+ questionsCount)
        questionsCount = questionsCount +1;
if(questionsCount >=3){
    for (let user in userArray) {
        bot.sendTextMessage(userArray[user], 'Game over ! And the winner is ' + userNames.get(winner));
    }
}
       else {
    for (let user in userArray) {
        //bot.sendTextMessage(userArray[user], 'Next question \n ' );
        bot.sendTextMessage(userArray[user], questionsMap[questionsCount]);
    }
}
    }
}

app.get('/', function (req, res){
    res.send('Hi! This is Manasa');
});
//Make Express listening
app.listen(4000);