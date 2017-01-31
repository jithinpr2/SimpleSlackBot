/**
* @author: Jithin Pradeep
* @mail : jithinpr2@gmail.com
*/

'use strict';

const service = require('../server/service');
const http = require('http');

const server = http.createServer(service);
const slackClient = require('../server/slackClient');
const bot_token = <Slack bot API Key>;

const wit_token = <Wit.ai bot API Key>;
const witClient = require('../server/witClient')(wit_token);

const rtm = slackClient.init(bot_token,witClient);
rtm.start();
slackClient.addAuthHandler(rtm,() => server.listen(3000) );
server.on('listening', function(){
    console.log(`Hi there, Jithin Pradeep here on port ${server.address().port} in ${service.get('env')} mode.`);
});
