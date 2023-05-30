import { SxProps, Theme } from '@mui/system';

export const mainStyles: SxProps<Theme> = {
  backgroundColor: 'white',
  // maxWidth: 600,
  marginTop: 0,
  boxShadow: 1,
};

export const contentStyles: SxProps<Theme> = {
  padding: (theme) => theme.spacing(1, 2),
};

export const arrowStyles: SxProps<Theme> = {
  overflow: 'hidden',
  position: 'absolute',
  width: '0',
  height: '0',
  top: 0,
  boxSizing: 'border-box',
  borderLeft: '1em solid transparent',
  borderRight: '1em solid transparent',
  borderBottom: '1em solid white',
};

export const popperStyles: SxProps<Theme> = {
  zIndex: 2000,
  '& .arrow': {
    overflow: 'hidden',
    position: 'absolute',
    width: '0',
    height: '0',
    top: 0,
    boxSizing: 'border-box',
    borderLeft: '1em solid transparent',
    borderRight: '1em solid transparent',
    borderBottom: '1em solid white',
  },
  '&[x-placement*="bottom"] $arrow': {
    top: 0,
    left: 0,
    marginTop: '-0.71em',
    marginLeft: 4,
    marginRight: 4,
    '&::before': {
      transformOrigin: '0 100%',
    },
  },
  '&[x-placement*="top"] $arrow': {
    bottom: 0,
    left: 0,
    marginBottom: '-0.71em',
    marginLeft: 4,
    marginRight: 4,
    '&::before': {
      transformOrigin: '100% 0',
    },
  },
  '&[x-placement*="right"] $arrow': {
    left: 0,
    marginLeft: '-0.71em',
    height: '1em',
    width: '0.71em',
    marginTop: 4,
    marginBottom: 4,
    '&::before': {
      transformOrigin: '100% 100%',
    },
  },
  '&[x-placement*="left"] $arrow': {
    right: 0,
    marginRight: '-0.71em',
    height: '1em',
    width: '0.71em',
    marginTop: 4,
    marginBottom: 4,
    '&::before': {
      transformOrigin: '0 0',
    },
  },
};

export const popperModifiers = (props: {
  arrow: boolean;
  arrowRef: HTMLElement | null;
}) => [
  {
    name: 'preventOverflow',
    enabled: true,
    options: {
      rootBoundary: 'document',
      altAxis: true,
      altBoundary: true,
      tether: false,
    },
  },
  {
    name: 'arrow',
    enabled: props.arrow,
    options: {
      element: props?.arrowRef,
    },
  },
  {
    name: 'flip',
    enabled: true,
    options: {
      altBoundary: true,
      rootBoundary: 'document',
    },
  },
];
