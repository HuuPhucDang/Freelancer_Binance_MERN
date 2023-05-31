import React from 'react';
import {
  Container,
  Grid,
} from '@mui/material';
// Import local
import DefaultLayout from '@/Components/DefaultLayout';
import { Sidebar } from '../../../Components/LayoutParts';

const Security: React.FC = () => {
  // Constructors
  const renderMain = () => {
    return (
      <Container
        component="main"
        maxWidth="lg"
        sx={{ my: { xs: '3em', md: '5em', textAlign: '-webkit-center' } }}
      >
        <Grid container>
          <Grid item md={3}>
            <Sidebar />
          </Grid>
          <Grid item md={9}>
            Security
          </Grid>
        </Grid>
      </Container>
    );
  };
  return <DefaultLayout content={renderMain()} screenTitle="heyy," />;
};

export default Security;
