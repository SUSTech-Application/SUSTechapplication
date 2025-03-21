<script setup>
import { data as posts } from "../utils/posts.data.ts";
console.log(posts);
</script>

<template>

  <ul>

    <li v-for="post of posts">
       [{{ post.date?.slice(0, 10) ?? "No date" }}] - <a :href="post.url">{{
        post.title ?? "No title"
      }}</a
      >,
    </li>

  </ul>

</template>

