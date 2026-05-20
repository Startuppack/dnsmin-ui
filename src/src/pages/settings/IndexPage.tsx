import * as React from 'react';
import {Button, Grid, Paper, Stack, Typography} from '@mui/material';
import {useLocation, useNavigate} from 'react-router-dom';
import PageHeader from '@components/PageHeader';

interface ViewProps {
    basePath: string;
}

const sections = [
    {path: '/settings/ui', label: 'User Interface'},
    {path: '/settings/registration', label: 'Registration'},
    {path: '/settings/authentication', label: 'Authentication'},
    {path: '/settings/synchronization', label: 'Synchronization'},
];

const getTitle = (pathname: string) => sections.find(section => section.path === pathname)?.label ?? 'Settings Management';

const Page: React.FC<ViewProps> = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const title = getTitle(location.pathname);

    return (
        <>
            <PageHeader title={title}/>
            <Grid container spacing={2}>
                {sections.map(section => (
                    <Grid key={section.path} size={{sm: 12, md: 3}}>
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
