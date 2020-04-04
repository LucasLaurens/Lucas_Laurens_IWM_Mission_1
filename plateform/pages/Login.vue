<template>
  <div class="fullscreen container">
      <h1 class="big-title">Login</h1>
     <form>
      <div class="form-group group">
        <input type="email" class="form-control input-style" id="email" placeholder="Email..." v-model="email" />
        <label for="email">Email</label>
      </div>
      <div class="form-group group">
        <input type="password" class="form-control input-style" id="password" placeholder="Password..." v-model="password" />
        <label for="password">Password</label>
      </div>
      <button type="button" class="btn btn-style" @click.prevent="login">Login</button>

      <div class="mt-4 errors" v-for="(error, k) in errors" :key="k">
        <p class="alert alert-danger">{{error}}</p>
      </div>
    </form>
  </div>
</template>
<script>
import * as firebase from "firebase/app";
import { logged_in } from '../components/functions/Auth'

export default {
    name: "login",
    data() {
      return {
        email: '',
        password: '',
        errors: [],
        // emailRegex: /^[A-Za-z0-9+_.-]+@(.+)$/gm,
      }
    },
    methods: {
      login: function () {
        let error_message

        logged_in(this.email, this.password)
        error_message = localStorage.getItem('errorMessage')
        if(error_message !== "") {
          if (!this.errors.includes(error_message)) {
            this.errors.push(error_message)
          }
        }

        this.$nuxt.$router.replace({ path: '/' })
      }
    }
}
</script>