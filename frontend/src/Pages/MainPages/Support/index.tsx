import React from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  Stack,
  Link,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
// Import local
import DefaultLayout from '@/Components/DefaultLayout';
import Assets from '@/Assets';
import { Sidebar } from '../../../Components/LayoutParts';

const Support: React.FC = () => {
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
            Support
          </Grid>
        </Grid>
      </Container>
    );
  };
  return <DefaultLayout content={renderMain()} screenTitle="heyy," />;
};

export default Support;
