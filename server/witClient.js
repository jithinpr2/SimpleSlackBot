/**
* @author: Jithin Pradeep
* @mail : jithinpr2@gmail.com
*/

'use strict';

const request = require('superagent');


function handleWitResp(res){
    return res.entities;
}
module.exports = function witClient(token){
    const ask = function ask(msg, cb){
        
        request.get('https://api.wit.ai/message')
            .set('Authorization', 'Bearer ' + token)
            .query({v: '20170131'})
            .query({q: msg})
            .end((err,res) => {
                if(err) return cb(err);
            
                if(res.statusCode != 200) return cb('Expected status 200 but got ' + res.statusCode);
            
                const witResp = handleWitResp(res.body);
                return cb(null,witResp)
        })
        
    }
    
    return {
       ask: ask 
    }
    
}
