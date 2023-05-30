import { SxProps, Theme } from '@mui/material';

const mainStyles: SxProps<Theme> = {
  padding: '32px',
  background: '#2E2800',
  borderRadius: '29px',
  border: '2px solid #2E2800',
  breakInside: 'avoid',
  width: '100%',
};

const nameStyles: SxProps<Theme> = {
  fontFamily: 'Plus Jakarta Sans',
  fontWeight: 600,
  fontSize: {
    xs: '24px',
    md: '26px',
  },
  lineHeight: '34px',
  letterSpacing: '-0.015em',
  color: '#FFDD00',
};

const textStyles: SxProps<Theme> = {
  fontFamily: 'Plus Jakarta Sans',
  fontWeight: 400,
  fontSize: {
    xs: '14px',
    md: '18px',
  },
  lineHeight: {
    xs: '18px',
    md: '23px',
  },
  color: '#FFFFFF',
};

const listItemStyles: SxProps<Theme> = {
  padding: 0,
  alignItems: 'flex-start',
  marginTop: {
    xs: '17px',
    md: '24px',
  },
};

const boxListItemStyles: SxProps<Theme> = {
  width: {
    xs: '18px',
    md: '24px',
  },
  height: 'auto',
  objectFit: 'contain',
  marginRight: '19px',
};

export {
  mainStyles,
  nameStyles,
  textStyles,
  listItemStyles,
  boxListItemStyles,
};
