//const Peer = require('./peerjs.min.js');
import Peer from './peerjs.min.js';
const openStream = require('./openStream');
const playVideo = require('./playVideo');
const uid = require('uid/dist/index.js');
const $ = require('jquery');
$('#localstream').hide();

function getPeer() {
    //const id = () => (Math.random().toString(36) + '0000000000000000000').substr(2, 16);
    const id = uid(13);
    $('#peer-id').append(id)
    return id;
}

const customconfig = {
    iceServers: [{
        urls: [ "stun:tk-turn1.xirsys.com" ]},
        { 
            username: "iA0P1LGv2sOKt4j0Eqz2E551lSfGFAQYIDGMw53GshzUj98o7SQugdtqAiRt7FmiAAAAAF6i6AFuZ3V5ZW50cmFu",
            credential: "9a003d5a-862e-11ea-bc71-06b36dd82d1a",
            urls: [ "turn:tk-turn1.xirsys.com:80?transport=udp", "turn:tk-turn1.xirsys.com:3478?transport=udp",       "turn:tk-turn1.xirsys.com:80?transport=tcp",       "turn:tk-turn1.xirsys.com:3478?transport=tcp",       "turns:tk-turn1.xirsys.com:443?transport=tcp",       "turns:tk-turn1.xirsys.com:5349?transport=tcp" ]
        }]
    }

const connObject = {host: 'streamingpeerjs.herokuapp.com', port: 443, secure: true, key:'peerjs', config: customconfig}

const peer = new Peer(getPeer(), connObject);

//Caller
$('#btnCall').click(() => {
    const friendid = $('#txtFriendId').val();
    openStream(stream => {
        playVideo(stream, 'localstream');
        const call = peer.call(friendid, stream);
        call.on('stream', remoteStream => { playVideo(remoteStream, 'friendstream');
        });
    })

});

peer.on('call', call => {
    openStream(stream => {
        playVideo(stream, 'localstream');
        call.answer(stream);
        call.on('stream', remoteStream => { playVideo(remoteStream, 'friendstream');
        });
    })
});
    