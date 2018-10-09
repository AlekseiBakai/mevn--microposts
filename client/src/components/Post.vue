<template>
  <section class="posts-holder">
    <h1 class="h1 text-center">Latest Posts</h1>
    <form class="form-holder" v-on:submit.prevent="createPost">
      <div class="form-group">
        <label for="postTitle" class="form-label">Title</label>
        <input type="text" class="form-control form-input" id="postTitle" placeholder="Enter post title..." v-model="title">
      </div>
      <div class="form-group">
        <label for="postText" class="form-label">Text</label>
        <textarea class="form-control form-input" id="postText" placeholder="Enter post text..." v-model="text"></textarea>
      </div>
      <button type="submit" class="btn btn-success w-100">Post</button>
    </form>
    <hr>
    <p class="alert alert-danger text-danger" v-if="error">{{error}}</p>
    <div class="row posts-container">
      <div class="col-sm-6"
           v-for="(post, index) in posts"
           v-bind:item="post"
           v-bind:index="index"
           v-bind:key="post._id"
      >
        <div class="card mb-4">
          <div class="card-header bg-danger">
            <button @click.prevent="deletePost(post._id)" class="close text-white" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="card-body">
            <h4 class="h4 mb-3">{{post.title}}</h4>
            <p class="card-text">{{post.text}}</p>
          </div>
          <div class="card-footer text-muted">
          {{ `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}` }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PostService from "../PostService";

export default {
  name: "Post",
  data() {
    return {
      posts: [],
      error: "",
      text: "",
      title: ""
    };
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.title, this.text);
      this.posts = await PostService.getPosts();
      this.title = "";
      this.text = "";
    },

    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    }
  }
};
</script>

<style scoped>
</style>
