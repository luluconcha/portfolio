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
      const width = 928;
      const marginTop = 10;
      const marginRight = 10;
      const marginBottom = 10;
      const marginLeft = 40;
      // const ease = d3.easeElastic.period(0.5);
      // const dx = 10;
      // const dy =(width/ root.height);
      // d3.tree().nodeSize([dx, dy])(root);
      const dx = 10;
      const dy = (width - marginRight - marginLeft) / (1 + root.height);
      const diagonal = d3.linkVertical().x(d => d.y).y(d => d.x);
      
      // Center the tree.
      let x0 = 50;
      let x1 = 50;
      root.each(d => {
        if (d.x > x1) x1 = d.x;
        if (d.x < x0) x0 = d.x;
      });
    
      const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-marginLeft, -marginTop, width, dx])
      .attr("style", "width: 100%; height: auto; font: 10px sans-serif;");

      // Compute the default height.
      // if (height === undefined) setHeight(x1 - x0 + dx * 2)
      const gLink = svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5);

  const gNode = svg.append("g")
      .attr("cursor", "pointer")
      .attr("pointer-events", "all");

  function update(event, source) {
    const duration = event?.altKey ? 2500 : 250; // hold the alt key to slow down the transition
    const nodes = root.descendants().reverse();
    const links = root.links();

    // Compute the new tree layout.
    // drree(root);

    let left = root;
    let right = root;
    root.eachBefore(node => {
      if (node.x < left.x) left = node;
      if (node.x > right.x) right = node;
    });
    const height = right.x - left.x + marginTop + marginBottom;
    const transition = svg.transition()
        .duration(duration)
        .attr("height", height)
        .attr("viewBox", [-marginLeft, left.x - marginTop, width, height])
        .tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"));

    // Update the nodes…
    const node = gNode.selectAll("g")
      .data(nodes, d => d.id);

    // Enter any new nodes at the parent's previous position.
    const nodeEnter = node.enter().append("g")
        .attr("transform", d => `translate(${source.y0},${source.x0})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
        .on("click", (event, d) => {
          d.children = d.children ? null : d._children;
          update(event, d);
        });

    nodeEnter.append("circle")
        .attr("r", 2.5)
        .attr("fill", d => d._children ? "#555" : "#999")
        .attr("stroke-width", 10);

    nodeEnter.append("text")
        .attr("dy", "0.31em")
        .attr("x", d => d._children ? -6 : 6)
        .attr("text-anchor", d => d._children ? "end" : "start")
        .text(d => d.data.name)
      .clone(true).lower()
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .attr("stroke", "white");

    // Transition nodes to their new position.
    const nodeUpdate = node.merge(nodeEnter).transition(transition)
        .attr("transform", d => `translate(${d.y},${d.x})`)
        .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    const nodeExit = node.exit().transition(transition).remove()
        .attr("transform", d => `translate(${source.y},${source.x})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0);

    // Update the links…
    const link = gLink.selectAll("path")
      .data(links, d => d.target.id);

    // Enter any new links at the parent's previous position.
    const linkEnter = link.enter().append("path")
        .attr("d", d => {
          const o = {x: source.x0, y: source.y0};
          return diagonal({source: o, target: o});
        });

    // Transition links to their new position.
    link.merge(linkEnter).transition(transition)
        .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition(transition).remove()
        .attr("d", d => {
          const o = {x: source.x, y: source.y};
          return diagonal({source: o, target: o});
        });

    // Stash the old positions for transition.
    root.eachBefore(d => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

  // Do the first update to the initial configuration of the tree — where a number of nodes
  // are open (arbitrarily selected as the root, plus nodes with 7 letters).
  root.x0 = dy / 2;
  root.y0 = 0;
  root.descendants().forEach((d, i) => {
    d.id = i;
    d._children = d.children;
    // if (d.depth && d.data.name.length !== 7) d.children = null;
  });

 update(null, root);

  return svg.node();
}
        // svg.selectAll("*").remove();
        
        // svg
        //   .append("g")
        //   .attr("fill", "none")
        //   .attr("stroke-opacity", 1)
        //   // .attr("stroke-dasharray", 12)
        //   .style("stroke-linecap", "point") 
        //   .selectAll()
        //   .data(root.links())         
        //   .join("path")
        //   // .attr(
        //   //   "d",
        //   //   d3.linkRadial()
        //   //     .angle((d) => d.x)
        //   //     .radius((d) => d.y)
        //   // )
        //   // .join("path")
        //   .attr("d", d3.link(d3.curveBumpX)
        //       .y(d => d.y)
        //       .x(d => d.x))
        //   .attr("stroke", "#8A9B68")
        //   .attr("stroke-width",  7 + (barometro * 3))
        //   // .transition()
        
  
          
        // svg
        //   .append("g")
        //   // .selectAll()
        //   // .data(root.descendants())
        //   // .join("circle")
        //   // .attr(
        //   //   "transform",
        //   //   (d) => `rotate(${((d.x * 180) / Math.PI - 90)}) translate(${d.y},0)`
        //   // )
        //   // .attr("fill", (d) => d.data.data.sick ? "#FFBC0A" : "#3F784C" )
        //   // .attr("r", 7 + (barometro * 10))
        //   // .on("click", (d) => {handleGameLogic(d.target.__data__.data.data)})
        //   // .on("click", (d) => addLeaves())
        //   .selectAll()
        //   .data(root.descendants())
        //   .join("circle")
        //     .attr("transform", d => `translate(${d.x},${d.y})`)
        //     .attr("fill", (d) => d.data.data.sick ? "#FFBC0A" : "#3F784C" )
        //   .attr("r", 7);
          



        // console.log(root.descendants()) 
      
    
    return (
    <div className="tree2-section">
      cacaboudin
        {rootKilled && <h1> oops! you pulled out the root</h1> || <svg ref={svgRef} id="myTree">
        
        </svg>}
        <p id="instructions">{message && message}</p>
      </div>
  )
}
