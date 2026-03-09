import seedData from '../data/partners.json'

const KEYS = {
  PARTNERS: 'efeso_partners_v9',
  USER: 'efeso_user',
  RECENT: 'efeso_recent',
  RATINGS: 'efeso_ratings'
}

const SEED_COMMENTS = {
  "1": [
    { author: "Marco R.", stars: 5, text: "SAP is our go-to for S/4HANA migrations. The depth of their solution portfolio and partner support during our last manufacturing client rollout was outstanding.", date: "10 Feb 2026" },
    { author: "Giulia T.", stars: 4, text: "Solid ERP backbone for complex finance transformations. BTP integration capabilities have opened up a lot of extensibility options on recent projects.", date: "27 Jan 2026" }
  ],
  "2": [
    { author: "Luca M.", stars: 5, text: "Microsoft's ecosystem is unmatched for integrated AI+cloud projects. Azure OpenAI and Copilot Studio let us deliver a working GenAI assistant to a client in under 6 weeks.", date: "14 Feb 2026" },
    { author: "Sara B.", stars: 5, text: "Power Platform is a game-changer for rapid automation. We deployed a fully working approval workflow for a retail client in 3 days.", date: "01 Feb 2026" },
    { author: "James K.", stars: 4, text: "Microsoft Fabric is evolving fast. Some rough edges still, but the unified lakehouse vision is exactly what our data-heavy clients need.", date: "19 Jan 2026" }
  ],
  "3": [
    { author: "Carlo P.", stars: 5, text: "Salesforce Sales Cloud transformed how our client manages its B2B pipeline. The Einstein AI recommendations alone improved conversion rates significantly.", date: "20 Feb 2026" },
    { author: "Anna V.", stars: 3, text: "Strong CRM platform but licensing costs can escalate quickly on complex orgs. Need careful scoping upfront to avoid budget overruns.", date: "08 Jan 2026" }
  ],
  "4": [
    { author: "Thomas N.", stars: 5, text: "UiPath is the most mature RPA platform we've used. The Orchestrator gives us full visibility over all automations running across client environments.", date: "11 Feb 2026" },
    { author: "Isabelle F.", stars: 4, text: "Document Understanding saved weeks of manual data entry for a client in logistics. Impressive accuracy even on low-quality scanned invoices.", date: "29 Jan 2026" }
  ],
  "5": [
    { author: "Marco R.", stars: 5, text: "Celonis is the best tool we have to show clients what is actually happening in their processes vs what they think is happening. Always a revelation.", date: "18 Feb 2026" },
    { author: "Giulia T.", stars: 5, text: "The Action Engine is where the real value kicks in — not just diagnosing problems but triggering fixes automatically inside SAP. Clients love it.", date: "04 Feb 2026" }
  ],
  "6": [
    { author: "Elena C.", stars: 5, text: "Blue Yonder is our first choice for supply chain planning in complex manufacturing environments. The AI demand sensing capabilities are well ahead of competitors.", date: "15 Feb 2026" },
    { author: "Raj S.", stars: 4, text: "Implementation requires deep supply chain expertise on the EFESO side, but once live the client autonomy is excellent. Good partner support team.", date: "02 Feb 2026" }
  ],
  "8": [
    { author: "Luca M.", stars: 5, text: "Databricks is our platform of choice for industrial IoT and predictive analytics. The MLflow integration makes model lifecycle management straightforward.", date: "22 Feb 2026" },
    { author: "Sara B.", stars: 4, text: "Unity Catalog has finally solved the data governance headache on multi-team projects. Significant improvement over previous approaches.", date: "09 Feb 2026" }
  ],
  "13": [
    { author: "Anna V.", stars: 5, text: "o9 replaced three legacy planning tools for one of our FMCG clients. The single-platform S&OP approach cut planning cycle time by 40%.", date: "25 Feb 2026" },
    { author: "Carlo P.", stars: 5, text: "Exceptional demand sensing and financial reconciliation capabilities. The AI-driven scenario planning is genuinely differentiating for commercial teams.", date: "17 Feb 2026" }
  ]
}

export function initData() {
  if (!localStorage.getItem(KEYS.PARTNERS)) {
    localStorage.setItem(KEYS.PARTNERS, JSON.stringify(seedData))
  }
  if (!localStorage.getItem('efeso_comments_seeded_v2')) {
    localStorage.setItem('efeso_comments', JSON.stringify(SEED_COMMENTS))
    localStorage.setItem('efeso_comments_seeded_v2', '1')
  }
}

export function getPartners() {
  const raw = localStorage.getItem(KEYS.PARTNERS)
  return raw ? JSON.parse(raw) : []
}

export function updatePartner(updated) {
  const partners = getPartners()
  const idx = partners.findIndex(p => p.id === updated.id)
  if (idx !== -1) {
    partners[idx] = updated
    localStorage.setItem(KEYS.PARTNERS, JSON.stringify(partners))
  }
}

export function getUser() {
  return localStorage.getItem(KEYS.USER)
}

export function setUser(name) {
  localStorage.setItem(KEYS.USER, name)
}

export function getRecentSearches() {
  const raw = localStorage.getItem(KEYS.RECENT)
  return raw ? JSON.parse(raw) : []
}

export function addRecentSearch(query) {
  const recent = getRecentSearches().filter(q => q !== query)
  recent.unshift(query)
  localStorage.setItem(KEYS.RECENT, JSON.stringify(recent.slice(0, 5)))
}

export function removeRecentSearch(query) {
  const recent = getRecentSearches().filter(q => q !== query)
  localStorage.setItem(KEYS.RECENT, JSON.stringify(recent))
}

export function getRating(partnerId) {
  const raw = localStorage.getItem(KEYS.RATINGS)
  const ratings = raw ? JSON.parse(raw) : {}
  return ratings[partnerId] || 0
}

export function setRating(partnerId, stars) {
  const raw = localStorage.getItem(KEYS.RATINGS)
  const ratings = raw ? JSON.parse(raw) : {}
  if (stars === 0) {
    delete ratings[partnerId]
  } else {
    ratings[partnerId] = stars
  }
  localStorage.setItem(KEYS.RATINGS, JSON.stringify(ratings))
}

export function getComments(partnerId) {
  const raw = localStorage.getItem('efeso_comments')
  const all = raw ? JSON.parse(raw) : {}
  return all[partnerId] || []
}

export function addComment(partnerId, comment) {
  const raw = localStorage.getItem('efeso_comments')
  const all = raw ? JSON.parse(raw) : {}
  if (!all[partnerId]) all[partnerId] = []
  all[partnerId].unshift(comment)
  localStorage.setItem('efeso_comments', JSON.stringify(all))
}
