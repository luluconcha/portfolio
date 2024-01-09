import React from 'react'
import { useParams } from 'react-router-dom'
export default function CVElement({details, institution, date}) {
    const { id } = useParams();
   

  return (
    <div>{details}</div>
  )
}
