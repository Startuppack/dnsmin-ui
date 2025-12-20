import {ModelBase} from "@app/types/models";

export interface ZoneSyncPolicy extends ModelBase {
    createMissingZonesInServer: boolean;
    updateZonesInDb: boolean;
    updateZonesInServer: boolean;
    purgeMissingZonesInDb: boolean;
    purgeMissingZonesInServer: boolean;
    createMissingRecordsInDb: boolean;
    createMissingRecordsInServer: boolean;
    updateRecordsInDb: boolean;
    updateRecordsInServer: boolean;
    purgeMissingRecordsInDb: boolean;
    purgeMissingRecordsInServer: boolean;
}

export interface ServerSyncPolicy extends ZoneSyncPolicy {
    createMissingZonesInDb: boolean;
}

export type IZoneSyncPolicy = ZoneSyncPolicy;
export type IServerSyncPolicy = ServerSyncPolicy;