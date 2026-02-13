export const REC_UTPB_SLUG = '2026-a7c91f';
export const REC_COMP_SLUG = '2026-f13d0c2b';

export const REC_UTPB_PATH = `/rec/${REC_UTPB_SLUG}/`;
export const REC_COMP_PATH = `/rec/${REC_COMP_SLUG}/`;

export type TargetId = 'utpb' | 'comp';
export type PaneKey = 'overview' | 'claims' | 'kit';

export const pageOptions = [
  { label: 'UT Permian Basin (AP / Percussion Director)', path: REC_UTPB_PATH, targetId: 'utpb' as const },
  { label: 'Composition + Music Tech', path: REC_COMP_PATH, targetId: 'comp' as const },
];

export const fileDefs = [
  { key: 'cv', label: 'CV', type: 'pdf', filename: 'Suarez-Solis_Sebastian_CV.pdf' },
  { key: 'submission', label: 'Submission packet', type: 'pdf', filename: 'Suarez-Solis_Sebastian_Submission_Packet.pdf' },
  { key: 'teaching', label: 'Teaching portfolio', type: 'pdf', filename: 'Suarez-Solis_Sebastian_Teaching_Portfolio.pdf' },
  { key: 'teachingPhilosophy', label: 'Teaching Philosophy', type: 'pdf', filename: 'Teaching_Philosophy.pdf' },
  { key: 'works', label: 'Works list', type: 'pdf', filename: 'Suarez-Solis_Sebastian_Works_List.pdf' },
  { key: 'softwarePalette', label: 'Software Projects', type: 'palette' },
  { key: 'writing', label: 'Writing samples', type: 'pdf', filename: 'Writing_Samples.pdf' },
] as const;

export const softwarePalette = {
  label: 'Software Projects',
  type: 'palette',
  items: [
    {
      title: 'SyncTimer',
      url: 'https://synctimerapp.com',
      contains: 'Contains: interactive rehearsal synchronization + cue sheets for ensembles.',
    },
    {
      title: 'Tenney',
      url: 'https://tenneyapp.com',
      contains: 'Contains: just-intonation practice tools and lattice exploration workflow.',
    },
    {
      title: 'Viable Prompt Protocol',
      url: 'https://viableprompt.org',
      contains: 'Contains: repeatable prompt iteration templates for creative development.',
    },
    {
      title: 'Praetorius',
      url: 'https://cbassuarez.github.io/praetorius',
      contains: 'Contains: audio-linked PDF publishing workflow with responsive portfolio views.',
    },
    {
      title: 'Flux',
      url: 'https://fluxspec.org',
      contains: 'Contains: reactive score tooling for live performance process control.',
    },
  ],
} as const;

export const sharedContent = {
  heroTitle: 'Letter of Recommendation Brief — Sebastian Suarez-Solis',
  heroSubhead: 'Composer-performer + educator + builder of accountable creative systems (music, research, software).',
  metadata: 'DMA Performer-Composer (ABD), CalArts; Lecturer in Composition, Herb Alpert School of Music',
  courses: [
    'Writing for Percussion (GR)',
    'BFA Composers’ Forum (UG)',
    'Individual lessons / supervision (5–10 students per semester)',
    'HASOM Project Week guest lecture (large-format composition module)',
  ],
  coreParagraph:
    'Sebastian Suarez-Solis (they/them) is a composer-performer and educator whose work moves fluidly between percussion performance, interactive media, and spatial practice. What stands out is the way they connect rigor with curiosity: they build situations where students and collaborators can feel how structure becomes experience – whether that structure is a rehearsal method, a performance system, or a physical installation.',
  closingStarter:
    'In sum, I recommend Sebastian with confidence. They are a reliable, collegial collaborator with a clear trajectory and the rare ability to connect artistic goals to concrete systems and outcomes. I believe they would contribute immediately to your students and faculty culture while also building durable work over the long term.',
};

type Logistics = { school: string; deadline: string; upload: string; contact: string };

export const contentByTarget: Record<TargetId, { emphasis: string[]; roleParagraph: string; logistics: Logistics[] }> = {
  utpb: {
    emphasis: [
      'Teaching leadership + curriculum design (syllabi/rubrics; critique cycles; clear outcomes).',
      'Transfer-based percussion pedagogy (conceptual + physical mapping across instruments).',
      'Performance credibility with specific contemporary anchors (Viñao / Rzewski / Aperghis) as evidence of seriousness + range.',
      'Production and reliability (curating/producing concert series; running labs; delivering on deadlines).',
      'Community-facing service + governance (institutional committee work; hosting/curation).',
      'Applied versatility (multiple instruments; ensemble contexts; coaching students into performance-ready outcomes).',
    ],
    roleParagraph:
      'For a percussion director role, Sebastian brings deep, stylistically wide performance experience and an ability to translate that experience into clear, motivating pedagogy. Their background spans contemporary solo repertoire and advanced technique (e.g. Alejandro Viñao’s Khan Variations, Frederic Rzewski’s To the Earth, and Georges Aperghis’ Le Corps à Corps), alongside multi-percussion, mallets, drumset, and ensemble settings – paired with real instructional leadership in higher-ed contexts.',
    logistics: [
      {
        school: 'UT Permian Basin — AP / Percussion Director',
        deadline: 'ROLLING',
        upload: 'Send directly in an email - happy to discuss confidentiality; UTPB requires applicant-submitted letters',
        contact: 'ssuarezsolis@calarts.edu',
      },
    ],
  },
  comp: {
    emphasis: [
      'Composer-researcher framing (production of space + cybernetics as a coherent research spine).',
      'Systems builder credibility (Flux / Praetorius / Tenney / SyncTimer / VPP as evidence of shipped tools).',
      'Interdisciplinary output (interactive media + spatialized electroacoustic practice, not just “pieces on stands”).',
      'Studio-lab pedagogy (iterative critique, prototypes → revision → publication; assessment clarity).',
      'Technical fluency (Max/MSP, SuperCollider, Swift, TypeScript, etc.) as means to musical ends.',
      'Evidence of durable leadership (nonprofit infrastructure + multi-artist production).',
    ],
    roleParagraph:
      'Sebastian’s recent work is best understood in three connected strands: (1) music (large-format pieces and performance-installations including CONSTRUCTIONS and Organum quadruplum “lux nova”), (2) software/tools (systems for reactive scores, responsive portfolio publishing, rehearsal synchronization, and just-intonation practice), and (3) research/writing (a “production of space” / cybernetics-centered dissertation portfolio and hosted writing samples). The materials are organized so letter writers can quickly cite specific outcomes, listen/watch examples, and reference concrete artifacts.',
    logistics: [
      {
        school: 'Composition + Music Tech (various)',
        deadline: 'ROLLING',
        upload: 'send direct email',
        contact: 'ssuarezsolis@calarts.edu',
      },
    ],
  },
};

const claimLink = (filename: string) => filename;

export const claims = [
  {
    claim:
      'Sebastian Suarez-Solis is a composer-performer working at the intersection of percussion, interactive media, and spatialized electroacoustic practice.',
    evidence: [
      'Recent large-format works pair acoustic performance with spatialized electronic systems.',
      'Portfolio materials are organized for quick citation in letters.',
    ],
    link: claimLink('Suarez-Solis_Sebastian_Works_List.pdf'),
  },
  {
    claim:
      'As an educator, they build transferable technique – mapping shared physical concepts across instruments so students can write and perform idiomatically across the percussion family.',
    evidence: [
      'Graduate and undergraduate teaching includes writing-focused labs with iterative critique.',
      'Supervision model supports applied transfer across instruments and ensemble settings.',
    ],
    link: claimLink('Suarez-Solis_Sebastian_Teaching_Portfolio.pdf'),
  },
  {
    claim:
      'They have proven, end-to-end leadership by founding and directing a CC-BY 4.0 nonprofit sample library, publishing 5TB of recordings with 25 artists and sustaining real audience reach through nonprofit infrastructure.',
    evidence: [
      'The CV documents sustained operational leadership and publication continuity.',
      'Work includes multi-artist coordination, production timelines, and public distribution.',
    ],
    link: claimLink('Suarez-Solis_Sebastian_CV.pdf'),
  },
  {
    claim:
      'They build artist tools that make practice legible and shareable – e.g., Praetorius (audio-linked PDFs / responsive portfolio workflow) and Tenney (just-intonation tuner + lattice up to 31-limit), alongside related systems.',
    evidence: [
      'Software materials capture concrete tools used in rehearsal, tuning, and publishing.',
      'Artifacts tie implementation details to musical outcomes without marketing framing.',
    ],
    link: 'https://stagedevices.com',
  },
] as const;

export const throughLine = {
  label: 'Through-line',
  claim: 'Their work asks how systems produce space—bridging cybernetics, immanence, and “production of space” across composition, performance, and tooling.',
  evidence: ['Writing samples and dissertation materials show method-to-artifact continuity.'],
  link: 'Writing_Samples.pdf',
};

export const sectionDescriptors = {
  claims: '5',
  highlights: '11 cards',
  kit: '3 paragraphs',
} as const;

export const highlights = {
  software: [
    {
      title: 'SyncTimer',
      what: 'Rehearsal synchronization tool for shared timing references.',
      bullets: ['Demonstrates timeline-focused ensemble workflow.', 'Contains: documentation of pedagogical or rehearsal use.'],
      link: 'https://synctimerapp.com',
    },
    {
      title: 'Tenney',
      what: 'Just-intonation tuner and lattice utility up to 31-limit.',
      bullets: ['Demonstrates tuning practice support.', 'Contains: source-linked interface demonstrating system design.'],
      link: 'https://tenneyapp.com/community',
    },
    {
      title: 'Viable Prompt Protocol',
      what: 'Protocol framing for consistent prompt-driven creative iteration.',
      bullets: ['Demonstrates process documentation and revision discipline.', 'Contains: live interactive demo and technical overview.'],
      link: 'https://viableprompt.com/spec/',
    },
    {
      title: 'Praetorius',
      what: 'Audio-linked PDF + responsive portfolio publishing workflow.',
      bullets: ['Demonstrates publication pipeline design.', 'Contains: source-linked interface demonstrating system design.'],
      link: 'https://cbassuarez.github.io/praetorius',
    },
    {
      title: 'Flux',
      what: 'Reactive score and process system for performance contexts.',
      bullets: ['Demonstrates compositional system design.', 'Contains: premiere documentation, instrumentation, and performance context suitable for citation.'],
      link: 'https://fluxspec.org',
    },
  ],
  music: [
    {
      title: 'CONSTRUCTIONS',
      what: 'Large-format compositional work integrating performance and spatial logic.',
      bullets: ['Demonstrates formal control in large forms.', 'Score excerpt, staging documentation, and premiere context.'],
      link: 'https://cbassuarez.com/constructions',
    },
    {
      title: 'AMPLIFICATIONS',
      what: 'Performance-installation work centered on mediated sound behavior.',
      bullets: ['Demonstrates interactive media framing.', 'Performance video and spatial setup details.'],
      link: 'https://cbassuarez.bandcamp.com/album/amplifications',
    },
    {
      title: 'Organum quadruplum “lux nova”',
      what: 'Composition/performance project connecting historical reference and contemporary process.',
      bullets: ['Demonstrates stylistic range with structural clarity.', 'Instrumentation, duration, and commissioning history.'],
      link: 'https://www.youtube.com/watch?v=NSMiudJhIW4',
    },
  ],
  research: [
    {
      title: 'Embodied Manifestations of Space',
      what: 'Dissertation portfolio strand focused on production-of-space inquiry.',
      bullets: ['Demonstrates coherence between writing and practice.', 'Dissertation framing and research questions.'],
      link: 'Writing_Samples.pdf',
    },
    {
      title: 'Studio-and-lab pedagogy',
      what: 'Teaching model using iterative prototypes, critique, and revision cycles.',
      bullets: ['Demonstrates methodical mentoring structure.', 'Course structure, critique method, and assessment model.'],
      link: 'Suarez-Solis_Sebastian_Teaching_Portfolio.pdf',
    },
    {
      title: 'Writing for Percussion / Composers’ Forum',
      what: 'Coursework scope spanning technique, writing practice, and public presentation.',
      bullets: ['Demonstrates cross-level curricular design.', 'Representative student outcomes and assignments.'],
      link: 'Suarez-Solis_Sebastian_CV.pdf',
    },
  ],
} as const;
