
import Tree from '../components/Tree'
import Tree2 from '../components/Tree2'
import axios from 'axios'
import { useEffect, useState, useCallback } from 'react'
import Tree3 from '../components/Tree3'
import Tree2Testing from '../components/Tree2Testing'

export default function TreesPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState()
  const [secondTree, setSecondTree] = useState()
  const [thirdTree, setThirdTree] = useState()
  const nodesForSecondTree = 30
  const nodesForThirdTree = 100
  
  useEffect(() => {
      getSecondTree();
      getThirdTree()
    }, [])


const getSecondTree = useCallback(async () => {
  try {
    const response = await axios.get(`/api/trees/garden/${nodesForSecondTree}`);
    const data = response.data;
    setSecondTree(data);
  } catch (err) {
    setError(err.message);
  }
}, []);

const getThirdTree = useCallback(async () => {
  try {
    const response = await axios.get(`/api/trees/chaos/${nodesForThirdTree}`);
    const data = response.data;
    setThirdTree(data);
  } catch (err) {
    setError(err.message);
  }
}, []);

  return (

         <div>
          <div className="first-tree">
            {loading ? "loading..." : <Tree /> }
          </div> 
          <div className="third-tree">
              {loading ? "loading..." : thirdTree && <Tree3 leaves={thirdTree} setLeaves={setThirdTree} baseNum={nodesForThirdTree}/>}
            </div>
            <div className="second-tree">
              {loading ? "loading..." : secondTree && <Tree2Testing leaves={secondTree} setLeaves={setSecondTree} baseNum={nodesForSecondTree}/>}          
            </div>
           

          </div>

  )
}
