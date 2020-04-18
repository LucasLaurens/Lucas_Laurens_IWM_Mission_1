<template>
  <div class="fullscreen container">
      <h1 class="big-title">Projects</h1>
      <div v-if="this.is_loaded === true">
        <div class="loader">
          <loader />
        </div>
      </div>
      <div v-else>
        <div class="projects">
          <div class="errors alert alert-danger" v-for="(error, k) in errors" :key="k">
            {{error}}
          </div>
          <div v-if="projects.length > 0">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Number</th>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Date</th>
                  <th scope="col">Manage</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(project, k) in projects" :key="k">
                  <td><strong>#{{k+1}}</strong></td>

                  <td v-if="project.status !== 'created'">
                    <input v-model="title" type="text" placeholder="title" id="title" name="title" />
                  </td>
                  <td v-else>
                    {{project.title}}
                  </td>

                  <td v-if="project.status !== 'created'">
                    <input v-model="description" type="text" placeholder="description" id="description" name="description" />
                  </td>
                  <td v-else>
                    {{project.description}}
                  </td>

                  <td>{{project.date.getFullYear()}} / {{project.date.getMonth() + 1}} / {{project.date.getDate()}} - {{project.date.getHours()}}:{{project.date.getMinutes()}}:{{project.date.getSeconds()}}</td>

                  <td v-if="project.status !== 'created'">
                  <button class="btn btn-secondary" @click="_item_save(project.id, k)">Save</button>
                  </td>
                  <td v-else>
                    <button class="btn btn-secondary col-sm-12 col-xs-12" @click="_item_edit(k)">Edit</button>
                    <button class="btn btn-danger col-sm-12 col-xs-12 mt-2" @click="_item_delete(project.id, k)">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <button @click.prevent="_load_more" class="btn btn-success">Load More</button>
          </div>
          <div class="alert alert-warning" v-else>
            There is no projects for now
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import * as firebase from "firebase/app";
import Loader from "../../components/Loader";

export default {
    name: "projects",
    data() {
        return {
          projects: [],
          errors: [],
          title: '',
          description: '',
          projects_length: 3,
          is_loaded: false,
        }
    },
    components: {
      Loader
    },
    mounted() {
      this._create_project(this.projects_length)
    },
    methods: {
        _load_more: async function () {
          this.is_loaded = true

          let db              = await firebase.database()
          let snapshot        = await db.ref('projects').once('value')
          let projects        = await snapshot.val();
          let array           = []

           for (let item of Object.entries(projects)) {
              array.push(item)
           }
          let projects_length = array.length
          let diff            = projects_length - this.projects_length

          if(this.projects_length > 0) {
            this.projects        = []
            this.projects_length = this.projects_length + diff
            this._create_project(this.projects_length)
            this.is_loaded = false
          }
        },
        _create_project: async function(number) {

                let db        = await firebase.database()
                let snapshot  = await db.ref('projects').limitToLast(number).once('value')
                let projects  = await snapshot.val();

                for (let item of Object.entries(projects)) {
                    let key       = item[0]
                    let val       = item[1]
                    let the_date  = new Date(val.date)

                    this.projects.push({
                      id: key,
                      title: val.title,
                      description: val.description,
                      date: the_date,
                      status: 'created'
                    })
                }

        },
        _item_delete: async function(id, index) {
          let db        = await firebase.database()
          let snapshot  = await db.ref('projects/' + id)

          this.projects.splice(index, 1);
          snapshot.remove()

        },
        _item_edit: function(index) {
          this.projects[index].status = 'updated'
        },
        _item_save: async function(id, index) {

          if (this.title !== "" && this.description !== "") {
            let db        = await firebase.database()
            let snapshot  = await db.ref('projects/' + id)

            snapshot.update({
              title: this.title,
              description: this.description,
              date: Date.now(),
            })

            this.projects[index].title        = await this.title
            this.projects[index].description  = await this.description
            this.projects[index].status       = await 'created'

            this.title        = await ""
            this.description  = await ""
            this.errors       = await []
          } else {
            let new_error = "Your field(s) not to be empty"
            if(!this.errors.includes(new_error)) {
              this.errors.push(new_error)
            }
          }
        }
    },
}
</script>