import { useCallback, useState, useDebugValue } from 'react'

// export const useValidation = () => {
//   const [rect, setRect] = useState(null)
//   const ref = useCallback((ref: HTMLInputElement) => {
//     console.log('callback :', ref)
//     ref.onchange = (e: any) => {
//       setRect(e.target.value)
//       console.log('am changing')
//     }
//   }, [])
//   console.log('ref :', ref)
//   return [rect, ref]
// }

export default function useRapidForm(): any {
  const [data, setData] = useState('')
  const [errors, setErrors] = useState(0)
  const validation = useCallback((ref: any) => {
    ref.oninput = (e: any) => {
      setData(e.target.value)
      console.log(`The field's value is
      ${e.target.value.length} character(s) long.`)
      if (ref.required && !e.target.value) {
        setErrors(1)
      } else {
        setErrors(0)
      }
    }
  }, [])
  console.log('validation :', validation)
  useDebugValue(data)
  return {
    data,
    errors,
    validation
  }
}
