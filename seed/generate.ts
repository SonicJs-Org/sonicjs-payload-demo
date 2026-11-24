/**
 * Generate canonical seed data for the speed demo (50,000 employees).
 *
 * Uses a seeded LCG (seed=42) so output is 100% deterministic — the Payload
 * and SonicJS seeders consume the same JSON file and produce identical data.
 *
 * Usage:
 *   npx tsx seed/generate.ts
 *   # → writes seed/employees-seed.json (~12 MB, gitignored)
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ── Seed data ─────────────────────────────────────────────────────────────────

export const DEPARTMENTS = [
  { slug: 'engineering', name: 'Engineering',  description: 'Builds and maintains the product',             icon: '🔧', color: '#3B82F6' },
  { slug: 'product',     name: 'Product',      description: 'Drives product vision and roadmap',            icon: '📊', color: '#8B5CF6' },
  { slug: 'design',      name: 'Design',       description: 'Shapes user experience and visual identity',   icon: '🎨', color: '#EC4899' },
  { slug: 'marketing',   name: 'Marketing',    description: 'Grows brand awareness and demand',             icon: '📣', color: '#F59E0B' },
  { slug: 'sales',       name: 'Sales',        description: 'Closes deals and grows revenue',               icon: '💼', color: '#10B981' },
  { slug: 'hr',          name: 'HR',           description: 'Grows and supports the team',                  icon: '🤝', color: '#06B6D4' },
  { slug: 'finance',     name: 'Finance',      description: 'Manages financial health and planning',        icon: '💰', color: '#84CC16' },
  { slug: 'legal',       name: 'Legal',        description: 'Protects the business and ensures compliance', icon: '⚖️', color: '#6366F1' },
  { slug: 'operations',  name: 'Operations',   description: 'Keeps the business running smoothly',         icon: '⚙️', color: '#F97316' },
] as const

export const REGIONS = [
  { slug: 'us-east',  name: 'US-East',  display_name: 'US East Coast',   timezone: 'America/New_York',    flag_emoji: '🇺🇸' },
  { slug: 'us-west',  name: 'US-West',  display_name: 'US West Coast',   timezone: 'America/Los_Angeles', flag_emoji: '🇺🇸' },
  { slug: 'eu-west',  name: 'EU-West',  display_name: 'Western Europe',  timezone: 'Europe/London',       flag_emoji: '🇪🇺' },
  { slug: 'eu-north', name: 'EU-North', display_name: 'Northern Europe', timezone: 'Europe/Stockholm',    flag_emoji: '🇸🇪' },
  { slug: 'apac',     name: 'APAC',     display_name: 'Asia Pacific',    timezone: 'Asia/Singapore',      flag_emoji: '🌏' },
  { slug: 'latam',    name: 'LATAM',    display_name: 'Latin America',   timezone: 'America/Sao_Paulo',   flag_emoji: '🌎' },
] as const

export const TITLES_BY_DEPT: Record<string, string[]> = {
  engineering: ['Software Engineer','Senior Engineer','Staff Engineer','Engineering Manager','DevOps Engineer','Frontend Engineer','Platform Engineer','Security Engineer'],
  product:     ['Product Manager','Senior PM','Director of Product','Product Analyst','Associate PM','Group PM'],
  design:      ['UX Designer','Product Designer','Design Lead','Visual Designer','UX Researcher','Design Systems Engineer'],
  marketing:   ['Marketing Manager','Content Strategist','Growth Manager','Brand Designer','SEO Specialist','Demand Gen Manager'],
  sales:       ['Account Executive','Sales Manager','SDR','VP of Sales','Customer Success Manager','Enterprise AE'],
  hr:          ['HR Manager','Recruiter','People Ops','HR Business Partner','Talent Lead','Comp & Benefits Analyst'],
  finance:     ['Finance Manager','Financial Analyst','Controller','CFO','Accountant','FP&A Analyst'],
  legal:       ['Legal Counsel','General Counsel','Compliance Manager','Legal Ops','Privacy Counsel'],
  operations:  ['Operations Manager','Chief of Staff','Program Manager','IT Manager','Facilities Manager','Ops Analyst'],
}

const FIRST = [
  'Alex','Jordan','Morgan','Taylor','Casey','Riley','Avery','Drew','Blake','Cameron',
  'Quinn','Peyton','Skyler','Reese','Logan','Parker','Hayden','Sydney','Jamie','Devon',
  'Emma','Liam','Olivia','Noah','Ava','Elijah','Sophia','Lucas','Isabella','Mason',
  'Charlotte','Ethan','Amelia','Aiden','Mia','James','Harper','Sebastian','Evelyn','Michael',
  'Priya','Kai','Zara','Noa','Ravi','Sasha','Mika','Ling','Jin','Aria',
  'Felix','Luna','Omar','Isla','Marco','Yuki','Diego','Freya','Kofi','Mei',
]

const LAST = [
  'Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Wilson','Moore',
  'Taylor','Anderson','Thomas','Jackson','White','Harris','Martin','Thompson','Young','Lewis',
  'Walker','Hall','Allen','King','Wright','Scott','Torres','Nguyen','Hill','Flores',
  'Green','Adams','Nelson','Baker','Carter','Mitchell','Perez','Roberts','Turner','Phillips',
  'Patel','Kumar','Chen','Zhang','Kim','Park','Nakamura','Santos','Silva','Müller',
  'Osei','Tanaka','Costa','Rossi','Dubois','Ahmed','Hassan','Johansson','Weber','Ferreira',
]

// ── PRNG (LCG, seed=42) ───────────────────────────────────────────────────────

export function seededRand(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function pick<T>(arr: readonly T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)]!
}

/** Strip diacritics for email generation (e.g. Müller → muller). */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '')
}

// ── Generator ─────────────────────────────────────────────────────────────────

export interface EmployeeSeedRecord {
  index: number
  first_name: string
  last_name: string
  department_slug: string
  region_slug: string
  job_title: string
  email: string
  phone: string
  avatar_seed: string
}

export function generateEmployees(count: number): EmployeeSeedRecord[] {
  const rand = seededRand(42)
  const deptSlugs = DEPARTMENTS.map(d => d.slug)
  const regionSlugs = REGIONS.map(r => r.slug)
  const employees: EmployeeSeedRecord[] = []

  for (let i = 0; i < count; i++) {
    const deptSlug = pick(deptSlugs, rand)
    const regionSlug = pick(regionSlugs, rand)
    const firstName = pick(FIRST, rand)
    const lastName = pick(LAST, rand)
    const jobTitle = pick(TITLES_BY_DEPT[deptSlug]!, rand)

    employees.push({
      index: i + 1,
      first_name: firstName,
      last_name: lastName,
      department_slug: deptSlug,
      region_slug: regionSlug,
      job_title: jobTitle,
      email: `${normalize(firstName)}.${normalize(lastName)}${i + 1}@example.com`,
      phone: `+1-555-${String(i + 1).padStart(5, '0')}`,
      avatar_seed: `employee-${i + 1}-${firstName}-${lastName}`,
    })
  }

  return employees
}

// ── CLI entrypoint ────────────────────────────────────────────────────────────

const COUNT = 50_000
const outPath = path.join(__dirname, 'employees-seed.json')

console.log(`Generating ${COUNT.toLocaleString()} employees (PRNG seed=42)…`)
const employees = generateEmployees(COUNT)

const output = { departments: DEPARTMENTS, regions: REGIONS, employees }
fs.writeFileSync(outPath, JSON.stringify(output), 'utf8')

const sizeMB = (fs.statSync(outPath).size / 1024 / 1024).toFixed(1)
console.log(`✓ Written to ${outPath} (${sizeMB} MB)`)
console.log(`  ${DEPARTMENTS.length} departments, ${REGIONS.length} regions, ${employees.length.toLocaleString()} employees`)
console.log(`  First: #1 ${employees[0]!.first_name} ${employees[0]!.last_name} — ${employees[0]!.job_title} (${employees[0]!.department_slug})`)
console.log(`  Last:  #${COUNT} ${employees[COUNT-1]!.first_name} ${employees[COUNT-1]!.last_name} — ${employees[COUNT-1]!.job_title} (${employees[COUNT-1]!.department_slug})`)
