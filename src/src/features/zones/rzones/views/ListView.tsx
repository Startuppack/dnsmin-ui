import * as React from "react";
import {useState} from "react";
import {Grid} from "@mui/material";
import {
    DataGridPro,
    GridFilterModel,
    GridSortModel,
    GridPaginationModel,
    GridLogicOperator,
    GridColDef,
} from "@mui/x-data-grid-pro";
import {useRZones} from "@app/features/zones/rzones/hooks";
import PageHeader from "@components/PageHeader";
import StatisticCard from "@components/cards/StatisticCard";


interface ViewProps {
    basePath: string;
}

const ListView = ({basePath}: ViewProps) => {
    const [filterModel, setFilterModel] = useState<GridFilterModel>({
        items: [],
        quickFilterValues: [],
        logicOperator: GridLogicOperator.And,
    });

    const [sortModel, setSortModel] = useState<GridSortModel>([]);

    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({page: 0, pageSize: 5});

    const {data, isLoading} = useRZones({filterModel, sortModel, paginationModel});

    const isFilteringActive = React.useMemo(() => {
        return filterModel.items.length > 0 || (filterModel.quickFilterValues?.length ?? 0) > 0;
    }, [filterModel]);

    const columns: readonly GridColDef<any>[] = [
        {field: 'id', headerName: 'Zone ID', width: 150},
        {field: 'fqdn', headerName: 'FQDN', width: 200},
        {field: 'kind', headerName: 'Type', width: 200},
        {field: 'servers', headerName: 'Servers', width: 200},
        {field: 'recursionDesired', headerName: 'Recursion', width: 150},
        {field: 'notifyAllowed', headerName: 'Notify', width: 150},
        {field: 'createdAt', headerName: 'Created', width: 175},
        {field: 'updatedAt', headerName: 'Updated', width: 175},
    ];

    return (
        <>
            <PageHeader title={'Recursive Zones'}/>
            <Grid container justifyContent="space-between">
                <Grid size={{sm: 12, md: 6, lg: 4}} paddingY={2}>
                    <Grid container spacing={2}>
                        <Grid size={{sm: 12, md: 6}}>
                            <StatisticCard label="Total Zones" value={data?.total}/>
                        </Grid>
                        {isFilteringActive && (
                            <Grid size={{sm: 12, md: 6}}>
                                <StatisticCard label="Total Results" value={data?.totalFiltered}/>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
                <Grid size={12}>
                    <DataGridPro
                        autoHeight
                        loading={isLoading}
                        columns={columns}
                        rows={data?.records ?? []}
                        getRowId={(row) => row.id}
                        rowCount={data?.totalFiltered ?? 0}
                        filterMode="server"
                        sortingMode="server"
                        paginationMode="server"
                        pagination={true}
                        pageSizeOptions={[5, 10, 25, 50, 100]}
                        filterModel={filterModel}
                        sortModel={sortModel}
                        paginationModel={paginationModel}
                        onFilterModelChange={(model) => setFilterModel(model)}
                        onSortModelChange={(model) => setSortModel(model)}
                        onPaginationModelChange={(model) => setPaginationModel(model)}
                        initialState={{
                            pinnedColumns: {
                                right: ['actions'],
                            },
                        }}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default ListView;
