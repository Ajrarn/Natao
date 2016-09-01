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