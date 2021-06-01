/**
 *  _   _      _
 * | \ | |    | |
 * |  \| | ___| |_ _ __ _____  __
 * | . ` |/ _ \ __| '__/ _ \ \/ /
 * | |\  |  __/ |_| | |  __/>  <
 * |_| \_|\___|\__|_|  \___/_/\_\
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * @author Netrex Team
 * @link https://github.com/NetrexMC
 *
 * © Netrex 2020 - 2021
 */
import RakServer, { RakEvent } from "../src/RakServer.ts";
import RakConnection from "../src/RakConnection.ts";
import MOTD from "../src/util/MOTD.ts";
import { Address } from 'netrex';

const server = new RakServer();
server.start("0.0.0.0", 19132);
server.channel.on(RakEvent.GamePacket, (connection: RakConnection, buf: Uint8Array) => {
	console.log("Got game packet!");
});
server.channel.on(RakEvent.Query, (add: Address, motd: MOTD) => {
	motd.name = "Testing!!!";
})