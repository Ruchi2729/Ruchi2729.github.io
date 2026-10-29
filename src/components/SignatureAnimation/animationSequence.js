// Matching joints across poses keep the character consistent for future interpolation.
export const scenes = [
  {
    id: 'balance', label: 'Balance', caption: 'A moment of focus before the day begins.',
    head: [190, 122], torso: '190,151 212,185 238,215',
    arms: ['196,160 155,139 128,101', '201,162 254,166 292,144'],
    legs: ['238,215 213,284 205,354 191,354', '238,215 284,234 309,193 292,144'],
  },
  {
    id: 'life', label: 'Everyday life', caption: 'People, small encounters, and the world beyond a screen.',
    head: [217, 132], torso: '217,161 215,200 222,240',
    arms: ['216,175 189,211 165,206', '219,175 242,204 263,185'],
    legs: ['222,240 197,293 172,351 160,351', '222,240 246,291 269,351 283,351'],
  },
  {
    id: 'engineering', label: 'Engineering', caption: 'Complex systems in service of a simple task.',
    head: [199, 163], torso: '199,192 202,220 211,260',
    arms: ['202,204 230,232 268,232', '202,207 221,244 258,244'],
    legs: ['211,260 256,267 253,344 269,344', '211,260 239,283 231,344 245,344'],
  },
  {
    id: 'resolution', label: 'A useful result', caption: 'Less friction. More room for everyday life.',
    head: [199, 163], torso: '199,192 202,220 211,260',
    arms: ['202,204 230,232 268,232', '202,207 221,244 258,244'],
    legs: ['211,260 256,267 253,344 269,344', '211,260 239,283 231,344 245,344'],
  },
]
