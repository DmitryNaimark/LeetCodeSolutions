// https://leetcode.com/problems/first-bad-version/
// ---------------------------------------------------

// Runtime Complexity: O(log(N))
// Space Complexity: O(1)
/**
 * @param {function} isBadVersion()
 * @return {function}
 */
function solution(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        let lo = 0,
            hi = n,
            mid,
            iLastBad;
        
        while (lo <= hi) {
            mid = lo + Math.floor((hi - lo) / 2);
            
            if (isBadVersion(mid)) {
                iLastBad = mid;
                hi = mid - 1;
            } else {
                lo = mid + 1;
            }
        }
        
        return iLastBad;
    };
}


// ---------------------------------------------------
//                    Test Cases
// ---------------------------------------------------
console.log(/**/);
