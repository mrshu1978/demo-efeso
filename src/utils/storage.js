import seedData from '../data/partners.json'

const KEYS = {
  PARTNERS: 'efeso_partners_v8',
  USER: 'efeso_user',
  RECENT: 'efeso_recent',
  RATINGS: 'efeso_ratings'
}

const SEED_COMMENTS = {
  "1": [
    { author: "Sarah", stars: 5, text: "Exceptional SAP knowledge. Marco led our S/4HANA migration flawlessly, delivering on time and under budget.", date: "12 Feb 2026" },
    { author: "James", stars: 4, text: "Very solid ERP expertise. Guided us through a complex finance module rollout with great communication throughout.", date: "28 Jan 2026" }
  ],
  "4": [
    { author: "Anna", stars: 5, text: "Elena's supply chain planning expertise is top notch. The o9 implementation she drove cut our forecast error by 30%.", date: "15 Feb 2026" },
    { author: "Raj", stars: 4, text: "Great collaboration on the demand planning project. Very knowledgeable about Blue Yonder and Kinaxis.", date: "03 Feb 2026" }
  ],
  "5": [
    { author: "Giulia", stars: 5, text: "Carlos redesigned our entire Salesforce setup. The automation he implemented saved our sales team hours every week.", date: "20 Feb 2026" },
    { author: "Thomas", stars: 3, text: "Good Salesforce skills. Took a bit longer than expected on the integration side but ultimately delivered quality work.", date: "10 Jan 2026" }
  ],
  "6": [
    { author: "Marco", stars: 5, text: "Anna's ability to translate complex data architectures into business value is remarkable. Our Power BI dashboards transformed decision-making.", date: "18 Feb 2026" },
    { author: "Sarah", stars: 4, text: "Great data strategist. Built our Azure data platform from scratch and trained the team effectively.", date: "05 Feb 2026" },
    { author: "Carlos", stars: 5, text: "Palantir Foundry implementation was outstanding. Anna understood our operational needs from day one.", date: "22 Jan 2026" }
  ],
  "7": [
    { author: "Isabelle", stars: 4, text: "Thomas automated several of our back-office processes with UiPath. Very methodical approach and excellent documentation.", date: "11 Feb 2026" },
    { author: "Giulia", stars: 5, text: "ServiceNow rollout went smoothly under Thomas's leadership. Processes are now fully digital and the team loves it.", date: "30 Jan 2026" }
  ],
  "9": [
    { author: "Anna", stars: 5, text: "Raj's multi-cloud architecture was exactly what we needed. Azure and AWS workloads perfectly balanced and cost-optimised.", date: "14 Feb 2026" },
    { author: "Thomas", stars: 4, text: "Solid cloud expertise. The Kubernetes setup Raj designed has been rock-solid since go-live.", date: "02 Feb 2026" }
  ],
  "13": [
    { author: "Marco", stars: 5, text: "Piero is ahead of the curve on generative AI. His RAG implementation gave our team a truly powerful internal knowledge assistant.", date: "25 Feb 2026" },
    { author: "Elena", stars: 5, text: "Outstanding AI work. Piero built a Copilot Studio agent that handles 60% of our internal HR queries automatically.", date: "17 Feb 2026" }
  ]
}

export function initData() {
  if (!localStorage.getItem(KEYS.PARTNERS)) {
    localStorage.setItem(KEYS.PARTNERS, JSON.stringify(seedData))
  }
  if (!localStorage.getItem('efeso_comments_seeded_v1')) {
    localStorage.setItem('efeso_comments', JSON.stringify(SEED_COMMENTS))
    localStorage.setItem('efeso_comments_seeded_v1', '1')
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
