export const mockProposals = [
  {
    id: '1',
    title: 'Increase Raid Fund Allocation by 5',
    creator: {
      name: 'Alice',
      avatar: '/avatars/alice.jpg'
    },
    type: 'funding',
    votes: { for: 15, against: 5 },
    timeLeft: '2 days'
  },
  {
    id: '2',
    title: 'Add New Raid Member',
    creator: {
      name: 'Bob',
      avatar: '/avatars/bob.jpg'
    },
    type: 'newMember',
    votes: { for: 18, against: 2 },
    timeLeft: '1 day'
  },
  {
    id: '3',
    title: 'Extend Raid Duration',
    creator: {
      name: 'Charlie',
      avatar: '/avatars/charlie.jpg'
    },
    type: 'signal',
    votes: { for: 12, against: 8 },
    timeLeft: '12 hours'
  },
  {
    id: '4',
    title: 'Modify Raid Objectives',
    creator: {
      name: 'Diana',
      avatar: '/avatars/diana.jpg'
    },
    type: 'signal',
    votes: { for: 10, against: 10 },
    timeLeft: '3 days'
  }
] as const

