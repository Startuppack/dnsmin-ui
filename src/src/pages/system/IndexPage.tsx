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

interface SystemStats {
    tenants: number;
    users: number;
    clients: number;
    stopgapDomains: number;
    sessions: number;
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

interface SearchTotalResponse {
    total: number;
}

async function getCount(endpoint: string): Promise<number> {
    const response = await getApi().post<SearchTotalResponse>(endpoint, searchParams, {timeout: 10000});
    return response.data.total;
}

async function getSystemStats(): Promise<SystemStats> {
    return {
        tenants: await getCount('/tenants/search'),
        users: await getCount('/auth/users/search'),
        clients: await getCount('/auth/clients/search'),
        stopgapDomains: await getCount('/system/stopgap-domains/search'),
        sessions: await getCount('/auth/sessions/search'),
    };
}

const Page: React.FC<ViewProps> = ({basePath}) => {
    const {data, isLoading} = useQuery({
        queryKey: ['system-stats'],
        queryFn: getSystemStats,
        retry: 3,
        retryDelay: 1000,
    });

    const getValue = (value: number | undefined) => isLoading ? '...' : value ?? 0;

    return (
        <>
            <PageHeader title={'System Management'}/>
            <Grid container spacing={2}>
                <Grid size={{sm: 12, md: 2}} display="flex" justifyContent="center">
                    <StatisticCard label="Tenants" value={getValue(data?.tenants)}/>
                </Grid>
                <Grid size={{sm: 12, md: 2}} display="flex" justifyContent="center">
                    <StatisticCard label="Users" value={getValue(data?.users)}/>
                </Grid>
                <Grid size={{sm: 12, md: 2}} display="flex" justifyContent="center">
                    <StatisticCard label="API Clients" value={getValue(data?.clients)}/>
                </Grid>
                <Grid size={{sm: 12, md: 2}} display="flex" justifyContent="center">
                    <StatisticCard label="Stopgap Domains" value={getValue(data?.stopgapDomains)}/>
                </Grid>
                <Grid size={{sm: 12, md: 2}} display="flex" justifyContent="center">
                    <StatisticCard label="User Sessions" value={getValue(data?.sessions)}/>
                </Grid>
            </Grid>
        </>
    );
};

export default Page;
