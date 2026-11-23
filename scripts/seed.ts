/**
 * Seed departments → regions → employees into Payload CMS REST API.
 *
 * Usage:
 *   PAYLOAD_URL=https://payload.sonicjs.com PAYLOAD_EMAIL=admin@example.com PAYLOAD_PASSWORD=xxx \
 *     npx tsx scripts/seed.ts [--count 500]
 */

const PAYLOAD_URL = process.env.PAYLOAD_URL ?? 'https://payload.sonicjs.com'
const PAYLOAD_EMAIL = process.env.PAYLOAD_EMAIL
const PAYLOAD_PASSWORD = process.env.PAYLOAD_PASSWORD
const COUNT = parseInt(
  process.argv.find((a) => a.startsWith('--count='))?.split('=')[1] ??
    process.argv[process.argv.indexOf('--count') + 1] ??
    '500',
  10,
)
const BATCH = 10

if (!PAYLOAD_EMAIL || !PAYLOAD_PASSWORD) {
  console.error(
    'Usage: PAYLOAD_URL=... PAYLOAD_EMAIL=admin@... PAYLOAD_PASSWORD=... npx tsx scripts/seed.ts [--count 500]',
  )
  process.exit(1)
}

// ── Seed data ─────────────────────────────────────────────────────────────────

const DEPARTMENTS_DATA = [
  { name: 'Engineering', description: 'Builds and maintains the product', icon: '🔧', color: '#3B82F6' },
  { name: 'Product', description: 'Drives product vision and roadmap', icon: '📊', color: '#8B5CF6' },
  { name: 'Design', description: 'Shapes user experience and visual identity', icon: '🎨', color: '#EC4899' },
  { name: 'Marketing', description: 'Grows brand awareness and demand', icon: '📣', color: '#F59E0B' },
  { name: 'Sales', description: 'Closes deals and grows revenue', icon: '💼', color: '#10B981' },
  { name: 'HR', description: 'Grows and supports the team', icon: '🤝', color: '#06B6D4' },
  { name: 'Finance', description: 'Manages financial health and planning', icon: '💰', color: '#84CC16' },
  { name: 'Legal', description: 'Protects the business and ensures compliance', icon: '⚖️', color: '#6366F1' },
  { name: 'Operations', description: 'Keeps the business running smoothly', icon: '⚙️', color: '#F97316' },
] as const

const REGIONS_DATA = [
  { name: 'US-East', displayName: 'US East Coast', timezone: 'America/New_York', flagEmoji: '🇺🇸' },
  { name: 'US-West', displayName: 'US West Coast', timezone: 'America/Los_Angeles', flagEmoji: '🇺🇸' },
  { name: 'EU-West', displayName: 'Western Europe', timezone: 'Europe/London', flagEmoji: '🇪🇺' },
  { name: 'EU-North', displayName: 'Northern Europe', timezone: 'Europe/Stockholm', flagEmoji: '🇸🇪' },
  { name: 'APAC', displayName: 'Asia Pacific', timezone: 'Asia/Singapore', flagEmoji: '🌏' },
  { name: 'LATAM', displayName: 'Latin America', timezone: 'America/Sao_Paulo', flagEmoji: '🌎' },
] as const

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

type DeptName = (typeof DEPARTMENTS_DATA)[number]['name']

const TITLES: Record<DeptName, string[]> = {
  Engineering: ['Software Engineer','Senior Engineer','Staff Engineer','Engineering Manager','DevOps Engineer','Frontend Engineer','Platform Engineer','Security Engineer'],
  Product: ['Product Manager','Senior PM','Director of Product','Product Analyst','Associate PM','Group PM'],
  Design: ['UX Designer','Product Designer','Design Lead','Visual Designer','UX Researcher','Design Systems Engineer'],
  Marketing: ['Marketing Manager','Content Strategist','Growth Manager','Brand Designer','SEO Specialist','Demand Gen Manager'],
  Sales: ['Account Executive','Sales Manager','SDR','VP of Sales','Customer Success Manager','Enterprise AE'],
  HR: ['HR Manager','Recruiter','People Ops','HR Business Partner','Talent Lead','Comp & Benefits Analyst'],
  Finance: ['Finance Manager','Financial Analyst','Controller','CFO','Accountant','FP&A Analyst'],
  Legal: ['Legal Counsel','General Counsel','Compliance Manager','Legal Ops','Privacy Counsel'],
  Operations: ['Operations Manager','Chief of Staff','Program Manager','IT Manager','Facilities Manager','Ops Analyst'],
}

// ── PRNG ──────────────────────────────────────────────────────────────────────

function seededRand(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}
function pick<T>(arr: readonly T[], r: () => number): T {
  return arr[Math.floor(r() * arr.length)]!
}

// ── REST helpers ──────────────────────────────────────────────────────────────

async function apiPost(path: string, body: unknown, token?: string) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(`${PAYLOAD_URL}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`POST ${path} → ${res.status}: ${await res.text()}`)
  return res.json() as Promise<any>
}

async function apiGet(path: string, token: string) {
  const res = await fetch(`${PAYLOAD_URL}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}`)
  return res.json() as Promise<any>
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  // 1. Login
  console.log('Logging in…')
  const loginRes = await apiPost('/api/users/login', { email: PAYLOAD_EMAIL, password: PAYLOAD_PASSWORD })
  const token: string = loginRes.token
  if (!token) throw new Error('Login failed: ' + JSON.stringify(loginRes))
  console.log('  ✓ Logged in')

  const rand = seededRand(42)

  // 2. Seed departments
  console.log('\nSeeding departments…')
  const deptIds: Record<string, string> = {}
  const existingDepts = await apiGet('/api/departments?limit=50', token)
  for (const d of existingDepts.docs ?? []) {
    deptIds[d.name] = d.id
    console.log(`  (exists) ${d.name} → ${d.id}`)
  }
  for (const dept of DEPARTMENTS_DATA) {
    if (deptIds[dept.name]) continue
    const res = await apiPost('/api/departments', { ...dept }, token)
    deptIds[dept.name] = res.doc.id
    console.log(`  ✓ ${dept.icon} ${dept.name} → ${res.doc.id}`)
  }

  // 3. Seed regions
  console.log('\nSeeding regions…')
  const regionIds: Record<string, string> = {}
  const existingRegions = await apiGet('/api/regions?limit=50', token)
  for (const r of existingRegions.docs ?? []) {
    regionIds[r.name] = r.id
    console.log(`  (exists) ${r.name} → ${r.id}`)
  }
  for (const region of REGIONS_DATA) {
    if (regionIds[region.name]) continue
    const res = await apiPost('/api/regions', { ...region }, token)
    regionIds[region.name] = res.doc.id
    console.log(`  ✓ ${region.flagEmoji} ${region.name} → ${res.doc.id}`)
  }

  const deptNames = DEPARTMENTS_DATA.map((d) => d.name)
  const regionNames = REGIONS_DATA.map((r) => r.name)

  // 4. Seed employees
  console.log(`\nSeeding ${COUNT} employees (batch=${BATCH})…`)
  let created = 0
  const errors: string[] = []

  for (let i = 0; i < COUNT; i += BATCH) {
    const chunk = Math.min(BATCH, COUNT - i)
    const creates = Array.from({ length: chunk }, (_, j) => {
      const idx = i + j
      const deptName = pick(deptNames, rand) as DeptName
      const regionName = pick(regionNames, rand)
      const firstName = pick(FIRST, rand)
      const lastName = pick(LAST, rand)

      const emailLocal = `${firstName}.${lastName}${idx + 1}`
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')  // strip diacritics
        .replace(/[^a-z0-9.]/g, '')        // strip non-ascii

      return apiPost(
        '/api/employees',
        {
          firstName,
          lastName,
          department: deptIds[deptName],
          jobTitle: pick(TITLES[deptName], rand),
          region: regionIds[regionName],
          email: `${emailLocal}@example.com`,
          phone: `+1-555-${String(idx + 1).padStart(5, '0')}`,
          avatarSeed: `employee-${idx + 1}-${firstName}-${lastName}`,
        },
        token,
      )
    })

    const results = await Promise.allSettled(creates)
    created += results.filter((r) => r.status === 'fulfilled').length
    for (const f of results.filter((r) => r.status === 'rejected'))
      errors.push((f as PromiseRejectedResult).reason?.message ?? 'unknown')

    if (i % 100 === 0 || i + chunk >= COUNT)
      process.stdout.write(`\r  ${created}/${COUNT} created, ${errors.length} errors`)
  }

  console.log('\n\n✓ Seed complete.')
  console.log(`  Departments: ${Object.keys(deptIds).length}`)
  console.log(`  Regions:     ${Object.keys(regionIds).length}`)
  console.log(`  Employees:   ${created}/${COUNT} (${errors.length} errors)`)
  if (errors.length > 0) console.log('First 5 errors:', errors.slice(0, 5))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
