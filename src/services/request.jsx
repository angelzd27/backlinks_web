import axios from "axios"
import { getJWT } from "./jwt"

//localhost
const server = "127.0.0.1"

//server
const url_services = `http://${server}:8000`

const config = (token) => ({
  headers: {
    'accept': 'application/json',
    'Authorization': `Bearer ${getJWT() || token}`
  }
})

export const BD_ACTION_POST = async (model, body, token) => {
  const url = `${url_services}/${model}`
  const data = await axios.post(url, body, config(token))

  return data.data
}

export const BD_ACTION_GET = async (model, params, token) => {
  let url = ''
  if (params == null) {
    url = `${url_services}/${model}`
  } else {
    url = `${url_services}/${model}/${params}`
  }
  const data = await axios.get(url, config(token))

  return data.data
}

export const BD_ACTION_UPDATE = async (model, params, body, token) => {
  let url = ''
  if (params == null) {
    url = `${url_services}/${model}`
  } else {
    url = `${url_services}/${model}/${params}`
  }
  const data = await axios.put(url, body, config(token))

  return data.data
}

export const BD_ACTION_UPDATE_PARTIAL = async (model, params, body, token) => {
  let url = ''
  if (params == null) {
    url = `${url_services}/${model}`
  } else {
    url = `${url_services}/${model}/${params}`
  }
  const data = await axios.patch(url, body, config(token))

  return data.data
}

export const BD_ACTION_DELETE = async (model, params, token) => {
  let url = ''
  if (params == null) {
    url = `${url_services}/${model}`
  } else {
    url = `${url_services}/${model}/${params}`
  }
  const data = await axios.delete(url, config(token))

  return data.data
}

