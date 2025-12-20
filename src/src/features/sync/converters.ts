import {IZoneSyncPolicyDTO, IServerSyncPolicyDTO} from "@app/features/sync/dto";
import {IZoneSyncPolicy, IServerSyncPolicy} from "@app/features/sync/models";

export function zoneSyncPolicyFromDTO(dto: IZoneSyncPolicyDTO | null): IZoneSyncPolicy | null {
    if (dto === null) {
        return null;
    }
    return {
        createMissingZonesInServer: dto.create_missing_zones_in_server,
        updateZonesInDb: dto.update_zones_in_db,
        updateZonesInServer: dto.update_zones_in_server,
        purgeMissingZonesInDb: dto.purge_missing_zones_in_db,
        purgeMissingZonesInServer: dto.purge_missing_zones_in_server,
        createMissingRecordsInDb: dto.create_missing_records_in_db,
        createMissingRecordsInServer: dto.create_missing_records_in_server,
        updateRecordsInDb: dto.update_records_in_db,
        updateRecordsInServer: dto.update_records_in_server,
        purgeMissingRecordsInDb: dto.purge_missing_records_in_db,
        purgeMissingRecordsInServer: dto.purge_missing_records_in_server,
    }
}

export function zoneSyncPolicyToDTO(zoneSyncPolicy: IZoneSyncPolicy | null): IZoneSyncPolicyDTO | null {
    if (zoneSyncPolicy === null) {
        return null;
    }
    return {
        create_missing_zones_in_server: zoneSyncPolicy.createMissingZonesInServer,
        update_zones_in_db: zoneSyncPolicy.updateZonesInDb,
        update_zones_in_server: zoneSyncPolicy.updateZonesInServer,
        purge_missing_zones_in_db: zoneSyncPolicy.purgeMissingZonesInDb,
        purge_missing_zones_in_server: zoneSyncPolicy.purgeMissingZonesInServer,
        create_missing_records_in_db: zoneSyncPolicy.createMissingRecordsInDb,
        create_missing_records_in_server: zoneSyncPolicy.createMissingRecordsInServer,
        update_records_in_db: zoneSyncPolicy.updateRecordsInDb,
        update_records_in_server: zoneSyncPolicy.updateRecordsInServer,
        purge_missing_records_in_db: zoneSyncPolicy.purgeMissingRecordsInDb,
        purge_missing_records_in_server: zoneSyncPolicy.purgeMissingRecordsInServer,
    }
}

export function serverSyncPolicyFromDTO(dto: IServerSyncPolicyDTO | null): IServerSyncPolicy | null {
    if (dto === null) {
        return null;
    }
    return {
        createMissingZonesInDb: dto.create_missing_zones_in_db,
        createMissingZonesInServer: dto.create_missing_zones_in_server,
        updateZonesInDb: dto.update_zones_in_db,
        updateZonesInServer: dto.update_zones_in_server,
        purgeMissingZonesInDb: dto.purge_missing_zones_in_db,
        purgeMissingZonesInServer: dto.purge_missing_zones_in_server,
        createMissingRecordsInDb: dto.create_missing_records_in_db,
        createMissingRecordsInServer: dto.create_missing_records_in_server,
        updateRecordsInDb: dto.update_records_in_db,
        updateRecordsInServer: dto.update_records_in_server,
        purgeMissingRecordsInDb: dto.purge_missing_records_in_db,
        purgeMissingRecordsInServer: dto.purge_missing_records_in_server,
    }
}

export function serverSyncPolicyToDTO(serverSyncPolicy: IServerSyncPolicy | null): IServerSyncPolicyDTO | null {
    if (serverSyncPolicy === null) {
        return null;
    }
    return {
        create_missing_zones_in_db: serverSyncPolicy.createMissingZonesInDb,
        create_missing_zones_in_server: serverSyncPolicy.createMissingZonesInServer,
        update_zones_in_db: serverSyncPolicy.updateZonesInDb,
        update_zones_in_server: serverSyncPolicy.updateZonesInServer,
        purge_missing_zones_in_db: serverSyncPolicy.purgeMissingZonesInDb,
        purge_missing_zones_in_server: serverSyncPolicy.purgeMissingZonesInServer,
        create_missing_records_in_db: serverSyncPolicy.createMissingRecordsInDb,
        create_missing_records_in_server: serverSyncPolicy.createMissingRecordsInServer,
        update_records_in_db: serverSyncPolicy.updateRecordsInDb,
        update_records_in_server: serverSyncPolicy.updateRecordsInServer,
        purge_missing_records_in_db: serverSyncPolicy.purgeMissingRecordsInDb,
        purge_missing_records_in_server: serverSyncPolicy.purgeMissingRecordsInServer,
    }
}
