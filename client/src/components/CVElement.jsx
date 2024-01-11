
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CVElement({details}) {
  // const [details, setDetails] = useState({});
  // const id = detailsId.detailsId

  useEffect(() => {
    getDetails();
  }, []);

  async function getDetails() {
    // const response = await axios.get(`/api/index/${id}`) 
    // const data = await response.data.data
    // setDetails(data);
    console.log(details.data)
  }

  return (
      <div>
        {/* {details && details._details_.map((d) => d)} */}
        hello 
      </div>
  )
}
