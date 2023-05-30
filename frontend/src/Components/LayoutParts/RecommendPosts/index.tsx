import React, { useEffect } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { Grid, Typography, Skeleton, Stack, Link } from '@mui/material';
import NorthEastIcon from '@mui/icons-material/NorthEast';
// Import Local
import { CommonColors } from '@/Themes';
import { ImageBoxBorder } from '@/Components/Common';
import { useTypedDispatch, RootState } from '@store';
import { BlogActions } from '@actions';
import Assets from '@/Assets';
import { ROUTERS } from '@/Constants';

interface IRecommendPost {
  title: string;
}

const { fetchBlogSection } = BlogActions;

const RecommendPosts: React.FC<IRecommendPost> = (props: IRecommendPost) => {
  // Constructors
  const { title } = props;
  const dispatch = useTypedDispatch();
  const blogSection = useSelector((state: RootState) =>
    _.get(state.BLOGS, 'blogSection')
  );
  const isFetchLoading = useSelector((state: RootState) =>
    _.get(state.BLOGS, 'isFetchLoading')
  );

  useEffect(() => {
    dispatch(fetchBlogSection());
  }, []);

  // Renders
  const _renderSkeletonItem = () => (
    <Grid item xs={12} sm={6} md={4}>
      <Stack spacing={1}>
        <Skeleton variant="text" animation="wave" sx={{ fontSize: '1rem' }} />
        <Skeleton variant="circular" animation="wave" width={40} height={40} />
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={210}
          height={60}
        />
        <Skeleton variant="rounded" animation="wave" width={210} height={60} />
      </Stack>
    </Grid>
  );

  const _renderBlogSection = () => {
    if (_.isEmpty(blogSection))
      return (
        <Grid item xs={12}>
          There is no blogs here
        </Grid>
      );

    return _.map(blogSection, (blog: any, index) => {
      const postPath = `${ROUTERS.POSTS}/${blog.slug}`;
      return (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <ImageBoxBorder
            src={blog?.imageUrl || Assets.heyLogo}
            path={postPath}
          />
          <Link
            sx={{
              fontFamily: 'Merriweather',
              fontWeight: 900,
              fontSize: 20,
            }}
            href={postPath}
          >
            {blog?.title}
          </Link>
          <Typography
            sx={{
              fontFamily: 'Plus Jakarta Sans',
              fontSize: 14,
              fontWeight: 500,
              my: 2,
              color: CommonColors.raven,
            }}
          >
            {blog?.summary}
          </Typography>
          <Link
            sx={{
              fontFamily: 'Plus Jakarta Sans',
              fontWeight: 600,
              fontSize: 14,
              lineHeight: '34px',
              cursor: 'pointer',
            }}
            href={postPath}
          >
            Read post <NorthEastIcon sx={{ width: 15, height: 15 }} />
          </Link>
        </Grid>
      );
    });
  };

  return (
    <Grid container spacing={2} mt={2}>
      <Grid item xs={12}>
        <Typography
          sx={{
            fontFamily: 'Merriweather',
            fontWeight: 700,
            fontSize: 32,
            lineHeight: '56px',
            mb: 3,
          }}
        >
          {title}
        </Typography>
      </Grid>
      {isFetchLoading ? (
        <>
          {_renderSkeletonItem()}
          {_renderSkeletonItem()}
          {_renderSkeletonItem()}
        </>
      ) : (
        _renderBlogSection()
      )}
    </Grid>
  );
};

export default RecommendPosts;
