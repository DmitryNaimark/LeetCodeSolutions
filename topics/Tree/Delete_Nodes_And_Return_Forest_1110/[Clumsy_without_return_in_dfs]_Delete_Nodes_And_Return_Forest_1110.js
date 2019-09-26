// https://leetcode.com/problems/delete-nodes-and-return-forest/
// ---------------------------------------------------

// Runtime Complexity: O(N)
// Space Complexity: O(max_height), which is O(N) in worst case for skewed tree and O(log(N)) for balanced tree.
/**
 * @param {TreeNode} root
 * @param {number[]} to_delete
 * @return {TreeNode[]}
 */
function delNodes(root, to_delete) {
    let roots = [];
    let toDeleteSet = new Set(to_delete);
    
    let disjointRoot = toDeleteSet.has(root.val);
    if (!disjointRoot) {
        roots.push(root);
    }
    delNodesAddRoots(root, toDeleteSet, roots, disjointRoot);
    
    return roots;
}

function delNodesAddRoots(node, toDeleteSet, roots, disjoint) {
    if (node == null) {
        return;
    }
    
    if (disjoint && toDeleteSet.has(node.val)) {
        delNodesAddRoots(node.left, toDeleteSet, roots, true);
        delNodesAddRoots(node.right, toDeleteSet, roots, true);
        node.left = null;
        node.right = null;
        return;
    } else if (disjoint && !toDeleteSet.has(node.val)) {
        roots.push(node);
    }
    
    if (node.left != null) {
        let deleteLeftNode = toDeleteSet.has(node.left.val);
        delNodesAddRoots(node.left, toDeleteSet, roots, deleteLeftNode);
        if (deleteLeftNode) {
            node.left = null;
        }
    }
    if (node.right != null) {
        let deleteRightNode = toDeleteSet.has(node.right.val);
        delNodesAddRoots(node.right, toDeleteSet, roots, deleteRightNode);
        if (deleteRightNode) {
            node.right = null;
        }
    }
}


// ---------------------------------------------------
//                Uses DN functions:
// ---------------------------------------------------
// Creates Array from passed Binary Tree (each node is a TreeNode object with .left, .right, .val values).
// Each TreeNode.val goes as an item to array. if node equals to null, it will be present in array.
function createArrayFromBinaryTree(root) {
    let nodesQueue = [root],
        arr = [];
    
    while (nodesQueue.length > 0) {
        let removedNode = nodesQueue.shift();
        
        if (removedNode != null) {
            nodesQueue.push(removedNode.left);
            nodesQueue.push(removedNode.right);
            arr.push(removedNode.val);
        } else {
            arr.push(null);
        }
    }
    
    // Remove all null-s at the end, because they don't make a difference, TreeNode's child is null by default.
    // Although null-s in the middle should not be removed, since tree might not have some branches.
    while (arr[arr.length - 1] == null) {
        arr.pop();
    }
    
    return arr;
}


// Creates Binary Tree from passed array of items. Item's value will be stored in .val property of a node.
// If null is passed, then tree will store null and not a TreeNode with null value (null might occur even above the last line of nodes).
function createBinaryTreeFromArray(arr) {
    if (arr === null || arr.length === 0) {
        return null;
    }
    
    let rootNode = new TreeNode(arr.shift());
    
    let nodesInCurrentLine = [rootNode];
    let nodesInNextLine = [];
    
    // Copy array, so we won't modify passed array.
    arr = arr.slice();
    while (arr.length > 0) {
        while (nodesInCurrentLine.length > 0) {
            // Skip null nodes(it could be that we have null nodes not in the last line.
            if (nodesInCurrentLine[0] == null) {
                nodesInCurrentLine.shift();
                continue;
            }
            
            // Create node out of the next array value and push it to "nodesInNextLine".
            let nodeValue = arr.shift();
            nodesInCurrentLine[0].left = (nodeValue != null)
                ? new TreeNode(nodeValue)
                : null;
            
            nodesInNextLine.push(nodesInCurrentLine[0].left);
            
            // Create node out of the next array value and push it to "nodesInNextLine".
            nodeValue = arr.shift();
            nodesInCurrentLine[0].right = (nodeValue != null)
                ? new TreeNode(nodeValue)
                : null;
            nodesInNextLine.push(nodesInCurrentLine[0].right);
            
            nodesInCurrentLine.shift();
        }
        nodesInCurrentLine = nodesInNextLine;
        nodesInNextLine = [];
    }
    
    return rootNode;
}

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}


// ---------------------------------------------------
//                    Test Cases
// ---------------------------------------------------
// [[1, 2, null, 4], [6], [7]]
console.log(
    delNodes(createBinaryTreeFromArray([1, 2, 3, 4, 5, 6, 7]), [3, 5])
        .map(node => createArrayFromBinaryTree(node))
);
