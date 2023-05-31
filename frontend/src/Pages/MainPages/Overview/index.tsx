import React from 'react';
import { Container } from '@mui/material';

// Import local
import DefaultLayout from '@/Components/DefaultLayout';
import { StocksChart } from '@/Components/LayoutParts';

const Overview: React.FC = () => {
  // Constructors

  // Renders

  const renderMain = () => {
    return (
      <Container
        component="main"
        maxWidth="lg"
        sx={{ my: { xs: '3em', md: '5em', textAlign: '-webkit-center' } }}
      >
        <StocksChart />
      </Container>
    );
  };
  return <DefaultLayout content={renderMain()} screenTitle="heyy," />;
};

export default Overview;
