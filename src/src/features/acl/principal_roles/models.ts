import {ModelBase} from "@app/types/models";

export interface AclPrincipalRole extends ModelBase {
    principalId: string;
    roleId: string;
    createdAt?: string | null;
}

export interface AclPrincipalRolesPaged extends ModelBase {
    records: AclPrincipalRole[];
    total: number;
    totalFiltered: number;
}

export type IAclPrincipalRole = AclPrincipalRole;
export type IAclPrincipalRolesPaged = AclPrincipalRolesPaged;