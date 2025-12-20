import {ModelBase} from "@app/types/models";
import {IServerSyncPolicy} from "@app/features/sync/models";

export interface Server extends ModelBase {
    id?: string;
    type: string;
    mode: string;
    serverId: string;
    version: string;
    hostname: string;
    apiUrl: string;
    apiKey: string;
    shared: boolean;
    syncPolicy: IServerSyncPolicy;
    createdAt?: string | null;
    updatedAt?: string | null;
}

export interface ServersPaged extends ModelBase {
    records: Server[];
    total: number;
    totalFiltered: number;
}

export type IServer = Server;
export type IServersPaged = ServersPaged;