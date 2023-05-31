import React, { useMemo, useState } from 'react';
import _ from 'lodash';
import {
  Grid,
  Container,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Collapse,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
// Import local
import Assets from '@assets';
import { Utils } from '@libs';
import { ROUTERS, MENU_FOOTER } from '@/Constants';
import { CommonStyles } from '../Common';
import { CommonColors } from '@/Themes';

const FooterComponent: React.FC = () => {
  // Constructors
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [expanedItem, setExpandedItem] = useState('');
  // Renders
  const _renderNavLinks = (items: { label: string; value: string }[]) =>
    _.map(items, (item) => (
      <Grid item key={item.value}>
        <Typography
          sx={{
            lineHeight: { xs: '32px', sm: '40px' },
            fontSize: { xs: 12, sm: 14 },
            cursor: 'pointer',
            textAlign: { xs: 'center', sm: 'left' },
          }}
          onClick={() => {
            Utils.redirect(item.value);
            setExpandedItem('');
          }}
        >
          {item.label}
        </Typography>
      </Grid>
    ));

  const _renderSocialIcons = useMemo(
    () => (
      <>
        <Box
          sx={CommonStyles.iconHoverStyle(
            Assets.facebookLightIcon,
            [46, 46],
            Assets.facebookDarkIcon
          )}
        />
        <Box
          sx={CommonStyles.iconHoverStyle(
            Assets.linkedinLightIcon,
            [46, 46],
            Assets.linkedinDarkIcon
          )}
        />
        <Box
          sx={CommonStyles.iconHoverStyle(
            Assets.instagramLightIcon,
            [46, 46],
            Assets.instagramDarkIcon
          )}
        />
        <Box
          sx={CommonStyles.iconHoverStyle(
            Assets.twitterLightIcon,
            [46, 46],
            Assets.twitterDarkIcon
          )}
        />
        <Box
          sx={CommonStyles.iconHoverStyle(
            Assets.mediumLightIcon,
            [46, 46],
            Assets.mediumDarkIcon
          )}
        />
      </>
    ),
    []
  );

  const _renderDesktop = () => (
    <Grid container justifyContent={matchesMobile ? 'center' : 'space-between'}>
      <Grid item xs={12} md={4} sx={{ height: 'auto' }}>
        <Grid container justifyContent="center" rowSpacing={2} height="100%">
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="start"
            flexDirection="column"
            alignItems="center"
          >
            <Box
              component="img"
              alt="heyLogo"
              src={Assets.heyLogo}
              sx={{ width: 64, height: 64, cursor: 'pointer', mb: 2 }}
              onClick={() => Utils.replace(ROUTERS.HOME)}
            />
            <Typography
              sx={{ textAlign: 'center', fontWeight: 700, fontSize: 16, mb: 2 }}
            >
              HEYY PTE LTD.
            </Typography>
            <Typography
              sx={{
                textAlign: 'center',
                fontWeight: 400,
                fontSize: 14,
                width: 0.6,
                mb: 2,
              }}
            >
              117 Sunset, WayClementi Park, Singapore 597150
            </Typography>
            <Box
              component="img"
              alt="rateStarImage"
              src={Assets.rateStarImage}
              sx={{ width: 177, height: 58, mb: 2 }}
              onClick={() => Utils.replace(ROUTERS.HOME)}
            />
            <Box display="flex" alignItems="center" justifyContent="center">
              <Box
                sx={CommonStyles.iconHoverStyle(
                  Assets.playLightIcon,
                  [48, 48],
                  Assets.playDarkIcon
                )}
              />
              <Box
                sx={CommonStyles.iconHoverStyle(
                  Assets.appleLightIcon,
                  [48, 48],
                  Assets.appleDarkIcon
                )}
                ml={2}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ columnGap: 1, mt: 'auto' }}
          >
            {_renderSocialIcons}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={2}>
        <Grid
          container
          flexDirection="column"
          justifyContent="center"
          alignContent="center"
          rowGap={1}
        >
          <Grid item>
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 700,
                lineHeight: '32px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: matchesMobile ? 'center' : 'start',
              }}
              onClick={() => setExpandedItem('topic')}
            >
              All Topics
              {matchesMobile && (
                <>{expanedItem === 'topic' ? <RemoveIcon /> : <AddIcon />}</>
              )}
            </Typography>
          </Grid>
          {!matchesMobile && _renderNavLinks(MENU_FOOTER.TOPIC_LINKS)}
          {matchesMobile && (
            <Collapse in={expanedItem === 'topic'}>
              {_renderNavLinks(MENU_FOOTER.TOPIC_LINKS)}
            </Collapse>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} md={3}>
        <Grid
          container
          flexDirection="column"
          justifyContent="center"
          alignContent="center"
          rowGap={1}
        >
          <Grid item>
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 700,
                lineHeight: '32px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: matchesMobile ? 'center' : 'start',
              }}
              onClick={() => setExpandedItem('assessment')}
            >
              All Assessments
              {matchesMobile && (
                <>
                  {expanedItem === 'assessment' ? <RemoveIcon /> : <AddIcon />}
                </>
              )}
            </Typography>
          </Grid>
          {!matchesMobile && _renderNavLinks(MENU_FOOTER.ASSESSMENT_LINKS)}
          {matchesMobile && (
            <Collapse in={expanedItem === 'assessment'}>
              {_renderNavLinks(MENU_FOOTER.ASSESSMENT_LINKS)}
            </Collapse>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} md={2}>
        <Grid
          container
          flexDirection="column"
          justifyContent="center"
          alignContent="center"
          rowGap={1}
        >
          <Grid item>
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 700,
                lineHeight: '32px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: matchesMobile ? 'center' : 'start',
              }}
              onClick={() => setExpandedItem('about')}
            >
              About
              {matchesMobile && (
                <>{expanedItem === 'about' ? <RemoveIcon /> : <AddIcon />}</>
              )}
            </Typography>
          </Grid>
          {!matchesMobile && _renderNavLinks(MENU_FOOTER.NAV_FOOTER_LINKS)}
          {matchesMobile && (
            <Collapse in={expanedItem === 'about'}>
              {_renderNavLinks(MENU_FOOTER.NAV_FOOTER_LINKS)}
            </Collapse>
          )}
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <Box
      sx={{
        mt: 'auto',
        '& .MuiTypography-root': {
          fontFamily: 'Inter',
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          background: CommonColors.pearlLusta,
          borderRadius: 6,
          py: '2em',
        }}
      >
        {/* {_renderMobile()} */}
        {_renderDesktop()}
      </Container>
      <Typography
        sx={{
          fontSize: '13px !important',
          mt: 1,
          textAlign: 'center',
          lineHeight: '17px',
          pb: 1,
        }}
      >
        With ❤️ from <b>heyy</b>, team and fueled by you. © <b>heyy</b>.life
        2023. All Rights Reserved
      </Typography>
    </Box>
  );
};

export default FooterComponent;
