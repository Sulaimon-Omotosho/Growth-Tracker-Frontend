import { User } from '@repo/types'

export interface AddFormProps {
  user?: User
  onSuccess?: () => void
  mutation?: any
  onValidationChange?: (disabled: boolean) => void
}
