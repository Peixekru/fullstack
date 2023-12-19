import { defineStore } from 'pinia'
import axios from 'axios'

export const useApi = defineStore('api', () => {

  const baseURL = import.meta.env.VITE_BASE_URL

  //JWT AUTH 
  const authorize = () => {
    return { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } }
  }

  //GET
  async function _get(route) {
    try { const res = await axios.get(`${baseURL}${route}`, authorize()); return res } 
    catch (error) { console.error(error) }
  }

  //POST
  async function _post(route, data) {
    try { const res = await axios.post(`${baseURL}${route}`, data, authorize()); return res } 
    catch (error) { console.error(error) }
  }

  //PATCH
  async function _patch(route, data) {
    try { const res = await axios.patch(`${baseURL}${route}`, data, authorize()); return res } 
    catch (error) { console.error(error) }
  }

  //DELETE
  async function _delete(route) {
    try { const res = await axios.delete(`${baseURL}${route}`, authorize()); return res } 
    catch (error) { console.error(error) }
  }

  return { _get, _post, _patch, _delete }

})

