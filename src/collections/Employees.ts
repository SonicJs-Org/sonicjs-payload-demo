import type { CollectionConfig } from 'payload'
import { adminOnly } from '../access'

export const Employees: CollectionConfig = {
  slug: 'employees',
  admin: {
    useAsTitle: 'firstName',
    defaultColumns: ['firstName', 'lastName', 'jobTitle', 'department', 'region', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
      maxLength: 100,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
      maxLength: 100,
    },
    {
      name: 'department',
      type: 'relationship',
      relationTo: 'departments',
      required: true,
      admin: { description: 'Reference to departments collection' },
    },
    {
      name: 'jobTitle',
      type: 'text',
      required: true,
      maxLength: 150,
    },
    {
      name: 'region',
      type: 'relationship',
      relationTo: 'regions',
      required: true,
      admin: { description: 'Reference to regions collection' },
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'phone',
      type: 'text',
      maxLength: 50,
    },
    {
      name: 'avatarSeed',
      type: 'text',
      maxLength: 100,
      admin: { description: 'Seed string for deterministic avatar generation via robohash.org' },
    },
  ],
}
