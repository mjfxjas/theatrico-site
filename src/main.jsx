import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from 'react-oidc-context'
import App from './App.jsx'
import './styles.css'

const hostedDomain = 'https://theatrico-login.auth.us-east-1.amazoncognito.com'
const redirectUri = window.location.hostname.endsWith('cloudfront.net')
  ? 'https://d84l1y8p4kdic.cloudfront.net/login'
  : `${window.location.origin}/login`

const oidcConfig = {
  authority: hostedDomain,
  client_id: '1096dsoaspipnk2joqgl1q50cn',
  redirect_uri: redirectUri,
  post_logout_redirect_uri: redirectUri,
  response_type: 'code',
  scope: 'openid email phone',
  loadUserInfo: true,
  automaticSilentRenew: true,
  onSigninCallback: () => {
    const url = new URL(window.location.href)
    url.search = ''
    window.history.replaceState({}, document.title, `${url.pathname}${url.hash}`)
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider {...oidcConfig}>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
