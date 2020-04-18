<template>
  <div>
     <div class="main">
        <nav class="navbar navbar-expand-lg d-flex fixed-top">
            <div class="card-menu" >
                <div class="btn-menu">
                    <button @click.prevent="toggle_menu">Menu</button>
                </div>
            </div>
            <div class="main-links">
                <ul>
                    <li v-if="items[0].logged === true" @click.prevent="on_logout">
                        <button type="button" class="btn-style float-right">Logout</button>
                    </li>
                     <li v-else @click.prevent="on_link">
                       <nuxt-link to="/login" class="btn-style float-right">Login</nuxt-link>
                    </li>
                    <li v-if="items[0].logged !== true" @click.prevent="on_link">
                       <nuxt-link type="button" to="/signup" class="btn-style float-right mr-2">Sign Up</nuxt-link>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="toggle-menu" :class="[{'menu_active' : (menu_active == true)}]" >
            <div class="container mt-4">
                <ul v-if="items[0].logged !== false">
                    <li @click.prevent="on_link">
                        <nuxt-link to="/projects/dashboard" class="menu-link">Projects</nuxt-link>
                    </li>
                    <li @click.prevent="on_link">
                        <nuxt-link to="/projects/create" class="menu-link">Create Project</nuxt-link>
                    </li>
                    <li @click.prevent="on_link">
                        <nuxt-link to="/clients/dashboard" class="menu-link">Clients</nuxt-link>
                    </li>
                    <li @click.prevent="on_link">
                        <nuxt-link to="/clients/create" class="menu-link">Create Client</nuxt-link>
                    </li>
                </ul>
                <ul v-else>
                    <li>
                        <span class="menu-link">you are not connected</span>
                    </li>
                </ul>
            </div>
        </div>
     </div>
  </div>
</template>
<script>
import * as firebase from "firebase/app";
import { _logout } from '../components/functions/Auth'
import store from '../store/store'
import Vuex from 'vuex'

export default {
    store,
    name: "navbar",
     data() {
        return {
            menu_active: false,
            logged_in: true,
        }
    },
    methods: {
        ...Vuex.mapActions(
            {
                change_active: 'toggle_menu'
            },
        ),
         ...Vuex.mapActions(
            {
                change_active: 'on_link'
            },
        ),
         ...Vuex.mapActions(
            {
                is_logged: 'logged'
            },
        ),
        logged: function () {
            if(this.logged_in !== true && this.items[0].logged === true) {
                try {
                    this.is_logged(this.logged_in)
                } catch (e) {
                    console.error(e)
                }
            }
        },
        on_logout: function() {
            this.logged_in = false
            this.logged()
            this.on_link()
            _logout()
        },
        toggle_menu: function() {
           this.menu_active = !this.menu_active
           this.change_active(this.menu_active)
        },
        on_link: function() {
            if(this.menu_active === true) {
                this.menu_active = false
                this.change_active(this.menu_active)
            }
        }
    },
    computed: {
        items () {
            return this.$store.state.items
        }
    },
}
</script>