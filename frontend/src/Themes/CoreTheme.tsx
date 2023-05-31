import { createTheme, PaletteColorOptions } from '@mui/material/styles';
import CommonColor from './CommonColor';
import { Utils } from '@libs';

declare module '@mui/material/styles' {
  interface CustomPalette {
    burntSienna: PaletteColorOptions;
    bismark: PaletteColorOptions;
    pickledBluewood: PaletteColorOptions;
    loblolly: PaletteColorOptions;
    oceanGreen: PaletteColorOptions;
    fuzzyWuzzyBrown: PaletteColorOptions;
    diSerria: PaletteColorOptions;
    mystic: PaletteColorOptions;
    astronaut: PaletteColorOptions;
    hippieBlue: PaletteColorOptions;
    perano: PaletteColorOptions;
    lemonGrass: PaletteColorOptions;
    shark: PaletteColorOptions;
    yellowBus: PaletteColorOptions;
    black: PaletteColorOptions;
    white: PaletteColorOptions;
    paleGoldenrod: PaletteColorOptions;
    sunglow: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    burntSienna: true;
    bismark: true;
    pickledBluewood: true;
    loblolly: true;
    oceanGreen: true;
    fuzzyWuzzyBrown: true;
    diSerria: true;
    mystic: true;
    astronaut: true;
    hippieBlue: true;
    perano: true;
    lemonGrass: true;
    shark: true;
    yellowBus: true;
    black: true;
    white: true;
    paleGoldenrod: true;
    sunglow: true;
  }
}

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) =>
  augmentColor({ color: { main: mainColor, contrastText: '#fff' } });

import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import { LinkProps } from '@mui/material/Link';
import React from 'react';

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (Material UI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

const CoreTheme = createTheme({
  palette: {
    burntSienna: createColor(CommonColor.burntSienna),
    bismark: createColor(CommonColor.bismark),
    pickledBluewood: createColor(CommonColor.pickledBluewood),
    loblolly: createColor(CommonColor.loblolly),
    oceanGreen: createColor(CommonColor.oceanGreen),
    fuzzyWuzzyBrown: createColor(CommonColor.fuzzyWuzzyBrown),
    diSerria: createColor(CommonColor.diSerria),
    mystic: createColor(CommonColor.mystic),
    astronaut: createColor(CommonColor.astronaut),
    hippieBlue: createColor(CommonColor.hippieBlue),
    perano: createColor(CommonColor.perano),
    lemonGrass: createColor(CommonColor.lemonGrass),
    shark: createColor(CommonColor.shark),
    yellowBus: createColor(CommonColor.yellowBus),
    black: createColor(CommonColor.black),
    white: createColor(CommonColor.white),
    paleGoldenrod: createColor(CommonColor.paleGoldenrod),
    sunglow: createColor(CommonColor.sunglow),
    mode: Utils.getThemeMode(),
    ...(Utils.getThemeMode() === 'light'
      ? {
          // palette values for light mode
          text: {
            primary: '#000000',
            secondary: '#000000',
            burntSienna: '#E87844',
          } as any,
          background: {
            default: '#FFFFFF',
            primary: '#FFB23F',
            secondary: '#F5F5F5',
            burntSienna: '#E87844',
            lightSilver: "#D9D9D9",
          } as any,
        }
      : {
          // palette values for dark mode
          text: {
            primary: '#D9D9D9',
            secondary: '#000000',
            burntSienna: '#E87844',
          },
          background: {
            default: '#191A1F',
            primary: '#FFB23F',
            secondary: '#0A0E11',
            burntSienna: '#E87844',
            lightSilver: "#D9D9D9",
          },
        }),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#6b6b6b #2b2b2b',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            height: 5,
            width: 5,
            backgroundColor: CommonColor.loblolly,
            cursor: 'pointer',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            backgroundColor: CommonColor.mainColor,
            outline: 'none',
          },
          '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.2) !important',
          },
          //remove arrow input type number
          'input::-webkit-outer-spin-button': {
            WebkitAppearance: 'none',
            margin: 0,
          },
          'input::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: 0,
          },
          fontFamily: 'Inter',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            background: 'none',
          },
        },
      },
    },
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
      styleOverrides: {
        root: {
          color: '#000',
          textDecoration: 'none',
        },
      },
    },
  },
});
export default CoreTheme;
