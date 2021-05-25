import RakServer from "./src/RakServer.ts";
import { Address, NetworkEventType } from "netrex";

const server = new RakServer();
server.start("0.0.0.0", 19132);
server.channel.on(NetworkEventType.GamePacket, (address: Address, buf: Uint8Array) => {
	console.log("Got game packet!");
});