/** Apply filters on a list of posts, return array of id */
export default function applyFilters(posts, filters) {
  let filteredPosts = posts;
  for (const [field, options] of Object.entries(filters)) {
    // keep those with post.data.field in options
    filteredPosts = filteredPosts.filter((post) => {
      // Check if metadata is one of the allowed options
      return options.includes(post.data[field]);
    });
  }
  // return an array of post.id in filteredPosts
  return filteredPosts.map(({ id }) => id);
}
