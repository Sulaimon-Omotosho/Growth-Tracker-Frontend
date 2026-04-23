import z from 'zod'

export const Uchema = z.object({
  email: z.email({ message: 'Email address is required!' }),
  password: z
    .string({ message: 'Password is required!' })
    .min(8, { message: 'Password must be at least 8 characters!' })
    .max(50),
})

export const ChurchTeamSchema = z.object({
  name: z.string().min(2, { message: 'Name of Team needed!' }),
  leaderId: z.string().min(1, { message: 'Pastor needed for this team' }),
  description: z
    .string()
    .trim()
    .max(150, { message: 'Short description not more than 150!' })
    .optional(),
})

export const DepartmentSchema = z.object({
  name: z.string().min(2, { message: 'Name of Team needed!' }),
  leaderId: z.string().min(1, { message: 'Pastor needed for this team' }),
  churchTeamId: z.string().min(1, { message: 'Pastor needed for this team' }),
  email: z.email().optional(),
  description: z
    .string()
    .trim()
    .max(150, { message: 'Short description not more than 150!' })
    .optional(),
})

export const DistrictSchema = z.object({
  name: z.string().min(2, { message: 'Name of District needed!' }),
  leaderId: z.string().min(1, { message: 'Pastor needed for this District' }),
})

export const CommunitySchema = z.object({
  name: z.string().min(2, { message: 'Name of Team needed!' }),
  leaderId: z.string().min(1, { message: 'Pastor needed for this community' }),
  districtId: z
    .string()
    .min(1, { message: 'District needed for this Community' }),
})

export const ZoneSchema = z.object({
  name: z.string().min(2, { message: 'Name of Team needed!' }),
  leaderId: z.string().min(1, { message: 'Pastor needed for this zone' }),
  communityId: z.string().min(1, { message: 'Community needed for this Zone' }),
})

export const CellSchema = z.object({
  name: z.string().min(2, { message: 'Name of Team needed!' }),
  leaderId: z.string().min(1, { message: 'A cell leader is needed' }),
  isOnline: z.boolean().default(false),
  zoneId: z.string().min(1, { message: 'Zone needed for this Cell' }),
  communityId: z.string().min(1, { message: 'Community needed for this Cell' }),
  // Address Fields
  street: z.string().optional(),
  city: z
    .string()
    .min(1, { message: 'City is required (even for online cells)' }),
  state: z.string().min(1, { message: 'State is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
  zipCode: z.string().optional(),
})

export const SmallGroupSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  interests: z.array(z.string()).min(1, 'Select at least one interest'),
  description: z.string().optional(),
  leaderId: z.string().optional(),
})

export const JoinCellSchema = z.object({
  zoneId: z.string().min(1, { message: 'Zone needed for this Application' }),
  cellId: z.string().min(1, { message: 'Cell needed for this Application' }),
})

export const JoinDepartmentSchema = z.object({
  teamId: z.string().min(1, { message: 'Team needed for this Application' }),
  deptId: z
    .string()
    .min(1, { message: 'Department needed for this Application' }),
})

export const EventSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  description: z.string().optional(),
  location: z.string().min(3, 'Location is required'),
  type: z.enum(['SERVICE', 'OUTREACH', 'MEETING', 'SMALL_GROUP']),
  capacity: z.coerce.number().optional(),
  sessions: z
    .array(
      z.object({
        start: z.string().min(1, 'Start time is required'),
        end: z.string().min(1, 'End time is required'),
      }),
    )
    .min(1, 'At least one session is required'),
})
