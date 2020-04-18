<template>
  <div class="fullscreen container">
      <h1 class="big-title">Login</h1>
      <div class="mt-4 errors" v-for="(error, k) in errors" :key="k">
        <p class="alert alert-danger">{{error}}</p>
      </div>
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
    </form>
  </div>
</template>
<script>
import * as firebase from "firebase/app";
import { logged_in } from '../components/functions/Auth'
import store from '../store/store'
import Vuex from 'vuex'

export default {
    store,
    name: "login",
    data() {
      return {
        email: '',
        password: '',
        errors: [],
        emailRegex: /^[A-Za-z0-9+_.-]+@(.+)$/gm,
        logged_in: false,
      }
    },
    methods: {
      ...Vuex.mapActions(
            {
                is_logged: 'logged'
            }
      ),
      logged: function () {
          if(this.logged_in === true) {
            this.is_logged(this.logged_in)
          }
      },
      login: function () {
        let error_message
        let new_error
        let number

        error_message = localStorage.getItem('errorMessage')
        if(error_message !== "") {

          if(
              this.firstName !== "" && this.lastName !== "" && this.email !== "" && this.password !== ""
          ) {
              number = 1
              this.errors.splice(0)
          } else {
              new_error = "Your field(s) not to be empty"
              if(!this.errors.includes(new_error)) {
                  this.errors.push(new_error)
              }
          }

          if(this.email.match(this.emailRegex)) {
              number += 1
              this.errors.splice(1)
          } else {
              new_error = "The format of the email must be respected"
              if(!this.errors.includes(new_error)) {
                  this.errors.push(new_error)
              }
          }

          if (number == 2) {
            this.logged_in = true
            this.logged()
            logged_in(this.email, this.password)
            this.$nuxt.$router.replace({ path: '/' })
          }
        }
      }
    },
}
</script>