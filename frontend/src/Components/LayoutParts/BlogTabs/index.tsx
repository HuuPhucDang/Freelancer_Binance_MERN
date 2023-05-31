import React, { useState } from 'react';
import {
  Container,
  Box,
  Tabs,
  Tab,
  Grid,
  Typography,
  Drawer,
  IconButton,
} from '@mui/material';
import _ from 'lodash';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

// Import local
import { RichTooltip, CommonStyles } from '@/Components/Common';
import { MENU_TOPIC } from '@/Constants';
import { CommonColors } from '@/Themes';

const Blogs: React.FC = () => {
  // Constructors
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState('all');
  const [isOpenTootip, setIsOpenTooltip] = useState(false);

  // Events
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Renders
  const _renderTopicItem = (
    data: { value: string; label: string }[],
    title?: string
  ) => (
    <Grid container spacing={1}>
      <Grid item xs={12} sx={CommonStyles.displayInMobile}>
        <Typography
          sx={{
            fontWeight: 700,
            px: 1,
            py: 2,
            fontSize: 14,
          }}
        >
          {title}
        </Typography>
      </Grid>
      {_.map(data, (item) => (
        <Grid item key={item.value} xs={12}>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              borderRadius: 2,
              width: 'max-content',
              p: 1,
              '&:hover': {
                fontWeight: 600,
                background: CommonColors.yellowBus,
              },
            }}
          >
            {item.label}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );

  const _renderHeaderTopicDesktop = () => (
    <Grid container spacing={1} sx={{ borderBottom: '1px solid black' }}>
      <Grid item xs={3}>
        <Typography
          sx={{
            fontWeight: 700,
            px: 1,
            py: 3,
            fontSize: 16,
          }}
        >
          Mental Health
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography
          sx={{
            fontWeight: 700,
            px: 1,
            py: 3,
            fontSize: 16,
          }}
        >
          Life & Communities
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography
          sx={{
            fontWeight: 700,
            px: 1,
            py: 3,
            fontSize: 16,
          }}
        >
          Clinical Insight
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography
          sx={{
            fontWeight: 700,
            px: 1,
            py: 3,
            fontSize: 16,
          }}
        >
          Wellness & Inspiration
        </Typography>
      </Grid>
    </Grid>
  );

  const _renderTopicOption = () => (
    <Grid container spacing={2} sx={{ width: 920, pb: 2 }}>
      <Grid item xs={12}>
        {_renderHeaderTopicDesktop()}
      </Grid>
      <Grid item xs={3}>
        {_renderTopicItem(MENU_TOPIC.METAL_HEALTH)}
      </Grid>
      <Grid item xs={3}>
        {_renderTopicItem(MENU_TOPIC.LIFE_COMMUNITY)}
      </Grid>
      <Grid item xs={3}>
        {_renderTopicItem(MENU_TOPIC.CLINICAL_INSIGHT)}
      </Grid>
      <Grid item xs={3}>
        {_renderTopicItem(MENU_TOPIC.WELLNESS_INSPIRATION)}
      </Grid>
    </Grid>
  );

  const _renderDrawer = () => (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiPaper-root': {
          maxHeight: '100vh',
        },
      }}
    >
      <Grid container flexDirection="column" rowGap={1} sx={{ p: 2 }}>
        <Grid item textAlign="right">
          <IconButton color="inherit" onClick={() => setMobileOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Grid item>
          {_renderTopicItem(MENU_TOPIC.METAL_HEALTH, 'Mental Health')}
        </Grid>
        <Grid item>
          {_renderTopicItem(MENU_TOPIC.LIFE_COMMUNITY, 'Life & Communities')}
        </Grid>
        <Grid item>
          {_renderTopicItem(MENU_TOPIC.CLINICAL_INSIGHT, 'Clinical Insight')}
        </Grid>
        <Grid item>
          {_renderTopicItem(
            MENU_TOPIC.WELLNESS_INSPIRATION,
            'Wellness & Inspiration'
          )}
        </Grid>
      </Grid>
    </Drawer>
  );

  return (
    <Box
      sx={{
        borderBottom: 1,
        width: 1,
        borderColor: 'divider',
        '& .MuiButtonBase-root': {
          color: 'gray!important',
          fontWeight: 500,
        },
        '& .Mui-selected': {
          fontWeight: 700,
          color: 'black!important',
        },
        '& .MuiTabs-indicator': {
          background: 'black',
        },
      }}
    >
      {_renderDrawer()}
      <Container maxWidth="lg">
        <Box sx={CommonStyles.displayInDesktop}>
          <RichTooltip
            open={isOpenTootip}
            placement="bottom-start"
            onClose={() => setIsOpenTooltip(false)}
            content={_renderTopicOption()}
          >
            <Tabs
              value={selectedTab}
              onChange={(_e, value) => setSelectedTab(value)}
            >
              <Tab
                label="All Topic"
                value="all"
                onMouseOver={() => setIsOpenTooltip(true)}
              />
              <Tab label="Therapy" value="therapy" />
              <Tab label="Psychiatry" value="psychiatry" />
              <Tab
                label="Mental Health condition"
                value="mentalHealthCondition"
              />
              <Tab label="Depression" value="depression" />
              <Tab label="Anxiety" value="anxiety" />
            </Tabs>
          </RichTooltip>
        </Box>
        <Box sx={CommonStyles.displayInMobile}>
          <IconButton color="inherit" onClick={() => setMobileOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Blogs;
