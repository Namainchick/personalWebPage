export type NeetCodeProblem = {
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  order: number
}

// Source: https://neetcode.io/roadmap (NeetCode 250)
// Update this list when NeetCode updates their roadmap.
export const NEETCODE_250: Record<string, NeetCodeProblem> = {
  // Arrays & Hashing
  'contains-duplicate':             { title: 'Contains Duplicate', difficulty: 'easy', category: 'Arrays & Hashing', order: 1 },
  'valid-anagram':                  { title: 'Valid Anagram', difficulty: 'easy', category: 'Arrays & Hashing', order: 2 },
  'two-sum':                        { title: 'Two Sum', difficulty: 'easy', category: 'Arrays & Hashing', order: 3 },
  'group-anagrams':                 { title: 'Group Anagrams', difficulty: 'medium', category: 'Arrays & Hashing', order: 4 },
  'top-k-frequent-elements':        { title: 'Top K Frequent Elements', difficulty: 'medium', category: 'Arrays & Hashing', order: 5 },
  'product-of-array-except-self':   { title: 'Product of Array Except Self', difficulty: 'medium', category: 'Arrays & Hashing', order: 6 },
  'valid-sudoku':                   { title: 'Valid Sudoku', difficulty: 'medium', category: 'Arrays & Hashing', order: 7 },
  'encode-and-decode-strings':      { title: 'Encode and Decode Strings', difficulty: 'medium', category: 'Arrays & Hashing', order: 8 },
  'longest-consecutive-sequence':   { title: 'Longest Consecutive Sequence', difficulty: 'medium', category: 'Arrays & Hashing', order: 9 },
  // Two Pointers
  'valid-palindrome':               { title: 'Valid Palindrome', difficulty: 'easy', category: 'Two Pointers', order: 10 },
  'two-sum-ii-input-array-is-sorted': { title: 'Two Sum II', difficulty: 'medium', category: 'Two Pointers', order: 11 },
  '3sum':                           { title: '3Sum', difficulty: 'medium', category: 'Two Pointers', order: 12 },
  'container-with-most-water':      { title: 'Container With Most Water', difficulty: 'medium', category: 'Two Pointers', order: 13 },
  'trapping-rain-water':            { title: 'Trapping Rain Water', difficulty: 'hard', category: 'Two Pointers', order: 14 },
  // Sliding Window
  'best-time-to-buy-and-sell-stock': { title: 'Best Time to Buy and Sell Stock', difficulty: 'easy', category: 'Sliding Window', order: 15 },
  'longest-substring-without-repeating-characters': { title: 'Longest Substring Without Repeating Characters', difficulty: 'medium', category: 'Sliding Window', order: 16 },
  'longest-repeating-character-replacement': { title: 'Longest Repeating Character Replacement', difficulty: 'medium', category: 'Sliding Window', order: 17 },
  'permutation-in-string':          { title: 'Permutation in String', difficulty: 'medium', category: 'Sliding Window', order: 18 },
  'minimum-window-substring':       { title: 'Minimum Window Substring', difficulty: 'hard', category: 'Sliding Window', order: 19 },
  'sliding-window-maximum':         { title: 'Sliding Window Maximum', difficulty: 'hard', category: 'Sliding Window', order: 20 },
  // Stack
  'valid-parentheses':              { title: 'Valid Parentheses', difficulty: 'easy', category: 'Stack', order: 21 },
  'min-stack':                      { title: 'Min Stack', difficulty: 'medium', category: 'Stack', order: 22 },
  'evaluate-reverse-polish-notation': { title: 'Evaluate Reverse Polish Notation', difficulty: 'medium', category: 'Stack', order: 23 },
  'generate-parentheses':           { title: 'Generate Parentheses', difficulty: 'medium', category: 'Stack', order: 24 },
  'daily-temperatures':             { title: 'Daily Temperatures', difficulty: 'medium', category: 'Stack', order: 25 },
  'car-fleet':                      { title: 'Car Fleet', difficulty: 'medium', category: 'Stack', order: 26 },
  'largest-rectangle-in-histogram': { title: 'Largest Rectangle in Histogram', difficulty: 'hard', category: 'Stack', order: 27 },
  // Binary Search
  'binary-search':                  { title: 'Binary Search', difficulty: 'easy', category: 'Binary Search', order: 28 },
  'search-a-2d-matrix':             { title: 'Search a 2D Matrix', difficulty: 'medium', category: 'Binary Search', order: 29 },
  'koko-eating-bananas':            { title: 'Koko Eating Bananas', difficulty: 'medium', category: 'Binary Search', order: 30 },
  'find-minimum-in-rotated-sorted-array': { title: 'Find Minimum in Rotated Sorted Array', difficulty: 'medium', category: 'Binary Search', order: 31 },
  'search-in-rotated-sorted-array': { title: 'Search in Rotated Sorted Array', difficulty: 'medium', category: 'Binary Search', order: 32 },
  'time-based-key-value-store':     { title: 'Time Based Key-Value Store', difficulty: 'medium', category: 'Binary Search', order: 33 },
  'median-of-two-sorted-arrays':    { title: 'Median of Two Sorted Arrays', difficulty: 'hard', category: 'Binary Search', order: 34 },
  // Linked List
  'reverse-linked-list':            { title: 'Reverse Linked List', difficulty: 'easy', category: 'Linked List', order: 35 },
  'merge-two-sorted-lists':         { title: 'Merge Two Sorted Lists', difficulty: 'easy', category: 'Linked List', order: 36 },
  'reorder-list':                   { title: 'Reorder List', difficulty: 'medium', category: 'Linked List', order: 37 },
  'remove-nth-node-from-end-of-list': { title: 'Remove Nth Node From End of List', difficulty: 'medium', category: 'Linked List', order: 38 },
  'copy-list-with-random-pointer':  { title: 'Copy List With Random Pointer', difficulty: 'medium', category: 'Linked List', order: 39 },
  'add-two-numbers':                { title: 'Add Two Numbers', difficulty: 'medium', category: 'Linked List', order: 40 },
  'linked-list-cycle':              { title: 'Linked List Cycle', difficulty: 'easy', category: 'Linked List', order: 41 },
  'find-the-duplicate-number':      { title: 'Find the Duplicate Number', difficulty: 'medium', category: 'Linked List', order: 42 },
  'lru-cache':                      { title: 'LRU Cache', difficulty: 'medium', category: 'Linked List', order: 43 },
  'merge-k-sorted-lists':           { title: 'Merge k Sorted Lists', difficulty: 'hard', category: 'Linked List', order: 44 },
  'reverse-nodes-in-k-group':       { title: 'Reverse Nodes in k-Group', difficulty: 'hard', category: 'Linked List', order: 45 },
  // Trees
  'invert-binary-tree':             { title: 'Invert Binary Tree', difficulty: 'easy', category: 'Trees', order: 46 },
  'maximum-depth-of-binary-tree':   { title: 'Maximum Depth of Binary Tree', difficulty: 'easy', category: 'Trees', order: 47 },
  'diameter-of-binary-tree':        { title: 'Diameter of Binary Tree', difficulty: 'easy', category: 'Trees', order: 48 },
  'balanced-binary-tree':           { title: 'Balanced Binary Tree', difficulty: 'easy', category: 'Trees', order: 49 },
  'same-tree':                      { title: 'Same Tree', difficulty: 'easy', category: 'Trees', order: 50 },
  // NOTE: This file contains the first 50 of 250 problems.
  // For the complete list, copy slugs from: https://github.com/neetcode-gh/leetcode
  // Pattern: the folder name in that repo is the problem slug.
}

export const NEETCODE_SLUGS = new Set(Object.keys(NEETCODE_250))
