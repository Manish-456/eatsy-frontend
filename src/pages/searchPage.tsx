import { useParams } from 'react-router-dom'

export default function SearchPage() {
    const { city } = useParams();
  return (
    <div>
      <span>User searched for {city}</span>
    </div>
  )
}
