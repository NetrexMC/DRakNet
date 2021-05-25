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
import { ClientBound } from "../RakPacket.ts";
import OfflinePacket, { OfflinePacketIds } from "./OfflinePacket.ts";
import { Address } from "netrex";
import { Stream, writeAddress } from "../../util/Stream.ts";

export default class SessionInfoReply extends OfflinePacket implements ClientBound {
	public id = OfflinePacketIds.SessionInfoReply;
	public magic: Uint8Array;
	public serverid: bigint;
	public clientAddress: Address;
	public mtu: number;
	public encryption: boolean;

	public constructor(magic: Uint8Array, serverid: bigint, address: Address, mtu: number, encrypt: boolean = false) {
		super();
		this.magic = magic;
		this.serverid = serverid;
		this.clientAddress = address;
		this.mtu = mtu;
		this.encryption = encrypt;
	}

	public parse(): Stream {
		const stream = new Stream();
		stream.writeByte(this.id);
		stream.append(this.magic);
		writeAddress(stream, this.clientAddress);
		stream.writeShort(this.mtu);
		stream.writeBool(this.encryption);
		return stream;
	}
}