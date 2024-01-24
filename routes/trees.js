const express = require('express');
const router = express.Router();

// let leaves =[{ parentId : null, id: 1, children: []}]
let count = 1;

router.get("/:type/:num", async (req, res) => {
  const {num, type} = req.params
    try {
        const data = await createRandomTree(type, num)
        res.status(201).send(data)
    } catch (err) {
        res.status(500).send("random tree was not created, " + err.message)
    }
})

async function createRandomTree(type, num) {
    try {
      const leaves = createNodes(num)
      return type === "garden" ? makeSomeLeavesSick(leaves) : type === "chaos" ? makeOneNodeBlue(leaves) : leaves
    } catch(err) {
      console.log("error creating tree: " + err.message)
    }
  }

function createNodes(num) {
  let leaves =[{ parentId : null, id: 1, children: []}]
  count = 1;
  for (let i = 0; leaves.length < num; i++) {
      ++count
      const parentNode = Math.floor(Math.random() * leaves.length)
      leaves = addLeaf(leaves[parentNode], leaves)
  }
  return leaves
}

function makeOneNodeBlue(arrayOfLeaves) {
  const randomNum = Math.floor(Math.random() * arrayOfLeaves.length)
  for (let leaf of arrayOfLeaves) {
    leaf.blue = (leaf.id === randomNum) ? true : false
  }
  return arrayOfLeaves
}

function makeSomeLeavesSick(arrayOfLeaves) {
  for (let leaf of arrayOfLeaves) {
    leaf.sick = (leaf.parentId && leaf.id % 2 === 0 && leaf.children.length === 0) ? true : false
  }
  return arrayOfLeaves
}

function addLeaf(parentNode, arrayOfLeaves) {
  const leaf = {parentId : parentNode.id, id: count, children: []}
  updateChildren(leaf, arrayOfLeaves)
  arrayOfLeaves.push(leaf)
  return arrayOfLeaves
}

function updateChildren(newNode, arrayOfLeaves){
  arrayOfLeaves.map((e) => {
    return e.id === newNode.parentId ? e.children.push(newNode) : e
  })
  }


  module.exports = router;