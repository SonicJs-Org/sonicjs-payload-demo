import type { CollectionConfig } from 'payload'
import { adminOnly } from '../access'

export const Departments: CollectionConfig = {
  slug: 'departments',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'icon', 'headCount', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      maxLength: 100,
      admin: { description: 'Department name, e.g. Engineering' },
    },
    {
      name: 'description',
      type: 'textarea',
      maxLength: 500,
    },
    {
      name: 'icon',
      type: 'text',
      maxLength: 10,
      admin: { description: 'Emoji icon, e.g. 🔧' },
    },
    {
      name: 'color',
      type: 'text',
      maxLength: 20,
      admin: { description: 'Hex color, e.g. #3B82F6' },
    },
    {
      name: 'headCount',
      type: 'number',
      admin: { description: 'Denormalized employee count' },
    },
  ],
}
