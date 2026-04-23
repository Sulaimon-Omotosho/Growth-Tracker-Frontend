import z from 'zod'

export const GenderEnum = z.enum(['MALE', 'FEMALE'])
export const RoleEnum = z.enum([
  'ADMIN',
  'PASTOR',
  'LEADER',
  'CELL',
  'ZONE',
  'DISTRICT',
  'HOD',
  'TEAM',
  'CAMPUS_PASTOR',
  'MEMBER',
])
export const ModeEnum = z.enum(['login', 'signup'])

export const OnboardingFormSchema = z.object({
  // id: z.string({ message: 'Id is required!' }),
  firstName: z
    .string({ message: 'First Name is required!' })
    .min(2, { message: 'First Name must be at least 2 characters!' })
    .max(50),
  lastName: z
    .string({ message: 'Last Name is required!' })
    .min(2, { message: 'Last Name must be at least 2 characters!' })
    .max(50),
  username: z
    .string({ message: 'Username is required!' })
    .min(5, { message: 'Username must be at least 5 characters!' })
    .max(30, 'Username is too Long!'),
  email: z.email({ message: 'Email address is required!' }).optional(),
  phone: z
    .string()
    .min(7, 'Phone number is too short')
    .max(15, 'Phone number is too long')
    .optional(),
  gender: GenderEnum.optional(),
  about: z.string().max(200, 'Please keep it under 200 characters!').optional(),
  dob: z.coerce
    .date()
    .optional()
    .transform((v) => (v ? new Date(v) : undefined)),
  // Address Fields
  // street: z.string().min(1, 'street is required'),
  // city: z.string().min(1, 'City is required'),
  // state: z.string().min(1, 'State is required'),
  // country: z.string().min(1, 'Country is required'),
  // zipCode: z.string().optional(),
})

export const UserFormSchema = z.object({
  // id: z.string({ message: 'Id is required!' }),
  firstName: z
    .string({ message: 'First Name is required!' })
    .min(2, { message: 'First Name must be at least 2 characters!' })
    .max(50),
  lastName: z
    .string({ message: 'Last Name is required!' })
    .min(2, { message: 'Last Name must be at least 2 characters!' })
    .max(50),
  username: z
    .string({ message: 'Username is required!' })
    .min(5, { message: 'Username must be at least 5 characters!' })
    .max(30, 'Username is too Long!'),
  email: z.email({ message: 'Email address is required!' }).optional(),
  phone: z
    .string()
    .min(7, 'Phone number is too short')
    .max(15, 'Phone number is too long')
    .optional(),
  gender: GenderEnum.optional(),
  about: z.string().max(200, 'Please keep it under 200 characters!').optional(),
  dob: z.coerce
    .date()
    .optional()
    .transform((v) => (v ? new Date(v) : undefined)),
  // Address Fields
  street: z.string().min(1, 'street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
  zipCode: z.string().optional(),
})

export const RoleChangeSchema = z.object({
  role: RoleEnum.optional(),
})

export const AuthFormSchema = z.object({
  mode: z.enum(['login', 'signup']),
  email: z.email({ message: 'Email address is required!' }),
  password: z
    .string({ message: 'Password is required!' })
    .min(8, { message: 'Password must be at least 8 characters!' })
    .max(50),
})

export const UserSignUpSchema = z.object({
  username: z
    .string({ message: 'Username is required!' })
    .min(2, { message: 'Username must be at least 2 characters!' })
    .max(50),
  email: z.email({ message: 'Email address is required!' }),
  password: z
    .string({ message: 'Password is required!' })
    .min(8, { message: 'Password must be at least 8 characters!' })
    .max(50),
})
