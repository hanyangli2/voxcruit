export interface Problem {
  id: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  tags: string[]
  description: string
  starterCode: string
  language: string
}

export const problems: Problem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    tags: ['array', 'hashmap'],
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
    
You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:
Input: nums = [3,3], target = 6
Output: [0,1]`,
    starterCode: `function twoSum(nums, target) {
    // Your code here
}`,
    language: 'javascript'
  },
  // ... add all other problems here
]

// Helper function to get problem by ID
export function getProblemById(id: string): Problem | undefined {
  return problems.find(p => p.id === id)
} 