import * as SecureStore from 'expo-secure-store';

export const getAllPasswords = async () => {
  const data = await SecureStore.getItemAsync('passwords')
  return data ? JSON.parse(data) : []
}

export const addPassword = async (siteId, loginId, password) => {
  const passwords = await getAllPasswords()
  const data = {
    siteId,
    loginId,
    password
  }
  passwords.push(data)
  SecureStore.setItemAsync('passwords', JSON.stringify(passwords))
}

export const deletePassword = async siteId => {
  let passwords = await getAllPasswords()
  passwords = passwords.filter(password => password.siteId !== siteId)
  SecureStore.setItemAsync('passwords', JSON.stringify(passwords))
}
