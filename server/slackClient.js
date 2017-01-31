/**
* @author: Jithin Pradeep
* @mail : jithinpr2@gmail.com
*/

'use strict';

var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
let rtm = null;
let nlp = null;

function handleOnAuth(rtmStartData){
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
}

function addAuthHandler(rtm, handlerfunc){
    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handlerfunc);
}

function handleOnmsg(msg){
    nlp.ask(msg.text, (err,res) => {
        if(err){
            console.log(err);
            return;
        }
        if(!res.intent) {
            return rtm.sendMessage("Sorry, I don't know what you are talking about.", msg.channel);

        } else if(res.intent[0].value == 'time' && res.location) {
            return rtm.sendMessage(`I don't yet know the time in ${res.location[0].value}`, msg.channel);
        } else {
            console.log(res);
            return rtm.sendMessage("Sorry, I don't know what you are talking about.", msg.channel);
        }
        
        rtm.sendMessage("Sorry I did not undersatnd!", msg.channel, function messageSent(){
            
        });    
    });
    
    
}

module.exports.init = function slackClient(bot_token, nlpcilent) {
    rtm = new RtmClient(bot_token);
    nlp = nlpcilent;
    // The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload if you want to cache it
    addAuthHandler(rtm,handleOnAuth);
    rtm.on(RTM_EVENTS.MESSAGE,handleOnmsg);
    /*you need to wait for the client to fully connect before you can send messages
    rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
        rtm.sendMessage("Hello!", 'general');
    });*/

    return rtm;
}

module.exports.addAuthHandler = addAuthHandler;