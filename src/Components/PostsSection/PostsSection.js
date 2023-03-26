import { Box } from '@mui/material';

import NewPost from './NewPost/NewPost';
import AllPosts from './AllPosts/AllPosts';

const PostsSection = () => {
  return (
    <Box>
      <NewPost />
      <AllPosts />
    </Box>
  );
};

export default PostsSection;
