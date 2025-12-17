import {getApi} from "@app/utils/http";
import {ListResourceParams} from "@app/types/api";
import {principalRoleFromDTO, principalRolesPagedFromDTO, principalRoleToDTO} from "@app/features/acl/principal_roles/converters";
import {IAclPrincipalRoleInDTO, IAclPrincipalRolesPagedResponseDTO} from "@app/features/acl/principal_roles/dto";
import {IAclPrincipalRole, IAclPrincipalRolesPaged} from "@app/features/acl/principal_roles/models";

export const AclPrincipalRolesService = {
    async search(req?: ListResourceParams): Promise<IAclPrincipalRolesPaged> {
        const params = req !== undefined ? {
            filterModel: req.filterModel,
            sortModel: req.sortModel,
            paginationModel: req.paginationModel,
        } : {};

        const response = await getApi().post<IAclPrincipalRolesPagedResponseDTO>(
            "/acl/principal-roles/search", params
        );

        return principalRolesPagedFromDTO(response.data);
    },

    async create(payload: IAclPrincipalRole): Promise<IAclPrincipalRole> {
        const dtoPayload = principalRoleToDTO(payload as IAclPrincipalRole);
        const response = await getApi().post<IAclPrincipalRoleInDTO>("/acl/principal-roles", dtoPayload);
        return principalRoleFromDTO(response.data);
    },

    async remove(principal_id: string, role_id: string): Promise<void> {
        await getApi().delete(`/acl/principal-roles/${principal_id}/${role_id}`);
    },
};