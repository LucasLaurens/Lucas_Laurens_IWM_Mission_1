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
                    <li v-if="getUser !== '' && getUser != null" @click.prevent="on_logout">
                        <button type="button" class="btn-style float-right">Logout</button>
                    </li>
                     <li @click.prevent="on_link" v-else>
                       <nuxt-link to="/login" class="btn-style float-right">Login</nuxt-link>
                    </li>
                    <li v-if="getUser === '' && getUser == null" @click.prevent="on_link">
                       <nuxt-link type="button" to="/signup" class="btn-style float-right mr-2">Sign Up</nuxt-link>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="toggle-menu" :class="[{'menu_active' : (menu_active == true)}]" >
            <div class="container mt-4">
                <ul v-if="getUser !== '' && getUser != null">
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
                    <li @click.prevent="on_link">
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
    // store,
    name: "navbar",
     data() {
        return {
            getUser: '',
            menu_active: false
        }
    },
    mounted() {
        this.getUser = localStorage.getItem('user')
        console.log("mounted", this.getUser)
    },
    methods: {
        ...Vuex.mapActions({
                change_active: 'toggle_menu'
            }, {
                change_active: 'on_link'
            }),
        on_logout: function() {
            this.getUser = ''
            console.log("logout", this.getUser)
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
    watch: {
        getUser: {
            handler() {
                this.getUser = localStorage.getItem('user')
                console.log("watch", this.getUser)
            },
            deep: true,
        },
    },
}
</script>