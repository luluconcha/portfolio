import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import axios from 'axios'

export default function Tree({leaves, setLeaves}) {
    const svgRef = useRef();
    const width = 1640;
    const height = width;
    const cx = width * 0.5; // adjust as needed to fit
    const cy = height * 0.5; // adjust as needed to fit
   // const radius = Math.min(width, height) / 3 - 40;
    const [count, setCount] = useState(27)

    // const [leaves, setLeaves] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState()

    useEffect(() => {
      createTree()
    }, [leaves])

    function createTree() {
      
        const root = d3
            .stratify()
            .id((d) => d.id)
            .parentId((d) => d.parentId)(leaves);

        const hierarchy = d3.hierarchy(root);

        const tree = d3.tree()
            .size([2 * Math.PI, Math.min(1640, 1640) / 2 - 56])
            .separation((a, b) => (a.parent === b.parent ? 20 : 56) / a.depth)
            (hierarchy);

        drawTree(tree)
    }


    function deleteLeaf(parentNode) {

      console.log()
        // const sickLeaf = leaves.find((l) => l.id === +parentNode.target.__data__.data.id)
        
        // setLeaves(leaves.filter((l) => l !== sickLeaf.children && l !== sickLeaf))
      
    }

    function addLeaf(parentNode) {
      console.log(parentNode)
        setCount(count+1)
        +parentNode.target.__data__.data.data.parentId === null ? console.log("this is the root node") : console.log("this is fine")
        const leaf = {parentId : +parentNode.target.__data__.data.id, id: count, children: undefined}
        updateChildren(leaf)
        setLeaves([...leaves, leaf])
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
          // .attr("stroke-dasharray", 12)
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
          .attr("stroke", "#26532B")
          .attr("stroke-width",  10)
        
        // d.target.__data__.data.data.sick === 1 ? "#FFBC0A" : d.target.__data__.data.data.sick === 2 ? "#FC2F00": "#399E5A"  
          
        svg
          .append("g")
          .selectAll()
          .data(root.descendants())
          .join("circle")
          .attr(
            "transform",
            (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`
          )
          .attr("fill", (d) => d.data.data.sick === 2 ? "#FC2F00" : d.data.data.sick === 1 ? "#FFBC0A" : "#399E5A" )
          .attr("r", 17)
          .on("click", (d) => d.target.__data__.data.data.parentId ? addLeaf(d) : console.log("root node"));

        console.log(root.descendants()) 
      }
    
    return (
    <div>
      this tree is sick. click on the browner leaves to trim them and help it grow new ones.
        <svg ref={svgRef} id="myTree">
        </svg>
      </div>
  )
}
