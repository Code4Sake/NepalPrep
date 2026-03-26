// ─── CEE Topics ───────────────────────────────────────────────────────────────
export const ceeTopics = [
  {
    id: 'cell-biology',
    name: 'Cell Biology',
    subject: 'Biology',
    exam: 'cee',
    emoji: '🧬',
    questionCount: 10,
    comingSoon: false,
  },
  {
    id: 'basic-component-life',
    name: 'Basic Component of Life & Biodiversity',
    subject: 'Biology',
    emoji: '🧬',
    questionCount: 722,
    hasSubtopics: true,
    subtopics: [
      { id: 'biomolecules', name: 'B1.1 Biomolecules', questionCount: 54 },
      { id: 'concept-of-taxonomy', name: 'B1.2 Concept of Taxonomy', questionCount: 18 },
      { id: 'bacteria', name: 'B1.3 Bacteria', questionCount: 53 },
      { id: 'virus', name: 'B1.4 Virus', questionCount: 44 },
      { id: 'algae', name: 'B1.5 Algae', questionCount: 68 },
      { id: 'fungi', name: 'B1.6 Fungi', questionCount: 79 },
      { id: 'lichen', name: 'B1.7 Lichen', questionCount: 22 },
      { id: 'bryophyta', name: 'B1.8 Bryophyta', questionCount: 41 },
      { id: 'pteridophyta', name: 'B1.9 Pteridophyta', questionCount: 41 },
      { id: 'gymnosperm', name: 'B1.10 Gymnosperm', questionCount: 45 },
      { id: 'morphology-angiosperm', name: 'B1.11 Morphology of Angiosperm', questionCount: 144 },
      { id: 'taxonomy-angiosperm', name: 'B1.12 Taxonomy of Angiosperm', questionCount: 113 },
    ]
  },
  {
    id: 'phylum',
    name: 'Phylum',
    subject: 'Biology',
    emoji: '🐛',
    questionCount: 147,
    hasSubtopics: true,
    subtopics: [
      { id: 'arthropoda', name: 'Arthropoda', questionCount: 147 },
    ]
  },
  {
    id: 'animal-tissue',
    name: 'Animal Tissue',
    subject: 'Biology',
    exam: 'cee',
    emoji: '🫁',
    questionCount: 64,
    comingSoon: false,
  },
  {
    id: 'development-biology',
    name: 'Development Biology',
    subject: 'Biology',
    exam: 'cee',
    emoji: '🧬',
    questionCount: 27,
    comingSoon: false,
  },
  {
    id: 'human-biology-diseases',
    name: 'Human biology and human diseases',
    subject: 'Biology',
    emoji: '🧬',
    questionCount: 141,
    hasSubtopics: true,
    subtopics: [
      { id: 'cardiovascular-system', name: 'Cardiovascular System', questionCount: 59 },
      { id: 'blood-groups', name: 'Blood Groups', questionCount: 22 },
      { id: 'human-diseases', name: 'Human Diseases', questionCount: 60 },
    ]
  },
  {
    id: 'genetics',
    name: 'Genetics',
    subject: 'Biology',
    exam: 'cee',
    emoji: '🔬',
    questionCount: 0,
    comingSoon: true,
  },
  {
    id: 'plant-physiology',
    name: 'Plant Physiology',
    subject: 'Biology',
    exam: 'cee',
    emoji: '🌱',
    questionCount: 0,
    comingSoon: true,
  },
  {
    id: 'human-physiology',
    name: 'Human Physiology',
    subject: 'Biology',
    exam: 'cee',
    emoji: '🫀',
    questionCount: 0,
    comingSoon: true,
  },
  {
    id: 'mechanics',
    name: 'Mechanics',
    subject: 'Physics',
    exam: 'cee',
    emoji: '⚙️',
    questionCount: 0,
    comingSoon: true,
  },
  {
    id: 'thermodynamics',
    name: 'Thermodynamics',
    subject: 'Physics',
    exam: 'cee',
    emoji: '🌡️',
    questionCount: 0,
    comingSoon: true,
  },
  {
    id: 'organic-chemistry',
    name: 'Organic Chemistry',
    subject: 'Chemistry',
    exam: 'cee',
    emoji: '⚗️',
    questionCount: 0,
    comingSoon: true,
  },
  {
    id: 'inorganic-chemistry',
    name: 'Inorganic Chemistry',
    subject: 'Chemistry',
    exam: 'cee',
    emoji: '🧪',
    questionCount: 0,
    comingSoon: true,
  },
]

// ─── IOE Topics ────────────────────────────────────────────────────────────────
export const ioeTopics = [
  {
    id: 'ioe-calculus',
    name: 'Calculus',
    subject: 'Mathematics',
    exam: 'ioe',
    emoji: '∫',
    questionCount: 0,
    comingSoon: true,
  },
  {
    id: 'ioe-mechanics',
    name: 'Mechanics',
    subject: 'Physics',
    exam: 'ioe',
    emoji: '⚙️',
    questionCount: 0,
    comingSoon: true,
  },
  {
    id: 'ioe-chemistry',
    name: 'Chemistry',
    subject: 'Chemistry',
    exam: 'ioe',
    emoji: '⚗️',
    questionCount: 0,
    comingSoon: true,
  },
  {
    id: 'ioe-english',
    name: 'English',
    subject: 'English',
    exam: 'ioe',
    emoji: '📝',
    questionCount: 0,
    comingSoon: true,
  },
]

// ─── Lazy Question Loading ────────────────────────────────────────────────────
// Questions are split into per-topic JSON files in ./questions/ for on-demand loading.
// This avoids downloading all 10-20K questions on every page load.

const questionModules = import.meta.glob('./questions/*.json')

export async function loadQuestions(topicId) {
  const path = `./questions/${topicId}.json`
  if (!questionModules[path]) return []
  const mod = await questionModules[path]()
  return mod.default
}

// Load questions for multiple topics at once (used by MockExam)
export async function loadAllQuestions(topicIds) {
  const results = {}
  await Promise.all(
    topicIds.map(async (id) => {
      results[id] = await loadQuestions(id)
    })
  )
  return results
}
