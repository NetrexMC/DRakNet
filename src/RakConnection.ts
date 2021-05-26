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
 import {
	Address,
	Connection,
	ConnectionState
} from "netrex";
import EncapsulatedPacket from "./protocol/EncapsulatedPacket.ts";
import { OfflinePacketIds } from "./protocol/offline/OfflinePacket.ts";
import { openConnection, sendPong, startSession } from "./RakHandler.ts";
import RakServer from "./RakServer.ts";
import { Stream } from "./util/Stream.ts";

export class RakConnection extends Connection {
	public state: ConnectionState;
	public address: Address;
	public server: RakServer;
	public mtuSize: number = 1024;

	public constructor(address: Address, server: RakServer) {
		super();
		this.state = ConnectionState.Disconnected;
		this.address = address;
		this.server = server;
	}

	public terminate(reason: string) {
		throw new Error("Method not implemented.");
	}
	public send(buffer: Uint8Array) {
		this.server.send(this.address, buffer);
	}

	public recieve(buf: Stream) {
		if (this.state === ConnectionState.Disconnected) {
			// offline packets expected
			const rakId = buf.readByte();
			switch (rakId) {
				case OfflinePacketIds.UnconnectedPing:
					sendPong(this, buf);
					break;
				case OfflinePacketIds.OpenConnectRequest:
					openConnection(this, buf);
					break;
				case OfflinePacketIds.SessionInfo:
					startSession(this, buf);
					break;
				default:
					break;
			}
		} else if (this.state === ConnectionState.Connected || this.state === ConnectionState.Latent) {
			// connected, performing pre-login stuff
			const id: number = buf.readByte();
		}
	}

	public tick() {}
}
export default RakConnection;