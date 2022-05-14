import { Button } from 'ui/Button'
import useRapidForm from 'rapid-form'

export default function Web() {
  const form = useRapidForm()
  console.log('form', form)
  return (
    <div>
      <h1>Web</h1>
      <Button />
    </div>
  )
}
