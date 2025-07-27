import { BASE_ID } from "./constants.js";
import { hashsha256 } from "./encrypt.js";
import { Peer } from "peerjs";
function randomString(length=4){
    const chars = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPSDFGHJKLZXCVBNM"
    let out = ""

    for(let i = 0;i<length;i++){
        out+=chars[Math.floor(Math.random()*chars.length)]
    }

    return out
}

let code = `${randomString(4)}-${randomString(4)}`
const serverPeerId =  await hashsha256(await hashsha256(BASE_ID+code.replace("-", "")))
console.log("Server Peer ID:", serverPeerId);
const serverPeer = new Peer(serverPeerId);
document.getElementById('code').textContent = code

serverPeer.on("connection", (conn) => {
    console.log("New connection from:", conn.peer);
	conn.on("data", (data) => {
		// Will print 'hi!'
		console.log(data);
	});
	conn.on("open", () => {
        console.log("connection opened");
		conn.send("hello!");
	});
});