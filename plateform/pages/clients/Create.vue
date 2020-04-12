<template>
  <div class="fullscreen container">
        <h1 class="big-title">Create Client</h1>
        <div class="errors alert alert-danger" v-for="(error, k) in errors" :key="k">
            {{error}}
        </div>
        <div class="row">
          <div class="form-project mt-4">
            <b-form>
                <b-form-group
                    id="input-group-firstName"
                    label-for="input-firstName"
                >
                    <b-form-input
                    id="input-firstName"
                    type="text"
                    required
                    placeholder="Enter your first name"
                    v-model="firstName"
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-lastName" label-for="input-2">
                    <b-form-input
                    type="text"
                    id="input-lastName"
                    required
                    placeholder="Enter your last name"
                    v-model="lastName"
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-email" label-for="input-2">
                    <b-form-input
                    type="email"
                    id="input-email"
                    required
                    placeholder="Enter your email"
                    v-model="email"
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-phone" label-for="input-2">
                    <b-form-input
                    type="tel"
                    id="input-phone"
                    required
                    placeholder="Enter your phone number"
                    v-model="phone"
                    ></b-form-input>
                </b-form-group>

                <b-button type="submit" @click.prevent="_create_project" class="btn-style">Create</b-button>
            </b-form>
        </div>
      </div>
  </div>
</template>
<script>
import * as firebase from "firebase/app";

export default {
    name: "client-create",
    data() {
        return {
            firstName: '',
            lastName: '',
            emailRegex: /^[A-Za-z0-9+_.-]+@(.+)$/gm,
            errors: [],
            email: '',
            phone: '',
            getUser: '',
        }
    },
    methods: {
        _create_project: function() {

            let new_error
            let number

            if(
                this.firstName !== "" && this.lastName !== "" && this.phone !== "" && this.email !== ""
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
                this.getUser = localStorage.getItem('user')

                if(this.getUser !== '' && this.getUser !== null) {
                    // Firebase references
                    const rootReference = firebase.database().ref();
                    const alertsReference = rootReference.child("clients");

                    alertsReference.push({
                        firstName: this.firstName,
                        lastName: this.lastName,
                        email: this.email,
                        phone: this.phone,
                        date: Date.now(),
                    })

                    this.firstName = ""
                    this.lastName  = ""
                    this.email     = ""
                    this.phone     = ""
                }
            }
        }
    },
}
</script>