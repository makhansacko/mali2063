# Démonstration SNEDD / delivery unit

Page ajoutée : `/demo-suivi/index.html`. Un lien « Démo suivi » est ajouté au menu principal.

La page est autonome : HTML, CSS et JavaScript sans dépendance supplémentaire. Elle est servie par le répertoire static de SvelteKit et peut aussi être ouverte directement dans un navigateur.

Cinq vues : synthèse, six indicateurs, onze projets, revue de performance, méthode et données. Filtres croisés, fiches détaillées, registre de décisions modifiable pendant la session, export CSV et impression de la revue.

Les références et cibles 2033 ont été reprises du fichier vision.ts fourni, sans certification de leur conformité à la SNEDD officielle. Toutes les réalisations, trajectoires intermédiaires, affectations, budgets et données opérationnelles sont simulées. Les règles de calcul sont expliquées dans la page.

Parcours conseillé : ouvrir la synthèse ; sélectionner YEELEN KURA ; comparer la trajectoire et l’avancement ; ouvrir le projet ; examiner le blocage ; modifier un engagement dans la revue ; exporter les données filtrées. Les décisions modifiées ne sont pas sauvegardées après rechargement.

Validation effectuée : syntaxe et exécution JavaScript, rendu des cinq vues en environnement DOM simulé, filtres croisés, indicateurs à réduire et manquants, ouverture des fiches, actualisation du registre. Aucune vérification visuelle dans un navigateur ni reconstruction complète du site SvelteKit n’a été effectuée.
