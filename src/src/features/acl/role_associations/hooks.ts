import {useQuery, useQueryClient, useMutation} from "@tanstack/react-query";
import {ListResourceParams} from "@app/types/api";
import {AclRoleAssociationsService} from "@app/features/acl/role_associations/service";
import {IAclRoleAssociation} from "@app/features/acl/role_associations/models";

export function useAclRoleAssociations(params?: ListResourceParams) {
    return useQuery({
        queryKey: ["acl-role-associations", params],
        queryFn: () => AclRoleAssociationsService.search(params),
        placeholderData: (previousData) => previousData,
    });
}

export function useCreateAclRoleAssociation() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (payload: IAclRoleAssociation) => AclRoleAssociationsService.create(payload),
        onSuccess: () => {
            qc.invalidateQueries({queryKey: ["acl-role-associations"]});
        }
    });
}

export function useDeleteAclRoleAssociation(child_role_id: string, parent_role_id: string) {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: () => AclRoleAssociationsService.remove(child_role_id, parent_role_id),
        onSuccess: () => {
            qc.invalidateQueries({queryKey: ["acl-role-associations"]});
        }
    });
}
