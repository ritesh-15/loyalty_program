import { useEffect, useState } from "react"

export default function useDebounce(value: string, duration: number) {
  const [query, setQuery] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setQuery(value), duration)

    return () => {
      clearTimeout(timer)
    }
  }, [value])

  return query
}
