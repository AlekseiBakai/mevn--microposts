<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <img alt="Vue logo" src="./assets/logo.png" class="mx-auto d-block">
        </div>
      </div>
      <Post/>
    </div>
  </div>
</template>

<script>
import Post from "./components/Post.vue";

export default {
  name: "app",
  components: {
    Post
  }
};
</script>
