export const mathData = {
  counting: [
    { id: 1, image: '🍎', count: 3, options: [2,3,5], correct: 3 },
    { id: 2, image: '🎈', count: 5, options: [4,5,6], correct: 5 },
    { id: 3, image: '⭐', count: 7, options: [6,7,8], correct: 7 },
  ],
  addition: [
    { a: 2, b: 3, options: [4,5,6], correct: 5 },
    { a: 1, b: 4, options: [3,4,5], correct: 5 },
    { a: 3, b: 3, options: [5,6,7], correct: 6 },
  ],
  subtraction: [
    { a: 5, b: 2, options: [2,3,4], correct: 3 },
    { a: 7, b: 1, options: [5,6,7], correct: 6 },
    { a: 9, b: 4, options: [4,5,6], correct: 5 },
  ],
  comparison: [
    { left: 2, right: 4 },
    { left: 5, right: 3 },
    { left: 6, right: 6 },
  ],
  shapes: ['circle','square','triangle'],
  numberLine: [
    { seq: [3,4,5,null,7], options: [3,6,8], correct: 6 },
    { seq: [1,2,null,4,5], options: [0,3,6], correct: 3 },
  ]
}

