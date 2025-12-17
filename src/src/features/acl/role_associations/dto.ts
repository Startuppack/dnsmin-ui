import {BaseDTO} from "@app/types/dto";

export interface AclRoleAssociationInDTO extends BaseDTO {
    child_role_id: string;
    parent_role_id: string;
    created_at: string;
}

export interface AclRoleAssociationOutDTO extends BaseDTO {
    child_role_id: string;
    parent_role_id: string;
}

export interface AclRoleAssociationsPagedResponseDTO extends BaseDTO {
    records: AclRoleAssociationInDTO[];
    total: number;
    total_filtered: number;
}

export type IAclRoleAssociationInDTO = AclRoleAssociationInDTO;
export type IAclRoleAssociationOutDTO = AclRoleAssociationOutDTO;
export type IAclRoleAssociationsPagedResponseDTO = AclRoleAssociationsPagedResponseDTO;