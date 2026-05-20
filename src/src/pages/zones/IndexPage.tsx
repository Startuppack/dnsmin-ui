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

interface ZoneStats {
    authoritative: number;
    recursive: number;
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

async function getZoneStats(): Promise<ZoneStats> {
    return {
        authoritative: await getCount('/zones/authoritative/search'),
        recursive: await getCount('/zones/recursive/search'),
    };
}

const Page: React.FC<ViewProps> = ({basePath}) => {
    const {data, isLoading} = useQuery({
        queryKey: ['zone-stats'],
        queryFn: getZoneStats,
        retry: 3,
        retryDelay: 1000,
    });

    const getValue = (value: number | undefined) => isLoading ? '...' : value ?? 0;

    return (
        <>
            <PageHeader title={'Zone Management'}/>
            <Grid container spacing={2}>
                <Grid size={{sm: 12, md: 2}} display="flex" justifyContent="center">
                    <StatisticCard label="Authoritative Zones" value={getValue(data?.authoritative)}/>
                </Grid>
                <Grid size={{sm: 12, md: 2}} display="flex" justifyContent="center">
                    <StatisticCard label="Recursive Zones" value={getValue(data?.recursive)}/>
                </Grid>
            </Grid>
        </>
    );
};

export default Page;
