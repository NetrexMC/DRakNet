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
	NetworkServer,
	NetworkServerEvents,
	NetworkType
} from "netrex";
import RakConnection from "./RakConnection.ts";
import MOTD from "./util/MOTD.ts";
import { Stream } from "./util/Stream.ts";

export default class RakServer extends NetworkServer {
	public channel: NetworkServerEvents = new NetworkServerEvents();
	public static uniqueId: bigint = BigInt(crypto.getRandomValues(new Uint8Array([0,0,0,0,0,0,0,0])).reduce((r, c) => r += c));
	public serverType: NetworkType = NetworkType.RakNet;
	public motd: MOTD = new MOTD();
	#connects: Map<string, RakConnection> = new Map();
	#kill: boolean = false;
	#socket?: Deno.DatagramConn;

	public async start(address: string, port: number) {
		this.#socket = Deno.listenDatagram({
			hostname: address,
			port,
			transport: 'udp'
		});
		this.motd.name = "Netrex Server";
		this.motd.players.online = 0;
		this.motd.players.max = 100;
		this.motd.serverId = RakServer.uniqueId;

		while (!this.#kill) {
			try {
				const request = await this.#socket.receive(new Uint8Array(2048));
				const stream = new Stream(request[0]);
				const origin = Address.from(request[1]);

				if (this.#connects.has(origin.token)) {
					const session = this.#connects.get(origin.token);

					if (!session) {
						// we can't handle this.
						console.log("Could not find valid session.");
						continue;
					}

					session.recieve(stream);
				} else {
					console.log("Creating session for: " + origin.token);
					const session = new RakConnection(origin, this);
					this.#connects.set(origin.token, session);
					session.recieve(stream);
				}
			} catch (e) {
				console.error(e);
			}
		}

		for (let conn of this.connections) {
			conn.terminate("NetworkServer shutdown.");
		}
	}

	public send(address: Address, buffer: Uint8Array) {
		this.#socket?.send(buffer, address.toDenoAddr());
	}

	public stop() {
		this.#kill = true;
		this.#socket?.close();
	}

	public get connections(): Connection[] {
		return [...this.#connects.values()];
	}
}