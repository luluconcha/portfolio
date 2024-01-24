import { useState, useEffect, useRef} from "react";
import * as d3 from "d3";


export default function Tree({leaves, setLeaves, baseNum}) {
    const svgRef = useRef();
    const width = 1048;
    const [height, setHeight] = useState(width);
    // const cx = width / 2;
    // const cy = height / 2; 
    const padding = 1
   // const radius = Math.min(width, height) / 3 - 40;
    const [leafCount, setLeafCount] = useState(baseNum)
    const [barometro, setBarometro] = useState()
    const [rootKilled, setRootKilled] = useState(false)
    const [message, setMessage] = useState('')

    

    useEffect(() => {
      createTree()
      sickLeavesLeft()
    }, [leaves, barometro])

    function createTree() {
      
        const data = d3
            .stratify()
            .id((d) => d.id)
            .parentId((d) => d.parentId)(leaves);

        const root = d3.hierarchy(data);

        // const tree = d3.tree()
        //   .size([2 * Math.PI, Math.min(968, 968) / 2 - 56])
        //   .separation((a, b) => (a.parent === b.parent ? 20 : 56))
        //   (hierarchy);
        drawTree(root)
    }

   async function handleGameLogic(node) {
    console.log("clicked node")
    console.log(node)
    console.log("barometro: " + barometro)
    
    setMessage("")

    try {
      if (node.sick) {
        await deleteLeaf(node)
        await addLeaf()
        await addLeaf()
        makeSomeLeavesSick(3)
      }else if (!node.sick) {
        await addLeaf()
      } else if (!node.parentId) {
        setRootKilled(true)
        setMessage("refresh to start over")    
      }
    } catch (err) {
      setMessage("error handling game logic: " + err.message)
    }
   }

async function deleteLeaf(node) {
  try {
    await updateChildren("delete", node)
    setLeaves(leaves.filter((l) => l.id !== node.id))
  } catch (err) {
    setMessage("error while deleting leaf: " + err.message)
  }
}

async function makeSomeLeavesSick(num) {
  // setTimeout(() => {
    setLeaves((prevLeaves) => prevLeaves.map((leaf, i) => { 
      return (i % num === 0 && !leaf.children) ? 
        {...leaf, sick : true}
        : leaf
    }))
  // }, 500);
}

function sickLeavesLeft(){
  try {
    if (!leaves.some((leaf) => leaf.sick)) setMessage("well done! now that's a healthy tree")
    setBarometro(leaves.filter((leaf) => leaf.sick).length / leaves?.length)
    return leaves.filter((leaf) => leaf.sick)
  } catch (err) {
    setMessage("error counting sick leaves left: " + err.message)
  }
}

async function addLeaf() {
  try {
    console.log("adding")
    setLeafCount(leafCount + 1)
    const randomParentNode = await leaves.filter((leaf) => !leaf.sick)?.[Math.floor(Math.random() * (leaves.length - 1))]
    if (randomParentNode) {
      const newLeaf = {parentId : randomParentNode.id, id: leafCount, sick: false, children: []}
      
      setLeaves([...leaves, newLeaf])
      await updateChildren("add", newLeaf)
      setMessage("a new leaf grew!")
      makeSomeLeavesSick(3)
    }
  }
    catch(err) {
      setMessage("error adding leaf: " + err.message)
    } 
    
}

async function updateChildren(action, node) {
  
  if (action === "delete") {
    const parentNode = leaves.find((leaf) => leaf.id === node.parentId)
    const updatedChildren = parentNode.children.filter((child) => child.id !== node.id)
    setLeaves(leaves.map((leaf) =>  leaf.id === parentNode.id ? {...leaf, children: updatedChildren} : leaf))
    parentNode.parentId && updateChildren("delete", parentNode) 
  } else if (action === "add") {
    leaves.map((leaf) => {
        return leaf.id === node.parentId ? leaf.children = [leaf.children, node] : leaf})
  }
}

    function drawTree(root) {
      const ease = d3.easeElastic.period(0.5);
      const dx = 10;
      const dy = width / (root.height + padding);
      d3.tree().nodeSize([dx, dy])(root);
    
      // Center the tree.
      let x0 = Infinity;
      let x1 = -x0;
      root.each(d => {
        if (d.y > x1) x1 = d.y;
        if (d.y < x0) x0 = d.y;
      });
    
      // Compute the default height.
      // if (height === undefined) setHeight(x1 - x0 + dx * 2)

        const svg = d3
          .select(svgRef.current)
          .attr("width", width)
          .attr("height", height)
          .attr("viewBox", [-dy * padding / 2, x0 - dy, width, height])
          .attr("style", "width: 100%; height: auto; font: 10px sans-serif;");

        svg.selectAll("*").remove();
        
        svg
          .append("g")
          .attr("fill", "none")
          .attr("stroke-opacity", 1)
          // .attr("stroke-dasharray", 12)
          .style("stroke-linecap", "point") 
          .selectAll()
          .data(root.links())         
          .join("path")
          // .attr(
          //   "d",
          //   d3.linkRadial()
          //     .angle((d) => d.x)
          //     .radius((d) => d.y)
          // )
          .join("path")
          .attr("d", d3.linkVertical(d3.curveBumpX)
              .y(d => d.y)
              .x(d => d.x))
          .attr("stroke", "#8A9B68")
          .attr("stroke-width",  7 + (barometro * 3))
          // .transition()
        
  
          
        svg
          .append("g")
          // .selectAll()
          // .data(root.descendants())
          // .join("circle")
          // .attr(
          //   "transform",
          //   (d) => `rotate(${((d.x * 180) / Math.PI - 90)}) translate(${d.y},0)`
          // )
          // .attr("fill", (d) => d.data.data.sick ? "#FFBC0A" : "#3F784C" )
          // .attr("r", 7 + (barometro * 10))
          // .on("click", (d) => {handleGameLogic(d.target.__data__.data.data)})
          // .on("click", (d) => addLeaves())
          .selectAll("a")
          .data(root.descendants())
          .join("a")
            // .attr("xlink:href", link == null ? null : d => link(d.data, d))
            // .attr("target", link == null ? null : linkTarget)
            .attr("transform", d => `translate(${d.y},${d.x})`);



        // console.log(root.descendants()) 
      }
    
    return (
    <div className="tree2-section">
      cacaboudin
        {rootKilled && <h1> oops! you pulled out the root</h1> || <svg ref={svgRef} id="myTree">
        
        </svg>}
        <p id="instructions">{message && message}</p>
      </div>
  )
}
