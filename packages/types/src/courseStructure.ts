import z from 'zod'

export const CourseSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  description: z.string().optional(),
  category: z.string().optional(),
  sessions: z
    .array(
      z.object({
        title: z.string().min(1, 'Session title required'),
        description: z.string().optional(),
        maxGrade: z.number().default(100),
        passGrade: z.number().default(50),
      }),
    )
    .min(1, 'Add at least one session'),
})
