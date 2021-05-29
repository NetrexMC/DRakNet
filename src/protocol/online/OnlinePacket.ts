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
export enum OnlinePacketIds {
	ConnectedPing = 0x00,
	ConnectedPong = 0x03,
	ConnectionRequest = 0x09,
	ConnectionRequestAccept = 0x10,
	NewConnection = 0x013,
	Disconnect = 0x15,
	Incompatible = 0x19
}
export abstract class OnlinePacket {
	public abstract id: OnlinePacketIds;
}