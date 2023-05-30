import React from 'react';
import _ from 'lodash';
import { Box } from '@mui/material';
import 'react-alice-carousel/lib/alice-carousel.css';
// Import Local
import Assets from '@/Assets';

interface IPostAction {
  hasReadMore?: boolean;
}

const PostActions: React.FC<IPostAction> = (props: IPostAction) => {
  // Constructors
  const { hasReadMore } = props;

  // Renders
  return (
    <>
      <Box
        component="img"
        alt="copylink"
        src={Assets.copyLinkIcon}
        sx={{ width: 79, height: 26, cursor: 'pointer' }}
      />
      <Box
        component="img"
        alt="facebookRounderIcon"
        src={Assets.facebookRounderIcon}
        sx={{ width: 26, height: 26, cursor: 'pointer' }}
      />
      <Box
        component="img"
        alt="twitterRounderIcon"
        src={Assets.twitterRounderIcon}
        sx={{ width: 26, height: 26, cursor: 'pointer' }}
      />
      <Box
        component="img"
        alt="linkedInRounderIcon"
        src={Assets.linkedInRounderIcon}
        sx={{ width: 26, height: 26, cursor: 'pointer' }}
      />
      {hasReadMore && (
        <Box
          component="img"
          alt="copylink"
          src={Assets.readmoreIcon}
          sx={{ width: 79, height: 26, cursor: 'pointer' }}
        />
      )}
    </>
  );
};

export default PostActions;
