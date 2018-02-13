import auth0 from 'auth0-js'
import { config } from '~/config'

export const auth0_instance =  new auth0.WebAuth({
  domain: config.DOMAIN,
  clientID: config.CLIENT_ID,
  redirectUri: 'http://localhost:3000/callback',
  audience: config.AUDIENCE,
  responseType: 'token id_token',
  scope: 'openid'
})

const handleAuthentication =  () => {
  auth0_instance.parseHash((err, authResult) => {
    if (authResult && authResult.accessToken && authResult.idToken) {
      setSession(authResult)
      return true;
    } else if (err) {
      return false;
    }
  })
}
const setSession = function (authResult) {
  let expiresAt = JSON.stringify(
    authResult.expiresIn * 1000 + new Date().getTime()
  )
  window.localStorage.setItem('access_token', authResult.accessToken)
  window.localStorage.setItem('id_token', authResult.idToken)
  window.localStorage.setItem('expires_at', expiresAt)
}
export const logout = function () {
  window.localStorage.removeItem('access_token')
  window.localStorage.removeItem('id_token')
  window.localStorage.removeItem('expires_at')
  this.userProfile = null
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