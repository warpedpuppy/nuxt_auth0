<template>
  <section class="container">
    <div>
      <app-logo/>
      <nuxt-link to="/protected">go to protected</nuxt-link>
      <h1 class="title">
        asdf
      </h1>
      <button @click="login">click me, I dare you</button>
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green">Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey">GitHub</a>
      </div>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import auth0 from 'auth0-js'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      auth0: new auth0.WebAuth({
        domain: 'warpedpuppy.auth0.com',
        clientID: 'loBycCySA9rPtpUYLOS7t1CTyIhrNJBG',
        redirectUri: 'http://localhost:3000/callback',
        audience: 'https://warpedpuppy.auth0.com/userinfo',
        responseType: 'token id_token',
        scope: 'openid'
      })
    }
  },
  methods: {
    login: function () {
      this.auth0.authorize()
    }
  },
  components: {
    AppLogo
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
