import { useState, useEffect } from 'react'

export default function useFetch(
  url,
  options,
  { requestCb = () => {}, responseCb = () => {} }
) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        requestCb()
        const res = await fetch(url, options)
        const json = await res.json()

        responseCb()
        setData(json)
      } catch (error) {
        responseCb()
        setError(error)
      }
    }
    fetchData()
  }, [url])

  return { data, error }
}
