import {useQuery, useQueryClient, useMutation} from "@tanstack/react-query";
import {ListResourceParams} from "@app/types/api";
import {AclPrincipalRolesService} from "@app/features/acl/principal_roles/service";
import {IAclPrincipalRole} from "@app/features/acl/principal_roles/models";

export function useAclPrincipalRoles(params?: ListResourceParams) {
    return useQuery({
        queryKey: ["acl-principal-roles", params],
        queryFn: () => AclPrincipalRolesService.search(params),
        placeholderData: (previousData) => previousData,
    });
}

export function useCreateAclPrincipalRole() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (payload: IAclPrincipalRole) => AclPrincipalRolesService.create(payload),
        onSuccess: () => {
            qc.invalidateQueries({queryKey: ["acl-principal-roles"]});
        }
    });
}

export function useDeleteAclPrincipalRole(principal_id: string, role_id: string) {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: () => AclPrincipalRolesService.remove(principal_id, role_id),
        onSuccess: () => {
            qc.invalidateQueries({queryKey: ["acl-principal-roles"]});
        }
    });
}
