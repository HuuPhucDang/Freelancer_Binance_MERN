import React from 'react';
import _ from 'lodash';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
// Import Local

interface IImageBoxBorder {
  src: string;
  path?: string;
}

const ImageBoxBorder: React.FC<IImageBoxBorder> = (props: IImageBoxBorder) => {
  // Constructors
  const { src, path = '' } = props;

  const ImageBoxContent = () => (
    <Box
      sx={{
        width: '100%',
        aspectRatio: 304 / 197,
        position: 'relative',
        marginBottom: {
          xs: '0px',
          md: '10px',
        },
      }}
    >
      <Box
        component="img"
        alt="banner"
        src={src}
        sx={{
          width: '98%',
          height: '98%',
          borderRadius: '12px',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          background: 'white',
          boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          border: '1px solid black',
          width: '98%',
          height: '98%',
          right: 0,
          bottom: 0,
          borderRadius: '12px',
        }}
      />
    </Box>
  );

  const NavigateLayer = (innerProps: any) => {
    return <Link to={path}>{innerProps.children}</Link>;
  };

  if (path)
    return (
      <NavigateLayer>
        <ImageBoxContent />
      </NavigateLayer>
    );

  // Renders
  return <ImageBoxContent />;
};

export default ImageBoxBorder;
