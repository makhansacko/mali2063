export type Article = {
    slug: string
    type: 'note' | 'decryptage'
    titre: string
    resume: string
    auteur: string
    date: string
    lecture: number
    image?: string
    featured?: boolean
    axe?: string
    number: number
    projectRef?: number
  }
  
  export const articles: Article[] = [
    {
      slug: 'mission-innovation-policy',
      type: 'note',
      titre: "Une politique d'innovation orientée missions pour le Mali",
      resume: "Comment le cadre théorique de la mission-oriented innovation policy s'applique à la Vision Mali Kura 2063 et à ses 11 projets structurants.",
      auteur: 'Makhan Sacko',
      date: '2026-03-11',
      lecture: 12,
      featured: true,
      axe: 'axe-3',
      number: 3,
      projectRef: 3
    },
    {
      slug: 'yeelen-kura-energie',
      type: 'decryptage',
      titre: "YEELEN KURA : décrypter le pari énergétique du Mali",
      resume: "100% d'accès à l'électricité et 70% d'énergies renouvelables d'ici 2063 — les conditions de réussite du projet structurant le plus ambitieux.",
      auteur: 'Sahel Analytics',
      date: '2026-03-01',
      lecture: 8,
      axe: 'axe-3',
      number: 2,
      projectRef: 2
    },
    {
      slug: 'agropoles-farafinna',
      type: 'decryptage',
      titre: "FARAFINNA JIGINƐ : les agropoles comme levier de souveraineté alimentaire",
      resume: "Analyse du potentiel agro-industriel malien et des conditions de réussite du premier projet structurant de la Vision 2063.",
      auteur: 'Sahel Analytics',
      date: '2026-02-15',
      lecture: 10,
      axe: 'axe-3',
      number: 1,
      projectRef: 1
    }
  ]