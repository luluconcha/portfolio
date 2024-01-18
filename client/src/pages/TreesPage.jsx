
import Tree from '../components/Tree'
import Tree2 from '../components/Tree2'
import axios from 'axios'
import { useEffect, useState, useCallback } from 'react'
import Tree3 from '../components/Tree3'

export default function TreesPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState()
  const [message, setMessage] = useState('')
  const [randomTree, setRandomTree] = useState()
  const numOfNodesForSecondTree = 30
  
  useEffect(() => {
      getRandomTree();
    }, [])


const getRandomTree = useCallback(async () => {
  try {
    const response = await axios.get(`/api/trees/${numOfNodesForSecondTree}`);
    const data = response.data;
    setRandomTree(data);
  } catch (err) {
    setError(err.message);
  }
}, []);

  return (

         <div>
             { loading ? "loading..." : <Tree /> }
             <div className="second-tree">
             {randomTree && <Tree2 leaves={randomTree} setLeaves={setRandomTree} setMessage={setMessage} baseNum={numOfNodesForSecondTree}/>}
             <p id="instructions">{message && message}</p>
              </div> 
          </div>

  )
}
