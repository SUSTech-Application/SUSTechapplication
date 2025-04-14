# 20{{ $params.year }} 级

<script setup>
import { useData } from 'vitepress'
import { posts } from "../../src/collections"
const { params } = useData()
const filteredPosts = posts.filter(
  post => post.metadata.year === params.value.year
)
// FIXME: somehow this will cause 404
// const filteredPosts = posts;
</script>

<PostList :posts="filteredPosts"/>
