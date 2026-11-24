import type { CollectionConfig } from 'payload'

type UserWithRole = { role?: string }

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    verify: false,
  },
  access: {
    create: ({ req }) => (req.user as unknown as UserWithRole)?.role === 'admin',
    update: ({ req }) => (req.user as unknown as UserWithRole)?.role === 'admin',
    delete: ({ req }) => (req.user as unknown as UserWithRole)?.role === 'admin',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Viewer', value: 'viewer' },
      ],
      defaultValue: 'viewer',
      required: true,
      access: {
        update: ({ req }) => (req.user as unknown as UserWithRole)?.role === 'admin',
      },
      admin: {
        description: 'Viewers can browse the admin but cannot create, edit, or delete records.',
      },
    },
  ],
  versions: false,
}
