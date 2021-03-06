export default {
  display: {
    rows: 20,
    cols: 11,
    startPoint: { x: 4, y: -1 },
  },
  stage: {
    maxStage: 10,
    speed: { min: 500, max: 100 },
    scoreRate: 40
  },
  blocks: [
    {
      color: '#00a9eb',
      types: {
        0: [
          [1, 1, 1, 1]
        ],
        1: [
          [1],
          [1],
          [1],
          [1]
        ],
        2: [
          [1, 1, 1, 1]
        ],
        3: [
          [1],
          [1],
          [1],
          [1]
        ]
      }
    },
    {
      color: '#fedf38',
      types: {
        0: [
          [0, 1, 0],
          [1, 1, 1]
        ],
        1: [
          [1, 0],
          [1, 1],
          [1, 0]
        ],
        2: [
          [1, 1, 1],
          [0, 1, 0]
        ],
        3: [
          [0, 1],
          [1, 1],
          [0, 1]
        ]
      }
    },
    {
      color: '#88bf39',
      types: {
        0: [
          [1, 0, 0],
          [1, 1, 1]
        ],
        1: [
          [1, 1],
          [1, 0],
          [1, 0]
        ],
        2: [
          [1, 1, 1],
          [0, 0, 1]
        ],
        3: [
          [0, 1],
          [0, 1],
          [1, 1]
        ]
      }
    },
    {
      color: '#fd2239',
      types: {
        0: [
          [0, 0, 1],
          [1, 1, 1]
        ],
        1: [
          [1, 0],
          [1, 0],
          [1, 1]
        ],
        2: [
          [1, 1, 1],
          [1, 0, 0]
        ],
        3: [
          [1, 1],
          [0, 1],
          [0, 1]
        ]
      }
    },
    {
      color: '#4bc6b0',
      types: {
        0: [
          [0, 1, 1],
          [1, 1, 0]
        ],
        1: [
          [1, 0],
          [1, 1],
          [0, 1]
        ],
        2: [
          [0, 1, 1],
          [1, 1, 0]
        ],
        3: [
          [1, 0],
          [1, 1],
          [0, 1]
        ]
      }
    },
    {
      color: '#c655e7',
      types: {
        0: [
          [1, 1, 0],
          [0, 1, 1]
        ],
        1: [
          [0, 1],
          [1, 1],
          [1, 0]
        ],
        2: [
          [1, 1, 0],
          [0, 1, 1]
        ],
        3: [
          [0, 1],
          [1, 1],
          [1, 0]
        ]
      }
    },
    {
      color: '#ec7e48',
      types: {
        0: [
          [1, 1],
          [1, 1]
        ]
      }
    }
  ]
};
