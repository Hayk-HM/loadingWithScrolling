import axios from 'axios'

let cancel

const axiosConfig = axios.create({
  baseURL: 'http://openlibrary.org',
  cancelToken: new axios.CancelToken(c => cancel = c)
})

export const Books = {
  cancel,
  getBooks(query, pageNumber) {
    return axiosConfig.get(`/search.json?q=${query}&page=${pageNumber}`)
  }
}
