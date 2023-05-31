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

const ConnectBank: React.FC = () => {
  // Constructors
  const renderMain = () => {
    return (
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          minHeight: 'calc(100vh - 94px)',
          padding: "1em 0",
          mx: 'auto',
        }}
      >
        <Grid container columnSpacing={2} height="100%">
          <Grid item md={3}>
            <Sidebar />
          </Grid>
          <Grid item md={9}>
            ConnectBank
          </Grid>
        </Grid>
      </Container>
    );
  };
  return <DefaultLayout content={renderMain()} screenTitle="heyy," />;
};

export default ConnectBank;
