<template>
  <div class="fullscreen container">
    <h1 class="big-title">Index</h1>
    <div v-show="getUser !== '' && getUser !== null">
      {{getUser}}
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      getUser: ''
    }
  },
  mounted() {
    this.getUser = localStorage.getItem('user')
  },
  watch: {
    getUser: {
      handler() {
        this.getUser = localStorage.getItem('user')
        console.log("user", this.getUser)
      },
      deep: true,
    },
  },
}
</script>