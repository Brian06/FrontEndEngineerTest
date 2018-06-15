export function setLoggedUser(user) {
  return {
    type: 'SET_LOGGED_USER',
    payload: user
  }
}

export function logout() {
  return {
    type: 'LOGOUT'
  }
}