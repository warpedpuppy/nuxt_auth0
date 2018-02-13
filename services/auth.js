import auth0 from 'auth0-js'

const handleAuthentication = (auth0) => {
  auth0.parseHash((err, authResult) => {
    console.log('authResult = ', authResult)
    if (authResult && authResult.accessToken && authResult.idToken) {
      this.setSession(authResult)
     // router.replace('home')
    } else if (err) {
    //  router.replace('home')
      console.log(err)
    }
  })
}
const setSession = function (authResult) {
  // Set the time that the Access Token will expire at
  let expiresAt = JSON.stringify(
    authResult.expiresIn * 1000 + new Date().getTime()
  )
  window.localStorage.setItem('access_token', authResult.accessToken)
  window.localStorage.setItem('id_token', authResult.idToken)
  window.localStorage.setItem('expires_at', expiresAt)
  console.log(window.localStorage)
  //this.authNotifier.emit('authChange', { authenticated: true })
}
const logout = function () {
  // Clear Access Token and ID Token from local storage
  window.localStorage.removeItem('access_token')
  window.localStorage.removeItem('id_token')
  window.localStorage.removeItem('expires_at')
  this.userProfile = null
  //this.authNotifier.emit('authChange', false)
  // navigate to the home route
  //router.replace('home')
}
export const isAuthenticatedMethod =  function (auth0) {
  handleAuthentication(auth0)
  // Check whether the current time is past the
  // Access Token's expiry time
  let expiresAt = JSON.parse(window.localStorage.getItem('expires_at'))
  return new Date().getTime() < expiresAt
}