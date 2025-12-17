import {IAclPrincipalRoleInDTO, IAclPrincipalRoleOutDTO, IAclPrincipalRolesPagedResponseDTO} from "@app/features/acl/principal_roles/dto";
import {IAclPrincipalRole, IAclPrincipalRolesPaged} from "@app/features/acl/principal_roles/models";

export function principalRoleFromDTO(dto: IAclPrincipalRoleInDTO): IAclPrincipalRole {
    return {
        principalId: dto.principal_id,
        roleId: dto.role_id,
        createdAt: dto.created_at,
    }
}

export function principalRoleToDTO(principalRole: IAclPrincipalRole): IAclPrincipalRoleOutDTO {
    return {
        principal_id: principalRole.principalId,
        role_id: principalRole.roleId,
    }
}

export function principalRolesPagedFromDTO(dto: IAclPrincipalRolesPagedResponseDTO): IAclPrincipalRolesPaged {
    return {
        records: dto.records.map(principalRoleFromDTO),
        total: dto.total,
        totalFiltered: dto.total_filtered,
    }
}