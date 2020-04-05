<template>
  <div class="fullscreen container" v-if="getUser !== '' && getUser !== null">
      <h1 class="big-title">Create</h1>
      <div class="row">
          <div class="form-project mt-4">
            <b-form>
                <b-form-group
                    id="input-group-title"
                    label-for="input-title"
                >
                    <b-form-input
                    id="input-title"
                    type="text"
                    required
                    placeholder="Enter title"
                    v-model="title"
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-description" label-for="input-2">
                    <b-form-input
                    id="input-description"
                    required
                    placeholder="Enter description"
                    v-model="description"
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
    name: "project-create",
    data() {
        return {
            title: '',
            description: '',
            getUser: '',
        }
    },
    methods: {
        _create_project: function() {
            this.getUser = localStorage.getItem('user')

            if(this.getUser !== '' && this.getUser !== null) {
                // Firebase references
                const rootReference = firebase.database().ref();
                const alertsReference = rootReference.child("projects");

                alertsReference.push({
                    "title": this.title,
                    "descriptiuon": this.description,
                    "date": Date.now(),
                })
            }
        }
    },
}
</script>