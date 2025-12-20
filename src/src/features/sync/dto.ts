import {BaseDTO} from "@app/types/dto";


export interface ZoneSyncPolicyDTO extends BaseDTO {
    create_missing_zones_in_server: boolean;
    update_zones_in_db: boolean;
    update_zones_in_server: boolean;
    purge_missing_zones_in_db: boolean;
    purge_missing_zones_in_server: boolean;
    create_missing_records_in_db: boolean;
    create_missing_records_in_server: boolean;
    update_records_in_db: boolean;
    update_records_in_server: boolean;
    purge_missing_records_in_db: boolean;
    purge_missing_records_in_server: boolean;
}

export interface ServerSyncPolicyDTO extends ZoneSyncPolicyDTO {
    create_missing_zones_in_db: boolean;
}

export type IZoneSyncPolicyDTO = ZoneSyncPolicyDTO;
export type IServerSyncPolicyDTO = ServerSyncPolicyDTO;