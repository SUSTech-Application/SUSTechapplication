# {{ $params.val }}

<script setup>
import { useData } from 'vitepress'
import { posts } from "@/collections"
const { params } = useData()
const filteredPosts = posts.filter(
  post => post.metadata.department === params.value.key
)
</script>

<PostList :posts="filteredPosts"/>
