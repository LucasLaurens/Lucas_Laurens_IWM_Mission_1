<template>
  <div>
     <div class="main">
         <div class="main-links">
             <nuxt-link to="/">Index</nuxt-link>
             <nuxt-link to="/login">Login</nuxt-link>
             <nuxt-link to="/signup">Sign Up</nuxt-link>
             <button type="button" @click.prevent="on_logout">logout</button>
         </div>
     </div>
  </div>
</template>
<script>
import * as firebase from "firebase/app";
import { _logout } from '../components/functions/Auth'

export default {
    name: "navbar",
    methods: {
        on_logout: function() {
            _logout()
        }
    },
}
</script>