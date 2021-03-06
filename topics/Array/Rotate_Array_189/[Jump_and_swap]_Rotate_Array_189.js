// https://leetcode.com/problems/rotate-array/
// ---------------------------------------------------

// Runtime Complexity: O(N)
// Space Complexity: O(1)
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
function rotate(nums, k) {
    let n = nums.length;
    k = k % n;
    
    let swapsCount = 0,
        iStart = 0,
        i = 0,
        curNum = nums[i];
        
    
    // Example:
    // 1     2     3     4     5     6     7, k = 3
    while (swapsCount < n) {
        do {
            let iNext = (i + k) % n;
            let next = nums[iNext];
            
            nums[iNext] = curNum;
            swapsCount++;
            if (swapsCount === n) {
                return;
            }
            
            i = iNext;
            curNum = next;
        } while (i !== iStart);
        
        iStart++;
        i = iStart;
        curNum = nums[i];
    }
}



// ---------------------------------------------------
//                    Test Cases
// ---------------------------------------------------
// [5,6,7,1,2,3,4]
// let nums = [1, 2, 3, 4, 5, 6, 7];
// rotate(nums, 3);
// console.log(nums);
//
// // [3,99,-1,-100]
// nums = [-1, -100, 3, 99];
// rotate(nums, 2);
// console.log(nums);

// [1, 2]
nums = [1, 2];
rotate(nums, 0);
console.log(nums);
