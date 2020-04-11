<template>
  <div class="fullscreen container">
      <h1 class="big-title">Projects</h1>
      <div class="projects">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Numéro</th>
              <th scope="col">Titre</th>
              <th scope="col">Description</th>
              <th scope="col">Date</th>
              <th scope="col">Manage</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(project, k) in projects" :key="k">
              <td><strong>#{{k+1}}</strong></td>
              <td>{{project.title}}</td>
              <td>{{project.description}}</td>
              <td>{{project.date}}</td>
              <td>
                <!-- <button class="btn btn-secondary">Edit</button> -->
                <button class="btn btn-danger" @click="_item_delete(project.id, k)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>
<script>
import * as firebase from "firebase/app";

export default {
    name: "projects",
    data() {
        return {
            projects: []
        }
    },
    mounted() {
      this._create_project()
    },
    methods: {
        _create_project: async function() {
            // this.getUser = localStorage.getItem('user')

            // if(this.getUser !== '' && this.getUser !== null) {
                let db        = await firebase.database()
                let snapshot  = await db.ref('projects').once('value')
                let projects  = await snapshot.val();

                for (let item of Object.entries(projects)) {
                    let key       = item[0]
                    let val       = item[1]
                    let the_date  = new Date(val.date)

                    this.projects.push({
                      id: key,
                      title: val.title,
                      description: val.description,
                      date: the_date
                    })
                }
            // }
        },
        _item_delete: async function(id, index) {
          let db        = await firebase.database()
          let snapshot  = await db.ref('projects/' + id)

          this.projects.splice(index, 1);
          snapshot.remove()

        }
    },
}
</script>