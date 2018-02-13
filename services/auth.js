import auth0 from 'auth0-js'

export const auth0_instance =  new auth0.WebAuth({
  domain: 'warpedpuppy.auth0.com',
  clientID: 'loBycCySA9rPtpUYLOS7t1CTyIhrNJBG',
  redirectUri: 'http://localhost:3000/callback',
  audience: 'https://warpedpuppy.auth0.com/userinfo',
  responseType: 'token id_token',
  scope: 'openid'
})

const handleAuthentication =  () => {
  auth0_instance.parseHash((err, authResult) => {
    console.log('authResult = ', authResult)
    if (authResult && authResult.accessToken && authResult.idToken) {
      setSession(authResult)
      return true;
    } else if (err) {
      console.log(err)
      return false;
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
export const logout = function () {
  // Clear Access Token and ID Token from local storage
  window.localStorage.removeItem('access_token')
  window.localStorage.removeItem('id_token')
  window.localStorage.removeItem('expires_at')
  this.userProfile = null
  //this.authNotifier.emit('authChange', false)
  // navigate to the home route
  //router.replace('home')
}
export const isAuthenticatedMethod =  async function () {

  let response = await handleAuthentication()

  if(response){
    let expiresAt = JSON.parse(window.localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  } else {
    return false
  }     
  
}