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
}
</script>