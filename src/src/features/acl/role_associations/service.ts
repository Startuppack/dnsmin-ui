import {getApi} from "@app/utils/http";
import {ListResourceParams} from "@app/types/api";
import {roleAssociationFromDTO, roleAssociationsPagedFromDTO, roleAssociationToDTO} from "@app/features/acl/role_associations/converters";
import {IAclRoleAssociationInDTO, IAclRoleAssociationsPagedResponseDTO} from "@app/features/acl/role_associations/dto";
import {IAclRoleAssociation, IAclRoleAssociationsPaged} from "@app/features/acl/role_associations/models";

export const AclRoleAssociationsService = {
    async search(req?: ListResourceParams): Promise<IAclRoleAssociationsPaged> {
        const params = req !== undefined ? {
            filterModel: req.filterModel,
            sortModel: req.sortModel,
            paginationModel: req.paginationModel,
        } : {};

        const response = await getApi().post<IAclRoleAssociationsPagedResponseDTO>(
            "/acl/role-associations/search", params
        );

        return roleAssociationsPagedFromDTO(response.data);
    },

    async create(payload: IAclRoleAssociation): Promise<IAclRoleAssociation> {
        const dtoPayload = roleAssociationToDTO(payload as IAclRoleAssociation);
        const response = await getApi().post<IAclRoleAssociationInDTO>("/acl/role-associations", dtoPayload);
        return roleAssociationFromDTO(response.data);
    },

    async remove(child_role_id: string, parent_role_id: string): Promise<void> {
        await getApi().delete(`/acl/role-associations/${child_role_id}/${parent_role_id}`);
    },
};