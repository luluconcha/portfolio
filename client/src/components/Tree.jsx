import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as d3 from "d3";

export default function Tree() {
    const navigate = useNavigate();
    const svgRef = useRef();
    const width = 928;
    const height = width;
    const cx = width * 0.5; // adjust as needed to fit
    const cy = height * 0.5; // adjust as needed to fit
    const radius = Math.min(width, height) / 3 - 40;
    let count = 1;
    const [leaves, setLeaves] = useState([{ parentId : undefined, id: 1, children: undefined}]);
    
    useEffect(() => {
    createTree();
    }, [leaves, count])

    function createTree() {
        console.log(leaves)
        const root = d3
        .stratify()
        .id((d) => d.id)
        .parentId((d) => d.parentId)(leaves);

        const hierarchy = d3.hierarchy(root);

        const tree = d3
        .cluster()
        .size([2 * Math.PI, Math.min(928, 928) / 2 - 56])
        .separation((a, b) => (a.parent === b.parent ? 1 : 1) / a.depth)(
        hierarchy
        );

        drawTree(tree)
    }

    function addLeaf(event, node) {
        console.log(node)
        console.log(event)
        console.log("count 1 " + count)
        ++count
        const leaf = {parentId : +event.target.__data__.data.id, id: count, children: undefined}
        updateChildren(leaf)
        setLeaves([...leaves, leaf])
        console.log("count 2 " + count)

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
          // .on("mouseover",);
        // console.log(svg)
        svg.selectAll("*").remove();
        
        svg
          .append("g")
          .attr("fill", "none")
          .attr("stroke-opacity", 1)
          .attr("stroke-dasharray", 2.5)
          .selectAll()
          .data(root.links())
          .join("path")
          .attr(
            "d",
            d3
              .linkRadial()
              .angle((d) => d.x)
              .radius((d) => d.y)
          )
          .attr("stroke", "#A167A5")
          .attr("stroke-width",  4) //(d) => (visited.includes(d.source.data.data.id) ? 4 : 5.5))
          .attr("stroke-dasharray", 5)
        
        //   svg
        //     .append("g")
        //     .selectAll()
        //     .data(root.descendants())
        //     .append("svg:title")
        //       .text(function(d) { return d.data.data.title ?? "no title" })
    
          
        svg
          .append("g")
          .selectAll()
          .data(root.descendants())
          .join("circle")
          .attr(
            "transform",
            (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`
          )
          .attr("fill", "#A480CF")
          .attr("r", 7)
          .on("click", (e, d) => addLeaf(e, d));
          
     
          console.log(root.descendants())
          
      }
    
    return (
    <div> Tree
        <svg ref={svgRef} id="myTree">
        </svg>
      </div>
  )
}
