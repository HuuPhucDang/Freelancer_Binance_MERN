import { SxProps, Theme } from '@mui/system';
import { CommonColors } from '@themes';
import Assets from '@/Assets';

const _borderEffect: SxProps<Theme> = {
  content: '""',
  position: 'absolute',
  height: '5px',
  backgroundImage: `url(${Assets.underlineImage})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'round',
  transition: 'all 0.5s',
  bottom: -8,
};

const iconHoverStyle = (
  url: string,
  size: number[],
  hoverUrl?: string
): SxProps<Theme> => ({
  backgroundImage: `url(${url})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'round',
  cursor: 'pointer',
  width: size[0],
  height: size[1],
  '&:hover': {
    backgroundImage: `url(${hoverUrl || url})`,
  },
});

const hoverBorderEffect: SxProps<Theme> = {
  position: 'relative',
  cursor: 'pointer',
  '&:after': {
    ..._borderEffect,
    left: '50%',
    width: 0,
  },
  '&:hover': {
    '&:after': {
      width: 1,
      left: 0,
    },
  },
};

const activeBorderEffect: SxProps<Theme> = {
  position: 'relative',
  cursor: 'pointer',
  '&:after': {
    ..._borderEffect,
    transitionDelay: '1s',
    left: 0,
    width: 1,
  },
};

export const displayInDesktop: SxProps<Theme> = {
  display: { xs: 'none', sm: 'flex' },
};

export const displayInMobile: SxProps<Theme> = {
  display: { xs: 'flex', sm: 'none' },
};

export const listButtonStyles: SxProps<Theme> = {
  background: CommonColors.mainColor,
  color: 'white',
  borderRadius: 2,
  '&:hover': {
    background: CommonColors.burntSienna,
  },
};

export default {
  hoverBorderEffect,
  displayInDesktop,
  displayInMobile,
  activeBorderEffect,
  listButtonStyles,
  iconHoverStyle,
};
