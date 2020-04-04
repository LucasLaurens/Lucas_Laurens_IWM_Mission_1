<template>
  <div class="container">
    <div v-show="getUser !== ''">
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