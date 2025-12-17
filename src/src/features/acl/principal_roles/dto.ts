import {BaseDTO} from "@app/types/dto";

export interface AclPrincipalRoleInDTO extends BaseDTO {
    principal_id: string;
    role_id: string;
    created_at: string;
}

export interface AclPrincipalRoleOutDTO extends BaseDTO {
    principal_id: string;
    role_id: string;
}

export interface AclPrincipalRolesPagedResponseDTO extends BaseDTO {
    records: AclPrincipalRoleInDTO[];
    total: number;
    total_filtered: number;
}

export type IAclPrincipalRoleInDTO = AclPrincipalRoleInDTO;
export type IAclPrincipalRoleOutDTO = AclPrincipalRoleOutDTO;
export type IAclPrincipalRolesPagedResponseDTO = AclPrincipalRolesPagedResponseDTO;