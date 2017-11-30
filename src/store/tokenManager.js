export const TokenManager = (tokenKey) => ({
  getAuthToken() {
    return JSON.parse(localStorage.getItem(tokenKey))
  },

  setAuthToken(token) {
    localStorage.setItem(tokenKey, JSON.stringify(token))
  },

  removeAuthToken() {
    localStorage.removeItem(tokenKey)
  },
})
const tokenManager = TokenManager('evtoken')

export default tokenManager

