Peut-être souhaites tu en savoir plus sur les raisons de faire ce logiciel, et sur la façon dont il est fait. Ce document est fait pour cela. Pour expliquer l'idée et les concepts derrière sa réalisation.

# Pourquoi ?

## Une petite histoire...
Je suis développeur, et comme la plupart de mes confrères, j'utilise des éditeurs de code qui me facilitent drôlement la vie, mais j'y reviendrais plus tard.

Mon fils est dyspraxique et on m'a demandé de lui fournir des modèles de documents Word, pour lui faciliter l'usage de l'ordinateur en classe. Et, si beaucoup pensent que c'est super cool d'utiliser un ordinateur en classe, je me suis dis que ce n'était pas aussi simple que ça en avait l'air. Et pourtant, ça le devrait.

Mais qu'est-ce qui ne va pas ?

## L'explorateur de fichiers
Un élève utilisant un ordinateur, doit classer ses documents dans des dossiers, dans une fenêtre *Explorateur de fichier* et les ouvrir dans une fenêtre à part *Traitement de texte*. Pour passer d'un document à un autre, il peut soit revenir sur la fenêtre *Explorateur de fichier*, soit aller explorer le menu du *Traitement de texte* pour aller ouvrir un document en ouvrant une mini fenêtre *Explorateur de fichier*.

Et bien pour les développeurs, la vie est plus douce. Nos éditeurs de code incluent bien souvent l'équivalent de l'*Explorateur de fichier* pratiquement affiché en permanence sur un panneau à gauche. Ainsi, nous ne perdons pas de vue, l'ensemble des fichiers de nos projets. Et mieux encore, un fichier que l'on ouvre ne surgit pas dans une nouvelle fenêtre, il est ouvert dans un panneau d'édition du même logiciel.

Voila pourquoi Natao inclut cette fonctionnalité essentielle.

Mais je me suis dit que je pouvais faire un peu mieux. Imaginons que cet *Explorateur de documents* puisse faciliter le rangement de ceux-ci.

J'ai donc intégré 2 fonctionnalités supplémentaires:
- La possibilité de colorer les titres de dossiers(là, c'est juste un repère visuel, et l'idée n'est pas de moi).
- La possibilité d'enregistrer une structure de dossiers et de sous-dossier, sous la forme d'un modèle pour recréer facilement un mode de rangement qui nous convient.

## L'éditeur Markdown
Je n'ai rien contre les logiciels de *Traitement de texte*, ce sont des outils formidables, offrant énormément de possibilités. Mais leur puissance et leur richesse diminuent leur simplicité. Et j'ai le sentiment que la simplicité est la clé de l'utilisation d'un ordinateur à l'école, surtout pour un enfant ayant des troubles Dys quels qu'ils soient.

Les développeurs ont-ils un traitement de texte plus facile ?

### LaTeX

Oui... et Non. Je ne vais pas parler au nom de tous les développeurs, car tous ne s'en servent pas, mais nous disposons d'un formidable *Traitement de texte* appelé **LaTeX**. Formidable, car il permet à celui qui le comprends de rédiger des documents d'une qualité irréprochable, sans avoir l'impression d'utiliser un *Traitement de texte* classique. Mais inaccessible pour le commun des mortels, car il faut littéralement coder son document.

Mais LaTeX m'a appris quelque chose de fondamental : **Séparer la forme du contenu**.

En LaTeX, on décrit un document. A l'aide de mots clés on permet à l'outil de comprendre la structure de notre document et de le mettre en forme uniformément. La syntaxe n'est pas aisée, mais elle est plutôt claire.
Là, où le bàt blesse, c'est qu'il est parfois assez difficile de faire sa propre mise en forme.

Inaccessible pour la plupart des adultes, alors pour un enfant...

### HTML / CSS
Actuellement un des meilleurs exemples de la séparation de la forme et du contenu.
Si vous ne savez pas ce que c'est, tous les sites webs sont faits avec ces 2 langages.
Le HTML, c'est le contenu, et le CSS la forme. Et le CSS permet vraiment de faire des choses superbes.
Malheureusement, ici c'est le HTML qui n'est pas aisé à écrire.

### Enfin, le Markdown
Le Markdown, ce sont les idées de LaTeX, en plus simple, et la puissance de CSS puisqu'au final, il génère du HTML.
Quand j'ai vu la simplicité de cette syntaxe, j'ai tout de suite imaginé le gain de temps à la saisie. Rester sur le clavier sans passer par l'étape clic de souris sur telle ou telle portion de texte, puis rechercher parmi toutes les options, celles qui nous conviennent.

Ici, on valorise son texte, on l'organise, et la mise en forme se fait à un autre endroit: l'éditeur de feuilles de style.
Quand la feuille de style est suffisante, elle est réutilisable à l'infini.

Je reconnais qu'écrire du CSS n'est pas à la portée de tout le monde, mais je vais travailler là dessus dans une prochaine version.

En tout cas, l'idée principale est là :
- Markdown pour le contenu.
- CSS pour la forme.

# Comment ?

Attention, ici on parle de technologie, alors si le sujet ne vous intéresse pas, inutile de poursuivre.
Précision importante toutes les technologies utilisées ici sont open-source et gratuites. N'importe qui peut créer gratuitement le logiciel qu'il a envie en assemblant ces composants.
Mais surtout, tous ont créé des outils formidables sans lesquels je n'aurais pas pu développer Natao.

## NW.js
Le premier élément qui a permis de créer ce logiciel est **NW.js**. Mais qu'est-ce que c'est ?

Pour comprendre ce qu'est NW.js, on va reprendre au tout début. La base de tout cela, ce sont les navigateurs web. Ces logiciels permettent de lire et d'interpréter des pages web écrites en HTML, CSS et en Javascript.
Le HTML et le CSS s'occupent de l'aspect de la page. Le Javascript est un langage de programmation, il s'occupe donc normalement d'orchestrer les pages, les animations, etc...
Actuellement, avec ce trio HTML, CSS et Javascript, on peut développer de véritables applications web, mais qui tournent dans les navigateurs et qui sont principalement accessibles au travers d'un site web, donc connecté à internet.
Cette dernière assertion n'est pas tout à fait vraie, on peut des applications "offline", mais il faut les charger au moins une fois en navigaunt sur le site ou au travers de plugin de vos navigateurs.
En tout cas, les applications web ne peuvent pas écrire d'elle même sur votre disque dur. Leur accès à vos ressources physiques est verrouillé pour des raisons de sécurité.

Le Javascript devenant de facto un des langages les plus utilisés de la planète, certains ont eu l'idée de le faire tourner sur les serveurs. Ainsi un développeur aguerri de sites webs pourra également écrire le code côté serveur permettant d'accèder à des ressources physiques comme des bases de données. Cette technologie s'appelle **node.js**. Mais en **node.js**, on peut exécuter du javascript pour accèder à des ressources physiques, mais pas interpréter du HTML et du CSS, il a été créé pour être un serveur, pas un client, contrairement aux navigateurs.

Enfin, une équipe a eu l'idée géniale de regrouper **node.js** et **webkit**, un moteur de rendu HTML et CSS utilisé par de nombreux navigateurs. Ils on créé **NodeWebkit** qui est devenu plus tard **NW.js**.
Donc, **NW.js** est donc un navigateur qui accède aux ressources physiques de la machine sur laquelle il s'exécute.

Mais pour faire simple, disons que **NW.js** est une machine virtuelle permettant de faire tourner une application de type web que l'on livre avec **NW.js**, et plus important encore qui permet de la faire fonctionner déconnectée d'internet.
Natao, c'est du javascript, du HTML et du CSS exécuté par **NW.js** et livré avec ce dernier.

**NW.js** est multi plate-formes, Windows, MacOSX et Linux. Du coup, le code permettant de faire Natao est développé une fois et tourne sur les 3 plate-formes nativement.

## Showdown
Le deuxième élément est Showdown. C'est ce dernier qui transforme le Markdown en HTML. Sans lui, pas de rendu. Et Showdown permet de lire en plus du Markdown étendu comme GFM (Github Flavored Markdown)

## MathJax
Celui-ci permet de faire le rendu des formules mathématiques.

## CodeMirror
Ce dernier est l'éditeur de texte qui valorise en cours de frappe le MarkDown et le CSS, numérote les lignes. etc...

## NeDB
Une base de données qui tourne nativement sous Node.js et qui permet notamment ici de tout enregistrer dans un seul fichier, plutôt que disperser vos documents un peu partout et les perdre.

## Angular
C'est le framework javascript développée par Google qui sert de pierre angulaire à l'application Natao.

## OpenDyslexic
Je parle de celui-ci, car quand j'ai cherché une police pour dyslexique, je n'en ai trouvé qu'une seule d'open-source et plusieurs payantes. Très honnêtement, cela me désole qu'elles ne soient pas toutes open-source et gratuites...
Donc, un grand merci pour cette initiative.

## Et les autres
Il y a plusieurs librairies utilisées pour développer Natao, je vais essayer de les lister:
- **crypto-js** pour chiffrer le mot de passe
- **css** pour analyser le code css que vous rédigez
- **js-beautify** pour rendre le code HTML généré par Showdown lisible
- **lodash** une boite à outil indispensable
- **node-uuid** pour générer les id de chaque noeud de l'arborescence de l'explorateur
- **ng-showdown** pour faire fonctionner showdown avec Angular
- **typicons** toutes les icones utilisées ici
- **angular-tree-control$** l'explorateur de fichier
- **nw-fileDialog** les fenêtres d'ouverture de fichiers
- **angular-i18n** la base de l'internationalisation
- **angular-dynamic-locale** permettant de s'assurer que l'internationalisation fonctionne parfaitement
- **nsPopover** les petites fenêtres blanches de choix ou de confirmation
- **angular-ui-switch** les boutons switch dans l'éditeur de style notamment
- **angular-route** le routeur des différentes pages
- **ngjs-color-picker** qui permet d'adapter Inlet à Codemirror
- **angular-ui-codemirror** qui permet de faire tourner codemirror avec Angular
- **Inlet** le composant permettant de choisir les couleurs dans l'éditeur de CSS
- **angular-translate** la librairie permettant de gérer les langages
- **angular-translate-loader-static-files** pour charger des fichiers de langues
- **jquery** la base d'Angular
- **ngOnboarding** le composant qui permet de présenter Natao au premier démarrage


