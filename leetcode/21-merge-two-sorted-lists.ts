import { ListNode } from "./2-add-two-numbers";
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */


export const arrToList = (arr:number[]) => arr.reduceRight<null|ListNode>((last, val)=> last = last === null ? new ListNode(val) : new ListNode(val, last),null)

const arr = [1,2,3]
const list = arrToList(arr)
console.dir(list);
