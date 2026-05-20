import * as React from 'react';
import {Grid} from '@mui/material';
import {useQuery} from '@tanstack/react-query';
import PageHeader from '@components/PageHeader';
import StatisticCard from '@components/cards/StatisticCard';
import {ListResourceParams} from '@app/types/api';
import {getApi} from '@app/utils/http';

interface ViewProps {
    basePath: string;
}

interface ServerRecord {
    id: string;
}

interface SearchResponse<T = unknown> {
    records: T[];
    total: number;
}

interface ServerStats {
    servers: number;
    autoPrimaries: number;
    views: number;
    networks: number;
    tsigKeys: number;
}

const searchParams: ListResourceParams = {
    filterModel: {
        logicOperator: 'and',
        quickFilterValues: [],
    } as ListResourceParams['filterModel'],
    paginationModel: {
        page: 0,
        pageSize: 100,
    },
    sortModel: [],
};

async function search<T = unknown>(endpoint: string): Promise<SearchResponse<T>> {
    const response = await getApi().post<SearchResponse<T>>(endpoint, searchParams, {timeout: 10000});
    return response.data;
}

async function getChildCount(serverId: string, childPath: string): Promise<number> {
    try {
        const response = await search(`/servers/${serverId}/${childPath}/search`);
        return response.total;
    } catch {
        return 0;
    }
}

async function getServerStats(): Promise<ServerStats> {
    const servers = await search<ServerRecord>('/servers/search');
    const childCounts = await Promise.all(servers.records.map(async server => ({
        autoPrimaries: await getChildCount(server.id, 'auto-primaries'),
        views: await getChildCount(server.id, 'views'),
        networks: await getChildCount(server.id, 'networks'),
        tsigKeys: await getChildCount(server.id, 'tsig-keys'),
    })));

    return {
        servers: servers.total,
        autoPrimaries: childCounts.reduce((total, item) => total + item.autoPrimaries, 0),
        views: childCounts.reduce((total, item) => total + item.views, 0),
        networks: childCounts.reduce((total, item) => total + item.networks, 0),
        tsigKeys: childCounts.reduce((total, item) => total + item.tsigKeys, 0),
    };
}

const Page: React.FC<ViewProps> = ({basePath}) => {
    const {data, isLoading} = useQuery({
        queryKey: ['server-stats'],
        queryFn: getServerStats,
        retry: 3,
        retryDelay: 1000,
    });

    const getValue = (value: number | undefined) => isLoading ? '...' : value ?? 0;

    return (
        <>
            <PageHeader title={'Server Management'}/>
            <Grid container spacing={2}>
                <Grid size={{sm: 12, md: 2}} display="flex" justifyContent="center">
                    <StatisticCard label="Servers" value={getValue(data?.servers)}/>
                </Grid>
                <Grid size={{sm: 12, md: 2}} display="flex" justifyContent="center">
                    <StatisticCard label="Auto-Primaries" value={getValue(data?.autoPrimaries)}/>
                </Grid>
                <Grid size={{sm: 12, md: 2}} display="flex" justifyContent="center">
                    <StatisticCard label="Views" value={getValue(data?.views)}/>
                </Grid>
                <Grid size={{sm: 12, md: 2}} display="flex" justifyContent="center">
                    <StatisticCard label="Networks" value={getValue(data?.networks)}/>
                </Grid>
                <Grid size={{sm: 12, md: 2}} display="flex" justifyContent="center">
                    <StatisticCard label="TSIG Keys" value={getValue(data?.tsigKeys)}/>
                </Grid>
            </Grid>
        </>
    );
};

export default Page;
