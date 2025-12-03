import React from 'react'
import { useParams } from 'react-router';

const MedDetailsPage = () => {
    const { id } = useParams();
  return (
    <div>MedDetailsPage {id}</div>
  )
}

export default MedDetailsPage