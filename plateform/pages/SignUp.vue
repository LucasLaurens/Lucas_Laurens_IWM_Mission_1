<template>
  <div class="fullscreen container">
        <h1 class="big-title">Sign In</h1>
        <div class="errors alert alert-danger" v-for="(error, k) in errors" :key="k">
            {{error}}
        </div>
        <form>
            <div class="d-flex">
                <div class="form-group group col-md-6">
                    <input type="firstName" class="form-control input-style" id="firstName" placeholder="First Name..." v-model="firstName" />
                    <label for="firstName">First Name</label>
                </div>
                <div class="form-group group col-md-6">
                    <input type="lastName" class="form-control input-style" id="lastName" placeholder="Last Name..." v-model="lastName" />
                    <label for="lastName">Last Name</label>
                </div>
            </div>
            <div class="form-group group col-md-12">
                <input type="email" class="form-control input-style" id="email" placeholder="Email..." v-model="email" />
                <label for="email">Email</label>
            </div>
            <div class="d-flex">
                <div class="form-group group col-md-6">
                    <input type="password" class="form-control input-style" id="password" placeholder="Password..." v-model="password" />
                    <label for="password">Password</label>
                </div>
                <div class="form-group group col-md-6">
                    <input type="password" class="form-control input-style" id="confirm_password" placeholder="Confirm Password..." v-model="confirm_password" />
                    <label for="confirm_password">Confirm Password</label>
                </div>
            </div>
            <button type="button" class="btn btn-style" @click.prevent="signUp">Sign Up</button>
        </form>
  </div>
</template>
<script>
import * as firebase from "firebase/app";
import { sign_up } from '../components/functions/Auth'

export default {
    name: "signup",
    data() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirm_password: '',
        errors: [],
        emailRegex: /^[A-Za-z0-9+_.-]+@(.+)$/gm,
      }
    },
    methods: {
        signUp: function() {
            let new_error
            let number

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

            if(this.password === this.confirm_password) {
                number += 1
                this.errors.splice(2)
            } else {
                new_error = "Passwords must be the same"
                if(!this.errors.includes(new_error)) {
                    this.errors.push(new_error)
                }
            }

            if (number == 3) {
                sign_up(this.firstName, this.lastName, this.email, this.password)
                this.$nuxt.$router.replace({ path: '/login' })
            }
        }
    }
}
</script>