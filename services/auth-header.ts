export default function authHeader() {
  const storedUser = localStorage.getItem('user')
  const user = JSON.parse(storedUser || '{}')

  if (user && user.idToken) {
    return { Authorization: user.idToken }
  } else {
    return {}
  }
}
