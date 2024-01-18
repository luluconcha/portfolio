const express = require('express');
const router = express.Router();

let leaves =[{ parentId : null, id: 1, children: undefined}]
let count = 1;

router.get("/:num", async (req, res) => {
  const {num} = req.params
    try {
        const data = await createRandomTree(num)
        res.status(201).send(data)
    } catch (err) {
        res.status(500).send("random tree was not created, " + err.message)
    }
})

async function createRandomTree(num) {

 leaves =[{ parentId : null, id: 1, sick: 0, children: []}]
  count = 1;
    for (let i = 0; leaves.length < num; i++) {
        ++count
        const parentNode = Math.floor(Math.random() * leaves.length)
        leaves = addLeaf(leaves[parentNode])
    }
    makeSomeLeavesSick(leaves)
    return leaves
  }
  
  function makeSomeLeavesSick(arrayOfLeaves) {
    let sickLeafCount = 0
    for (let leaf of arrayOfLeaves) {
      ++sickLeafCount
        if (leaf.parentId && leaf.id % 2 === 0 && leaf.children.length === 0) leaf.sick = true
    }
  }

  function addLeaf(parentNode) {
    const leaf = {parentId : parentNode.id, id: count, sick: false, children: []}
    updateChildren(leaf)
    leaves.push(leaf)
    return leaves
  }

  function updateChildren(newNode){
    leaves.map((e) => {
      return e.id === newNode.parentId ? e.children.push(newNode) : e
    })
   }


  module.exports = router;