
import Tree from '../components/Tree'
import Tree2 from '../components/Tree2'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Tree3 from '../components/Tree3'

export default function TreesPage() {
  const [randomTree, setRandomTree] = useState()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState()

  useEffect(() => {

      getRandomTree();
  
    }, [])

  // async function setTheTree() {
  //   const [nodes] = await Promise.all([getRandomTree()])
  //   console.log(nodes)
  //   setRandomTree(nodes)
  // }

async function getRandomTree() {
  try {
      const response = await axios.get('/api/trees')
      const data = response.data
      console.log(data)
      setRandomTree(data)
  } catch (err) {
      setError(err.message)
  }
}
  

  return (

         <div>
             { loading ? "loading..." : <Tree /> }
              {randomTree && <Tree2 leaves={randomTree} setLeaves={setRandomTree}/>} 
          </div>

  )
}
