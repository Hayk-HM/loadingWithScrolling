import { useEffect, useState } from "react"
import axios from 'axios'

const useBookSearch = (query, pageNumber) => {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [books, setBooks] = useState([])
  const [hasMore, setHasMore] = useState(false)

  let cancel

  const axiosConfig = axios.create({
    baseURL: 'http://openlibrary.org',
    cancelToken: new axios.CancelToken(c => cancel = c)
  })

  useEffect(() => {
    setBooks([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    setError(false)
    axiosConfig.get(`/search.json?q=${query}&page=${pageNumber}`)
      .then(res => {
        setBooks(prevBook => {
          return [...new Set([...prevBook, ...res.data.docs.map(b => b.title)])]
        })
        setHasMore(res.data.docs.length > 0)
        setLoading(false)
        console.log(res.data);
      }).catch(e => {
        if (axios.isCancel(e)) return
        setError(true)
        console.log(e);
      })

    return () => cancel()
  }, [query, pageNumber])

  return { loading, error, books, hasMore }

}

export default useBookSearch