<template>
    <div class="fullscreen container">
      <h1 class="big-title">Create Project</h1>
        <div class="errors alert alert-danger" v-for="(error, k) in errors" :key="k">
            {{error}}
        </div>
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
            errors: [],
        }
    },
    methods: {
        _create_project: function() {
            let new_error
            let number

            if(
                this.title !== "" && this.description !== ""
            ) {
                number = 1
                this.errors.splice(0)
            } else {
                new_error = "Your field(s) not to be empty"
                if(!this.errors.includes(new_error)) {
                    this.errors.push(new_error)
                }
            }

            if (number == 1) {

                    // Firebase references
                    const rootReference = firebase.database().ref();
                    const alertsReference = rootReference.child("projects");

                    alertsReference.push({
                        title: this.title,
                        description: this.description,
                        date: Date.now(),
                    })

                    this.title = ""
                    this.description = ""
            }
        }
    },
}
</script>