
/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
const solution = function(isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function(n) {
    let left = 1;
    let right = n;
    while (left < right) {
      const mid = ~~(right - left)
      right = isBadVersion(mid) ? mid : (left=mid+1, right)
    }
    return left
  };
};

const isBadVersion = n => n === 4
console.log(solution(isBadVersion)(5));
