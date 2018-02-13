<template>
  <section class="container">
    is authenticated {{authenticated}}
    <div>
      <h1>callback</h1>
      <nuxt-link to="/protected">go to protected</nuxt-link>
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
      auth0: new auth0.WebAuth({
        domain: 'warpedpuppy.auth0.com',
        clientID: 'loBycCySA9rPtpUYLOS7t1CTyIhrNJBG',
        redirectUri: 'http://localhost:3000/callback',
        audience: 'https://warpedpuppy.auth0.com/userinfo',
        responseType: 'token id_token',
        scope: 'openid'
      }),
      authenticated: false
    }
  },
  mounted: function () {
    this.authenticated = auth.isAuthenticatedMethod(auth0)
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
