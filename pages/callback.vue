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
//import env from 'dot-env'
//import EventEmitter from 'EventEmitter'
// import router from './../router'
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
      authenticated: function(){}
    }
  },
  mounted: function () {
    this.authenticated = this.isAuthenticatedMethod()
    //this.authNotifier = new EventEmitter()
  },
  methods: {
    handleAuthentication: function () {
      this.auth0.parseHash((err, authResult) => {
        console.log('authResult = ', authResult)
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult)
         // router.replace('home')
        } else if (err) {
        //  router.replace('home')
          console.log(err)
        }
      })
    },
    setSession: function (authResult) {
      // Set the time that the Access Token will expire at
      let expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
      )
      window.localStorage.setItem('access_token', authResult.accessToken)
      window.localStorage.setItem('id_token', authResult.idToken)
      window.localStorage.setItem('expires_at', expiresAt)
      console.log(window.localStorage)
      //this.authNotifier.emit('authChange', { authenticated: true })
    },
    logout: function () {
      // Clear Access Token and ID Token from local storage
      window.localStorage.removeItem('access_token')
      window.localStorage.removeItem('id_token')
      window.localStorage.removeItem('expires_at')
      this.userProfile = null
      //this.authNotifier.emit('authChange', false)
      // navigate to the home route
      //router.replace('home')
    },
    isAuthenticatedMethod: function () {
      this.handleAuthentication()
      // Check whether the current time is past the
      // Access Token's expiry time
      let expiresAt = JSON.parse(window.localStorage.getItem('expires_at'))
      return new Date().getTime() < expiresAt
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
