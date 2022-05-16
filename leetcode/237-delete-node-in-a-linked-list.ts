import { ListNode } from "./2-add-two-numbers";

const deleteNode = (root: ListNode): void  => {
    // 把值给自己，然后跳过下一个，直接链接下下个，即对下一个进行复制
    root.val = root.next!.val
    root.next = root.next!.next
};
