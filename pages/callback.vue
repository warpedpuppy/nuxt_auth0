<template>
  <section class="container">
    <div>
      <h1>this is the callback page</h1>
      <div>are you authenticated?  {{authenticated}}</div>
      <nuxt-link to="/">go to home</nuxt-link>
    </div>
  </section>
</template>

<script>
import auth0 from 'auth0-js'
import { mapGetters, mapMutations } from 'vuex'
import * as auth from '~/services/auth'

export default {
  data () {
    return {
      loggedIn: false
    }
  },
  computed: {
    ...mapGetters('user', [
      'authenticated'
    ])
  },
  methods: {
    ...mapMutations('user', [
      'CHANGE_AUTHENTICATION'
    ])
  },
  mounted: function () {

    this.loggedIn = auth.isAuthenticatedMethod()
    if (this.loggedIn) {
      this.CHANGE_AUTHENTICATION(true)
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
