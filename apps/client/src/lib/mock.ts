export const MOCK_ANNOUNCEMENTS = [
  {
    id: 'ann-001',
    title: 'Monthly Leadership Briefing',
    content:
      'Greetings Leaders! We are meeting this Wednesday to discuss the Q2 outreach strategy. Please ensure your cell reports are updated in the Growth Tracker by Tuesday evening.',
    authorName: 'Pastor David',
    date: new Date(2026, 3, 24), // April 24, 2026
    priority: 'HIGH',
    scope: 'ALL_LEADERS',
  },
  {
    id: 'ann-002',
    title: 'Youth Conference 2026: Volunteer Drive',
    content:
      'We are looking for 20 more volunteers to join the media and ushering teams for the upcoming Winepress event. Sign up link is available in the bio.',
    authorName: 'Sarah Chen',
    date: new Date(2026, 3, 22),
    priority: 'NORMAL',
    scope: 'GENERAL',
  },
  {
    id: 'ann-003',
    title: 'URGENT: Building Maintenance',
    content:
      'The main hall will be closed for emergency plumbing repairs from 2 PM to 6 PM today. All small group meetings should relocate to the Annex building.',
    authorName: 'Admin Office',
    date: new Date(2026, 3, 25),
    priority: 'URGENT',
    scope: 'GENERAL',
  },
  {
    id: 'ann-004',
    title: 'URGENT: Building Maintenance',
    content:
      'The main hall will be closed for emergency plumbing repairs from 2 PM to 6 PM today. All small group meetings should relocate to the Annex building.',
    authorName: 'Admin Office',
    date: new Date(2026, 3, 25),
    priority: 'URGENT',
    scope: 'GENERAL',
  },
  // {
  //   id: 'ann-005',
  //   title: 'URGENT: Building Maintenance',
  //   content:
  //     'The main hall will be closed for emergency plumbing repairs from 2 PM to 6 PM today. All small group meetings should relocate to the Annex building.',
  //   authorName: 'Admin Office',
  //   date: new Date(2026, 3, 25),
  //   priority: 'URGENT',
  //   scope: 'GENERAL',
  // },
]

export const MOCK_MESSAGES = [
  {
    id: 'msg-1',
    sender: 'Emmanuel (Cell Leader)',
    content:
      "Hey, did you manage to check the attendance for last night's meeting? I think we missed a few names.",
    time: '14:22',
    unreadCount: 3,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel',
  },
  {
    id: 'msg-2',
    sender: 'Media Team Group',
    content:
      'The slide deck for Sunday is ready for review. Please check the lighting cues on slide 4.',
    time: 'Yesterday',
    unreadCount: 0,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Media',
  },
  {
    id: 'msg-3',
    sender: 'Sister Grace',
    content:
      'Thank you so much for the prayer session earlier. It really helped me get through the day!',
    time: 'Wed',
    unreadCount: 1,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Grace',
  },
  {
    id: 'msg-4',
    sender: 'Sister Grace',
    content:
      'Thank you so much for the prayer session earlier. It really helped me get through the day!',
    time: 'Wed',
    unreadCount: 1,
    // avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Grace',
  },
  {
    id: 'msg-5',
    sender: 'Sister Grace',
    content:
      'Thank you so much for the prayer session earlier. It really helped me get through the day!',
    time: 'Wed',
    unreadCount: 1,
    // avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Grace',
  },
]

// Mock Data for multiple interest groups
export const myGroups = [
  {
    id: 1,
    name: 'Tech & Kingdom',
    tag: 'Software',
    updates: 12,
    color: 'from-blue-600 to-cyan-500',
  },
  {
    id: 2,
    name: 'Creative Arts',
    tag: 'Design',
    updates: 3,
    color: 'from-purple-600 to-pink-500',
  },
  {
    id: 3,
    name: 'Marathon Runners',
    tag: 'Fitness',
    updates: 0,
    color: 'from-orange-500 to-red-500',
  },
]
