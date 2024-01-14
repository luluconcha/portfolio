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
    for (let i = 0; leaves.length <= 26; i++) {
        ++count
        const parentNode = Math.floor(Math.random() * leaves.length)
        leaves = addLeaf(leaves[parentNode])
    }
    return leaves
  }

  function addLeaf(parentNode) {
    const leaf = {parentId : parentNode.id, id: count, children: undefined}
    updateChildren(leaf)
    leaves.push(leaf)
    return leaves
  }

  function updateChildren(newNode){
    leaves.map((e) => {
        
      return e.id === newNode.parentId ? e.children = [e.children, newNode] : e})
   }

  module.exports = router;