import type { CollectionConfig } from 'payload'

export const Regions: CollectionConfig = {
  slug: 'regions',
  admin: {
    useAsTitle: 'displayName',
    defaultColumns: ['name', 'displayName', 'timezone', 'flagEmoji', 'headCount', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      maxLength: 50,
      admin: { description: 'Short code, e.g. US-East' },
    },
    {
      name: 'displayName',
      type: 'text',
      maxLength: 100,
      admin: { description: 'Human-readable name, e.g. US East Coast' },
    },
    {
      name: 'timezone',
      type: 'text',
      maxLength: 50,
      admin: { description: 'IANA timezone, e.g. America/New_York' },
    },
    {
      name: 'flagEmoji',
      type: 'text',
      maxLength: 10,
      admin: { description: 'Flag emoji, e.g. 🇺🇸' },
    },
    {
      name: 'headCount',
      type: 'number',
      admin: { description: 'Denormalized employee count in this region' },
    },
  ],
}
