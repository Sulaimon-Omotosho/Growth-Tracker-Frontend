export const MOCK_ANNOUNCEMENTS = Array.from({ length: 30 }).map((_, i) => ({
  id: `announcement-${i}`,
  scope: i % 3 === 0 ? 'GLOBAL' : 'DEPARTMENT',
  priority: i === 0 ? 'URGENT' : 'NORMAL', // Make the first one urgent
  title: `Update #${i + 1}: Important Schedule Change`,
  content: `This is a mock announcement to test the infinite scroll feed. We are currently testing the layout for item number ${i + 1}.`,
  author: {
    firstName: 'Alex',
    lastName: 'Rivers',
    image: `https://i.pravatar.cc/150?u=${i}`,
  },
  createdAt: new Date(Date.now() - i * 3600000).toISOString(), // Spaced out by hours
}))
