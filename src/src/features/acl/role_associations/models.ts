import {ModelBase} from "@app/types/models";

export interface AclRoleAssociation extends ModelBase {
    childRoleId: string;
    parentRoleId: string;
    createdAt?: string | null;
}

export interface AclRoleAssociationsPaged extends ModelBase {
    records: AclRoleAssociation[];
    total: number;
    totalFiltered: number;
}

export type IAclRoleAssociation = AclRoleAssociation;
export type IAclRoleAssociationsPaged = AclRoleAssociationsPaged;