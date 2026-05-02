// src/lib/data/vision.ts

// ============================================
// TYPES
// ============================================

export type SpecificObjective = {
    id: string;
    label: string;
  };
  
  export type GlobalObjective = {
    id: string;
    label: string;
    specificObjectives: SpecificObjective[];
  };
  
  export type Axe = {
    id: string;
    number: number;
    label: string;
    color: string;
    icon: string;
    globalObjectives: GlobalObjective[];
  };
  
  export type Indicator = {
    id: string;
    label: string;
    unit: string;
    baseline: number;
    baselineYear: number;
    targets: {
      2033: number;
      2043: number;
      2053: number;
      2063: number;
    };
  };
  
  export type Project = {
    id: string;
    number: number;
    name: string;
    nameFr: string;
    axe: string[];
    primaryAxe: string;
    description: string;
    descriptionHighlight?: string;
    indicators: Indicator [];
  };
  
  // ============================================
  // THE 5 STRATEGIC AXES
  // ============================================
  
  export const axes: Axe[] = [
    {
      id: 'axe-1',
      number: 1,
      label: 'Souveraineté et Sécurité',
      color: '#8B2020',
      icon: 'shield',
      globalObjectives: [
        {
          id: 'obj-1-1',
          label: '1.1. Renforcer la capacité de défense et de sécurité du pays',
          specificObjectives: [
            {
              id: 'sobj-1-1-1',
              label: 'Acquérir des capacités militaires suffisantes pour la défense de l\'intégrité territoriale'
            },
            {
              id: 'sobj-1-1-2',
              label: 'Éradiquer le terrorisme et l\'extrémisme violent sous toutes ses formes'
            }
          ]
        },
        {
          id: 'obj-1-2',
          label: '1.2. Préserver et consolider la paix sociale',
          specificObjectives: [
            {
              id: 'sobj-1-2-1',
              label: 'Restaurer la cohésion sociale et le vivre ensemble'
            },
            {
              id: 'sobj-1-2-2',
              label: 'Mettre en œuvre les recommandations du Dialogue Inter-Maliens'
            }
          ]
        }
      ]
    },
    {
      id: 'axe-2',
      number: 2,
      label: 'Refondation de la Gouvernance',
      color: '#1A3A6A',
      icon: 'landmark',
      globalObjectives: [
        {
          id: 'obj-2-1',
          label: '2.1. Renforcer l\'autorité et le leadership de l\'État',
          specificObjectives: [
            {
              id: 'sobj-2-1-1',
              label: 'Améliorer la gouvernance des secteurs stratégiques'
            },
            {
              id: 'sobj-2-1-2',
              label: 'Renforcer la confiance dans les institutions'
            }
          ]
        },
        {
          id: 'obj-2-2',
          label: '2.2. Améliorer la gouvernance politique, administrative et judiciaire',
          specificObjectives: [
            {
              id: 'sobj-2-2-1',
              label: 'Promouvoir la justice et les droits de l\'Homme'
            },
            {
              id: 'sobj-2-2-2',
              label: 'Renforcer l\'efficacité de la politique extérieure'
            },
            {
              id: 'sobj-2-2-3',
              label: 'Rendre l\'administration publique moderne et performante'
            },
            {
              id: 'sobj-2-2-4',
              label: 'Améliorer l\'administration du territoire et la décentralisation'
            }
          ]
        },
        {
          id: 'obj-2-3',
          label: '2.3. Améliorer la gouvernance économique et financière',
          specificObjectives: [
            {
              id: 'sobj-2-3-1',
              label: 'Améliorer le système de planification du développement'
            },
            {
              id: 'sobj-2-3-2',
              label: 'Renforcer la lutte contre la corruption et la délinquance financière'
            },
            {
              id: 'sobj-2-3-3',
              label: 'Assainir la gestion foncière'
            }
          ]
        }
      ]
    },
    {
      id: 'axe-3',
      number: 3,
      label: 'Transformation Économique et Croissance',
      color: '#C8992A',
      icon: 'trending-up',
      globalObjectives: [
        {
          id: 'obj-3-1',
          label: '3.1. Accroître la productivité globale et diversifier les activités économiques',
          specificObjectives: [
            {
              id: 'sobj-3-1-1',
              label: 'Accroître durablement les productions agricoles, animales et halieutiques'
            },
            {
              id: 'sobj-3-1-2',
              label: 'Faire de l\'artisanat, le tourisme et la culture des facteurs de développement'
            },
            {
              id: 'sobj-3-1-3',
              label: 'Diversifier et intégrer l\'exploitation minière à l\'économie'
            }
          ]
        },
        {
          id: 'obj-3-2',
          label: '3.2. Assurer la transformation industrielle de l\'économie',
          specificObjectives: [
            {
              id: 'sobj-3-2-1',
              label: 'Assurer la transformation industrielle de l\'économie'
            },
            {
              id: 'sobj-3-2-2',
              label: 'Développer les échanges commerciaux'
            }
          ]
        },
        {
          id: 'obj-3-3',
          label: '3.3. Accélérer le développement des secteurs d\'appui à la croissance',
          specificObjectives: [
            {
              id: 'sobj-3-3-1',
              label: 'Assurer un développement équilibré des différents modes de transport'
            },
            {
              id: 'sobj-3-3-2',
              label: 'Accroître la capacité et garantir la sécurité énergétique du pays'
            },
            {
              id: 'sobj-3-3-3',
              label: 'Assurer une révolution numérique'
            },
            {
              id: 'sobj-3-3-4',
              label: 'Diversifier les sources de financement de l\'économie'
            }
          ]
        }
      ]
    },
    {
      id: 'axe-4',
      number: 4,
      label: 'Capital Humain et Territoires Résilients',
      color: '#2D5A3D',
      icon: 'users',
      globalObjectives: [
        {
          id: 'obj-4-1',
          label: '4.1. Contribuer à l\'émergence d\'un capital humain de qualité',
          specificObjectives: [
            {
              id: 'sobj-4-1-1',
              label: 'Mettre en place un système éducatif performant, cohérent et inclusif'
            },
            {
              id: 'sobj-4-1-2',
              label: 'Mettre en place un système de santé moderne'
            },
            {
              id: 'sobj-4-1-3',
              label: 'Faire émerger un citoyen malien doté de vertus et de hautes qualités humaines'
            }
          ]
        },
        {
          id: 'obj-4-2',
          label: '4.2. Mettre les femmes, les jeunes et les Maliens de l\'extérieur au cœur du développement',
          specificObjectives: [
            {
              id: 'sobj-4-2-1',
              label: 'Créer les conditions de l\'autonomisation économique de la femme'
            },
            {
              id: 'sobj-4-2-2',
              label: 'Faire des jeunes les acteurs du changement et de l\'unité nationale'
            },
            {
              id: 'sobj-4-2-3',
              label: 'Encourager la participation des Maliens établis à l\'extérieur au développement'
            }
          ]
        },
        {
          id: 'obj-4-3',
          label: '4.3. Développer des territoires équilibrés',
          specificObjectives: [
            {
              id: 'sobj-4-3-1',
              label: 'Accroître l\'attractivité des zones sous-peuplées et défavorisées'
            },
            {
              id: 'sobj-4-3-2',
              label: 'Accroître l\'attractivité des villes'
            },
            {
              id: 'sobj-4-3-3',
              label: 'Réduire les inégalités sociales et la pauvreté'
            },
            {
              id: 'sobj-4-3-4',
              label: 'Créer des emplois décents'
            }
          ]
        }
      ]
    },
    {
      id: 'axe-5',
      number: 5,
      label: 'Environnement et Résilience Climatique',
      color: '#4CAF72',
      icon: 'leaf',
      globalObjectives: [
        {
          id: 'obj-5-1',
          label: '5.1. Préserver et mieux gérer l\'environnement et promouvoir le développement durable',
          specificObjectives: [
            {
              id: 'sobj-5-1-1',
              label: 'Promouvoir l\'éducation environnementale de qualité'
            },
            {
              id: 'sobj-5-1-2',
              label: 'Accélérer l\'accès de la population aux services d\'assainissement durable'
            },
            {
              id: 'sobj-5-1-3',
              label: 'Gérer durablement la biodiversité et les écosystèmes terrestres et aquatiques'
            }
          ]
        },
        {
          id: 'obj-5-2',
          label: '5.2. Développer les capacités de résilience des populations face aux changements climatiques',
          specificObjectives: [
            {
              id: 'sobj-5-2-1',
              label: 'Renforcer les capacités de prévention et de gestion des risques et catastrophes'
            },
            {
              id: 'sobj-5-2-2',
              label: 'Améliorer les capacités d\'adaptation des populations et la résilience'
            },
            {
              id: 'sobj-5-2-3',
              label: 'Renforcer la lutte contre la sécheresse et la désertification'
            }
          ]
        }
      ]
    }
  ];
  
  // ============================================
  // THE 11 STRUCTURAL PROJECTS
  // ============================================
  
  export const projects: Project[] = [
    {
      id: 'projet-1',
      number: 1,
      name: 'FARAFINNA JIGINƐ',
      nameFr: 'Nourrir le Mali et la Sous-Région',
      primaryAxe: 'axe-3',
      axe: ['axe-3', 'axe-4', 'axe-5'],
      description: 'Développer 12 agropoles autour des filières porteuses pour assurer la souveraineté alimentaire du Mali et en faire un exportateur net de produits agricoles.',
      descriptionHighlight: '12 agropoles',
      indicators: [
        {
          id: 'ind-cereal',
          label: 'Production céréalière',
          unit: 'Mt',
          baseline: 10.3,
          baselineYear: 2022,
          targets: { 2033: 15.5, 2043: 23.4, 2053: 35.3, 2063: 53.4 }
        },
        {
          id: 'ind-cotton',
          label: 'Production de coton',
          unit: 'Mt',
          baseline: 0.7,
          baselineYear: 2022,
          targets: { 2033: 1.2, 2043: 1.8, 2053: 2.5, 2063: 3.5 }
        },
        {
          id: 'ind-agro-export',
          label: 'Exportations agro-industrielles',
          unit: 'Mds FCFA',
          baseline: 450,
          baselineYear: 2022,
          targets: { 2033: 900, 2043: 1800, 2053: 3200, 2063: 5500 }
        }
      ]
    },
    {
      id: 'projet-2',
      number: 2,
      name: 'YEELEN KURA',
      nameFr: 'Éclairer le Mali',
      primaryAxe: 'axe-3',
      axe: ['axe-3', 'axe-4', 'axe-5'],
      description: 'Valoriser les ressources énergétiques du Mali pour atteindre 100% d\'accès à l\'électricité d\'ici 2063 avec 70% d\'énergies renouvelables.',
      descriptionHighlight: 'ressources énergétiques',
      indicators: [
        {
          id: 'ind-elec',
          label: 'Accès à l\'électricité',
          unit: '%',
          baseline: 55.8,
          baselineYear: 2023,
          targets: { 2033: 82, 2043: 90, 2053: 100, 2063: 100 }
        },
        {
          id: 'ind-renewable',
          label: 'Part des énergies renouvelables',
          unit: '%',
          baseline: 22,
          baselineYear: 2022,
          targets: { 2033: 40, 2043: 55, 2053: 65, 2063: 70 }
        },
        {
          id: 'ind-capacity',
          label: 'Capacité de production installée',
          unit: 'MW',
          baseline: 980,
          baselineYear: 2022,
          targets: { 2033: 2500, 2043: 4800, 2053: 7200, 2063: 12000 }
        }
      ]
    },
    {
      id: 'projet-3',
      number: 3,
      name: 'INDUSTRIALISER LE MALI',
      nameFr: 'Industrialiser le Mali',
      primaryAxe: 'axe-3',
      axe: ['axe-3', 'axe-4'],
      description: 'Développer des zones industrielles et zones franches pour créer des pôles régionaux de croissance économique basés sur la transformation des produits locaux.',
      descriptionHighlight: 'zones industrielles et zones franches',
      indicators: [
        {
          id: 'ind-manuf',
          label: 'Part du secteur manufacturier dans le PIB',
          unit: '%',
          baseline: 6.44,
          baselineYear: 2022,
          targets: { 2033: 11.44, 2043: 16.44, 2053: 21.44, 2063: 26.44 }
        },
        {
          id: 'ind-zones',
          label: 'Zones industrielles opérationnelles',
          unit: 'unités',
          baseline: 2,
          baselineYear: 2022,
          targets: { 2033: 8, 2043: 14, 2053: 20, 2063: 26 }
        },
        {
          id: 'ind-export-manuf',
          label: 'Exportations de produits manufacturés',
          unit: '%  du total',
          baseline: 8,
          baselineYear: 2022,
          targets: { 2033: 18, 2043: 28, 2053: 38, 2063: 48 }
        }
      ]
    },
    {
      id: 'projet-4',
      number: 4,
      name: 'KANKU MUSA SEGINNA',
      nameFr: 'Le Retour de l\'Âge d\'Or de Kankou Moussa',
      primaryAxe: 'axe-3',
      axe: ['axe-3', 'axe-2'],
      description: 'Diversifier et industrialiser l\'exploitation minière - or, lithium, uranium - pour faire bénéficier les populations maliennes des retombées de leurs ressources.',
      descriptionHighlight: 'Diversifier et industrialiser l\'exploitation minière',
      indicators: [
        {
          id: 'ind-mining-rev',
          label: 'Revenus miniers de l\'État',
          unit: 'Mds FCFA',
          baseline: 380,
          baselineYear: 2022,
          targets: { 2033: 750, 2043: 1400, 2053: 2200, 2063: 3500 }
        },
        {
          id: 'ind-lithium',
          label: 'Production de lithium',
          unit: 'kt',
          baseline: 0,
          baselineYear: 2022,
          targets: { 2033: 15, 2043: 45, 2053: 80, 2063: 120 }
        },
        {
          id: 'ind-mining-local',
          label: 'Transformation locale des minerais',
          unit: '%',
          baseline: 5,
          baselineYear: 2022,
          targets: { 2033: 20, 2043: 40, 2053: 60, 2063: 80 }
        }
      ]
    },
    {
      id: 'projet-5',
      number: 5,
      name: 'INTÉGRER LE MALI AU MONDE',
      nameFr: 'Intégrer le Mali au Monde',
      primaryAxe: 'axe-3',
      axe: ['axe-3', 'axe-2', 'axe-4'],
      description: 'Développer un réseau multimodal de transport - routes, rail, fleuve, aérien - pour faire du désenclavement le moteur d\'une croissance forte et durable.',
      descriptionHighlight: 'réseau multimodal de transport',
      indicators: [
        {
          id: 'ind-rail',
          label: 'Réseau ferroviaire',
          unit: 'km',
          baseline: 643,
          baselineYear: 2022,
          targets: { 2033: 1200, 2043: 1800, 2053: 2400, 2063: 3000 }
        },
        {
          id: 'ind-roads',
          label: 'Routes bitumées',
          unit: 'km',
          baseline: 6000,
          baselineYear: 2022,
          targets: { 2033: 9000, 2043: 12000, 2053: 16000, 2063: 22000 }
        },
        {
          id: 'ind-logistics',
          label: 'Indice de performance logistique',
          unit: '/5',
          baseline: 2.4,
          baselineYear: 2022,
          targets: { 2033: 3.0, 2043: 3.5, 2053: 4.0, 2063: 4.5 }
        }
      ]
    },
    {
      id: 'projet-6',
      number: 6,
      name: 'SIGIDA YIRIWA',
      nameFr: 'Mieux Vivre à Bamako et dans les Capitales Régionales',
      primaryAxe: 'axe-4',
      axe: ['axe-4', 'axe-2', 'axe-3'],
      description: 'Développer des villes attractives, bien gouvernées, avec des infrastructures et services de qualité pour tous les citoyens maliens.',
      descriptionHighlight: 'villes attractives',
      indicators: [
        {
          id: 'ind-urban-access',
          label: 'Accès aux services urbains de base',
          unit: '%',
          baseline: 45,
          baselineYear: 2022,
          targets: { 2033: 65, 2043: 78, 2053: 88, 2063: 95 }
        },
        {
          id: 'ind-housing',
          label: 'Logements décents construits',
          unit: 'milliers',
          baseline: 12,
          baselineYear: 2022,
          targets: { 2033: 40, 2043: 80, 2053: 130, 2063: 200 }
        },
        {
          id: 'ind-urban-pop',
          label: 'Population urbaine',
          unit: '%',
          baseline: 43,
          baselineYear: 2022,
          targets: { 2033: 52, 2043: 60, 2053: 67, 2063: 74 }
        }
      ]
    },
    {
      id: 'projet-7',
      number: 7,
      name: 'INNOVATION ET DIGITALISATION',
      nameFr: 'Innovation, Digitalisation et Numérisation des Services',
      primaryAxe: 'axe-3',
      axe: ['axe-3', 'axe-2', 'axe-4'],
      description: 'Positionner le Mali comme hub technologique en Afrique de l\'Ouest en faisant du numérique un vecteur de développement humain durable.',
      descriptionHighlight: 'hub technologique en Afrique de l\'Ouest',
      indicators: [
        {
          id: 'ind-internet',
          label: 'Accès à internet',
          unit: '%',
          baseline: 62.81,
          baselineYear: 2022,
          targets: { 2033: 80, 2043: 85, 2053: 90, 2063: 95 }
        },
        {
          id: 'ind-digital-services',
          label: 'Services publics numérisés',
          unit: '%',
          baseline: 15,
          baselineYear: 2022,
          targets: { 2033: 50, 2043: 70, 2053: 85, 2063: 95 }
        },
        {
          id: 'ind-startups',
          label: 'Startups technologiques actives',
          unit: 'unités',
          baseline: 120,
          baselineYear: 2022,
          targets: { 2033: 400, 2043: 900, 2053: 1800, 2063: 3500 }
        }
      ]
    },
    {
      id: 'projet-8',
      number: 8,
      name: 'PROGRAMME SANKORÉ',
      nameFr: 'Ressources Humaines Saines, Mieux Formées et Compétentes',
      primaryAxe: 'axe-4',
      axe: ['axe-4', 'axe-2', 'axe-3'],
      description: 'Refonder le système éducatif et de santé pour former le Maliden Kura — un citoyen responsable, compétent, porteur des valeurs et du développement du Mali.',
      descriptionHighlight: 'Refonder le système éducatif et de santé',
      indicators: [
        {
          id: 'ind-mortality',
          label: 'Mortalité maternelle',
          unit: 'p. 100k naissances',
          baseline: 325,
          baselineYear: 2022,
          targets: { 2033: 194, 2043: 138, 2053: 98, 2063: 70 }
        },
        {
          id: 'ind-literacy',
          label: 'Taux d\'alphabétisation',
          unit: '%',
          baseline: 35,
          baselineYear: 2022,
          targets: { 2033: 55, 2043: 70, 2053: 82, 2063: 92 }
        },
        {
          id: 'ind-school',
          label: 'Taux de scolarisation secondaire',
          unit: '%',
          baseline: 42,
          baselineYear: 2022,
          targets: { 2033: 62, 2043: 75, 2053: 85, 2063: 93 }
        }
      ]
    },
    {
      id: 'projet-9',
      number: 9,
      name: 'MALI VERT ET BIEN-ÊTRE',
      nameFr: 'Mali Vert et Bien-Être',
      primaryAxe: 'axe-5',
      axe: ['axe-5', 'axe-4', 'axe-3'],
      description: 'Assurer une gestion intégrée et durable des ressources naturelles, l\'amélioration du cadre de vie et l\'accès à l\'eau potable pour tous les Maliens.',
      descriptionHighlight: 'gestion intégrée et durable des ressources naturelles',
      indicators: [
        {
          id: 'ind-water',
          label: 'Accès à l\'eau potable',
          unit: '%',
          baseline: 72.1,
          baselineYear: 2022,
          targets: { 2033: 95, 2043: 100, 2053: 100, 2063: 100 }
        },
        {
          id: 'ind-forest',
          label: 'Couverture forestière restaurée',
          unit: 'Mha',
          baseline: 0,
          baselineYear: 2022,
          targets: { 2033: 1.2, 2043: 2.8, 2053: 4.5, 2063: 6.0 }
        },
        {
          id: 'ind-greenbelt',
          label: 'Grande Muraille Verte — avancement',
          unit: '%',
          baseline: 18,
          baselineYear: 2022,
          targets: { 2033: 40, 2043: 65, 2053: 85, 2063: 100 }
        }
      ]
    },
    {
      id: 'projet-10',
      number: 10,
      name: 'RÉFORMES NÉCESSAIRES',
      nameFr: 'Réformes Nécessaires',
      primaryAxe: 'axe-2',
      axe: ['axe-2', 'axe-1', 'axe-3'],
      description: 'Redéfinir le rôle de l\'État pour en faire un acteur performant, stratège et catalyseur du développement économique, social, culturel et environnemental.',
      descriptionHighlight: 'Redéfinir le rôle de l\'État',
      indicators: [
        {
          id: 'ind-corruption',
          label: 'Score Transparency International',
          unit: '/100',
          baseline: 28,
          baselineYear: 2022,
          targets: { 2033: 45, 2043: 60, 2053: 70, 2063: 80 }
        },
        {
          id: 'ind-tax',
          label: 'Pression fiscale',
          unit: '% PIB',
          baseline: 14.2,
          baselineYear: 2022,
          targets: { 2033: 18, 2043: 21, 2053: 24, 2063: 27 }
        },
        {
          id: 'ind-business',
          label: 'Climat des affaires — rang africain',
          unit: 'rang',
          baseline: 38,
          baselineYear: 2022,
          targets: { 2033: 25, 2043: 15, 2053: 8, 2063: 3 }
        }
      ]
    },
    {
      id: 'projet-11',
      number: 11,
      name: 'KUNNAFONI TAASIRA',
      nameFr: 'Infrastructure Nationale de Données Géospatiales',
      primaryAxe: 'axe-2',
      axe: ['axe-2', 'axe-3', 'axe-1'],
      description: 'Développer une infrastructure nationale de données géographiques pour disposer de références fiables pour la mise en œuvre et le suivi des projets de développement.',
      descriptionHighlight: 'infrastructure nationale de données',
      indicators: [
        {
          id: 'ind-geodata',
          label: 'Couverture cartographique',
          unit: '%',
          baseline: 40,
          baselineYear: 2022,
          targets: { 2033: 60, 2043: 80, 2053: 95, 2063: 100 }
        },
        {
          id: 'ind-opendata',
          label: 'Jeux de données publics disponibles',
          unit: 'unités',
          baseline: 45,
          baselineYear: 2022,
          targets: { 2033: 200, 2043: 500, 2053: 1000, 2063: 2000 }
        },
        {
          id: 'ind-data-users',
          label: 'Utilisateurs de la plateforme nationale',
          unit: 'milliers',
          baseline: 0,
          baselineYear: 2022,
          targets: { 2033: 5, 2043: 20, 2053: 50, 2063: 100 }
        }
      ]
    }
  ];

  // ============================================
  // KEY VISION INDICATORS
  // ============================================
  
  export const indicators: Indicator[] = [
    {
      id: 'ind-gdp',
      label: 'Croissance du PIB (TCAM)',
      unit: '%',
      baseline: 4.9,
      baselineYear: 2023,
      targets: { 2033: 11.9, 2043: 10, 2053: 10, 2063: 10 }
    },
    {
      id: 'ind-poverty',
      label: 'Taux d\'incidence de la pauvreté',
      unit: '%',
      baseline: 43.9,
      baselineYear: 2023,
      targets: { 2033: 32, 2043: 25, 2053: 16, 2063: 10 }
    },
    {
      id: 'ind-idh',
      label: 'Indice de Développement Humain',
      unit: '',
      baseline: 0.428,
      baselineYear: 2022,
      targets: { 2033: 0.550, 2043: 0.650, 2053: 0.750, 2063: 0.880 }
    },
    {
      id: 'ind-income',
      label: 'Revenu par tête',
      unit: 'USD',
      baseline: 2517,
      baselineYear: 2023,
      targets: { 2033: 3048, 2043: 5000, 2053: 8110, 2063: 13900 }
    },
    {
      id: 'ind-electricity',
      label: 'Taux d\'accès à l\'électricité',
      unit: '%',
      baseline: 55.8,
      baselineYear: 2023,
      targets: { 2033: 82, 2043: 90, 2053: 100, 2063: 100 }
    },
    {
      id: 'ind-water-access',
      label: 'Accès à l\'eau potable',
      unit: '%',
      baseline: 72.1,
      baselineYear: 2022,
      targets: { 2033: 95, 2043: 100, 2053: 100, 2063: 100 }
    },
    {
      id: 'ind-life-expectancy',
      label: 'Espérance de vie à la naissance',
      unit: 'ans',
      baseline: 58.6,
      baselineYear: 2022,
      targets: { 2033: 62, 2043: 70, 2053: 73, 2063: 76 }
    },
    {
      id: 'ind-infant-mortality',
      label: 'Taux de mortalité infantile',
      unit: 'pour 1000',
      baseline: 54,
      baselineYear: 2022,
      targets: { 2033: 25, 2043: 15, 2053: 9, 2063: 5 }
    }
  ];
  
  // ============================================
  // VISION PHASES
  // ============================================
  
  export const phases = [
    {
      id: 'phase-1',
      period: '2024–2033',
      label: 'Refondation de l\'État et Transformation Structurelle',
      description: 'Renforcement des forces armées, sécurité, souveraineté alimentaire, développement d\'une économie nationale intégrée.'
    },
    {
      id: 'phase-2',
      period: '2034–2043',
      label: 'Spécialisation dans les Secteurs à Haute Valeur Ajoutée',
      description: 'Atteindre l\'émergence économique, développement des industries lourdes et technologies de pointe.'
    },
    {
      id: 'phase-3',
      period: '2044–2053',
      label: 'Développement Humain Élevé',
      description: 'Améliorer durablement le bien-être des populations en éradiquant toutes les formes de pauvreté.'
    },
    {
      id: 'phase-4',
      period: '2054–2063',
      label: 'Consolidation et Industrialisation Avancée',
      description: 'Parachèvement de l\'industrialisation et développement harmonieux des services.'
    }
  ];