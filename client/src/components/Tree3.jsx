import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

export default function Tree3({leaves, setLeaves, baseNum}) {
    const svgRef = useRef();
    const width = 1640;
    const height = width;
    const cx = width * 0.5; // adjust as needed to fit
    const cy = height * 0.5; // adjust as needed to fit
   // const radius = Math.min(width, height) / 3 - 40;
    const [count, setCount] = useState(baseNum)
    const [message, setMessage] = useState('')
    const [blueOne, setBlueOne] = useState(leaves.find((l) => l.blue))
    let intervalNum; 

    useEffect(() => {
    createTree();

    }, [leaves])

    function createTree() {
        console.log(leaves)

        const root = d3
            .stratify()
            .id((d) => d.id)
            .parentId((d) => d.parentId)(leaves);

        const hierarchy = d3.hierarchy(root);

        const tree = d3
            .cluster()
            .size([2 * Math.PI, Math.min(1640, 1640) / 2 - 56])
            .separation((a, b) => (a.parent === b.parent ? 1 : 1) / a.depth)
            (hierarchy);

        drawTree(tree)
    }
    

   async function handleClick(node) {
    setMessage("")
    try {
      if (node.blue) {
        setMessage("welp")
        console.log(blueOne)
        if (!intervalNum) changeBlueNode()
      } else if (!node.blue) {
        addLeaf(node)
      }
      console.log(blueOne)
    } catch (err) {
      setMessage("error handling game logic: " + err.message)
    }
   }

  function stop(){
    clearInterval(intervalNum)
    intervalNum = null;
  }
function changeBlueNode() {
  setInterval(() => {
    const randomNum = Math.floor(Math.random() * leaves.length)
    setLeaves(leaves.map((leaf) => leaf.blue ? {...leaf, blue: false} : leaf.id === randomNum ? {...leaf, blue: true} : leaf))
  }, 2000)
  
  

}
    async function addLeaf(node) {
        console.log("d : " + node)
       try {
        setCount(count+1)
        const newLeaf = {parentId : node.id, id: count, children: []}
        updateChildren(newLeaf)
        setLeaves([...leaves, newLeaf])
       } catch (err) {
        setMessage(err.message)
       }
    }
    
    function updateChildren(newNode) {
        leaves.map((e) => {
            return e.id === newNode.parentId ? e.children = [e.children, newNode] : e})
    }

    function drawTree(root) {
        const svg = d3
          .select(svgRef.current)
          .attr("width", width)
          .attr("height", height)
          .attr("viewBox", [-cx, -cy, width, height])
          .attr("style", "width: 100%; height: auto; font: 10px sans-serif;");

        console.log(svg)
        svg.selectAll("*").remove();
        
        svg
          .append("g")
          .attr("fill", "none")
          .attr("stroke-opacity", 1)
          .attr("stroke-dasharray", 12)
          .style("stroke-linecap", "round") 
          .selectAll()
          .data(root.links())
          .join("path")

          .attr(
            "d",
            d3.linkRadial()
              .angle((d) => d.x)
              .radius((d) => d.y)
          )
          .attr("stroke", "#F8C537")
          .attr("stroke-width",  7)
        
          
          
        svg
          .append("g")
          .selectAll()
          .data(root.descendants())
          .join("circle")
          .attr(
            "transform",
            (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`
          )
          .attr("fill", (d) => d.data.data.blue ? "#724CF9" : "#F8C537 ")
          .attr("r", 11)
          .on("click", (d) => {handleClick(d.target.__data__.data.data)})

        console.log(root.descendants()) 
      }
    
    return (
    <div>
      welcome to the tree of chaos. may the gods be with you
        <svg ref={svgRef} id="myTree">
          
        </svg>
        {message && message}
        <button onClick={stop}> stop </button>
      </div>
  )
}
