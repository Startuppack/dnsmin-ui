import * as React from 'react';
import {Button, Grid, Paper, Stack, Typography} from '@mui/material';
import {useLocation, useNavigate} from 'react-router-dom';
import PageHeader from '@components/PageHeader';

interface ViewProps {
    basePath: string;
}

const sections = [
    {path: '/audits/clients', label: 'API Clients'},
    {path: '/audits/users', label: 'Users'},
    {path: '/audits/servers', label: 'Servers'},
    {path: '/audits/zones', label: 'Zones'},
    {path: '/audits/synchronization', label: 'Synchronization'},
    {path: '/audits/tasks', label: 'Tasks'},
];

const getTitle = (pathname: string) => {
    const section = sections.find(item => item.path === pathname);
    return section ? `${section.label} Audits` : 'Audits Management';
};

const Page: React.FC<ViewProps> = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const title = getTitle(location.pathname);

    return (
        <>
            <PageHeader title={title}/>
            <Grid container spacing={2}>
                {sections.map(section => (
                    <Grid key={section.path} size={{sm: 12, md: 4, lg: 2}}>
                        <Paper variant="outlined" sx={{padding: 2}}>
                            <Stack spacing={2}>
                                <Typography variant="h6">{section.label}</Typography>
                                <Button variant="contained" onClick={() => navigate(section.path)}>
                                    Open
                                </Button>
                            </Stack>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default Page;
