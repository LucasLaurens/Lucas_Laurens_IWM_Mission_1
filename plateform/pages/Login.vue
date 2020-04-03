<template>
  <div class="fullscreen containe" v-show="is_loaded === true">
     <form>
      <div class="form-group mb-4">
        <input type="email" class="form-control input-style" id="email" placeholder="email..." v-model="email" />
      </div>
      <div class="form-group mb-4">
        <input type="password" class="form-control input-style" id="password" placeholder="password..." v-model="password" />
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
        is_loaded: false,
        email: '',
        password: '',
        errors: [],
        // emailRegex: /^[A-Za-z0-9+_.-]+@(.+)$/gm,
      }
    },
    created() {
      this.is_loaded = true
    },
    methods: {
      login: function () {
        let error_message
        if(this.is_loaded === true) {
          logged_in(this.email, this.password)
          error_message = localStorage.getItem('errorMessage')
          if(error_message !== "") {
            this.errors.push(error_message)
          }
        }
      }
    }
}
</script>