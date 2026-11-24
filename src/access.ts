import type { Access } from 'payload'

type UserWithRole = { role?: string }

/** Only admins can mutate; viewers (and unauthenticated) are denied */
export const adminOnly: Access = ({ req }) =>
  (req.user as unknown as UserWithRole)?.role === 'admin'
