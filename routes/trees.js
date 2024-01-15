const express = require('express');
const router = express.Router();

let leaves =[{ parentId : null, id: 1, children: undefined}]
let count = 1;

router.get("/", async (req, res) => {
    try {
        const data = await createRandomTree()
        res.status(201).send(data)
    } catch (err) {
        res.status(500).send("random tree was not created, " + err.message)
    }
})

async function createRandomTree() {

 leaves =[{ parentId : null, id: 1, sick: 0, children: []}]
  count = 1;
    for (let i = 0; leaves.length <= 26; i++) {
        ++count
        const parentNode = Math.floor(Math.random() * leaves.length)
        leaves = addLeaf(leaves[parentNode])
    }
    makeSomeLeavesSick(leaves)
    return leaves
  }
  
  function makeSomeLeavesSick(arrayOfLeaves) {
    for (let leaf of arrayOfLeaves) {
      if (leaf.children.length >= 0 && leaf.children.length === 1 && leaf.parentId) leaf.sick = 2
      if (leaf.children.length === 0 && leaf.parentId) leaf.sick = 1
    }
  }

  function addLeaf(parentNode) {
    const leaf = {parentId : parentNode.id, id: count, sick: 0, children: []}
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