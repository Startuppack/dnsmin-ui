import {IAclRoleAssociationInDTO, IAclRoleAssociationOutDTO, IAclRoleAssociationsPagedResponseDTO} from "@app/features/acl/role_associations/dto";
import {IAclRoleAssociation, IAclRoleAssociationsPaged} from "@app/features/acl/role_associations/models";

export function roleAssociationFromDTO(dto: IAclRoleAssociationInDTO): IAclRoleAssociation {
    return {
        childRoleId: dto.child_role_id,
        parentRoleId: dto.parent_role_id,
        createdAt: dto.created_at,
    }
}

export function roleAssociationToDTO(roleAssociation: IAclRoleAssociation): IAclRoleAssociationOutDTO {
    return {
        child_role_id: roleAssociation.childRoleId,
        parent_role_id: roleAssociation.parentRoleId,
    }
}

export function roleAssociationsPagedFromDTO(dto: IAclRoleAssociationsPagedResponseDTO): IAclRoleAssociationsPaged {
    return {
        records: dto.records.map(roleAssociationFromDTO),
        total: dto.total,
        totalFiltered: dto.total_filtered,
    }
}