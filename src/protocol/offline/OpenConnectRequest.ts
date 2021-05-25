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
import { Stream } from "../../util/Stream.ts";
import { ServerBound } from "../RakPacket.ts";
import OfflinePacket, { OfflinePacketIds } from "./OfflinePacket.ts";

export default class OpenConnectRequest extends OfflinePacket implements ServerBound {
	public id = OfflinePacketIds.OpenConnectRequest;
	#protocol!: number;
	#mtuSize!: number;

	public from(s: Stream): OpenConnectRequest {
		s.read(16);
		this.#protocol = s.readByte();
		this.#mtuSize = s.buffer.byteLength + 1 + 28;
		return this;
	}

	public get protocol(): number {
		return this.#protocol || 10;
	}

	public get mtuSize(): number {
		return this.#mtuSize || 1024;
	}
}