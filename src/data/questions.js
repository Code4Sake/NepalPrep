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
  questionCount: 748,
  hasSubtopics: true,
  subtopics: [
    { id: 'biomolecules', name: 'B1.1 Biomolecules', questionCount: 52 },
    { id: 'concept-of-taxonomy', name: 'B1.2 Concept of Taxonomy', questionCount: 18 },
    { id: 'bacteria', name: 'B1.3 Bacteria', questionCount: 54 },
    { id: 'virus', name: 'B1.4 Virus', questionCount: 44 },
    { id: 'algae', name: 'B1.5 Algae', questionCount: 70 },
    { id: 'fungi', name: 'B1.6 Fungi', questionCount: 85 },
    { id: 'lichen', name: 'B1.7 Lichen', questionCount: 22 },
    { id: 'bryophyta', name: 'B1.8 Bryophyta', questionCount: 42 },
    { id: 'pteridophyta', name: 'B1.9 Pteridophyta', questionCount: 41 },
    { id: 'gymnosperm', name: 'B1.10 Gymnosperm', questionCount: 48 },
    { id: 'morphology-angiosperm', name: 'B1.11 Morphology of Angiosperm', questionCount: 164 },
    { id: 'taxonomy-angiosperm', name: 'B1.12 Taxonomy of Angiosperm', questionCount: 108 },
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

// ─── Questions ─────────────────────────────────────────────────────────────────
export const questions = {
  'cell-biology': [
    { q: 'Which organelle is known as the powerhouse of the cell?', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi Apparatus'], answer: 2, explanation: 'Mitochondria produce ATP through aerobic respiration, supplying energy to the cell.' },
    { q: 'The fluid mosaic model of the cell membrane was proposed by:', options: ['Watson and Crick', 'Singer and Nicolson', 'Schleiden and Schwann', 'Robert Hooke'], answer: 1, explanation: 'Singer and Nicolson proposed the fluid mosaic model in 1972, describing the membrane as a fluid phospholipid bilayer with embedded proteins.' },
    { q: 'Which of the following is NOT a function of the smooth endoplasmic reticulum?', options: ['Lipid synthesis', 'Detoxification', 'Protein synthesis', 'Calcium storage'], answer: 2, explanation: 'Protein synthesis occurs on ribosomes attached to the rough ER, not the smooth ER.' },
    { q: 'The unit membrane model was proposed by:', options: ['Robertson', 'Singer', 'Davson and Danielli', 'Gorter and Grendel'], answer: 0, explanation: 'J.D. Robertson proposed the unit membrane model in 1959, describing all biological membranes as having a common trilaminar structure.' },
    { q: 'Which organelle is responsible for intracellular digestion?', options: ['Peroxisome', 'Lysosome', 'Ribosome', 'Centrosome'], answer: 1, explanation: 'Lysosomes contain hydrolytic enzymes that digest macromolecules, old organelles, and foreign particles.' },
    { q: 'The primary function of the Golgi apparatus is:', options: ['Energy production', 'Protein synthesis', 'Sorting and packaging proteins', 'DNA replication'], answer: 2, explanation: 'The Golgi apparatus modifies, sorts, and packages proteins and lipids for secretion or delivery to other organelles.' },
    { q: 'Which structure controls the entry and exit of substances in the cell?', options: ['Cell wall', 'Cell membrane', 'Nuclear membrane', 'Endoplasmic reticulum'], answer: 1, explanation: 'The cell membrane (plasma membrane) is selectively permeable and regulates what enters and leaves the cell.' },
    { q: 'Ribosomes are composed of:', options: ['DNA and protein', 'RNA and protein', 'DNA and lipid', 'Protein and lipid'], answer: 1, explanation: 'Ribosomes consist of ribosomal RNA (rRNA) and proteins, organized into large and small subunits.' },
    { q: 'The process by which a cell engulfs large particles is called:', options: ['Pinocytosis', 'Exocytosis', 'Phagocytosis', 'Osmosis'], answer: 2, explanation: 'Phagocytosis ("cell eating") involves the engulfment of large solid particles like bacteria or debris.' },
    { q: 'Which of the following is found only in plant cells?', options: ['Mitochondria', 'Ribosomes', 'Chloroplast', 'Cell membrane'], answer: 2, explanation: 'Chloroplasts are organelles unique to plant cells and algae, responsible for photosynthesis.' },
  ],
  'biomolecules': [
  {
    q: 'Source of fiber in Hemp plant is',
    options: ['Cellulose', 'Starch', 'Lipid', 'Protein'],
    answer: 0,
    explanation: 'Cellulose is the chief constituent of cell walls of plants and is the source of fiber in hemp plant.'
  },
  {
    q: 'Which is a false statement?',
    options: [
      'm-RNA has linear structure with codon',
      't-RNA contains anticodon',
      'r-RNA helps in protein synthesis',
      't-RNA is the largest among all types of RNA'
    ],
    answer: 3,
    explanation: 't-RNA is actually the smallest RNA. r-RNA is the largest and most abundant RNA.'
  },
  {
    q: 'Which is monosaccharide?',
    options: ['Glucose', 'Sucrose', 'Glycogen', 'Maltose'],
    answer: 0,
    explanation: 'Glucose is a monosaccharide. Sucrose and Maltose are disaccharides. Glycogen is a polysaccharide.'
  },
  {
    q: 'Which of the following statement is correct about RNA?',
    options: [
      'It contains adenine paired to thymine',
      'One of the bases from DNA is replaced by uracil',
      'It contains the sugar deoxyribose',
      'Its nucleotides contains twice as many phosphate groups as that of DNA'
    ],
    answer: 1,
    explanation: 'In RNA, thymine is replaced by uracil. RNA contains ribose sugar, not deoxyribose.'
  },
  {
    q: 'Which is most abundant protein?',
    options: ['RUBISCO', 'Chromoprotein', 'PEP', 'Derived protein'],
    answer: 0,
    explanation: 'RUBISCO (Ribulose bisphosphate carboxylase oxygenase) is the most abundant protein in the world.'
  },
  {
    q: 'Which determines the sequence of amino acid?',
    options: ['tRNA', 'mRNA', 'Genetic code', 'Gene'],
    answer: 3,
    explanation: 'Gene (DNA) ultimately determines the sequence of amino acids in a protein through transcription and translation.'
  },
  {
    q: 'The first evidence of DNA as a genetic material is',
    options: [
      'DNA is formed by chromosome',
      'DNA is enclosed within nucleus',
      'Transformation of Bacterial DNA',
      'DNA is not found in cytoplasm'
    ],
    answer: 2,
    explanation: 'Griffith\'s transformation experiment provided the first evidence that DNA is the genetic material through bacterial transformation.'
  },
  {
    q: 'Deficiency of which substance causes pellagra?',
    options: ['Nicotinic acid', 'Pantothenic acid', 'Vitamin C', 'Pyridoxine'],
    answer: 0,
    explanation: 'Pellagra is caused by deficiency of Nicotinic acid (Vitamin B3/Niacin).'
  },
  {
    q: 'Cane sugar on hydrolysis yields',
    options: ['Glucose + Fructose', 'Glucose + Galactose', 'Glucose + Maltose', 'Glucose + Sucrose'],
    answer: 0,
    explanation: 'Sucrose (cane sugar) on hydrolysis yields glucose and fructose. It is a non-reducing disaccharide.'
  },
  {
    q: 'Nucleic acid is polymer of',
    options: ['Globulins', 'Nucleotides', 'Nucleoprotein', 'Nucleosides'],
    answer: 1,
    explanation: 'Nucleic acids (DNA and RNA) are polymers of nucleotides. Each nucleotide has a sugar, phosphate and nitrogenous base.'
  },
  {
    q: 'Most diverse component in cell is',
    options: ['Carbohydrate', 'Lipid', 'Protein', 'Mineral salts'],
    answer: 2,
    explanation: 'Proteins are the most diverse molecules in the cell due to the variety of amino acid sequences possible.'
  },
  {
    q: 'All enzymes are ingredient of',
    options: ['Vitamins', 'Fats', 'Proteins', 'Sugar'],
    answer: 2,
    explanation: 'All enzymes are proteins in nature. They are biological catalysts made of amino acids.'
  },
  {
    q: 'Every carbohydrate is',
    options: ['Ribose and deoxyribose', 'Pentose and hexose', 'Triose and tetrose', 'Aldose and ketose'],
    answer: 3,
    explanation: 'Every carbohydrate can be classified as either aldose (containing aldehyde group) or ketose (containing ketone group).'
  },
  {
    q: 'Two adjacent N-bases in a DNA molecule are located at the distance of',
    options: ['3.4 Å', '34 Å', '20 Å', '10 Å'],
    answer: 0,
    explanation: 'Two adjacent nitrogen bases in DNA are located at a distance of 3.4 Å. One complete turn of helix is 34 Å with 10 base pairs.'
  },
  {
    q: 'In RNA molecule in place of which uracil molecule is present?',
    options: ['Guanine', 'Thymine', 'Adenine', 'Cytosine'],
    answer: 1,
    explanation: 'In RNA, uracil replaces thymine which is found in DNA. Both pair with adenine.'
  },
  {
    q: 'The sugar present in fruits, honey and nectar is',
    options: ['Mannose', 'Glucose', 'Fructose', 'Lactose'],
    answer: 2,
    explanation: 'Fructose is the sugar present in fruits, honey and nectar. It is also called fruit sugar.'
  },
  {
    q: 'What is present instead of thymine in RNA?',
    options: ['Adenine', 'Guanine', 'Cytosine', 'Uracil'],
    answer: 3,
    explanation: 'Uracil is present in RNA instead of thymine. Both are pyrimidine bases that pair with adenine.'
  },
  {
    q: 'A short length of DNA molecule contains 120 adenine and 120 cytosine bases. The total number of nucleotides in this DNA fragment is',
    options: ['240', '120', '60', '480'],
    answer: 3,
    explanation: 'By Chargaff\'s rule: A=T and G=C. If A=120 then T=120, if C=120 then G=120. Total = 120+120+120+120 = 480 nucleotides.'
  },
  {
    q: 'Pentose sugar is',
    options: ['Monosaccharide', 'Disaccharide', 'Polysaccharide', 'Compound carbohydrate'],
    answer: 0,
    explanation: 'Pentose sugar is a monosaccharide with 5 carbon atoms. Examples are ribose and deoxyribose found in RNA and DNA.'
  },
  {
    q: 'Insulin is',
    options: ['Carbohydrate', 'Protein', 'Fat', 'Enzyme'],
    answer: 1,
    explanation: 'Insulin is a protein hormone secreted by beta cells of islets of Langerhans in the pancreas.'
  },
  {
    q: 'Cyanocobalamine is the chemical name of',
    options: ['Vitamin B1', 'Vitamin B2', 'Vitamin B6', 'Vitamin B12'],
    answer: 3,
    explanation: 'Cyanocobalamine is the chemical name of Vitamin B12. Its deficiency causes pernicious anaemia.'
  },
  {
    q: 'Which of the following is not a carbohydrate?',
    options: ['Inulin', 'Dextrin', 'Starch', 'Amines'],
    answer: 3,
    explanation: 'Amines are nitrogen-containing organic compounds, not carbohydrates. Inulin, dextrin and starch are all carbohydrates.'
  },
  {
    q: 'Simplest amino acid is',
    options: ['Aspartic acid', 'Glutamic acid', 'Tryptophan', 'Glycine'],
    answer: 3,
    explanation: 'Glycine is the simplest amino acid with just a hydrogen as its side chain (R group).'
  },
  {
    q: 'Which of the following is pentose sugar?',
    options: ['Glucose', 'Fructose', 'Arabinose', 'Galactose'],
    answer: 2,
    explanation: 'Arabinose is a pentose sugar with 5 carbons. Glucose, fructose and galactose are hexose sugars with 6 carbons.'
  },
  {
    q: 'The simplest amino acid is',
    options: ['Glycine', 'Tryptophan', 'Proline', 'Alanine'],
    answer: 0,
    explanation: 'Glycine (H2N-CH2-COOH) is the simplest amino acid with hydrogen as R group.'
  },
  {
    q: 'The building block of proteins',
    options: ['Nucleic acid', 'Proteins', 'Amino acid', 'Lipid'],
    answer: 2,
    explanation: 'Amino acids are the building blocks of proteins. They are linked together by peptide bonds.'
  },
  {
    q: 'Adenine pairs with',
    options: ['Thymine', 'Guanine', 'Uracil', 'Cytosine'],
    answer: 0,
    explanation: 'Adenine pairs with Thymine in DNA (with 2 hydrogen bonds) and with Uracil in RNA.'
  },
  {
    q: 'Which of the following is the simplest amino acid?',
    options: ['Proline', 'Alanine', 'Glycine', 'Valine'],
    answer: 2,
    explanation: 'Glycine is the simplest amino acid. It is the only amino acid that is not optically active.'
  },
  {
    q: 'Enzymes generally have',
    options: [
      'Same optimum temperature and same pH for functioning',
      'Same optimum temperature but different optimum pH',
      'Different optimum temperature but same optimum pH',
      'Different optimum temperature as well as different optimum pH'
    ],
    answer: 3,
    explanation: 'Different enzymes have different optimum temperatures and pH values at which they work best.'
  },
  {
    q: 'Which of the following is a pentose sugar?',
    options: ['Glucose', 'Sucrose', 'Arabinose', 'Dextrose'],
    answer: 2,
    explanation: 'Arabinose is a pentose sugar (5 carbons). Glucose and dextrose are hexoses. Sucrose is a disaccharide.'
  },
  {
    q: 'Which of the following carbohydrate is not present in plants?',
    options: ['Glucose', 'Fructose', 'Lactose', 'Sucrose'],
    answer: 2,
    explanation: 'Lactose (milk sugar) is not present in plants. It is found in milk of mammals.'
  },
  {
    q: 'Which of the following is globular protein?',
    options: ['Prothrombine', 'Lysine', 'Valine', 'Haemoglobin'],
    answer: 3,
    explanation: 'Haemoglobin is a globular protein. Lysine and Valine are amino acids, not proteins.'
  },
  {
    q: 'Which of the following is present in least proportion in cell membrane?',
    options: ['Protein', 'Carbohydrate', 'Lipid', 'All equally present'],
    answer: 1,
    explanation: 'Carbohydrate is present in the least proportion in the cell membrane. Protein and lipids are the major components.'
  },
  {
    q: 'Corn is immersed in boiling water, it is then cooled and solution becomes sweet. It is due to',
    options: [
      'Inactivation of enzymes',
      'Conversion of disaccharides to monosaccharides',
      'Conversion of starch into sugar',
      'None of the above'
    ],
    answer: 2,
    explanation: 'Boiling inactivates the enzymes first, but on cooling, the starch converts to sugar (maltose) making it sweet.'
  },
  {
    q: 'Which of the following is co-enzyme?',
    options: ['Protein', 'Vitamin', 'Hormone', 'Mineral'],
    answer: 1,
    explanation: 'Vitamins act as co-enzymes. They are non-protein organic molecules that assist enzymes in catalysis.'
  },
  {
    q: 'Starch is the polymer of',
    options: ['Glucose', 'Sucrose', 'Fructose', 'Maltose'],
    answer: 0,
    explanation: 'Starch is a polysaccharide made of alpha-D-glucose units. It is the storage carbohydrate of plants.'
  },
  {
    q: 'All are essential amino acids except',
    options: ['Phenylalanine', 'Methionine', 'Tryptophan', 'Tyrosine'],
    answer: 3,
    explanation: 'Tyrosine is a non-essential amino acid as it can be synthesized from phenylalanine in the body.'
  },
  {
    q: 'What are the mostly diversed molecules in the cell?',
    options: ['Lipids', 'Mineral salts', 'Protein', 'Carbohydrate'],
    answer: 2,
    explanation: 'Proteins are the most diverse molecules in the cell due to infinite possible combinations of 20 amino acids.'
  },
  {
    q: 'As the size of a protein increases',
    options: [
      'It becomes less soluble and more heat coagulable',
      'It becomes more soluble and more heat coagulable',
      'It becomes less soluble and less heat coagulable',
      'It becomes more soluble and less heat coagulable'
    ],
    answer: 0,
    explanation: 'As protein size increases, it becomes less soluble and more heat coagulable due to increased complexity.'
  },
  {
    q: 'X-ray crystallography is used to study',
    options: [
      'Arrangement of proteins',
      'Three dimensional structure of proteins',
      'Composition of proteins and nucleic acids',
      'Structure of lipids'
    ],
    answer: 1,
    explanation: 'X-ray crystallography is used to study the three dimensional structure of proteins and other biomolecules.'
  },
  {
    q: 'DNA has which sugar in it?',
    options: ['Hexose', 'Ribose', 'Deoxyribose', 'Glucose'],
    answer: 2,
    explanation: 'DNA contains deoxyribose sugar (2-deoxyribose) while RNA contains ribose sugar.'
  },
  {
    q: 'Proteins that give off amino acids only on hydrolysis',
    options: ['Albumin and Globulin', 'Haemoglobin and Myosin', 'Insulin and Keratin', 'Prolamin and Lecithin'],
    answer: 0,
    explanation: 'Simple proteins like Albumin and Globulin yield only amino acids on hydrolysis unlike conjugated proteins.'
  },
  {
    q: 'Which is not a lipid?',
    options: ['Steroid', 'Fat', 'Triglyceride', 'Fatty acid'],
    answer: 3,
    explanation: 'Fatty acid alone is not a lipid — it is a component of lipids. Steroids, fats and triglycerides are all lipids.'
  },
  {
    q: 'All proteins are',
    options: [
      'Amino acids',
      'Two or more polypeptides',
      'Have quaternary structure',
      'Enzymes'
    ],
    answer: 1,
    explanation: 'All proteins consist of two or more polypeptide chains. Not all have quaternary structure and not all are enzymes.'
  },
  {
    q: 'Coenzyme in vitamin works',
    options: [
      'As an enzyme',
      'Independent of apoenzyme',
      'Dependent of apoenzyme',
      'None'
    ],
    answer: 2,
    explanation: 'Coenzymes (vitamins) work dependent on apoenzyme. Together they form the holoenzyme which is active.'
  },
  {
    q: 'Which statement about tRNA are correct? I. It contains base pairing II. It contains hydrogen bonds III. It contains uracil IV. It is single stranded',
    options: ['1, 3 and 4 only', '1 and 2 only', '1, 2, 3 and 4', '2 and 3 only'],
    answer: 2,
    explanation: 'tRNA contains base pairing (in stem regions), hydrogen bonds, uracil (as it is RNA) and is single stranded.'
  },
  {
    q: 'Which biological molecules always contain the element nitrogen?',
    options: [
      'Amino acid, cellulose, mRNA',
      'Enzymes, mRNA, tRNA',
      'Amino acids, DNA, Lipids',
      'Membrane proteins, starch, tRNA'
    ],
    answer: 1,
    explanation: 'Enzymes (proteins), mRNA and tRNA all contain nitrogen. Cellulose, starch and lipids do not contain nitrogen.'
  },
  {
    q: 'What describes the primary structure of protein?',
    options: ['α-helix', 'Peptide bond', 'Specific order of amino acid', 'Globular structure'],
    answer: 2,
    explanation: 'Primary structure of protein refers to the specific sequence/order of amino acids linked by peptide bonds.'
  },
  {
    q: 'Neutral fats, oils and waxes may be classified as',
    options: ['Lipids', 'Carbohydrates', 'Proteins', 'Starch'],
    answer: 0,
    explanation: 'Neutral fats, oils and waxes are all classified as lipids. They are esters of fatty acids and alcohol.'
  },
  {
    q: 'Collagen belongs to',
    options: ['Fibrous protein', 'Globular protein', 'Branched protein', 'Unbranched protein'],
    answer: 0,
    explanation: 'Collagen is a fibrous protein found in connective tissues. It provides structural support.'
  },
  {
    q: 'Which of the following enzymes is not proteinaceous in nature?',
    options: ['Trypsin', 'Renin', 'Pepsin', 'Ribozyme'],
    answer: 3,
    explanation: 'Ribozyme is a catalytic RNA molecule, not a protein. All other enzymes are proteins.'
  },
  {
    q: 'The complex of sugar polymers and proteins which are patchily distributed on the plasma membranes of animal cells is called',
    options: ['Cellulose', 'Chitin', 'Glycocalyx', 'Cytoskeleton'],
    answer: 2,
    explanation: 'Glycocalyx is the carbohydrate-rich zone on the outer surface of animal cell plasma membrane.'
  },
  {
    q: 'Lipids are important to biological systems because they are',
    options: [
      'Rich sources of energy',
      'Good for repelling water on organisms surface',
      'Building block of vitamin and hormones',
      'All of the above'
    ],
    answer: 3,
    explanation: 'Lipids serve multiple roles: energy storage, waterproofing, and as building blocks for vitamins and hormones.'
  },
  {
    q: 'Which of the following is not a protein?',
    options: ['Glycogen', 'Glycine', 'Alanine', 'Tryptophan'],
    answer: 0,
    explanation: 'Glycogen is a polysaccharide (carbohydrate). Glycine, Alanine and Tryptophan are amino acids.'
  },
],
'concept-of-taxonomy': [
  {
    q: 'According to Bentham & Hooker, Gymnosperm lies',
    options: ['After dicot', 'Between monocot & dicot', 'Before monocot', 'Excluded from angiosperm'],
    answer: 1,
    explanation: 'Bentham and Hooker gave natural system of classification where Gymnosperms were kept between monocot and dicot.'
  },
  {
    q: 'Five kingdom classification is mainly based on',
    options: ['Nutrition', 'Structure of nucleus', 'Cell wall', 'Sexual reproduction'],
    answer: 0,
    explanation: 'Whittaker\'s five kingdom classification is mainly based on mode of nutrition and ecological role.'
  },
  {
    q: 'Scientific name of Yarsagumba is',
    options: ['Hibiscus rosa sinensis', 'Atropa belladona', 'Cordyceps sinensis', 'Aegle marmelos'],
    answer: 2,
    explanation: 'Yarsagumba is a popular natural medicine found in high altitude of Nepal. Its scientific name is Cordyceps sinensis.'
  },
  {
    q: 'Euglena belongs to kingdom',
    options: ['Monera', 'Protista', 'Plantae', 'Animalia'],
    answer: 1,
    explanation: 'Euglena belongs to kingdom Protista. It is a connecting link between animals and plants.'
  },
  {
    q: 'Which of these are flowering plants?',
    options: ['Thallophytes', 'Spermatophytes', 'Pteridophytes', 'Bryophytes'],
    answer: 1,
    explanation: 'Spermatophytes are flowering plants possessing seeds. They include Angiosperms and Gymnosperms.'
  },
  {
    q: 'Correct order of taxonomic hierarchy',
    options: [
      'Class Family Order Genus Species',
      'Class Order Family Genus Species',
      'Phylum Order Class Family Genus',
      'Phylum Family Order Class Species'
    ],
    answer: 1,
    explanation: 'Correct descending order: Kingdom → Division/Phylum → Class → Order → Family → Genus → Species. Remember: Keep Dishes Clean Otherwise Family Gets Sick.'
  },
  {
    q: 'Term species is coined by',
    options: ['Aristotle', 'John Ray', 'Hooke', 'Linnaeus'],
    answer: 1,
    explanation: 'John Ray was first to introduce and define the term Species for any one kind of living things.'
  },
  {
    q: 'Scientific name of sirish is',
    options: ['Albizzia lebbeck', 'Cyanodon dactylon', 'Acacia', 'Mentha'],
    answer: 0,
    explanation: 'Sirish is a tree commonly found in Nepal. Its scientific name is Albizzia lebbeck.'
  },
  {
    q: 'Five-Kingdom-system of classification for living organisms was proposed by',
    options: ['Copeland', 'Ostwald Tippo', 'Linnaeus', 'Whittaker'],
    answer: 3,
    explanation: 'R.H. Whittaker proposed the five kingdom system of classification in 1969 based on mode of nutrition.'
  },
  {
    q: 'Botanists usually prefer wild variety of plant because',
    options: [
      'They are easy for Hybridization',
      'They are easy for selfing',
      'They are easy for cross-pollination',
      'They contain mutated genes'
    ],
    answer: 3,
    explanation: 'Botanists prefer wild variety of plants because they contain mutated genes which are useful for research and breeding.'
  },
  {
    q: 'Species is defined as',
    options: [
      'Group of inter-related populations reproductively connected with similar groups',
      'Group of inter-related populations reproductively isolated with similar groups',
      'Group of populations separated by physical barrier',
      'Group of populations separated by reproductive barrier'
    ],
    answer: 1,
    explanation: 'Species is a group of inter-related populations that are reproductively isolated from other such groups.'
  },
  {
    q: '3 stages of evolution was given by',
    options: ['Earlier microcopists', 'Darwin', 'Modern biologists', 'Haeckel'],
    answer: 3,
    explanation: 'Ernst Haeckel gave 3 stages of evolution. He also coined the term ecology.'
  },
  {
    q: 'What is the scientific name of popular natural medicine found in high altitude of Nepal?',
    options: ['Rauwolfia serpentina', 'Acorus calamus', 'Asparagus racemosus', 'Cordyceps sinensis'],
    answer: 3,
    explanation: 'Yarsagumba found in high altitude of Nepal has scientific name Cordyceps sinensis. It is a parasitic fungus on moth caterpillar.'
  },
  {
    q: 'The term biology was coined by',
    options: ['Aristotle', 'Theophrastus', 'Lamarck & Treviranus', 'Linnaeus'],
    answer: 2,
    explanation: 'The term biology was coined by Lamarck and Treviranus in 1802. Aristotle is called father of biology.'
  },
  {
    q: 'The science of the classification of animals and plants is known as',
    options: ['Geometrics', 'Systematics', 'Biometric', 'Zoometrics'],
    answer: 1,
    explanation: 'Systematics (taxonomy) is the science of classification of living organisms. It includes identification, nomenclature and classification.'
  },
  {
    q: 'Five kingdom system of classification was given by',
    options: ['Copeland', 'Haeckel', 'Huxley', 'R.H. Whittaker'],
    answer: 3,
    explanation: 'R.H. Whittaker proposed five kingdom classification in 1969: Monera, Protista, Fungi, Plantae, Animalia.'
  },
  {
    q: 'Binomial system of nomenclature was coined by',
    options: ['Robert Hook', 'Charles Darwin', 'Lamark', 'Carolous Linnaeus'],
    answer: 3,
    explanation: 'Carolus Linnaeus introduced the binomial system of nomenclature where each organism has a genus and species name.'
  },
  {
    q: 'Organisms were classified into plants and Animals for the first time by',
    options: ['Aristotle', 'E. Haeckel', 'John Ray', 'Linnaeus'],
    answer: 0,
    explanation: 'Aristotle was the first to classify organisms into plants and animals. He is called the father of biology.'
  },
],
'bacteria': [
  {
    q: 'Which process do bacteria oxidize ammonia into nitrite?',
    options: ['Nitrification', 'Denitrification', 'Ammonification', 'All'],
    answer: 0,
    explanation: 'Nitrification is the process where bacteria like Nitrosomonas oxidize ammonia into nitrite and then Nitrobacter converts nitrite to nitrate.'
  },
  {
    q: 'A bacterial cell divides every one minute. If it takes one hour to fill whole cup, to fill half cup it will require',
    options: ['30 minutes', '59 minutes', 'Three hours', '2 hrs'],
    answer: 1,
    explanation: 'Since bacteria double every minute, the cup is half full just one minute before it is completely full. So 60-1 = 59 minutes.'
  },
  {
    q: 'Cyanobacteria',
    options: ['Have flagella or cilia', 'Are eukaryota', 'Are photosynthetic', 'Have histone'],
    answer: 2,
    explanation: 'Cyanobacteria (blue-green algae) are photosynthetic prokaryotes. They lack flagella, are prokaryotic and do not have histone proteins.'
  },
  {
    q: 'Prokaryotic structure is present in',
    options: ['Ulothrix', 'Nostoc', 'Spirogyra', 'Chlamydomonas'],
    answer: 1,
    explanation: 'Nostoc is a cyanobacterium (blue-green alga) which is prokaryotic. Ulothrix, Spirogyra and Chlamydomonas are eukaryotic green algae.'
  },
  {
    q: 'Bacteria without flagella is',
    options: ['Petritrichous', 'Atrichous', 'Amphitrichous', 'Lophotrichus'],
    answer: 1,
    explanation: 'Atrichous bacteria have no flagella at all. Petritrichous have flagella all over, Amphitrichous have flagella at both ends, Lophotrichous have a tuft at one end.'
  },
  {
    q: 'Atmospheric nitrogen is converted to nitrogenous compound by',
    options: ['Nitrifying Bacteria', 'Denitrifying bacteria', 'N2 fixing bacteria', 'Free living bacteria'],
    answer: 2,
    explanation: 'Nitrogen fixing bacteria like Rhizobium, Azotobacter and Anabaena convert atmospheric nitrogen into nitrogenous compounds.'
  },
  {
    q: 'Which shows darting movement during locomotion?',
    options: ['Vibrio', 'Cocci', 'Spirochaete', 'Clostridium'],
    answer: 0,
    explanation: 'Vibrio bacteria show darting or shooting movement during locomotion due to their single polar flagellum.'
  },
  {
    q: 'Nitrosomonas is an example of',
    options: ['Photoautotroph', 'Anaerobe', 'Chemoautotroph', 'Symbiotic'],
    answer: 2,
    explanation: 'Nitrosomonas is a chemoautotrophic bacteria that oxidizes ammonia to nitrite to obtain energy.'
  },
  {
    q: 'Which one of the following is a free living aerobic nitrogen fixing bacteria?',
    options: ['Azotobacter', 'Clostridium', 'Rhizobium', 'Anabaena'],
    answer: 0,
    explanation: 'Azotobacter is a free living aerobic nitrogen fixing bacteria found in soil. Clostridium is anaerobic, Rhizobium is symbiotic.'
  },
  {
    q: 'The salt loving bacteria are known as',
    options: ['Methanogens', 'Halophiles', 'Thermoacidophils', 'Saltophiles'],
    answer: 1,
    explanation: 'Halophiles are bacteria that thrive in high salt concentrations. They belong to Archaebacteria.'
  },
  {
    q: 'The nitrifying bacteria convert',
    options: ['Nitrates to nitrites', 'Nitrites to nitrates', 'Nitrites to ammonia', 'Ammonia to nitrates'],
    answer: 3,
    explanation: 'Nitrifying bacteria convert ammonia to nitrates in two steps: Nitrosomonas converts ammonia to nitrite, Nitrobacter converts nitrite to nitrate.'
  },
  {
    q: 'The bacteria which grow best as aerobes but can grow without oxygen also are',
    options: ['Facultative aerobes', 'Facultative anaerobes', 'Obligate aerobes', 'Obligate anaerobes'],
    answer: 1,
    explanation: 'Facultative anaerobes grow best with oxygen but can also survive without it. E.coli is a common example.'
  },
  {
    q: 'Which one of the following group of plants is devoid of true nucleus?',
    options: ['Bryophytes', 'Blue-green algae', 'Fungi', 'Pteridophytes'],
    answer: 1,
    explanation: 'Blue-green algae (Cyanobacteria) are prokaryotes and lack a true membrane-bound nucleus.'
  },
  {
    q: 'The DNA of prokaryotes is said to be naked because they do not have',
    options: ['Membrane bound cell organelles', 'Cellulosic cell wall', 'Histone protein', 'Nuclear membrane'],
    answer: 2,
    explanation: 'Prokaryotic DNA is naked because it lacks histone proteins. In eukaryotes, DNA is wrapped around histone proteins to form nucleosomes.'
  },
  {
    q: 'An aerobic bacteria found commonly in intestine is',
    options: ['Escherichia coli', 'Streptococcus', 'Vibrio', 'Bacillus'],
    answer: 0,
    explanation: 'E. coli is a facultative anaerobe commonly found in the intestine of humans. It is used extensively in research.'
  },
  {
    q: 'Blue green algae is the name for',
    options: ['Eubacteria', 'Cyanobacteria', 'Archebacteria', 'Bacteria'],
    answer: 1,
    explanation: 'Blue-green algae is the common name for Cyanobacteria. They are photosynthetic prokaryotes.'
  },
  {
    q: 'Prokaryotic cell structure is found in',
    options: ['Chlamydomonas', 'Nostoc', 'Spirogyra', 'Vaucheria'],
    answer: 1,
    explanation: 'Nostoc is a cyanobacterium with prokaryotic cell structure. The others are eukaryotic green algae.'
  },
  {
    q: 'The bacteria found in root nodules of Leguminosae is',
    options: ['Rhizobium', 'Bacillus', 'Thiobacillus', 'Clostridium'],
    answer: 0,
    explanation: 'Rhizobium lives symbiotically in root nodules of leguminous plants and fixes atmospheric nitrogen.'
  },
  {
    q: 'Denitrifying bacteria convert',
    options: ['Atmospheric N2 to NO3', 'NO2 to NO3', 'Nitrate to atmospheric N2', 'None'],
    answer: 2,
    explanation: 'Denitrifying bacteria like Pseudomonas convert nitrates back to atmospheric nitrogen, completing the nitrogen cycle.'
  },
  {
    q: 'Obligate parasites',
    options: [
      'Cannot multiply outside the living cell',
      'Can multiply outside the living cell',
      'Can multiply on soil',
      'Can multiply on dead organic matter'
    ],
    answer: 0,
    explanation: 'Obligate parasites can only multiply inside a living host cell. They cannot survive or reproduce outside.'
  },
  {
    q: 'Nitrosomonas is',
    options: ['Phototrophic', 'Chemotrophic', 'Symbiotic', 'Photosynthetic'],
    answer: 1,
    explanation: 'Nitrosomonas is a chemotrophic (chemoautotrophic) bacteria that gets energy by oxidizing ammonia to nitrite.'
  },
  {
    q: 'Bacterial cell wall is made of',
    options: ['Murein', 'Glycoprotein', 'Lipoprotein', 'Capsid'],
    answer: 0,
    explanation: 'Bacterial cell wall is made of Murein (peptidoglycan). It provides shape and protection to the bacteria.'
  },
  {
    q: 'The commonest shape of bacteria is',
    options: ['Rod', 'Spherical', 'Oval', 'Chained'],
    answer: 1,
    explanation: 'Spherical (coccus) shape is the most common shape of bacteria. They can occur singly, in pairs, chains or clusters.'
  },
  {
    q: 'Bacilli are',
    options: ['Spherical', 'Rod shaped', 'Comma shaped', 'Spiral'],
    answer: 1,
    explanation: 'Bacilli are rod-shaped bacteria. Cocci are spherical, Vibrio are comma-shaped, Spirilla are spiral shaped.'
  },
  {
    q: 'Botulism is caused by',
    options: ['E.coli', 'Salmonella', 'Clostridium', 'Vibrio cholera'],
    answer: 2,
    explanation: 'Botulism is a serious food poisoning caused by toxins produced by Clostridium botulinum.'
  },
  {
    q: 'Organic acid found in the cell wall of bacteria is',
    options: ['Oxaloacetic acid', 'Muramic acid', 'Salicylic acid', 'Pyruvic acid'],
    answer: 1,
    explanation: 'Muramic acid is a unique organic acid found in the peptidoglycan (murein) of bacterial cell walls.'
  },
  {
    q: 'The bacteria having a group of flagella at one end are called',
    options: ['Monotrichous', 'Lophotrichous', 'Atrichous', 'Peritrichous'],
    answer: 1,
    explanation: 'Lophotrichous bacteria have a tuft (group) of flagella at one end. Monotrichous have single flagellum at one end.'
  },
  {
    q: 'A bacterium was seen blue under the microscope after Gram\'s staining. It is',
    options: ['Mycobacterium', 'Clostridium', 'Gram negative bacteria', 'Gram positive bacteria'],
    answer: 3,
    explanation: 'Gram positive bacteria retain the crystal violet stain and appear blue/purple under microscope. Gram negative bacteria appear pink/red.'
  },
  {
    q: 'Spherical bacterium is referred as',
    options: ['Vibrio', 'Coccus', 'Bacillus', 'Spirillum'],
    answer: 1,
    explanation: 'Coccus (plural: cocci) is the term for spherical bacteria. Bacillus is rod-shaped, Vibrio is comma-shaped, Spirillum is spiral.'
  },
  {
    q: 'Which one of the following is absent in bacteria?',
    options: ['Cell wall', 'Nucleoid', 'Ribosome', 'Mitochondria'],
    answer: 3,
    explanation: 'Bacteria are prokaryotes and lack membrane-bound organelles including mitochondria. They have cell wall, nucleoid and ribosomes.'
  },
  {
    q: 'Rod shaped bacteria are called',
    options: ['Bacilli', 'Cocci', 'Spirilla', 'Commas'],
    answer: 0,
    explanation: 'Bacilli are rod-shaped bacteria. They can be single (bacillus), in pairs (diplobacilli) or in chains (streptobacilli).'
  },
  {
    q: 'Circular DNA is found in',
    options: ['Bacteria', 'Algae', 'Fungi', 'None of the above'],
    answer: 0,
    explanation: 'Bacteria have circular DNA (not linear). This circular DNA is located in the nucleoid region without a nuclear membrane.'
  },
  {
    q: 'The bacteria having flagella distributed all over the cell wall is',
    options: ['Lophotrichous', 'Amphitrichous', 'Peritrichous', 'Monotrichous'],
    answer: 2,
    explanation: 'Peritrichous bacteria have flagella distributed all over the cell surface. E. coli is a common example.'
  },
  {
    q: 'Bacteria in an ecosystem acts as',
    options: ['Producer', 'Primary consumer', 'Secondary consumer', 'Decomposer'],
    answer: 3,
    explanation: 'Most bacteria act as decomposers in an ecosystem, breaking down dead organic matter and recycling nutrients.'
  },
  {
    q: 'Bacteria was discovered by',
    options: ['Robert Koch', 'Robert Hooke', 'Louis Pasteur', 'Leeuwenhoek'],
    answer: 3,
    explanation: 'Antonie van Leeuwenhoek discovered bacteria in 1676 using his simple microscope. He called them animalcules.'
  },
  {
    q: 'Which wavelength of light carries out photosynthesis in bacteria?',
    options: ['Ultra-violet', 'Blue', 'Red', 'Far-red'],
    answer: 3,
    explanation: 'Photosynthetic bacteria use far-red or infrared wavelength of light for photosynthesis, unlike plants which use red and blue.'
  },
  {
    q: 'A bacteria protects itself from host because of',
    options: ['Cell wall', 'Endospore formation', 'Cell membrane', 'Plasmids'],
    answer: 1,
    explanation: 'Endospore formation helps bacteria protect themselves from harsh conditions including host immune responses. Endospores are extremely resistant structures.'
  },
  {
    q: 'A bacterial cell divides every 20 minutes. How many bacteria will be formed after 3 hours?',
    options: ['64', '128', '512', '1024'],
    answer: 2,
    explanation: '3 hours = 180 minutes. Number of divisions = 180/20 = 9. Number of bacteria = 2^9 = 512.'
  },
  {
    q: 'Vitamin B12 is synthesized during retting of fibres using',
    options: ['Lactobacillus bulgaricus', 'Pseudomonas denitrificans', 'Aspergillus niger', 'Clostridium butyricum'],
    answer: 1,
    explanation: 'Pseudomonas denitrificans is used in the industrial production of Vitamin B12 during retting of fibres.'
  },
  {
    q: 'Plasmid is',
    options: [
      'Extrachromosomal DNA of bacteria',
      'Small particles of RNA and protein',
      'Small coils of RNA',
      'DNA incorporated in bacterial chromosome'
    ],
    answer: 0,
    explanation: 'Plasmid is extrachromosomal, circular, double-stranded DNA found in bacteria. It replicates independently of chromosomal DNA.'
  },
  {
    q: 'The bacteria without flagella is',
    options: ['Monotrichous', 'Peritrichous', 'Amphitrichous', 'Atrichous'],
    answer: 3,
    explanation: 'Atrichous bacteria completely lack flagella and are non-motile. Examples include Streptococcus and Staphylococcus.'
  },
  {
    q: 'Bacteria are',
    options: ['Producer', 'Consumer', 'Decomposer', 'Photo sensitizer'],
    answer: 2,
    explanation: 'Most bacteria are decomposers that break down dead organic matter. Some are producers (photosynthetic bacteria) but decomposers are the majority.'
  },
  {
    q: 'Which of the following is free living aerobic non-photosynthetic nitrogen fixing bacterium?',
    options: ['Nostoc', 'Azospirillum', 'Rhizobium', 'Azotobacter'],
    answer: 3,
    explanation: 'Azotobacter is a free living, aerobic, non-photosynthetic nitrogen fixing bacterium found in soil.'
  },
  {
    q: 'Which of the following is Nitrifying bacteria?',
    options: ['Pseudomonas', 'Nitrobacter', 'Azotobacter', 'Rhizobium'],
    answer: 1,
    explanation: 'Nitrobacter is a nitrifying bacteria that converts nitrites to nitrates. Nitrosomonas converts ammonia to nitrites.'
  },
  {
    q: 'Little leaf of brinjal is caused by',
    options: ['Bacteria', 'Virus', 'Mycoplasma', 'Fungi'],
    answer: 2,
    explanation: 'Little leaf of brinjal is caused by Mycoplasma (phytoplasma). Mycoplasmas are the smallest known free-living organisms.'
  },
  {
    q: 'Which is incorrect about bacteria?',
    options: ['They lack cell wall', 'Few are chemoheterotrophs', 'They have cell wall', 'None'],
    answer: 0,
    explanation: 'Bacteria do have cell wall made of peptidoglycan (murein). The statement "they lack cell wall" is incorrect.'
  },
  {
    q: 'Which of the following is absent in bacteria?',
    options: ['Cell wall', 'Cytoplasm', 'DNA', 'Endoplasmic reticulum'],
    answer: 3,
    explanation: 'Endoplasmic reticulum is a membrane-bound organelle absent in prokaryotic bacteria. Bacteria lack all membrane-bound organelles.'
  },
  {
    q: 'Which of the following bacteria is mainly used in the preparation of chloramphenicol drug?',
    options: ['Clostridium butericum', 'Streptomyces venezuelae', 'Bacillus subtilis', 'Pseudomonas denitrificans'],
    answer: 1,
    explanation: 'Chloramphenicol antibiotic is produced by Streptomyces venezuelae. It is a broad spectrum antibiotic.'
  },
  {
    q: 'Which type of DNA is found in bacteria?',
    options: ['Straight DNA', 'Membrane bound DNA', 'Helical DNA', 'Circular free DNA'],
    answer: 3,
    explanation: 'Bacteria have circular free DNA (not enclosed in a nucleus). It is located in the nucleoid region of the cell.'
  },
  {
    q: 'Nostoc is found symbiotic with',
    options: ['Anaebaena', 'Aulosira', 'Anthoceros', 'All'],
    answer: 2,
    explanation: 'Nostoc is found as endophyte (symbiotic) in Anthoceros (hornwort). It fixes nitrogen for the plant.'
  },
  {
    q: 'Rhizobium fixes nitrogen as',
    options: ['NH3', 'Nitrites', 'Ammonium phosphate', 'Urea'],
    answer: 0,
    explanation: 'Rhizobium fixes atmospheric nitrogen as ammonia (NH3) in the root nodules of leguminous plants.'
  },
  {
    q: 'Which of the following is not found in bacteria?',
    options: ['Cell wall', 'Nucleoid', 'Ribosome', 'Mitochondria'],
    answer: 3,
    explanation: 'Mitochondria are membrane-bound organelles absent in bacteria. Bacteria are prokaryotes lacking all membrane-bound organelles.'
  },
  {
    q: 'Which of the following bacteria is used in preparation of vinegar?',
    options: ['Acetobacter', 'Lactobacillus', 'Rhizobium', 'Clostridium'],
    answer: 0,
    explanation: 'Acetobacter aceti is used in the preparation of vinegar. It oxidizes ethanol to acetic acid.'
  },
],
'virus': [
  {
    q: 'Viruses are considered as living organisms because they',
    options: ['Can crystallize', 'Have cellular structure', 'Can reproduce inside host', 'Have metabolism'],
    answer: 2,
    explanation: 'Viruses are considered living because they can reproduce, but only inside a living host cell using host machinery.'
  },
  {
    q: 'TMV (Tobacco Mosaic Virus) was crystallized by',
    options: ['D.J. Ivanowski', 'W.M. Stanley', 'Beijerinck', 'Pasteur'],
    answer: 1,
    explanation: 'W.M. Stanley crystallized TMV in 1935 and showed it was a nucleoprotein. He received Nobel Prize for this work.'
  },
  {
    q: 'The genetic material in HIV is',
    options: ['Single stranded DNA', 'Double stranded DNA', 'Single stranded RNA', 'Double stranded RNA'],
    answer: 2,
    explanation: 'HIV is a retrovirus containing single stranded RNA as its genetic material. It uses reverse transcriptase to convert RNA to DNA.'
  },
  {
    q: 'Bacteriophage was discovered by',
    options: ['Twort and D\'Herelle', 'Stanley', 'Ivanowski', 'Beijerinck'],
    answer: 0,
    explanation: 'Bacteriophage was independently discovered by Frederick Twort in 1915 and Felix d\'Herelle in 1917.'
  },
  {
    q: 'Viruses that infect bacteria are called',
    options: ['Bacteriophage', 'Viroid', 'Prion', 'Retrovirus'],
    answer: 0,
    explanation: 'Bacteriophages (phages) are viruses that specifically infect bacteria. They inject their DNA into bacterial cells.'
  },
  {
    q: 'The protein coat of virus is called',
    options: ['Capsomere', 'Capsid', 'Envelope', 'Nucleocapsid'],
    answer: 1,
    explanation: 'The protein coat surrounding the nucleic acid of a virus is called capsid. It is made up of protein subunits called capsomeres.'
  },
  {
    q: 'Which of the following disease is caused by virus?',
    options: ['Cholera', 'Typhoid', 'Tuberculosis', 'AIDS'],
    answer: 3,
    explanation: 'AIDS is caused by HIV (Human Immunodeficiency Virus). Cholera, Typhoid and TB are caused by bacteria.'
  },
  {
    q: 'Tobacco mosaic virus contains',
    options: ['DNA only', 'RNA only', 'Both DNA and RNA', 'Neither DNA nor RNA'],
    answer: 1,
    explanation: 'Tobacco Mosaic Virus (TMV) contains only single stranded RNA as its genetic material, no DNA.'
  },
  {
    q: 'Virus was first discovered by',
    options: ['Stanley', 'Ivanowski', 'Beijerinck', 'Pasteur'],
    answer: 1,
    explanation: 'D.J. Ivanowski first discovered viruses in 1892 while studying tobacco mosaic disease. He found the causative agent passed through bacterial filters.'
  },
  {
    q: 'Which of the following is a retrovirus?',
    options: ['TMV', 'T4 phage', 'HIV', 'Adenovirus'],
    answer: 2,
    explanation: 'HIV is a retrovirus. Retroviruses contain RNA and use reverse transcriptase enzyme to make DNA from RNA.'
  },
  {
    q: 'Prions are',
    options: ['Small RNA without protein coat', 'Infectious proteins without nucleic acid', 'DNA viruses', 'RNA viruses'],
    answer: 1,
    explanation: 'Prions are infectious proteins without any nucleic acid. They cause diseases like mad cow disease and Creutzfeldt-Jakob disease.'
  },
  {
    q: 'Viroids are',
    options: ['Small RNA without protein coat', 'Infectious proteins', 'Small DNA virus', 'Defective virus'],
    answer: 0,
    explanation: 'Viroids are the smallest infectious agents consisting of small circular RNA without any protein coat. They cause plant diseases.'
  },
  {
    q: 'The shape of TMV is',
    options: ['Spherical', 'Helical', 'Cubical', 'Complex'],
    answer: 1,
    explanation: 'TMV (Tobacco Mosaic Virus) has a helical (rod-like) shape. The RNA is wound in a helix surrounded by protein capsomeres.'
  },
  {
    q: 'AIDS is caused by',
    options: ['Bacteria', 'Fungus', 'Protozoa', 'Virus'],
    answer: 3,
    explanation: 'AIDS (Acquired Immunodeficiency Syndrome) is caused by HIV (Human Immunodeficiency Virus), a retrovirus.'
  },
  {
    q: 'Which of the following is the smallest virus?',
    options: ['TMV', 'Parvovirus', 'Adenovirus', 'Poxvirus'],
    answer: 1,
    explanation: 'Parvovirus is the smallest known virus with a diameter of about 18-26 nm. Poxvirus is the largest animal virus.'
  },
  {
    q: 'The nucleic acid present in bacteriophage is',
    options: ['RNA only', 'DNA only', 'Both DNA and RNA', 'Neither'],
    answer: 1,
    explanation: 'Bacteriophage T4 contains double stranded DNA as its genetic material.'
  },
  {
    q: 'Reverse transcriptase enzyme is found in',
    options: ['Bacteriophage', 'TMV', 'Retrovirus', 'Adenovirus'],
    answer: 2,
    explanation: 'Reverse transcriptase is found in retroviruses like HIV. It converts RNA into DNA (reverse of normal transcription).'
  },
  {
    q: 'Which of the following is a plant disease caused by virus?',
    options: ['Late blight', 'Loose smut', 'Mosaic disease', 'Tikka disease'],
    answer: 2,
    explanation: 'Mosaic disease of tobacco, tomato, and other plants is caused by viruses like TMV. The others are fungal diseases.'
  },
  {
    q: 'The lytic cycle of bacteriophage involves',
    options: [
      'Integration of viral DNA into host chromosome',
      'Destruction of host cell',
      'Dormancy of viral DNA',
      'Slow release of virions'
    ],
    answer: 1,
    explanation: 'In the lytic cycle, the virus replicates inside the host cell and causes its destruction (lysis) to release new virions.'
  },
  {
    q: 'Virus contains',
    options: ['Only nucleic acid', 'Only protein', 'Nucleic acid and protein', 'Cell organelles'],
    answer: 2,
    explanation: 'Viruses are made of nucleic acid (DNA or RNA) surrounded by a protein coat (capsid). They have no cell organelles.'
  },
  {
    q: 'Which of the following has no cell wall?',
    options: ['Bacteria', 'Virus', 'Fungi', 'Algae'],
    answer: 1,
    explanation: 'Viruses do not have a cell wall. They have a protein coat called capsid. They are not true cells at all.'
  },
  {
    q: 'Foot and mouth disease in animals is caused by',
    options: ['Bacteria', 'Fungus', 'Virus', 'Prion'],
    answer: 2,
    explanation: 'Foot and mouth disease in cattle and other cloven-hoofed animals is caused by a picornavirus (RNA virus).'
  },
  {
    q: 'Influenza is caused by',
    options: ['Bacteria', 'Virus', 'Fungi', 'Protozoa'],
    answer: 1,
    explanation: 'Influenza (flu) is caused by Influenza virus. It is an RNA virus that causes respiratory infections.'
  },
  {
    q: 'Which of the following acts as genetic material in most viruses?',
    options: ['DNA only', 'RNA only', 'Either DNA or RNA', 'Both DNA and RNA simultaneously'],
    answer: 2,
    explanation: 'Viruses contain either DNA or RNA as genetic material, never both. DNA viruses include adenovirus, RNA viruses include TMV and HIV.'
  },
  {
    q: 'The protein subunits of the capsid are called',
    options: ['Capsid', 'Capsomeres', 'Nucleocapsid', 'Virion'],
    answer: 1,
    explanation: 'Capsomeres are the individual protein subunits that assemble to form the capsid (protein coat) of a virus.'
  },
  {
    q: 'Lysogenic cycle differs from lytic cycle because in lysogenic cycle',
    options: [
      'Host cell is immediately destroyed',
      'Viral DNA integrates into host chromosome',
      'Virus replicates rapidly',
      'Host cell produces new viruses immediately'
    ],
    answer: 1,
    explanation: 'In lysogenic cycle, viral DNA integrates into host chromosome as prophage and remains dormant. In lytic cycle, the host cell is immediately destroyed.'
  },
  {
    q: 'Mumps is caused by',
    options: ['Bacteria', 'Virus', 'Fungi', 'Worm'],
    answer: 1,
    explanation: 'Mumps is caused by Paramyxovirus. It causes swelling of the parotid salivary glands.'
  },
  {
    q: 'Which of the following viruses causes cancer?',
    options: ['TMV', 'Oncovirus', 'Bacteriophage', 'Adenovirus'],
    answer: 1,
    explanation: 'Oncoviruses are tumor-causing viruses. Examples include Human Papillomavirus (cervical cancer) and Hepatitis B virus (liver cancer).'
  },
  {
    q: 'Dengue fever is caused by',
    options: ['Bacteria', 'Protozoa', 'Virus', 'Fungi'],
    answer: 2,
    explanation: 'Dengue fever is caused by Dengue virus transmitted by Aedes mosquito. It is a flavivirus containing single stranded RNA.'
  },
  {
    q: 'T4 bacteriophage has',
    options: ['Helical symmetry', 'Icosahedral symmetry', 'Complex symmetry', 'Spherical symmetry'],
    answer: 2,
    explanation: 'T4 bacteriophage has complex symmetry with an icosahedral head and a helical tail — neither purely helical nor purely icosahedral.'
  },
  {
    q: 'Viruses are considered non-living because they',
    options: [
      'Can reproduce',
      'Lack cell structure and independent metabolism',
      'Have nucleic acid',
      'Can cause disease'
    ],
    answer: 1,
    explanation: 'Viruses are considered non-living because they lack cellular structure, cannot metabolize independently, and can be crystallized like non-living matter.'
  },
  {
    q: 'Which disease is caused by retrovirus?',
    options: ['Influenza', 'Hepatitis B', 'AIDS', 'Rabies'],
    answer: 2,
    explanation: 'AIDS is caused by HIV which is a retrovirus. Retroviruses use reverse transcriptase to convert their RNA genome into DNA.'
  },
  {
    q: 'Polio is caused by',
    options: ['Bacteria', 'Virus', 'Protozoa', 'Fungi'],
    answer: 1,
    explanation: 'Polio (Poliomyelitis) is caused by Poliovirus, an RNA virus that attacks the nervous system and can cause paralysis.'
  },
  {
    q: 'Which of the following is true about viruses?',
    options: [
      'They have both DNA and RNA',
      'They can grow outside host cell',
      'They are obligate intracellular parasites',
      'They have their own ribosomes'
    ],
    answer: 2,
    explanation: 'Viruses are obligate intracellular parasites — they can only replicate inside a living host cell using the host\'s machinery.'
  },
  {
    q: 'Hepatitis B is caused by',
    options: ['RNA virus', 'DNA virus', 'Prion', 'Bacteria'],
    answer: 1,
    explanation: 'Hepatitis B is caused by Hepatitis B virus (HBV) which is a DNA virus. Hepatitis C is caused by an RNA virus.'
  },
  {
    q: 'The largest virus is',
    options: ['TMV', 'Bacteriophage', 'Poxvirus', 'Adenovirus'],
    answer: 2,
    explanation: 'Poxvirus (e.g., Smallpox virus) is the largest animal virus visible under light microscope. It can be up to 450nm.'
  },
  {
    q: 'Smallpox is caused by',
    options: ['Bacteria', 'Virus', 'Fungi', 'Protozoa'],
    answer: 1,
    explanation: 'Smallpox is caused by Variola virus (Poxvirus). It has been eradicated globally through vaccination.'
  },
  {
    q: 'HIV infects which cells?',
    options: ['Red blood cells', 'T-helper lymphocytes', 'B lymphocytes', 'Platelets'],
    answer: 1,
    explanation: 'HIV specifically targets and destroys CD4+ T-helper lymphocytes (T4 cells), weakening the immune system and leading to AIDS.'
  },
  {
    q: 'Which of the following is an RNA virus?',
    options: ['Adenovirus', 'Herpes virus', 'Poxvirus', 'HIV'],
    answer: 3,
    explanation: 'HIV is an RNA virus (retrovirus). Adenovirus, Herpes virus and Poxvirus are all DNA viruses.'
  },
  {
    q: 'Rabies is caused by',
    options: ['Bacteria', 'Virus', 'Protozoa', 'Fungi'],
    answer: 1,
    explanation: 'Rabies is caused by Rabies virus (Lyssavirus), a bullet-shaped RNA virus transmitted through the bite of infected animals.'
  },
  {
    q: 'Which enzyme is used by HIV to integrate into host genome?',
    options: ['Reverse transcriptase only', 'Integrase only', 'Both reverse transcriptase and integrase', 'Protease only'],
    answer: 2,
    explanation: 'HIV uses reverse transcriptase to convert its RNA to DNA, then integrase to integrate the viral DNA into the host chromosome.'
  },
  {
    q: 'Measles is caused by',
    options: ['Bacteria', 'Virus', 'Fungi', 'Protozoa'],
    answer: 1,
    explanation: 'Measles is caused by Measles virus (Morbillivirus), a paramyxovirus. It causes fever, rash and respiratory symptoms.'
  },
  {
    q: 'The term virus was coined by',
    options: ['Ivanowski', 'Pasteur', 'Beijerinck', 'Stanley'],
    answer: 2,
    explanation: 'Martinus Beijerinck coined the term "virus" (meaning poison in Latin) in 1898 after his experiments with tobacco mosaic disease.'
  },
  {
    q: 'Chickenpox is caused by',
    options: ['Bacteria', 'Fungus', 'Virus', 'Protozoa'],
    answer: 2,
    explanation: 'Chickenpox is caused by Varicella-Zoster virus (VZV), a DNA virus belonging to the Herpesviridae family.'
  },
],
'algae': [
  {
    q: 'Algae are included in which kingdom?',
    options: ['Monera', 'Protista', 'Plantae', 'Fungi'],
    answer: 1,
    explanation: 'Most algae are included in kingdom Protista. However, some classifications place multicellular algae in Plantae.'
  },
  {
    q: 'Which pigment is found in red algae?',
    options: ['Chlorophyll a', 'Phycoerythrin', 'Phycocyanin', 'Fucoxanthin'],
    answer: 1,
    explanation: 'Phycoerythrin is the red pigment found in red algae (Rhodophyta). It masks the green colour of chlorophyll.'
  },
  {
    q: 'Agar agar is obtained from',
    options: ['Brown algae', 'Red algae', 'Green algae', 'Blue-green algae'],
    answer: 1,
    explanation: 'Agar agar is a gelatinous substance obtained from red algae like Gelidium and Gracilaria. It is used as culture media in microbiology.'
  },
  {
    q: 'Algin is obtained from',
    options: ['Red algae', 'Green algae', 'Brown algae', 'Blue-green algae'],
    answer: 2,
    explanation: 'Algin (alginic acid) is a polysaccharide obtained from brown algae (Phaeophyta). It is used as thickener in food industry.'
  },
  {
    q: 'Which algae is used as food in Japan?',
    options: ['Spirogyra', 'Chlorella', 'Porphyra', 'Ulva'],
    answer: 2,
    explanation: 'Porphyra (red alga) is used as food in Japan where it is called Nori. It is used to wrap sushi.'
  },
  {
    q: 'Chlorella belongs to',
    options: ['Red algae', 'Brown algae', 'Green algae', 'Blue-green algae'],
    answer: 2,
    explanation: 'Chlorella is a unicellular green alga belonging to division Chlorophyta. It is rich in protein and used as food supplement.'
  },
  {
    q: 'Diatomite or kieselguhr is obtained from',
    options: ['Red algae', 'Brown algae', 'Diatoms', 'Green algae'],
    answer: 2,
    explanation: 'Diatomite (kieselguhr) is formed from fossilized remains of diatoms. It is used as filtration aid and insulating material.'
  },
  {
    q: 'The connecting link between plants and animals is',
    options: ['Spirogyra', 'Volvox', 'Euglena', 'Chlamydomonas'],
    answer: 2,
    explanation: 'Euglena is considered a connecting link between plants and animals as it has characteristics of both — chloroplasts (plant) and locomotion with flagellum (animal).'
  },
  {
    q: 'Cell wall of diatoms is made of',
    options: ['Cellulose', 'Chitin', 'Silica', 'Pectin'],
    answer: 2,
    explanation: 'Cell wall of diatoms is made of silica (SiO2). The two overlapping halves are called epitheca and hypotheca.'
  },
  {
    q: 'Which alga is used as biofertilizer?',
    options: ['Spirogyra', 'Ulva', 'Anabaena', 'Fucus'],
    answer: 2,
    explanation: 'Anabaena (cyanobacterium/blue-green alga) is used as biofertilizer in rice fields because it fixes atmospheric nitrogen.'
  },
  {
    q: 'Reserve food material in red algae is',
    options: ['Starch', 'Floridean starch', 'Laminarin', 'Mannitol'],
    answer: 1,
    explanation: 'Floridean starch is the reserve food material in red algae (Rhodophyta). It is similar to glycogen and amylopectin.'
  },
  {
    q: 'Fucoxanthin pigment is found in',
    options: ['Red algae', 'Green algae', 'Brown algae', 'Blue-green algae'],
    answer: 2,
    explanation: 'Fucoxanthin is a brown carotenoid pigment found in brown algae (Phaeophyta). It gives them their characteristic brown colour.'
  },
  {
    q: 'Spirogyra is commonly known as',
    options: ['Sea lettuce', 'Pond scum', 'Sea weed', 'Rock weed'],
    answer: 1,
    explanation: 'Spirogyra is commonly known as pond scum or water silk due to its slippery texture and occurrence in ponds.'
  },
  {
    q: 'Which of the following is a unicellular alga?',
    options: ['Ulva', 'Spirogyra', 'Chlamydomonas', 'Fucus'],
    answer: 2,
    explanation: 'Chlamydomonas is a unicellular green alga. Ulva is multicellular sheet-like, Spirogyra is filamentous, Fucus is a brown alga.'
  },
  {
    q: 'Carrageenan is obtained from',
    options: ['Brown algae', 'Green algae', 'Red algae', 'Diatoms'],
    answer: 2,
    explanation: 'Carrageenan is a polysaccharide obtained from red algae like Chondrus and Eucheuma. It is used as food thickener.'
  },
  {
    q: 'Which alga is used in space research as food and oxygen supplier?',
    options: ['Spirogyra', 'Chlorella', 'Chlamydomonas', 'Volvox'],
    answer: 1,
    explanation: 'Chlorella is used in space research because it grows rapidly, produces oxygen through photosynthesis and is rich in protein for food.'
  },
  {
    q: 'Ulva is commonly known as',
    options: ['Sea lettuce', 'Pond scum', 'Kelp', 'Rock weed'],
    answer: 0,
    explanation: 'Ulva is commonly known as sea lettuce. It is a green alga found in marine environments with a flat sheet-like thallus.'
  },
  {
    q: 'The largest alga is',
    options: ['Spirogyra', 'Macrocystis', 'Ulva', 'Chara'],
    answer: 1,
    explanation: 'Macrocystis pyrifera (giant kelp) is the largest alga that can grow up to 60 meters in length. It is a brown alga.'
  },
  {
    q: 'Laminaria belongs to',
    options: ['Red algae', 'Brown algae', 'Green algae', 'Cyanobacteria'],
    answer: 1,
    explanation: 'Laminaria is a brown alga (Phaeophyta). It is a source of iodine, alginic acid and laminarin.'
  },
  {
    q: 'Red colour of red algae is due to',
    options: ['Chlorophyll', 'Carotenoids', 'Phycoerythrin', 'Phycocyanin'],
    answer: 2,
    explanation: 'Red colour of red algae (Rhodophyta) is due to the pigment phycoerythrin which masks the green colour of chlorophyll.'
  },
  {
    q: 'Pyrenoid is associated with',
    options: ['Protein synthesis', 'Starch synthesis', 'Fat synthesis', 'DNA synthesis'],
    answer: 1,
    explanation: 'Pyrenoid is a protein body associated with chloroplast in algae. It is the centre of starch synthesis and CO2 fixation.'
  },
  {
    q: 'Which of the following is a marine alga?',
    options: ['Spirogyra', 'Volvox', 'Fucus', 'Chlamydomonas'],
    answer: 2,
    explanation: 'Fucus is a marine brown alga found in intertidal zones. Spirogyra, Volvox and Chlamydomonas are freshwater algae.'
  },
  {
    q: 'Iodine is commercially obtained from',
    options: ['Green algae', 'Red algae', 'Brown algae', 'Diatoms'],
    answer: 2,
    explanation: 'Iodine is commercially obtained from brown algae like Laminaria and Fucus. They concentrate iodine from sea water.'
  },
  {
    q: 'Which pigment is responsible for blue-green colour of cyanobacteria?',
    options: ['Chlorophyll a only', 'Phycocyanin only', 'Both chlorophyll and phycocyanin', 'Phycoerythrin'],
    answer: 2,
    explanation: 'The blue-green colour of cyanobacteria is due to both chlorophyll a (green) and phycocyanin (blue) pigments together.'
  },
  {
    q: 'Volvox is an example of',
    options: ['Unicellular alga', 'Filamentous alga', 'Colonial alga', 'Parenchymatous alga'],
    answer: 2,
    explanation: 'Volvox is a colonial green alga. A Volvox colony consists of hundreds to thousands of individual cells arranged in a hollow sphere.'
  },
  {
    q: 'The study of algae is called',
    options: ['Mycology', 'Phycology', 'Bryology', 'Pteridology'],
    answer: 1,
    explanation: 'Phycology (or algology) is the branch of botany dealing with the study of algae. A scientist who studies algae is a phycologist.'
  },
  {
    q: 'Reserve food in brown algae is',
    options: ['Starch', 'Floridean starch', 'Laminarin and mannitol', 'Glycogen'],
    answer: 2,
    explanation: 'Reserve food material in brown algae is laminarin (polysaccharide) and mannitol (sugar alcohol).'
  },
  {
    q: 'Which of the following is used in treatment of goitre?',
    options: ['Chlorella', 'Laminaria', 'Gelidium', 'Nostoc'],
    answer: 1,
    explanation: 'Laminaria (kelp) is used in treatment of goitre because it is rich in iodine which is needed for thyroid hormone synthesis.'
  },
  {
    q: 'Chara belongs to which division?',
    options: ['Chlorophyta', 'Charophyta', 'Phaeophyta', 'Rhodophyta'],
    answer: 1,
    explanation: 'Chara belongs to division Charophyta. It is also called stonewort because of calcium carbonate deposition on its surface.'
  },
  {
    q: 'Which of the following is used as indicator of water pollution?',
    options: ['Spirogyra', 'Cladophora', 'Chlorella', 'Oscillatoria'],
    answer: 3,
    explanation: 'Oscillatoria (cyanobacterium) is used as a bioindicator of water pollution. Its bloom indicates eutrophication.'
  },
  {
    q: 'Dinoflagellates are responsible for',
    options: ['Red tides', 'Green tides', 'Blue tides', 'Brown tides'],
    answer: 0,
    explanation: 'Dinoflagellates like Gonyaulax cause red tides (harmful algal blooms) in oceans due to their massive population explosions.'
  },
  {
    q: 'Holdfast in algae is used for',
    options: ['Photosynthesis', 'Reproduction', 'Attachment to substrate', 'Absorption of nutrients'],
    answer: 2,
    explanation: 'Holdfast is a root-like structure in algae used for attachment to rocks or substrate. It does not absorb nutrients like roots.'
  },
  {
    q: 'Which algae reproduces by conjugation?',
    options: ['Chlamydomonas', 'Spirogyra', 'Ulva', 'Volvox'],
    answer: 1,
    explanation: 'Spirogyra reproduces sexually by conjugation where the contents of two cells fuse through conjugation tubes to form a zygospore.'
  },
  {
    q: 'Chloroplast in Spirogyra is',
    options: ['Cup shaped', 'Spiral ribbon shaped', 'Star shaped', 'Disc shaped'],
    answer: 1,
    explanation: 'Spirogyra has spiral ribbon-shaped chloroplasts which give it its name. The chloroplasts have serrated edges.'
  },
  {
    q: 'The term phycology comes from Greek word phykos meaning',
    options: ['Plant', 'Alga/seaweed', 'Water', 'Green'],
    answer: 1,
    explanation: 'The term phycology comes from the Greek word "phykos" meaning alga or seaweed. It is the scientific study of algae.'
  },
  {
    q: 'Which alga is used as sewage treatment?',
    options: ['Spirogyra', 'Chlorella', 'Nostoc', 'Fucus'],
    answer: 1,
    explanation: 'Chlorella is used in sewage treatment as it can absorb nutrients like nitrogen and phosphorus from wastewater through photosynthesis.'
  },
  {
    q: 'Reproduction in Ulva shows',
    options: ['Only sexual reproduction', 'Only asexual reproduction', 'Alternation of generation', 'Vegetative reproduction only'],
    answer: 2,
    explanation: 'Ulva shows alternation of generation with isomorphic gametophyte and sporophyte generations that look identical.'
  },
  {
    q: 'Which of the following is the source of agar used in laboratories?',
    options: ['Fucus', 'Gelidium', 'Laminaria', 'Spirogyra'],
    answer: 1,
    explanation: 'Agar is commercially extracted from red algae mainly Gelidium and Gracilaria. It is used as culture medium in microbiology labs.'
  },
  {
    q: 'Pigments in green algae are',
    options: ['Chlorophyll a and b', 'Chlorophyll a and phycocyanin', 'Chlorophyll a and fucoxanthin', 'Chlorophyll a and phycoerythrin'],
    answer: 0,
    explanation: 'Green algae (Chlorophyta) contain chlorophyll a and b as their main pigments, same as higher plants. This supports the theory that plants evolved from green algae.'
  },
  {
    q: 'Which of the following is a freshwater alga?',
    options: ['Fucus', 'Laminaria', 'Sargassum', 'Spirogyra'],
    answer: 3,
    explanation: 'Spirogyra is a freshwater filamentous green alga commonly found in ponds and slow-moving streams. The other three are marine brown algae.'
  },
  {
    q: 'Diatoms are also called',
    options: ['Jewels of the sea', 'Grass of the sea', 'Weeds of the sea', 'Flowers of the sea'],
    answer: 0,
    explanation: 'Diatoms are called jewels of the sea because of their beautiful and intricate silica cell walls (frustules) that look like glass ornaments.'
  },
  {
    q: 'Sargassum is a',
    options: ['Red alga', 'Green alga', 'Brown alga', 'Blue-green alga'],
    answer: 2,
    explanation: 'Sargassum is a brown alga that forms the famous Sargasso Sea. It has air bladders for flotation.'
  },
  {
    q: 'Economic importance of algae includes',
    options: ['Source of food', 'Source of agar and algin', 'Used in sewage treatment', 'All of the above'],
    answer: 3,
    explanation: 'Algae have multiple economic uses including food (Porphyra), industrial materials (agar, algin, carrageenan), sewage treatment and as biofertilizer.'
  },
  {
    q: 'Gelidium and Gracilaria are',
    options: ['Green algae', 'Brown algae', 'Red algae', 'Diatoms'],
    answer: 2,
    explanation: 'Gelidium and Gracilaria are red algae (Rhodophyta) commercially important as sources of agar used in microbiology laboratories.'
  },
  {
    q: 'The eye spot in Chlamydomonas is sensitive to',
    options: ['Temperature', 'Gravity', 'Light', 'Chemical stimuli'],
    answer: 2,
    explanation: 'The eye spot (stigma) in Chlamydomonas is photosensitive. It helps the organism detect light direction for phototaxis.'
  },
  {
    q: 'Which of the following shows isogamy?',
    options: ['Chlamydomonas reinhardtii', 'Fucus', 'Volvox', 'Spirogyra'],
    answer: 0,
    explanation: 'Some species of Chlamydomonas show isogamy where the fusing gametes are morphologically identical.'
  },
  {
    q: 'Kelp is a common name for',
    options: ['Large brown algae', 'Large red algae', 'Large green algae', 'Diatoms'],
    answer: 0,
    explanation: 'Kelp is the common name for large brown algae like Macrocystis, Laminaria and Nereocystis that form underwater kelp forests.'
  },
  {
    q: 'Nostoc is',
    options: ['Unicellular green alga', 'Filamentous cyanobacterium', 'Unicellular diatom', 'Colonial brown alga'],
    answer: 1,
    explanation: 'Nostoc is a filamentous cyanobacterium (blue-green alga) that forms bead-like chains of cells. It can fix atmospheric nitrogen.'
  },
  {
    q: 'Which of the following is used as single cell protein?',
    options: ['Spirogyra', 'Chlorella', 'Fucus', 'Chara'],
    answer: 1,
    explanation: 'Chlorella is used as single cell protein (SCP) because it is rich in protein, vitamins and minerals. It grows rapidly and is easy to culture.'
  },
  {
    q: 'The stipe in brown algae is analogous to',
    options: ['Root', 'Stem', 'Leaf', 'Flower'],
    answer: 1,
    explanation: 'The stipe in brown algae is analogous to the stem of higher plants. It provides mechanical support to the alga.'
  },
  {
    q: 'Heterocysts in cyanobacteria are related to',
    options: ['Photosynthesis', 'Nitrogen fixation', 'Reproduction', 'Food storage'],
    answer: 1,
    explanation: 'Heterocysts are specialized thick-walled cells in cyanobacteria like Anabaena that are the sites of nitrogen fixation.'
  },
  {
    q: 'The pigment responsible for photosynthesis in all algae is',
    options: ['Chlorophyll a', 'Chlorophyll b', 'Phycoerythrin', 'Fucoxanthin'],
    answer: 0,
    explanation: 'Chlorophyll a is the primary photosynthetic pigment present in all algae and plants. Other pigments are accessory pigments.'
  },
  {
    q: 'Oscillatoria reproduces by',
    options: ['Binary fission', 'Fragmentation', 'Spore formation', 'Conjugation'],
    answer: 1,
    explanation: 'Oscillatoria reproduces mainly by fragmentation — the filament breaks into small pieces called hormogonia which grow into new filaments.'
  },
  {
    q: 'Which is the most primitive type of sexual reproduction found in algae?',
    options: ['Oogamy', 'Anisogamy', 'Isogamy', 'Conjugation'],
    answer: 2,
    explanation: 'Isogamy is the most primitive type of sexual reproduction where two morphologically similar gametes fuse together.'
  },
  {
    q: 'Mannitol as reserve food is found in',
    options: ['Red algae', 'Green algae', 'Brown algae', 'Cyanobacteria'],
    answer: 2,
    explanation: 'Mannitol is a sugar alcohol found as reserve food in brown algae along with laminarin.'
  },
  {
    q: 'Which algae is used as soil conditioner?',
    options: ['Spirogyra', 'Chara', 'Sargassum', 'Nostoc'],
    answer: 1,
    explanation: 'Chara (stonewort) is used as soil conditioner. The calcium carbonate deposited on its surface helps neutralize acidic soils.'
  },
  {
    q: 'Palmella stage is found in',
    options: ['Spirogyra', 'Chlamydomonas', 'Volvox', 'Ulva'],
    answer: 1,
    explanation: 'Palmella stage is a non-motile colonial stage found in Chlamydomonas where cells remain embedded in mucilage after losing flagella.'
  },
  {
    q: 'The cell wall in green algae is mainly composed of',
    options: ['Chitin', 'Cellulose', 'Peptidoglycan', 'Silica'],
    answer: 1,
    explanation: 'Cell wall in green algae is mainly composed of cellulose, similar to higher plants. This is one reason green algae are considered ancestors of plants.'
  },
  {
    q: 'Which algae produces antibiotic chlorellin?',
    options: ['Spirogyra', 'Chlorella', 'Nostoc', 'Chlamydomonas'],
    answer: 1,
    explanation: 'Chlorella produces an antibiotic substance called chlorellin that inhibits the growth of many bacteria and fungi.'
  },
  {
    q: 'Red Snow is caused by',
    options: ['Oscillatoria', 'Chlamydomonas nivalis', 'Nostoc', 'Spirogyra'],
    answer: 1,
    explanation: 'Red snow is caused by Chlamydomonas nivalis, a green alga containing red pigment astaxanthin that grows on snow at high altitudes.'
  },
  {
    q: 'Water bloom is caused by',
    options: ['Green algae', 'Red algae', 'Cyanobacteria', 'Diatoms'],
    answer: 2,
    explanation: 'Water bloom (algal bloom) is caused by rapid multiplication of cyanobacteria like Microcystis and Anabaena in nutrient-rich water.'
  },
  {
    q: 'Which of the following is both autotrophic and heterotrophic?',
    options: ['Chlamydomonas', 'Euglena', 'Spirogyra', 'Nostoc'],
    answer: 1,
    explanation: 'Euglena can be both autotrophic (photosynthesis in light) and heterotrophic (absorbs organic matter in dark), making it a mixotroph.'
  },
  {
    q: 'Sargassum is found in',
    options: ['Fresh water', 'Sargasso Sea', 'Arctic Ocean', 'Ponds'],
    answer: 1,
    explanation: 'Sargassum is a brown alga abundantly found floating in the Sargasso Sea in the North Atlantic Ocean.'
  },
  {
    q: 'Floridean starch is chemically similar to',
    options: ['Cellulose', 'Glycogen and amylopectin', 'Laminarin', 'Mannitol'],
    answer: 1,
    explanation: 'Floridean starch (reserve food of red algae) is chemically similar to glycogen and amylopectin. It lacks amylose.'
  },
  {
    q: 'Which of the following algae is used to study meiosis?',
    options: ['Spirogyra', 'Chlamydomonas', 'Fucus', 'Chara'],
    answer: 1,
    explanation: 'Chlamydomonas is used to study meiosis because it is haploid for most of its life cycle and meiosis occurs immediately after zygote formation.'
  },
  {
    q: 'Alginic acid is used in',
    options: ['Food industry as thickener', 'Medicine as antibiotic', 'Agriculture as pesticide', 'Industry as fuel'],
    answer: 0,
    explanation: 'Alginic acid (algin) from brown algae is used in food industry as thickener, stabilizer and emulsifier in ice cream, salad dressings etc.'
  },
  {
    q: 'Which of the following is called sea grass?',
    options: ['Ulva', 'Caulerpa', 'Fucus', 'Sargassum'],
    answer: 1,
    explanation: 'Caulerpa is sometimes called sea grass. It is a large unicellular (coenocytic) green alga without cross walls.'
  },
  {
    q: 'Which character of green algae is similar to bryophytes?',
    options: ['Chlorophyll a and b', 'Cell wall', 'Storage product starch', 'All of the above'],
    answer: 3,
    explanation: 'Green algae and bryophytes (and all higher plants) share chlorophyll a and b, cellulose cell wall and starch as storage product — supporting evolutionary relationship.'
  },
],
'fungi': [
  {
    q: 'The study of fungi is called',
    options: ['Phycology', 'Mycology', 'Bryology', 'Virology'],
    answer: 1,
    explanation: 'Mycology is the branch of biology dealing with the study of fungi. A scientist who studies fungi is called a mycologist.'
  },
  {
    q: 'Cell wall of fungi is made of',
    options: ['Cellulose', 'Chitin', 'Peptidoglycan', 'Murein'],
    answer: 1,
    explanation: 'Cell wall of fungi is made of chitin (a nitrogen-containing polysaccharide). This distinguishes fungi from plants which have cellulose cell walls.'
  },
  {
    q: 'Fungi are',
    options: ['Autotrophs', 'Heterotrophs', 'Chemotrophs', 'Lithotrophs'],
    answer: 1,
    explanation: 'Fungi are heterotrophs — they cannot make their own food. They absorb nutrients from dead or living organic matter.'
  },
  {
    q: 'The body of fungi is called',
    options: ['Thallus', 'Mycelium', 'Hyphae', 'Sporophyte'],
    answer: 1,
    explanation: 'The vegetative body of fungi is called mycelium which is made up of thread-like filaments called hyphae.'
  },
  {
    q: 'Penicillin is obtained from',
    options: ['Aspergillus', 'Penicillium', 'Rhizopus', 'Mucor'],
    answer: 1,
    explanation: 'Penicillin antibiotic is obtained from the fungus Penicillium notatum (now P. chrysogenum). It was discovered by Alexander Fleming in 1928.'
  },
  {
    q: 'Which fungi causes bread mould?',
    options: ['Aspergillus', 'Penicillium', 'Rhizopus', 'Yeast'],
    answer: 2,
    explanation: 'Rhizopus stolonifer (black bread mould) is the common fungus that causes bread mould. It belongs to class Zygomycetes.'
  },
  {
    q: 'Yeast is used in bread making because it produces',
    options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Hydrogen'],
    answer: 1,
    explanation: 'Yeast ferments sugars and produces carbon dioxide gas which causes bread dough to rise, making bread light and fluffy.'
  },
  {
    q: 'Mycorrhiza is an association between',
    options: ['Fungi and algae', 'Fungi and roots of higher plants', 'Fungi and bacteria', 'Fungi and cyanobacteria'],
    answer: 1,
    explanation: 'Mycorrhiza is a mutualistic symbiotic association between fungi and roots of higher plants. The fungi help the plant absorb water and minerals.'
  },
  {
    q: 'Which of the following is an edible fungus?',
    options: ['Amanita', 'Agaricus', 'Aspergillus', 'Ustilago'],
    answer: 1,
    explanation: 'Agaricus bisporus (button mushroom) is the most commonly eaten edible fungus. Amanita species are often deadly poisonous.'
  },
  {
    q: 'Aspergillus is used to produce',
    options: ['Citric acid', 'Penicillin', 'Insulin', 'Vitamin C'],
    answer: 0,
    explanation: 'Aspergillus niger is used in industrial production of citric acid. It is used in the food and beverage industry.'
  },
  {
    q: 'The mode of nutrition in fungi is',
    options: ['Autotrophic', 'Holozoic', 'Absorptive heterotrophic', 'Photosynthetic'],
    answer: 2,
    explanation: 'Fungi have absorptive heterotrophic nutrition — they secrete digestive enzymes outside and absorb the digested nutrients.'
  },
  {
    q: 'Ergot disease of rye is caused by',
    options: ['Puccinia', 'Ustilago', 'Claviceps', 'Alternaria'],
    answer: 2,
    explanation: 'Ergot disease of rye is caused by Claviceps purpurea (Ascomycetes). It produces alkaloids that cause ergotism in humans.'
  },
  {
    q: 'Which fungus is used in the production of beer and wine?',
    options: ['Penicillium', 'Aspergillus', 'Saccharomyces', 'Rhizopus'],
    answer: 2,
    explanation: 'Saccharomyces cerevisiae (baker\'s and brewer\'s yeast) is used in fermentation for production of beer, wine and bread.'
  },
  {
    q: 'Lichens are a symbiotic association between',
    options: ['Fungi and bacteria', 'Fungi and algae', 'Fungi and bryophytes', 'Algae and bacteria'],
    answer: 1,
    explanation: 'Lichens are a mutualistic symbiotic association between fungi (mycobiont) and algae or cyanobacteria (photobiont).'
  },
  {
    q: 'Late blight of potato is caused by',
    options: ['Pythium', 'Phytophthora', 'Albugo', 'Peronospora'],
    answer: 1,
    explanation: 'Late blight of potato is caused by Phytophthora infestans. It caused the Irish Potato Famine of 1845-1849.'
  },
  {
    q: 'Which of the following is a parasitic fungus?',
    options: ['Rhizopus', 'Penicillium', 'Puccinia', 'Aspergillus'],
    answer: 2,
    explanation: 'Puccinia is a parasitic fungus that causes rust disease in wheat and other plants. It is an obligate parasite.'
  },
  {
    q: 'Athlete\'s foot is caused by',
    options: ['Bacteria', 'Virus', 'Fungi', 'Protozoa'],
    answer: 2,
    explanation: 'Athlete\'s foot (Tinea pedis) is caused by dermatophytic fungi like Trichophyton and Epidermophyton.'
  },
  {
    q: 'Hyphae without cross walls are called',
    options: ['Septate hyphae', 'Aseptate hyphae', 'Coenocytic hyphae', 'Both b and c'],
    answer: 3,
    explanation: 'Hyphae without cross walls (septa) are called aseptate or coenocytic hyphae. They have multiple nuclei in a continuous cytoplasm.'
  },
  {
    q: 'Ringworm is caused by',
    options: ['Worm', 'Bacteria', 'Virus', 'Fungi'],
    answer: 3,
    explanation: 'Despite its name, ringworm is caused by dermatophytic fungi like Trichophyton and Microsporum, not by a worm.'
  },
  {
    q: 'Which of the following is used to make cheese?',
    options: ['Aspergillus', 'Penicillium', 'Rhizopus', 'Mucor'],
    answer: 1,
    explanation: 'Penicillium roqueforti and P. camemberti are used in making Roquefort and Camembert cheese respectively giving them distinctive flavour.'
  },
  {
    q: 'Fungi reproduce asexually by',
    options: ['Conidia and sporangiospores', 'Seeds', 'Binary fission only', 'Budding only'],
    answer: 0,
    explanation: 'Fungi reproduce asexually mainly by spores — conidia (in Ascomycetes) and sporangiospores (in Zygomycetes). Some also reproduce by budding.'
  },
  {
    q: 'The sexual spores of Basidiomycetes are called',
    options: ['Ascospores', 'Zygospores', 'Basidiospores', 'Oospores'],
    answer: 2,
    explanation: 'Basidiospores are the sexual spores of Basidiomycetes (club fungi). They are borne on club-shaped structures called basidia.'
  },
  {
    q: 'Smut disease of wheat is caused by',
    options: ['Puccinia', 'Ustilago', 'Claviceps', 'Aspergillus'],
    answer: 1,
    explanation: 'Smut disease of wheat is caused by Ustilago tritici. Smut fungi produce dark powdery masses of spores replacing grain.'
  },
  {
    q: 'Which class of fungi is called imperfect fungi?',
    options: ['Ascomycetes', 'Basidiomycetes', 'Zygomycetes', 'Deuteromycetes'],
    answer: 3,
    explanation: 'Deuteromycetes are called imperfect fungi (Fungi Imperfecti) because their sexual reproduction is unknown or absent.'
  },
  {
    q: 'Agaricus belongs to class',
    options: ['Ascomycetes', 'Basidiomycetes', 'Zygomycetes', 'Deuteromycetes'],
    answer: 1,
    explanation: 'Agaricus (mushroom) belongs to class Basidiomycetes. It produces basidiospores on gill-like structures under the cap.'
  },
  {
    q: 'Cyclosporin A used as immunosuppressant is obtained from',
    options: ['Aspergillus', 'Penicillium', 'Tolypocladium', 'Rhizopus'],
    answer: 2,
    explanation: 'Cyclosporin A is an immunosuppressant drug obtained from the fungus Tolypocladium inflatum. It is used in organ transplantation.'
  },
  {
    q: 'The edible part of mushroom is',
    options: ['Underground mycelium', 'Fruiting body', 'Rhizoids', 'Spores'],
    answer: 1,
    explanation: 'The edible part of mushroom is the fruiting body (basidiocarp) which consists of stipe (stalk) and pileus (cap) with gills.'
  },
  {
    q: 'Which of the following is correct about yeast?',
    options: ['It is multicellular', 'It belongs to Basidiomycetes', 'It reproduces by budding', 'It is a plant'],
    answer: 2,
    explanation: 'Yeast (Saccharomyces) is a unicellular fungus belonging to Ascomycetes that reproduces asexually by budding.'
  },
  {
    q: 'Rust disease of wheat is caused by',
    options: ['Puccinia', 'Ustilago', 'Claviceps', 'Alternaria'],
    answer: 0,
    explanation: 'Black rust (stem rust) of wheat is caused by Puccinia graminis tritici. It is an obligate parasite belonging to Basidiomycetes.'
  },
  {
    q: 'Which antibiotic is produced by Streptomyces?',
    options: ['Penicillin', 'Streptomycin', 'Tetracycline', 'Both b and c'],
    answer: 3,
    explanation: 'Streptomyces (actually a bacterium, often studied with fungi) produces both Streptomycin and Tetracycline antibiotics.'
  },
  {
    q: 'The fruiting body of Ascomycetes is called',
    options: ['Basidiocarp', 'Ascocarp', 'Sporocarp', 'Cleistothecium'],
    answer: 1,
    explanation: 'The fruiting body of Ascomycetes is called ascocarp. It contains sac-like structures called asci which bear ascospores.'
  },
  {
    q: 'Fungi are most closely related to',
    options: ['Plants', 'Bacteria', 'Animals', 'Algae'],
    answer: 2,
    explanation: 'Modern molecular studies show fungi are more closely related to animals than to plants. Both fungi and animals store glycogen and have chitin.'
  },
  {
    q: 'Which of the following fungi is bioluminescent?',
    options: ['Agaricus', 'Panus', 'Penicillium', 'Aspergillus'],
    answer: 1,
    explanation: 'Panus stipticus and some other mushrooms are bioluminescent (glow in the dark). This property is called foxfire or fairy fire.'
  },
  {
    q: 'Candidiasis is caused by',
    options: ['Candida albicans', 'Aspergillus fumigatus', 'Cryptococcus', 'Histoplasma'],
    answer: 0,
    explanation: 'Candidiasis (thrush) is caused by Candida albicans, an opportunistic fungal pathogen that affects mucous membranes.'
  },
  {
    q: 'Which of the following produces aflatoxin?',
    options: ['Aspergillus flavus', 'Penicillium', 'Rhizopus', 'Mucor'],
    answer: 0,
    explanation: 'Aflatoxin is a deadly carcinogenic mycotoxin produced by Aspergillus flavus and A. parasiticus. It contaminates stored grains and peanuts.'
  },
  {
    q: 'Sexual reproduction in Rhizopus results in formation of',
    options: ['Ascospore', 'Basidiospore', 'Zygospore', 'Oospore'],
    answer: 2,
    explanation: 'Sexual reproduction in Rhizopus (Zygomycetes) results in the formation of zygospore through conjugation of gametangia.'
  },
  {
    q: 'Which of the following is correct about fungi?',
    options: [
      'They are photosynthetic',
      'They have chloroplast',
      'They store food as glycogen',
      'They have cellulose cell wall'
    ],
    answer: 2,
    explanation: 'Fungi store reserve food as glycogen (like animals), not starch (like plants). They are non-photosynthetic and have chitin cell wall.'
  },
  {
    q: 'Morels and truffles belong to',
    options: ['Basidiomycetes', 'Ascomycetes', 'Zygomycetes', 'Deuteromycetes'],
    answer: 1,
    explanation: 'Morels (Morchella) and truffles (Tuber) are edible fungi belonging to Ascomycetes. They are highly prized as gourmet food.'
  },
  {
    q: 'The term mycorrhiza was coined by',
    options: ['Frank', 'Fleming', 'Pasteur', 'Koch'],
    answer: 0,
    explanation: 'The term mycorrhiza was coined by A.B. Frank in 1885. It comes from Greek words mykes (fungus) and rhiza (root).'
  },
  {
    q: 'Which of the following disease is caused by fungi?',
    options: ['Malaria', 'Tuberculosis', 'Aspergillosis', 'Typhoid'],
    answer: 2,
    explanation: 'Aspergillosis is a fungal disease caused by Aspergillus fumigatus. It mainly affects the lungs of immunocompromised patients.'
  },
  {
    q: 'Claviceps purpurea causes',
    options: ['Rust of wheat', 'Smut of wheat', 'Ergot of rye', 'Late blight of potato'],
    answer: 2,
    explanation: 'Claviceps purpurea causes ergot disease of rye. The sclerotia (ergots) contain alkaloids that cause hallucinations and convulsions.'
  },
  {
    q: 'Spores of fungi that are produced without meiosis are called',
    options: ['Basidiospores', 'Ascospores', 'Conidia', 'Oospores'],
    answer: 2,
    explanation: 'Conidia are asexual spores produced without meiosis at the tips of special hyphae called conidiophores. Common in Aspergillus and Penicillium.'
  },
  {
    q: 'Which of the following is not a fungal disease?',
    options: ['Ringworm', 'Athlete\'s foot', 'Malaria', 'Candidiasis'],
    answer: 2,
    explanation: 'Malaria is caused by Plasmodium (a protozoan), not a fungus. Ringworm, athlete\'s foot and candidiasis are all fungal diseases.'
  },
  {
    q: 'Ectomycorrhiza is characterized by',
    options: [
      'Fungi penetrating root cells',
      'Fungi forming sheath around root without penetrating cells',
      'Fungi living inside stem',
      'Fungi and root cells merging completely'
    ],
    answer: 1,
    explanation: 'In ectomycorrhiza, fungi form a sheath (mantle) around the root and grow between cells (Hartig net) without penetrating inside cells.'
  },
  {
    q: 'Penicillium belongs to class',
    options: ['Basidiomycetes', 'Zygomycetes', 'Ascomycetes', 'Deuteromycetes'],
    answer: 2,
    explanation: 'Penicillium belongs to class Ascomycetes (sac fungi). It produces conidia asexually and is the source of penicillin antibiotic.'
  },
  {
    q: 'Fungi that feed on dead organic matter are called',
    options: ['Parasites', 'Saprobes', 'Symbionts', 'Mutualists'],
    answer: 1,
    explanation: 'Saprobes (saprophytes) are fungi that feed on dead and decaying organic matter. They play vital role in decomposition and nutrient cycling.'
  },
  {
    q: 'The process of fermentation in yeast produces',
    options: ['Lactic acid and CO2', 'Ethanol and CO2', 'Acetic acid and CO2', 'Ethanol and O2'],
    answer: 1,
    explanation: 'During fermentation, yeast converts glucose into ethanol (alcohol) and carbon dioxide under anaerobic conditions.'
  },
  {
    q: 'Which of the following is a poisonous mushroom?',
    options: ['Agaricus bisporus', 'Pleurotus', 'Amanita phalloides', 'Morchella'],
    answer: 2,
    explanation: 'Amanita phalloides (death cap) is one of the most poisonous mushrooms. It contains amatoxins that cause liver failure.'
  },
  {
    q: 'Downy mildew of grape is caused by',
    options: ['Peronospora', 'Plasmopara viticola', 'Albugo', 'Phytophthora'],
    answer: 1,
    explanation: 'Downy mildew of grape is caused by Plasmopara viticola. It devastated European vineyards in the 19th century.'
  },
  {
    q: 'Reserve food material in fungi is',
    options: ['Starch', 'Glycogen', 'Cellulose', 'Laminarin'],
    answer: 1,
    explanation: 'Fungi store reserve food as glycogen (animal starch), not starch like plants. This is one reason fungi are more closely related to animals.'
  },
  {
    q: 'Which of the following is used in biocontrol of pests?',
    options: ['Aspergillus', 'Beauveria bassiana', 'Rhizopus', 'Mucor'],
    answer: 1,
    explanation: 'Beauveria bassiana is an entomopathogenic fungus used as a biocontrol agent against various insect pests.'
  },
  {
    q: 'The hyphae of Rhizopus that attach to substratum are called',
    options: ['Stolons', 'Rhizoids', 'Sporangiophores', 'Hyphae'],
    answer: 1,
    explanation: 'Rhizoids are root-like hyphae in Rhizopus that anchor it to the substrate and absorb nutrients. Stolons are horizontal connecting hyphae.'
  },
  {
    q: 'Which of the following is a plant disease caused by Ascomycetes?',
    options: ['Rust of wheat', 'Smut of corn', 'Powdery mildew', 'Late blight of potato'],
    answer: 2,
    explanation: 'Powdery mildew is caused by Ascomycetes fungi like Erysiphe. Rust and smut are Basidiomycetes, late blight is Oomycetes.'
  },
  {
    q: 'Ascospores are produced inside',
    options: ['Basidium', 'Ascus', 'Sporangium', 'Conidiophore'],
    answer: 1,
    explanation: 'Ascospores are produced inside sac-like structures called asci (singular: ascus) in Ascomycetes. Typically 8 ascospores are produced per ascus.'
  },
  {
    q: 'Which of the following is an obligate parasite?',
    options: ['Aspergillus', 'Penicillium', 'Puccinia', 'Rhizopus'],
    answer: 2,
    explanation: 'Puccinia (rust fungus) is an obligate parasite that can only live and reproduce inside a living host plant.'
  },
  {
    q: 'Fungi obtain nutrients by',
    options: ['Photosynthesis', 'Secreting enzymes and absorbing digested products', 'Ingesting food particles', 'Chemosynthesis'],
    answer: 1,
    explanation: 'Fungi secrete extracellular digestive enzymes to break down complex organic matter, then absorb the soluble digested products.'
  },
  {
    q: 'Which of the following fungi causes black heart of apple?',
    options: ['Alternaria', 'Aspergillus niger', 'Penicillium', 'Rhizopus'],
    answer: 1,
    explanation: 'Black heart of apple is caused by Aspergillus niger. It causes internal rot and blackening of apple fruit.'
  },
  {
    q: 'The sexual stage of Aspergillus is',
    options: ['Emericella', 'Eurotium', 'Neosartorya', 'All depending on species'],
    answer: 3,
    explanation: 'Different species of Aspergillus have different sexual stages — Emericella (A. nidulans), Eurotium (A. glaucus), Neosartorya (A. fumigatus).'
  },
  {
    q: 'Statin drugs that lower cholesterol are obtained from',
    options: ['Aspergillus', 'Penicillium', 'Monascus', 'Rhizopus'],
    answer: 2,
    explanation: 'Lovastatin (a statin drug) was first isolated from Monascus ruber (red yeast rice). Statins inhibit cholesterol synthesis.'
  },
  {
    q: 'Which type of hyphae are found in Rhizopus?',
    options: ['Septate', 'Aseptate (coenocytic)', 'Dikaryotic', 'Uninucleate'],
    answer: 1,
    explanation: 'Rhizopus has aseptate (coenocytic) hyphae without cross walls. The mycelium contains many nuclei in a continuous cytoplasm.'
  },
  {
    q: 'Tinea capitis is caused by',
    options: ['Aspergillus', 'Trichophyton', 'Candida', 'Mucor'],
    answer: 1,
    explanation: 'Tinea capitis (scalp ringworm) is caused by dermatophytic fungi like Trichophyton and Microsporum affecting the scalp and hair.'
  },
  {
    q: 'Which of the following is used for leavening of bread?',
    options: ['Aspergillus niger', 'Saccharomyces cerevisiae', 'Penicillium', 'Rhizopus'],
    answer: 1,
    explanation: 'Saccharomyces cerevisiae (baker\'s yeast) is used for leavening bread. It ferments sugars producing CO2 which makes dough rise.'
  },
  {
    q: 'Phytophthora belongs to',
    options: ['True fungi', 'Oomycetes', 'Ascomycetes', 'Basidiomycetes'],
    answer: 1,
    explanation: 'Phytophthora belongs to Oomycetes (water moulds). Though traditionally studied with fungi, Oomycetes are now placed in kingdom Stramenopila.'
  },
  {
    q: 'Which of the following fungi produces griseofulvin antibiotic?',
    options: ['Aspergillus', 'Penicillium griseofulvum', 'Streptomyces', 'Rhizopus'],
    answer: 1,
    explanation: 'Griseofulvin is an antifungal antibiotic produced by Penicillium griseofulvum. It is used to treat dermatophytic infections.'
  },
  {
    q: 'Saccharomyces is an example of',
    options: ['Filamentous fungi', 'Unicellular fungi (yeast)', 'Dimorphic fungi', 'Basidiomycetes'],
    answer: 1,
    explanation: 'Saccharomyces cerevisiae (baker\'s yeast) is a unicellular fungus (yeast) belonging to Ascomycetes. It reproduces by budding.'
  },
  {
    q: 'Which of the following is correct about mushroom?',
    options: [
      'It is a plant',
      'It manufactures its own food',
      'It is the fruiting body of Basidiomycetes',
      'It has chlorophyll'
    ],
    answer: 2,
    explanation: 'Mushroom is the fruiting body (basidiocarp) of Basidiomycetes fungi. It produces basidiospores for sexual reproduction.'
  },
  {
    q: 'Endomycorrhiza is also called',
    options: ['Ectomycorrhiza', 'Arbuscular mycorrhiza', 'Ectendomycorrhiza', 'Vesicular mycorrhiza'],
    answer: 1,
    explanation: 'Endomycorrhiza is also called arbuscular mycorrhiza (AM). The fungal hyphae penetrate into root cells forming arbuscules and vesicles.'
  },
  {
    q: 'Which of the following is dikaryotic?',
    options: ['Zygomycetes', 'Secondary mycelium of Basidiomycetes', 'Ascomycetes ascospores', 'Rhizopus hyphae'],
    answer: 1,
    explanation: 'Secondary mycelium of Basidiomycetes is dikaryotic (n+n) — each cell contains two genetically different nuclei before they fuse.'
  },
  {
    q: 'The antibiotic penicillin was first discovered by',
    options: ['Louis Pasteur', 'Robert Koch', 'Alexander Fleming', 'Joseph Lister'],
    answer: 2,
    explanation: 'Penicillin was discovered by Alexander Fleming in 1928 when he noticed Penicillium mould killing bacteria on his culture plate.'
  },
  {
    q: 'Which of the following is used to produce soy sauce?',
    options: ['Aspergillus oryzae', 'Penicillium', 'Saccharomyces', 'Rhizopus'],
    answer: 0,
    explanation: 'Aspergillus oryzae (koji mold) is used in fermentation of soybeans to produce soy sauce (shoyu). It is also used in sake and miso production.'
  },
  {
    q: 'Fungi are placed in separate kingdom because',
    options: [
      'They are photosynthetic',
      'They have chitin cell wall and absorptive nutrition',
      'They are prokaryotic',
      'They have chloroplasts'
    ],
    answer: 1,
    explanation: 'Fungi are placed in their own kingdom because they have chitin cell wall, absorptive heterotrophic nutrition, and store glycogen — distinguishing them from plants and animals.'
  },
  {
    q: 'Which of the following is a hallucinogenic fungus?',
    options: ['Agaricus', 'Psilocybe', 'Morchella', 'Pleurotus'],
    answer: 1,
    explanation: 'Psilocybe (magic mushrooms) contains psilocybin and psilocin which are hallucinogenic compounds. They affect serotonin receptors in the brain.'
  },
  {
    q: 'Brown rot of apple is caused by',
    options: ['Aspergillus', 'Monilinia', 'Alternaria', 'Botrytis'],
    answer: 1,
    explanation: 'Brown rot of apple and stone fruits is caused by Monilinia fructicola and M. laxa. It causes rapid decay of fruit.'
  },
  {
    q: 'The mode of reproduction in Mucor is',
    options: ['Only sexual', 'Only asexual', 'Both sexual and asexual', 'Vegetative only'],
    answer: 2,
    explanation: 'Mucor reproduces both sexually (by zygospore formation) and asexually (by sporangiospores). It belongs to Zygomycetes.'
  },
  {
    q: 'Which of the following is not true about fungi?',
    options: ['They are eukaryotes', 'They have chitin cell wall', 'They are autotrophs', 'They store glycogen'],
    answer: 2,
    explanation: 'Fungi are NOT autotrophs. They are heterotrophs that obtain nutrition by absorption from dead or living organic matter.'
  },
  {
    q: 'Taxol anticancer drug is obtained from',
    options: ['Aspergillus', 'Pestalotiopsis microspora', 'Penicillium', 'Rhizopus'],
    answer: 1,
    explanation: 'Taxol (paclitaxel) anticancer drug is produced by the endophytic fungus Pestalotiopsis microspora found in yew trees.'
  },
  {
    q: 'Which of the following causes damping off of seedlings?',
    options: ['Pythium', 'Puccinia', 'Ustilago', 'Claviceps'],
    answer: 0,
    explanation: 'Damping off disease of seedlings is caused by Pythium (Oomycetes). It causes rotting of stem at soil level killing young seedlings.'
  },
  {
    q: 'The specialized reproductive hyphae that bear conidia are called',
    options: ['Rhizoids', 'Stolons', 'Conidiophores', 'Sporangiophores'],
    answer: 2,
    explanation: 'Conidiophores are specialized hyphae that bear conidia (asexual spores) at their tips. Common in Aspergillus and Penicillium.'
  },
  {
    q: 'Which of the following fungi is used in genetics research?',
    options: ['Rhizopus', 'Neurospora', 'Mucor', 'Aspergillus'],
    answer: 1,
    explanation: 'Neurospora crassa (red bread mold) is an important model organism in genetics research. Beadle and Tatum used it to prove one gene-one enzyme hypothesis.'
  },
],
'lichen': [
  {
    q: 'Lichens are a symbiotic association between',
    options: ['Fungi and bacteria', 'Fungi and algae', 'Fungi and bryophytes', 'Algae and bacteria'],
    answer: 1,
    explanation: 'Lichens are a mutualistic symbiotic association between fungi (mycobiont) and algae or cyanobacteria (photobiont).'
  },
  {
    q: 'The fungal component of lichen is called',
    options: ['Photobiont', 'Mycobiont', 'Phycobiont', 'Cyanobiont'],
    answer: 1,
    explanation: 'The fungal partner in lichen is called mycobiont. It provides protection, water and minerals to the algal partner.'
  },
  {
    q: 'The algal component of lichen is called',
    options: ['Mycobiont', 'Photobiont', 'Saprobiont', 'Parasitobiont'],
    answer: 1,
    explanation: 'The algal or cyanobacterial partner in lichen is called photobiont (or phycobiont). It provides food through photosynthesis.'
  },
  {
    q: 'Lichens are used as indicator of',
    options: ['Water pollution', 'Air pollution', 'Soil pollution', 'Noise pollution'],
    answer: 1,
    explanation: 'Lichens are sensitive to air pollution especially SO2. They disappear from areas with high air pollution making them excellent bioindicators of air quality.'
  },
  {
    q: 'The pioneer organisms in xerosere (ecological succession on bare rocks) are',
    options: ['Mosses', 'Ferns', 'Lichens', 'Grasses'],
    answer: 2,
    explanation: 'Lichens are pioneer organisms in xerosere. They colonize bare rocks first, secreting acids that break down rock to form soil for other plants.'
  },
  {
    q: 'Litmus is obtained from',
    options: ['Fungi', 'Algae', 'Lichen', 'Bryophytes'],
    answer: 2,
    explanation: 'Litmus is a pH indicator obtained from the lichen Rocella tinctoria. It turns red in acid and blue in base.'
  },
  {
    q: 'Which of the following is a foliose lichen?',
    options: ['Usnea', 'Parmelia', 'Cladonia', 'Graphis'],
    answer: 1,
    explanation: 'Parmelia is a foliose lichen with a flat leaf-like thallus loosely attached to substrate. Usnea is fruticose, Graphis is crustose.'
  },
  {
    q: 'Crustose lichens are',
    options: ['Leaf-like and loosely attached', 'Crust-like and tightly attached to substrate', 'Shrub-like and erect', 'Pendant and hanging'],
    answer: 1,
    explanation: 'Crustose lichens form a crust tightly attached to the substrate (rocks, bark). They cannot be removed without destroying the substrate.'
  },
  {
    q: 'Cladonia is an example of',
    options: ['Crustose lichen', 'Foliose lichen', 'Fruticose lichen', 'Squamulose lichen'],
    answer: 2,
    explanation: 'Cladonia is a fruticose lichen with an upright branched shrub-like thallus. It is also called reindeer moss and is food for reindeer.'
  },
  {
    q: 'The relationship in lichen is',
    options: ['Parasitism', 'Commensalism', 'Mutualism', 'Amensalism'],
    answer: 2,
    explanation: 'The relationship in lichen is mutualism where both partners benefit. Fungi get food from algae and algae get protection, water and minerals from fungi.'
  },
  {
    q: 'Lichens grow very slowly because',
    options: [
      'They lack chlorophyll',
      'They have slow metabolism and live in extreme environments',
      'They cannot photosynthesize',
      'They are parasitic'
    ],
    answer: 1,
    explanation: 'Lichens grow very slowly (1-2mm per year) due to slow metabolism. They live in extreme environments with limited resources.'
  },
  {
    q: 'Usnic acid found in lichens is used as',
    options: ['Food', 'Antibiotic', 'Dye', 'Perfume'],
    answer: 1,
    explanation: 'Usnic acid is an antibiotic compound found in lichens like Usnea. It has antibacterial and antifungal properties.'
  },
  {
    q: 'Reindeer moss is the common name of',
    options: ['Usnea', 'Parmelia', 'Cladonia rangiferina', 'Rocella'],
    answer: 2,
    explanation: 'Cladonia rangiferina is called reindeer moss. It is an important food source for reindeer and caribou in Arctic regions.'
  },
  {
    q: 'The algae most commonly found in lichens belong to',
    options: ['Red algae', 'Brown algae', 'Green algae and cyanobacteria', 'Diatoms'],
    answer: 2,
    explanation: 'Most lichens contain green algae (like Trebouxia) or cyanobacteria (like Nostoc) as their photobiont partner.'
  },
  {
    q: 'Lichens can survive in extreme conditions because',
    options: [
      'They have thick cell walls',
      'They can withstand desiccation and resume activity when wet',
      'They produce antifreeze proteins',
      'They live underground'
    ],
    answer: 1,
    explanation: 'Lichens can survive extreme desiccation (drying out) and resume metabolic activity when water becomes available. This allows them to live in harsh environments.'
  },
  {
    q: 'Which type of lichen is Graphis?',
    options: ['Foliose', 'Fruticose', 'Crustose', 'Squamulose'],
    answer: 2,
    explanation: 'Graphis is a crustose lichen that forms a thin crust on tree bark. It appears as small elongated marks resembling writing.'
  },
  {
    q: 'Lichen acids are important because they',
    options: ['Help in photosynthesis', 'Break down rocks aiding soil formation', 'Provide nitrogen to soil', 'Help in water absorption'],
    answer: 1,
    explanation: 'Lichen acids (oxalic acid etc.) break down rocks through chemical weathering, helping in soil formation during ecological succession.'
  },
  {
    q: 'The vegetative reproduction in lichens occurs by',
    options: ['Spores', 'Soredia and isidia', 'Budding', 'Fragmentation only'],
    answer: 1,
    explanation: 'Lichens reproduce vegetatively by soredia (powdery granules containing algal cells wrapped in fungal hyphae) and isidia (coral-like outgrowths).'
  },
  {
    q: 'Orchil dye is obtained from',
    options: ['Usnea', 'Rocella', 'Parmelia', 'Cladonia'],
    answer: 1,
    explanation: 'Orchil (orseille) is a purple/red dye obtained from Rocella tinctoria lichen. It was historically important before synthetic dyes.'
  },
  {
    q: 'Fruticose lichens are',
    options: ['Flat and leaf-like', 'Crust forming', 'Erect shrub-like or pendant', 'Mat forming'],
    answer: 2,
    explanation: 'Fruticose lichens have an erect shrub-like or pendant (hanging) thallus attached at base only. Usnea (old man\'s beard) is a classic example.'
  },
  {
    q: 'Which of the following is used in perfumery?',
    options: ['Usnea', 'Cladonia', 'Evernia prunastri', 'Graphis'],
    answer: 2,
    explanation: 'Evernia prunastri (oakmoss) is a lichen used in perfumery as a fixative. It gives a woody, earthy scent to perfumes.'
  },
  {
    q: 'Usnea is an example of',
    options: ['Crustose lichen', 'Foliose lichen', 'Fruticose lichen', 'Squamulose lichen'],
    answer: 2,
    explanation: 'Usnea (old man\'s beard) is a fruticose lichen with long pendant (hanging) thallus. It is used as a natural antibiotic due to usnic acid.'
  },
],
'bryophyta': [
  {
    q: 'Bryophytes are called amphibians of plant kingdom because',
    options: [
      'They live in water only',
      'They need water for fertilization but live on land',
      'They live in air',
      'They are found in deserts'
    ],
    answer: 1,
    explanation: 'Bryophytes are called amphibians of plant kingdom because they live on land but require water for fertilization (swimming of antherozoids).'
  },
  {
    q: 'The study of bryophytes is called',
    options: ['Phycology', 'Mycology', 'Bryology', 'Pteridology'],
    answer: 2,
    explanation: 'Bryology is the branch of botany dealing with the study of bryophytes (mosses, liverworts and hornworts).'
  },
  {
    q: 'In bryophytes the dominant generation is',
    options: ['Sporophyte', 'Gametophyte', 'Both equally dominant', 'Neither'],
    answer: 1,
    explanation: 'In bryophytes the gametophyte generation is dominant (green, photosynthetic, independent). The sporophyte is dependent on gametophyte.'
  },
  {
    q: 'Bryophytes lack',
    options: ['Cell wall', 'Chlorophyll', 'Vascular tissue', 'Nucleus'],
    answer: 2,
    explanation: 'Bryophytes lack vascular tissue (xylem and phloem). This is why they are called non-vascular plants and cannot grow very tall.'
  },
  {
    q: 'The male sex organ in bryophytes is called',
    options: ['Archegonium', 'Antheridium', 'Sporangium', 'Gametangium'],
    answer: 1,
    explanation: 'The male sex organ in bryophytes is called antheridium which produces biflagellate antherozoids (male gametes).'
  },
  {
    q: 'The female sex organ in bryophytes is called',
    options: ['Antheridium', 'Oogonium', 'Archegonium', 'Carpel'],
    answer: 2,
    explanation: 'The female sex organ in bryophytes is called archegonium which is flask-shaped and produces a single egg cell.'
  },
  {
    q: 'Marchantia belongs to',
    options: ['Mosses', 'Liverworts', 'Hornworts', 'Ferns'],
    answer: 1,
    explanation: 'Marchantia is a liverwort (Hepaticopsida). It has a flat lobed thallus with a midrib and grows in moist shaded habitats.'
  },
  {
    q: 'Which bryophyte is used in horticulture as packing material?',
    options: ['Marchantia', 'Funaria', 'Sphagnum', 'Riccia'],
    answer: 2,
    explanation: 'Sphagnum (peat moss) is used in horticulture as packing material for transporting plants. It can hold 20 times its weight in water.'
  },
  {
    q: 'Funaria is commonly called',
    options: ['Liverwort', 'Hornwort', 'Cord moss', 'Peat moss'],
    answer: 2,
    explanation: 'Funaria hygrometrica is commonly called cord moss or water moss. It is a common laboratory moss used in teaching.'
  },
  {
    q: 'The sporophyte of bryophytes consists of',
    options: ['Root stem and leaf', 'Foot seta and capsule', 'Rhizoid stem and capsule', 'Holdfast stipe and capsule'],
    answer: 1,
    explanation: 'The sporophyte of bryophytes consists of foot (anchored in gametophyte), seta (stalk) and capsule (spore producing structure).'
  },
  {
    q: 'Vegetative reproduction in Marchantia takes place by',
    options: ['Budding', 'Fragmentation', 'Gemmae', 'Spores'],
    answer: 2,
    explanation: 'Marchantia reproduces vegetatively by gemmae — small lens-shaped green bodies produced in gemma cups on the thallus surface.'
  },
  {
    q: 'Peat is formed from',
    options: ['Marchantia', 'Funaria', 'Sphagnum', 'Riccia'],
    answer: 2,
    explanation: 'Peat is formed from partially decomposed Sphagnum (peat moss). It is used as fuel, in horticulture and forms coal over millions of years.'
  },
  {
    q: 'Riccia belongs to',
    options: ['Mosses', 'Liverworts', 'Hornworts', 'Pteridophytes'],
    answer: 1,
    explanation: 'Riccia is a thalloid liverwort (Hepaticopsida). It is the simplest liverwort with a ribbon-like dichotomously branched thallus.'
  },
  {
    q: 'Which of the following is a hornwort?',
    options: ['Marchantia', 'Riccia', 'Anthoceros', 'Sphagnum'],
    answer: 2,
    explanation: 'Anthoceros is a hornwort (Anthocerotopsida). It has horn-like sporophytes and is unique in having a single large chloroplast with pyrenoid.'
  },
  {
    q: 'The rhizoids in bryophytes function as',
    options: ['Conducting water and food', 'Anchorage and absorption', 'Photosynthesis', 'Reproduction'],
    answer: 1,
    explanation: 'Rhizoids in bryophytes are unicellular or multicellular hair-like structures that anchor the plant and absorb water and minerals from the substrate.'
  },
  {
    q: 'Sphagnum is used as surgical dressing because',
    options: ['It is antiseptic', 'It has high water holding capacity', 'It is soft', 'All of the above'],
    answer: 3,
    explanation: 'Sphagnum is used as surgical dressing because it is antiseptic, has high water holding capacity and is soft. It was used in World War I.'
  },
  {
    q: 'In bryophytes fertilization requires',
    options: ['Wind', 'Insects', 'Water', 'Birds'],
    answer: 2,
    explanation: 'Fertilization in bryophytes requires water for the biflagellate antherozoids to swim to the archegonium and fertilize the egg.'
  },
  {
    q: 'The capsule of moss contains',
    options: ['Seeds', 'Spores', 'Gametes', 'Pollen'],
    answer: 1,
    explanation: 'The capsule (sporangium) of moss contains haploid spores produced by meiosis. Spores are dispersed by wind for reproduction.'
  },
  {
    q: 'Which of the following is correct about bryophytes?',
    options: [
      'They have true roots',
      'They have vascular tissue',
      'Sporophyte is dominant',
      'They have archegonia and antheridia'
    ],
    answer: 3,
    explanation: 'Bryophytes have archegonia (female) and antheridia (male) sex organs. They lack true roots, vascular tissue and the gametophyte is dominant.'
  },
  {
    q: 'Mosses are placed in class',
    options: ['Hepaticopsida', 'Anthocerotopsida', 'Bryopsida', 'Pteropsida'],
    answer: 2,
    explanation: 'Mosses are placed in class Bryopsida (Musci). Liverworts are Hepaticopsida and hornworts are Anthocerotopsida.'
  },
  {
    q: 'Protonema is found in',
    options: ['Marchantia', 'Funaria', 'Anthoceros', 'Riccia'],
    answer: 1,
    explanation: 'Protonema is the juvenile filamentous stage in the life cycle of mosses like Funaria. It develops from germinating spore and gives rise to leafy gametophyte.'
  },
  {
    q: 'The sporophyte in bryophytes is',
    options: ['Independent and photosynthetic', 'Partially dependent on gametophyte', 'Completely independent', 'Fully parasitic on gametophyte'],
    answer: 1,
    explanation: 'The sporophyte in bryophytes is partially dependent on gametophyte for nutrition and anchorage though it has chlorophyll and can photosynthesize.'
  },
  {
    q: 'Marchantia is used medicinally to treat',
    options: ['Malaria', 'Liver disorders', 'Diabetes', 'Tuberculosis'],
    answer: 1,
    explanation: 'Marchantia is used in traditional medicine to treat liver disorders. Its lobed liver-like appearance led to its use for liver ailments (doctrine of signatures).'
  },
  {
    q: 'Air chambers are found in',
    options: ['Funaria', 'Marchantia', 'Sphagnum', 'Anthoceros'],
    answer: 1,
    explanation: 'Air chambers are found in the dorsal surface of Marchantia thallus. They contain photosynthetic cells and open to outside through air pores.'
  },
  {
    q: 'Liverworts are placed in class',
    options: ['Bryopsida', 'Hepaticopsida', 'Anthocerotopsida', 'Filicopsida'],
    answer: 1,
    explanation: 'Liverworts are placed in class Hepaticopsida (Hepaticae). The name comes from Latin hepar meaning liver due to their liver-like shape.'
  },
  {
    q: 'Which of the following is not a bryophyte?',
    options: ['Marchantia', 'Funaria', 'Selaginella', 'Riccia'],
    answer: 2,
    explanation: 'Selaginella is not a bryophyte — it is a pteridophyte (vascular plant). Marchantia, Funaria and Riccia are all bryophytes.'
  },
  {
    q: 'The life cycle of bryophytes shows',
    options: ['Only sexual reproduction', 'Alternation of generation', 'Only asexual reproduction', 'No alternation of generation'],
    answer: 1,
    explanation: 'Bryophytes show alternation of generation between haploid gametophyte and diploid sporophyte generations.'
  },
  {
    q: 'Peristome teeth in mosses help in',
    options: ['Photosynthesis', 'Spore dispersal', 'Water absorption', 'Reproduction'],
    answer: 1,
    explanation: 'Peristome teeth are hygroscopic tooth-like structures around the mouth of moss capsule that regulate spore dispersal based on humidity.'
  },
  {
    q: 'Which pigment is absent in bryophytes?',
    options: ['Chlorophyll a', 'Chlorophyll b', 'Carotenoids', 'Phycoerythrin'],
    answer: 3,
    explanation: 'Phycoerythrin is absent in bryophytes. It is found in red algae. Bryophytes contain chlorophyll a, b and carotenoids.'
  },
  {
    q: 'Elaters in liverworts help in',
    options: ['Photosynthesis', 'Spore dispersal', 'Water absorption', 'Vegetative reproduction'],
    answer: 1,
    explanation: 'Elaters are hygroscopic spiral-banded cells in liverwort capsules. They coil and uncoil with changes in humidity helping to disperse spores.'
  },
  {
    q: 'The first land plants to evolve were',
    options: ['Pteridophytes', 'Gymnosperms', 'Bryophytes', 'Angiosperms'],
    answer: 2,
    explanation: 'Bryophytes are considered the first land plants to evolve from green algae ancestors. They appeared around 470 million years ago.'
  },
  {
    q: 'Gemma cups are found in',
    options: ['Funaria', 'Marchantia', 'Riccia', 'Anthoceros'],
    answer: 1,
    explanation: 'Gemma cups are cup-shaped structures on the upper surface of Marchantia thallus containing gemmae for vegetative reproduction.'
  },
  {
    q: 'Which of the following has the simplest sporophyte among bryophytes?',
    options: ['Funaria', 'Marchantia', 'Riccia', 'Anthoceros'],
    answer: 2,
    explanation: 'Riccia has the simplest sporophyte among bryophytes — it is just a spherical capsule embedded in gametophyte tissue with no foot or seta.'
  },
  {
    q: 'Which of the following bryophytes is used as fuel?',
    options: ['Marchantia', 'Sphagnum', 'Funaria', 'Riccia'],
    answer: 1,
    explanation: 'Dried peat (formed from Sphagnum) is used as fuel in Ireland and other countries. It has a high carbon content.'
  },
  {
    q: 'The operculum in moss capsule is',
    options: ['Spore producing region', 'Lid that covers capsule mouth', 'Stalk of capsule', 'Base of capsule'],
    answer: 1,
    explanation: 'Operculum is the lid-like cover at the mouth of moss capsule. It falls off when spores are mature to allow their dispersal.'
  },
  {
    q: 'Columella is found in the capsule of',
    options: ['Riccia', 'Marchantia', 'Funaria', 'Pellia'],
    answer: 2,
    explanation: 'Columella is a central sterile tissue found in the capsule of mosses like Funaria. It is absent in most liverworts.'
  },
  {
    q: 'Which of the following is aquatic bryophyte?',
    options: ['Funaria', 'Marchantia', 'Riccia fluitans', 'Anthoceros'],
    answer: 2,
    explanation: 'Riccia fluitans is an aquatic liverwort that floats on water surface. It is commonly used in aquariums.'
  },
  {
    q: 'The calyptra in mosses is derived from',
    options: ['Sporophyte', 'Archegonium wall', 'Protonema', 'Rhizoid'],
    answer: 1,
    explanation: 'Calyptra is a protective cap covering the developing capsule of mosses. It is derived from the archegonium wall (gametophytic tissue).'
  },
  {
    q: 'Bryophytes are economically important because',
    options: [
      'Sphagnum is used as packing material',
      'Peat is used as fuel',
      'They are used in traditional medicine',
      'All of the above'
    ],
    answer: 3,
    explanation: 'Bryophytes have multiple economic uses — Sphagnum as packing and surgical dressing, peat as fuel, and Marchantia in traditional medicine.'
  },
  {
    q: 'Which of the following is correct about the sporophyte of Marchantia?',
    options: [
      'It is completely independent',
      'It consists of foot seta and capsule',
      'It is the dominant generation',
      'It produces gametes'
    ],
    answer: 1,
    explanation: 'The sporophyte of Marchantia consists of foot (embedded in gametophyte), seta (short stalk) and capsule (containing spores and elaters).'
  },
  {
    q: 'Nitrogen fixation in bryophytes is carried out by',
    options: ['Rhizobium', 'Nostoc living as endophyte', 'Azotobacter', 'The bryophyte itself'],
    answer: 1,
    explanation: 'Nitrogen fixation in some bryophytes like Anthoceros is carried out by Nostoc (cyanobacterium) living as an endophyte in the thallus.'
  },
],
'pteridophyta': [
  {
    q: 'Pteridophytes are also called',
    options: ['Amphibians of plant kingdom', 'Reptiles of plant kingdom', 'Vascular cryptogams', 'Non-vascular plants'],
    answer: 2,
    explanation: 'Pteridophytes are called vascular cryptogams because they have vascular tissue (xylem and phloem) but reproduce by spores not seeds.'
  },
  {
    q: 'The study of ferns is called',
    options: ['Bryology', 'Phycology', 'Pteridology', 'Mycology'],
    answer: 2,
    explanation: 'Pteridology is the branch of botany dealing with the study of pteridophytes (ferns and their allies).'
  },
  {
    q: 'In pteridophytes the dominant generation is',
    options: ['Gametophyte', 'Sporophyte', 'Both equally', 'Neither'],
    answer: 1,
    explanation: 'In pteridophytes the sporophyte generation is dominant — it is the large green fern plant we see. The gametophyte (prothallus) is small and short-lived.'
  },
  {
    q: 'Ferns belong to division',
    options: ['Bryophyta', 'Pteridophyta', 'Gymnospermae', 'Angiospermae'],
    answer: 1,
    explanation: 'Ferns belong to division Pteridophyta. They are vascular plants that reproduce by spores and show alternation of generation.'
  },
  {
    q: 'The gametophyte of fern is called',
    options: ['Protonema', 'Prothallus', 'Thallus', 'Sporophyll'],
    answer: 1,
    explanation: 'The gametophyte of fern is called prothallus. It is a small heart-shaped green structure that bears antheridia and archegonia.'
  },
  {
    q: 'Spores in pteridophytes are produced in',
    options: ['Antheridia', 'Archegonia', 'Sporangia', 'Gemma cups'],
    answer: 2,
    explanation: 'Spores in pteridophytes are produced by meiosis inside sporangia. The sporangia are grouped into clusters called sori.'
  },
  {
    q: 'Selaginella is an example of',
    options: ['Homosporous pteridophyte', 'Heterosporous pteridophyte', 'Bryophyte', 'Gymnosperm'],
    answer: 1,
    explanation: 'Selaginella is heterosporous — it produces two types of spores: large megaspores (female) and small microspores (male).'
  },
  {
    q: 'Equisetum is commonly called',
    options: ['Club moss', 'Horse tail', 'Ground pine', 'Tree fern'],
    answer: 1,
    explanation: 'Equisetum is commonly called horse tail. It has jointed hollow stems with whorls of branches and is the only living genus of Sphenopsida.'
  },
  {
    q: 'The clusters of sporangia on fern leaves are called',
    options: ['Sori', 'Strobili', 'Cones', 'Sporophylls'],
    answer: 0,
    explanation: 'Sori (singular: sorus) are clusters of sporangia found on the underside of fern fronds. They are often covered by a protective flap called indusium.'
  },
  {
    q: 'Lycopodium is commonly called',
    options: ['Horse tail', 'Club moss', 'Bracken fern', 'Tree fern'],
    answer: 1,
    explanation: 'Lycopodium is commonly called club moss or ground pine. Despite the name it is not a true moss but a pteridophyte.'
  },
  {
    q: 'The leaf of fern is called',
    options: ['Frond', 'Blade', 'Pinna', 'Leaflet'],
    answer: 0,
    explanation: 'The leaf of fern is called frond. It is divided into pinnae (leaflets). The young coiled frond is called fiddlehead or crozier.'
  },
  {
    q: 'Which of the following pteridophyte is used as a biofertilizer?',
    options: ['Selaginella', 'Azolla', 'Equisetum', 'Lycopodium'],
    answer: 1,
    explanation: 'Azolla (water fern) is used as biofertilizer in rice paddies. It contains Anabaena (cyanobacterium) in its leaves that fixes atmospheric nitrogen.'
  },
  {
    q: 'The indusium in ferns protects',
    options: ['Archegonium', 'Antheridium', 'Sorus', 'Spore'],
    answer: 2,
    explanation: 'Indusium is a thin membranous flap that covers and protects the sorus (cluster of sporangia) in ferns.'
  },
  {
    q: 'Heterospory is considered significant because it',
    options: [
      'Increases spore production',
      'Led to evolution of seed habit',
      'Increases photosynthesis',
      'Helps in water absorption'
    ],
    answer: 1,
    explanation: 'Heterospory is evolutionarily significant because it led to the evolution of seed habit. Megaspores retained in megasporangium is the first step toward seeds.'
  },
  {
    q: 'The vascular tissue in pteridophytes lacks',
    options: ['Xylem', 'Phloem', 'Companion cells', 'Tracheids'],
    answer: 2,
    explanation: 'The phloem of pteridophytes lacks companion cells. They have sieve cells instead of sieve tube members with companion cells found in angiosperms.'
  },
  {
    q: 'Fern spores germinate to form',
    options: ['Sporophyte directly', 'Prothallus', 'Protonema', 'Embryo'],
    answer: 1,
    explanation: 'Fern spores germinate to form prothallus (gametophyte). The prothallus bears sex organs and produces gametes for fertilization.'
  },
  {
    q: 'Which pteridophyte was used as coal forming plant?',
    options: ['Lycopodium', 'Selaginella', 'Lepidodendron', 'Equisetum'],
    answer: 2,
    explanation: 'Lepidodendron was an ancient giant tree-like pteridophyte (lycopsid) from Carboniferous period. Their remains formed coal deposits.'
  },
  {
    q: 'Azolla is a',
    options: ['Moss', 'Water fern', 'Liverwort', 'Hornwort'],
    answer: 1,
    explanation: 'Azolla is a small floating water fern (pteridophyte). It hosts nitrogen-fixing cyanobacterium Anabaena in its leaf cavities.'
  },
  {
    q: 'The spore producing leaves in pteridophytes are called',
    options: ['Trophophylls', 'Sporophylls', 'Microphylls', 'Megaphylls'],
    answer: 1,
    explanation: 'Sporophylls are leaves that bear sporangia for spore production. Leaves that only photosynthesize are called trophophylls.'
  },
  {
    q: 'In fern the young coiled leaf is called',
    options: ['Frond', 'Pinna', 'Fiddlehead', 'Rachis'],
    answer: 2,
    explanation: 'The young coiled leaf of fern is called fiddlehead or crozier. It uncoils as it grows due to circinate vernation.'
  },
  {
    q: 'Pteridophytes first appeared in',
    options: ['Cambrian period', 'Silurian period', 'Jurassic period', 'Cretaceous period'],
    answer: 1,
    explanation: 'Pteridophytes first appeared in the Silurian period about 430 million years ago. They dominated the Carboniferous period.'
  },
  {
    q: 'Which of the following is homosporous?',
    options: ['Selaginella', 'Salvinia', 'Marsilea', 'Dryopteris'],
    answer: 3,
    explanation: 'Dryopteris (male fern) is homosporous — it produces only one type of spore. Selaginella, Salvinia and Marsilea are heterosporous.'
  },
  {
    q: 'The stem of Equisetum has',
    options: ['Solid stem without nodes', 'Hollow jointed stem with nodes', 'Flat ribbon-like stem', 'Underground stem only'],
    answer: 1,
    explanation: 'Equisetum has a hollow jointed stem with distinct nodes and internodes. Whorls of branches and leaves arise from the nodes.'
  },
  {
    q: 'Sporangia in Equisetum are borne on',
    options: ['Sori', 'Strobili', 'Fronds', 'Prothallus'],
    answer: 1,
    explanation: 'In Equisetum sporangia are borne on strobili (cones) — compact terminal cone-like structures with umbrella-shaped sporangiophores.'
  },
  {
    q: 'The rhizome of fern is',
    options: ['Aerial stem', 'Underground horizontal stem', 'Climbing stem', 'Floating stem'],
    answer: 1,
    explanation: 'The rhizome of fern is an underground horizontal stem from which roots and fronds arise. It stores food and helps in vegetative reproduction.'
  },
  {
    q: 'Marsilea is a',
    options: ['Homosporous fern', 'Heterosporous fern', 'Moss', 'Liverwort'],
    answer: 1,
    explanation: 'Marsilea is a heterosporous aquatic fern. It produces microspores and megaspores in hard sporocarps.'
  },
  {
    q: 'Which of the following pteridophyte is used medicinally?',
    options: ['Equisetum', 'Lycopodium', 'Dryopteris', 'All of the above'],
    answer: 3,
    explanation: 'All three have medicinal uses — Equisetum for kidney problems, Lycopodium in homeopathy, Dryopteris (male fern) as anthelmintic against tapeworms.'
  },
  {
    q: 'Circinate vernation is found in',
    options: ['Bryophytes', 'Pteridophytes', 'Gymnosperms', 'Angiosperms'],
    answer: 1,
    explanation: 'Circinate vernation (coiled young leaves) is characteristic of pteridophytes especially ferns. The young frond is coiled like a fiddle head.'
  },
  {
    q: 'The sporophyte of pteridophytes is',
    options: ['Dependent on gametophyte', 'Independent and dominant', 'Partially dependent', 'Absent'],
    answer: 1,
    explanation: 'The sporophyte of pteridophytes is independent, photosynthetic and dominant — the large green fern plant is the sporophyte generation.'
  },
  {
    q: 'Stele in pteridophytes refers to',
    options: ['The leaf', 'The central vascular cylinder', 'The root tip', 'The sporangium'],
    answer: 1,
    explanation: 'Stele is the central vascular cylinder of pteridophyte stem consisting of xylem, phloem and associated tissues like pericycle and endodermis.'
  },
  {
    q: 'Lycopodium spores are used as',
    options: ['Food', 'Biofertilizer', 'Dusting powder and in fireworks', 'Antibiotic'],
    answer: 2,
    explanation: 'Lycopodium spores (lycopodium powder) are highly flammable and used in fireworks. They are also used as dusting powder in surgery and pharmacy.'
  },
  {
    q: 'Which of the following shows water ferns?',
    options: ['Dryopteris and Pteris', 'Azolla and Salvinia', 'Lycopodium and Selaginella', 'Equisetum and Calamites'],
    answer: 1,
    explanation: 'Azolla and Salvinia are heterosporous water ferns that float on water surface. They are used in rice paddies as biofertilizer and weed control.'
  },
  {
    q: 'The first vascular plants to appear on earth were',
    options: ['Gymnosperms', 'Angiosperms', 'Pteridophytes', 'Bryophytes'],
    answer: 2,
    explanation: 'Pteridophytes were the first vascular plants to evolve on earth. They were the dominant plants during the Carboniferous period.'
  },
  {
    q: 'Prothallus of fern is',
    options: ['Diploid sporophyte', 'Haploid gametophyte', 'Diploid gametophyte', 'Haploid sporophyte'],
    answer: 1,
    explanation: 'Prothallus is the haploid (n) gametophyte generation of fern. It bears antheridia and archegonia and produces gametes.'
  },
  {
    q: 'Which division of pteridophytes includes horse tails?',
    options: ['Lycopsida', 'Sphenopsida', 'Pteropsida', 'Psilopsida'],
    answer: 1,
    explanation: 'Horse tails (Equisetum) belong to division Sphenopsida. Lycopsida includes club mosses, Pteropsida includes true ferns.'
  },
  {
    q: 'Sporocarps are found in',
    options: ['Dryopteris', 'Equisetum', 'Marsilea', 'Lycopodium'],
    answer: 2,
    explanation: 'Sporocarps are hard bean-like structures containing sori found in Marsilea. They are highly resistant to desiccation.'
  },
  {
    q: 'Adiantum is commonly called',
    options: ['Male fern', 'Maidenhair fern', 'Tree fern', 'Bracken fern'],
    answer: 1,
    explanation: 'Adiantum is commonly called maidenhair fern. It is a popular ornamental fern with fan-shaped pinnules on shiny black stalks.'
  },
  {
    q: 'The annulus in fern sporangium helps in',
    options: ['Photosynthesis', 'Spore dispersal', 'Water absorption', 'Fertilization'],
    answer: 1,
    explanation: 'Annulus is a ring of thick-walled cells on fern sporangium. It acts as a catapult mechanism — drying out causes it to snap and hurl spores.'
  },
  {
    q: 'Which of the following is a tree fern?',
    options: ['Dryopteris', 'Cyathea', 'Adiantum', 'Pteris'],
    answer: 1,
    explanation: 'Cyathea is a tree fern that can grow up to 20 meters tall with a trunk-like stem. It is found in tropical and subtropical forests.'
  },
  {
    q: 'Pteridophytes differ from bryophytes in having',
    options: ['Alternation of generation', 'Vascular tissue', 'Archegonia', 'Spore production'],
    answer: 1,
    explanation: 'The key difference between pteridophytes and bryophytes is that pteridophytes have vascular tissue (xylem and phloem) while bryophytes lack it.'
  },
  {
    q: 'Which of the following is used as ornamental plant?',
    options: ['Equisetum', 'Lycopodium', 'Adiantum', 'Marsilea'],
    answer: 2,
    explanation: 'Adiantum (maidenhair fern) is widely used as an ornamental plant in homes and gardens due to its delicate fan-shaped fronds.'
  },
],
}
