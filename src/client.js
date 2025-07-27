import { Peer } from "peerjs";
import { BASE_ID } from "./constants.js";
import { hashsha256 } from "./encrypt.js";
const connectionForm = document.getElementById("connectform")

connectionForm.addEventListener("submit", async(ev)=>{
    ev.preventDefault()
    console.log("Connecting to peer...")
    const peer = new Peer(crypto.randomUUID())
    console.log(document.getElementById("connectcode").value)
    const targetPeerId = await hashsha256(await hashsha256(BASE_ID+document.getElementById("connectcode").value.replaceAll("-", "")))
    console.log("Target Peer ID:", targetPeerId);
    const conn = peer.connect(targetPeerId);
    conn.on("open", () => {
        conn.send("hi!");
    });
})