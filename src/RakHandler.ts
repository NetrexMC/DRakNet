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
// This file is responsible for RakNek connections
import { ConnectionState } from "netrex";
import OpenConnectReply from "./protocol/offline/OpenConnectReply.ts";
import OpenConnectRequest from "./protocol/offline/OpenConnectRequest.ts";
import SessionInfo from "./protocol/offline/SessionInfo.ts";
import SessionInfoReply from "./protocol/offline/SessionInfoReply.ts";
import { UnconnectedPing } from "./protocol/offline/UnconnectedPing.ts";
import { UnconnectedPong } from "./protocol/offline/UnconnectedPong.ts";
import RakConnection from "./RakConnection.ts";
import RakServer, { RakEvent } from "./RakServer.ts";
import { Stream } from "./util/Stream.ts";
export const MAGIC = new Uint8Array([0x00, 0xff, 0xff, 0x00, 0xfe, 0xfe, 0xfe, 0xfe, 0xfd, 0xfd, 0xfd, 0xfd , 0x12, 0x34, 0x56, 0x78 ]);

/**
 * Sends query to a connection.
 */
export function sendPong(connection: RakConnection, stream: Stream) {
	const ping = new UnconnectedPing().from(stream);
	connection.server.channel.emit(RakEvent.Query, connection.address, connection.server.motd);
	connection.send(
		new UnconnectedPong(
			ping.clientTime, RakServer.uniqueId, connection.server.motd
		).parse().buffer
	);
}

/**
 * Starts opening a connection
 */
export function openConnection(connection: RakConnection, stream: Stream) {
	const request = new OpenConnectRequest().from(stream);

	if (request.protocol < 10) {
		connection.server.channel.emit(RakEvent.Decline, connection.address, "Invalid Protocol");
		connection.terminate("Invalid Protocol");
		return;
	}

	connection.mtuSize = request.mtuSize;

	connection.send(
		new OpenConnectReply(RakServer.uniqueId, false, request.mtuSize).parse().buffer
	);
}

/**
 * Opens a session
 */
export function startSession(connection: RakConnection, stream: Stream) {
	new SessionInfo().from(stream);
	connection.server.channel.emit(RakEvent.Accept, connection);
	connection.send(
		new SessionInfoReply(MAGIC, RakServer.uniqueId, connection.address, connection.mtuSize).parse().buffer
	);
	connection.state = ConnectionState.Connected;
}