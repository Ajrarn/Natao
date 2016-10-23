# La barre de boutons principale

![Image of MenuBar](./src/images/menuBar.png)

Cette barre présente en haut de l'éditeur te donne accès aux fonctionnalités essentielles de Natao.

## Zoome et Dézoome

 - <span class="typcn typcn-zoom-out-outline"></span> te permet de diminuer la taille des caractères pour toute l'application.
 - <span class="typcn typcn-zoom-in-outline"></span> te permet d'augmenter la taille des caractères pour toute l'application.

Une chose que tu dois savoir à propos de Natao, c'est que tout est enregistré automatiquement. Les modifications que tu apportes en le règlant, par exemple ici avec ces boutons, est sauvegardé.
Tu n'auras pas à refaire ces réglages lorsque tu le redémarreras.

## Dyslexie

<span class="typcn typcn-lightbulb"></span> te permet d'activer ou de désactiver pour toute l'application, la police de caractère open-dyslexic.
Cette dernière est spécialement étudiée pour améliorer le confort de lecture des dyslexiques.

Il y a une petite exception à cette règle : les polices explicitement choisies dans les feuilles de style, mais on verra cela plus tard.

## Les 3 panneaux

- <span class="typcn typcn-th-menu-outline"></span> permet de masquer/afficher le panneau de navigation dans tes documents, appelé aussi **Documents**.
- <span class="typcn typcn-edit"></span> permet de masquer/afficher l'éditeur Markdown
- <span class="typcn typcn-eye-outline"></span> permet de masquer/afficher le panneau de visualisation du résultat.

## Imprimer

<span class="typcn typcn-printer"></span> te permet d'imprimer le document actif.

## Aide

<span>?</span> te permet d'ouvrir une nouvelle fenêtre avec l'aide (ce que tu es en train de lire).

## Règlages

<span class="typcn typcn-cog-outline"></span> te permet d'accéder aux réglages de Natao.

# Documents

## La barre d'outils de l'explorateur de documents
![Image of ExplorerBar](./src/images/documents.png)

Cette barre contient un titre cliquable pour basculer de la vue **Corbeille** à la vue **Documents**, et 3 boutons :
- <span class="typcn typcn-book"></span> permet de coller un contenu préalablement copié ou coupé dans le presse-papiers de Natao.
- <span class="typcn typcn-download-outline"></span> permet d'importer un contenu depuis un fichier.
- <span class="typcn typcn-plus-outline"></span> permet d'ajouter un dossier à la racine de **Documents**. Lors de la création d'un dossier, tu peux utiliser un modèle de structure qui ajoutera dans ton dossier des sous-dossier correspondant à l'organisation que tu as choisi.

## L'explorateur de documents

![Image of Explorer](./src/images/explorer.png)

Dans ce dernier apparaissent tes dossiers et documents, selon l'organisation qui te convient.
- Un clic sur une icône de dossier le sélectionnera, le pliera ou le dépliera.
- Un clic sur le nom du dossier ouvrira un menu d'actions sur ce dernier que l'on verra juste après.
- un clic sur un document, l'ouvrira dans la partie de droite, dans l'éditeur et le panneau de visualisation.


## Les actions sur les dossiers

 ![Image of Explorer](./src/images/folderOptions.png)

- <span class="typcn typcn-edit"></span> permet de modifier le nom du dossier, sa couleur, ou la feuille de style par défaut des documents qu'il contient. La modification du style par défaut n'est pas appliquée  à tous les sous-dossiers et documents de ce dernier.
- <span class="typcn typcn-folder-add"></span> permet d'ajouter un sous-dossier à celui que l'on a sélectionné. On peut également ici utiliser un modèle de structure pour créer automatiquement les sous-dossiers correspondant au modèle.
- <span class="typcn typcn-document-add"></span> permet d'ajouter un document dans le dossier sélectionné.
- <span class="typcn typcn-tabs-outline"></span> permet de copier un dossier et tout son contenu dans le presse-papier de Natao.
- <span class="typcn typcn-scissors-outline"></span> permet de couper un dossier et tout son contenu dans le presse-papier de Natao.
- <span class="typcn typcn-book"></span> permet de coller un contenu préalablement copié ou coupé dans le presse-papiers de Natao.
- <span class="typcn typcn-export-outline"></span> permet d'exporter dans un fichier un dossier et tout son contenu.
- <span class="typcn typcn-download-outline"></span> permet d'importer un contenu exporté depuis un fichier.
- <span class="typcn typcn-flow-children"></span> permet d'enregistrer la structure, tous les sous-dossiers sans les documents, en tant que modèle de structure. Ce modèle de structure pourra être utilisé à chaque création de dossier/sous-dossier.
- <span class="typcn typcn-trash"></span> permet de mettre le dossier dans la corbeille avec tout ce qu'il contient.

## Dans la corbeille
Tu peux y voir un arbre contenant les documents que tu y as mis. Il y a moins d'interactions dans cette vue.
Les seules choses que tu peux faire sur les dossiers et documents sont:

- <span class="typcn typcn-trash"></span> les supprimer définitivement.
- <span class="typcn typcn-media-rewind-outline"></span> les restaurer(si possible à leur emplacement d'origine).



# L'éditeur

## Généralités
 Voici l'outil principal de Natao. Celui qui te permet de rédiger tes documents. Tu peux y voir 3 champs de saisie/sélection:
- *Le titre* : Le titre de ton document n'est pas inclus dans la rédaction de ce dernier. Cela permet notamment de le voir dans le navigateur. Mais ne t'inquiètes pas, il apparait bien dans le panneau de visualisation et quand tu imprimes le document.
- *Le style* :  Le style que tu choisis ici modifie la mise en page de ton document dans le panneau de visualisation. On verra plus loin, comment créer ou modifier une feuille de style.
- *Créé le* : La date de création. Par défaut, c'est la date du jour, mais tu peux la modifier. Cette date apparaîtra dans ton document en fonction de la feuille de style choisie. Cela peut donc être la date de remise d'un devoir par exemple.

 Il y a également quelques boutons qui ont la même signification que dans le navigateur:
- <span class="typcn typcn-tabs-outline"></span> permet de copier le document courant(avec ses champs) dans le presse-papier de Natao.
- <span class="typcn typcn-scissors-outline"></span> permet de couper le document courant dans le presse-papier de Natao.
- <span class="typcn typcn-export-outline"></span> permet d'exporter dans un fichier le document courant.
- <span class="typcn typcn-trash"></span> permet de supprimer le document courant.

## Insérer une image

- <span class="typcn typcn-image-outline"></span> te permet d'insérer une image dans ton document. Tu trouveras une explication détaillée de ce qu'il fait dans l'aide sur le Markdown dans le chapitre *Images*.

## Réglages de l'éditeur
Le bouton <span class="typcn typcn-cog"></span> te permet d'agir sur la présentation de l'éditeur avec 2 options très pratiques notamment en cas de troubles visuo-spatiaux:
- la possibilité de mettre des rayures. Les lignes (dans le sens de l'éditeur, voir le numéro à gauche) seront rayées blanches et grises te permettant de te situer plus rapidement dans le document.
- la possibilité d'augmenter la taille des lignes, et donc de séparer davantage les lignes de texte que par défaut.

## Rechercher du texte
Le bouton <span class="typcn typcn-zoom-outline"></span> te permet d'ouvrir un panneau de recherche au dessus de l'éditeur Markdown.

Ce panneau te permet de rechercher du texte dans l'éditeur Markdown.

En tapant le texte recherché dans le champs *Recherche*, celui-ci va surligner les occurences du mot trouvé dans le Markdown, il va également t'indiquer combien il en a trouvé.

Les flèches <span class="typcn typcn-arrow-left-outline"></span> et <span class="typcn typcn-arrow-right-outline"></span>, te permettront de positionner l'éditeur sur le précédent ou le prochain mot correspondant. Tu verras l'occurence sélectionné dans une couleur plus foncée.

Mais tu peux également remplacer une ou plusieurs occurences avec le texte que tu écris dans le champs *Remplace par*.

- Le bouton <span class="typcn typcn-arrow-repeat"></span> remplace l'occurence en cours.
- Le bouton <span class="typcn typcn-arrow-repeat-outline"></span> remplace toutes les occurences.


## L'éditeur Markdown

L'éditeur est composé d'un espace où tu peux saisir ton document en Markdown (pour connaître cette syntaxe, je t'invite à consulter la section d'aide dédiée), et d'une barre verticale contenant des numéros de lignes et qui peut aussi contenir d'autres symbôles suivant le contexte. Ici, tu pourras y voir des petits triangles te permettant de plier ou déplier ton document. Cela te permet entre autres de visualiser le plan de ton document.

Tu pourras également constater que l'éditeur met en valeur ton texte Markdown pour t'aider à t'y retrouver, à l'aide de couleurs, taille de caractères, etc...

# Le panneau de visualisation
C'est le panneau le plus simple, et finalement le plus important. C'est lui qui te montre à quoi ressemblera ton document une fois imprimé. Si tu cliques, sur le bouton <span class="typcn typcn-printer"></span>, ce panneau prendra tout l'espace avant de te proposer l'impression.
