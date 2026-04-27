import { User } from '@repo/types'

export interface AddFormProps {
  myGroups?: any
  user?: User
  onSuccess?: () => void
  mutation?: any
  onValidationChange?: (disabled: boolean) => void
}
