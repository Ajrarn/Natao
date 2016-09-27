# Introduction

Ce document n'a pas pour vocation de t'expliquer tout le CSS, mais d'en comprendre au moins le minimum pour habiller tes documents Natao. Il n'est donc pas exhaustif.

Par contre, il y a de nombreuses notions à découvrir que tu pourrais trouver ardues. Si tu ne t'en sens pas le courage, et je peux le comprendre, fais toi aider par quelqu'un s'y connaissant un peu pour personnaliser tes feuilles de style. Il devrait trouver dans le présent document de précieuses informations pour l'aider.

# Notions de HTML indispensables

Avant de découvrir comment personnaliser les documents avec CSS, il faut comprendre comment ils sont construits.

## XML

### Les balises

Le XML est un langage de balisage qui permet de décrire n'importe quel document avec des balises personnalisées.
Ces balises marchent en général par paire ouvrante et fermante.

Une balise ouvrante, c'est un nom entouré des signes < et >, par exemple:

	::xml
	<paragraphe>


Une balise fermante comporte le même nom mais commence par `</`

	::xml
	</paragraphe>
    
Cette paire de balise définit un **bloc**.
    
**Attention** le nom d'une balise ne contient qu'un seul mot (c'est à dire sans espace), l'exemple suivant ne sera pas valide :

	::xml
	<en tete></en tete>
    
mais le suivant si:

	::xml
	<en-tete></en-tete>

    
Donc, si je souhaite définir un bloc paragraphe à l'aide de ma balise paragraphe, je vais l'écrire comme suit:

	::xml
	<paragraphe>Et voici la première phrase de mon paragraphe.
    Et maintenant, la deuxième.</paragraphe>
    
On peut également mettre à l'intérieur d'un bloc d'autres blocs:

	::xml
	<document>
    	<titre>Mon titre</titre>
    	<paragraphe>Un petit paragraphe.</paragraphe>
    	<paragraphe>Et un autre.</paragraphe>
    </document>
    
Ici, j'ai un ensemble appelé document contenant un titre et deux paragraphes.

Enfin, il existe un dernier type de balises qui sont ouvrantes et fermantes à la fois, car on ne peut rien mettre dedans. Par exemple:

	::xml
	<saut-de-page/>
    
Notes que le caractère / apparait juste avant le >.

### Les attributs

Examinons l'exemple suivant:

	::xml
	<paragraphe alignement="centré">Un petit paragraphe.</paragraphe>
    <paragraphe alignement="gauche">Un moins petit paragraphe.</paragraphe>
    <paragraphe invisible>Et un autre.</paragraphe>

Nous pouvons voir ici qu'à chaque balise *paragraphe*, nous avons ajouté des attributs avant de fermer la balise ouvrante.

Nous avons 2 attributs:
- l'attribut *alignement* qui a pour valeur 'centré' au premier paragraphe et 'gauche' au deuxième.
- l'attribut *invisible* qui n'a pas de valeur.

Chaque attribut ajoute une information exploitable à nos balises.

### Standards

Maintenant, j'ai arbitrairement choisi le nom de mes balises pour qu'elles m'aident à expliquer le concept. Tout le monde peut imaginer les balises qu'il souhaite utiliser et la manière de les agencer en XML. Mais ça deviendrait vite n'importe quoi si on se mettait tous à écrire des documents avec chacun nos balises personnelles.

Il existe donc des modèles standards utilisés dans l'industrie, DocBook par exemple pour rédiger des livres, ou le HTML pour les sites webs.

## HTML

Le HTML est donc un ensemble de balises permettant de décrire une page web. Le plus important à savoir, c'est que l'interpréteur Markdown génère du HTML et que c'est ce dernier que nous allons pouvoir habiller avec du CSS.

Donc, tu apprendras ici quelles balises sont générées et avec cela, tu pourras modifier l'apparence de ton document.

On ne va pas voir tout de suite les différentes balises, mais je vais te montrer l'exemple précédent en HTML.

	::html
	<html>
    	<header>
        	...
        </header>
    	<body>
        	<h1>Mon titre</h1>
        	<p>Un petit paragraphe.</p>
        	<p>Et un autre.</p>
      </body>
     </html>
     
une page web est en fait une page HTML, d'où les balises *html*.
Il y a une partie *header* qui ne s'affiche pas et que l'on ne détaillera donc pas ici.
Et enfin une partie *body* qui contient ce qui s'affiche, avec un titre de niveau 1 (les plus importants) *h1* et des paragraphes *p*.
     
# Structure d'un document Natao


	::html
	<div id="viewer" layout="column">
    	<div flex layout="column" layout-align="start stretch">
        	<div id="haut" layout="row" layout-align="start stretch">
            	<div id="identity" layout="column" layout-align="center stretch">
                	<p>Ton nom</p>
                    <p>Ton prénom</p>
                    <p>Ta classe</p>
                </div>
                <div id="title-zone" flex layout="column" layout-align="center stretch">
                    <h1>Titre</h1>
                    <p id="dateCreated">Date de création</p>
                </div>
            </div>
            <div id="separator"></div>
            <div id="content" flex layout="row" layout-align="start stretch">
                <div id="margin"></div>
                <div id="made">
                	...Et ici le contenu de ce que tu as rédigé en Markdown
                </div>
            </div>
        </div>
    </div>
    
Ca fait beaucoup de texte, et on n'a pas encore vu le Markdown transformé. Mais cette connaissance est indispensable à l'habillage d'un document.

Commençons par analyser la première balise :

	::html
	<div id="viewer" layout="column">
    </div>
  
J'ai mis dans l'exemple, la balise ouvrante et la balise fermante pour que tu puisses voir que le nom de la balise utilisée est *div* (qui est un bloc sans signification particulière). Le plus important ici, ce sont les attributs :

	::string
	id="viewer" layout="column"
    
- **id** qui signifie identifiant.
- **layout** qui n'est pas un attribut standard, mais qui signifie la disposition au sein de cet élément dans Natao:
	- *column* signifie en colonne
    - *row* signifie en ligne


Donc, nous pouvons voir ici que notre élément **div** a pour identifiant *viewer* et une disposition en colonne. Les blocs qui sont à l'intérieur se disposent en colonne.

Pour simplifier la compréhension, nous utiliserons l'identifiant des blocs pour les désigner (car les div sont utilisés partout). Ainsi, au lieu de parler de blocs **div**, nous parlerons du bloc **viewer**.

A l'intérieur de notre premier bloc, nous en avons un autre qui s'étire(*layout-align="start stretch"*) et prend toute la place disponible(*flex*) :

	::html
	<div flex layout="column" layout-align="start stretch"></div>
    
Sa disposition est en colonne et on peut voir qu'il contient 3 blocs intéressants :

	::html
	<div flex layout="column" layout-align="start stretch">
    	<div id="haut" layout="row" layout-align="start stretch"></div>
    	<div id="notation"></div>
    	<div id="content" flex layout="row" layout-align="start stretch"></div>
	</div>
    

    
- un bloc *header*
- un bloc *separator*
- un bloc *content*

## le bloc *header*
```
::html
<div id="header" layout="row" layout-align="start stretch">
    <div id="identity" layout="column" layout-align="center stretch">
    	<p>Ton nom</p>
    	<p>Ton prénom</p>
    	<p>Ta classe</p>
    </div>
    <div id="title-zone" flex layout="column" layout-align="center stretch">
    	<h1>Titre</h1>
    	<p id="dateCreated">Date de création</p>
    </div>
</div>
```
    
Ce dernier est composé de 2 blocs:
- **identity**
- **title-zone**

Ces 2 blocs sont disposés sur la même ligne et vont s'étirer dans cette ligne en commençant à gauche:

	::html
	<div id="header" layout="row" layout-align="start stretch">
    
Au sein de **identity**, ton nom, ton prénom et ta classe vont se disposer en colonne.

Au sein de **title-zone**, le titre du document et sa date de création apparaîtront en colonne.

## le bloc *separator*

C'est un bloc vide, qui servira à créer un espace de notation entre le titre et le contenu de ton devoir.

## le bloc *content*
	
    ::html
	<div id="content" flex layout="row" layout-align="start stretch">
    	<div id="margin"></div>
        <div id="made">
        	...Et ici le contenu de ce que tu as rédigé en Markdown
        </div>
   	</div>

Ce dernier est lui même composé de 2 blocs qu'il va disposer en ligne:
- **margin** qui est une marge à gauche permettant à ton enseignant de corriger ton devoir
- **made** qui est la zone de rendu de ton document Markdown

    
# Une règle CSS

On y arrive enfin, tu vas pouvoir personnaliser ton document grace à ce qui suit. En CSS, on écrit des règles qui vont être appliquées au HTML. Voici un exemple de règle:

	::css
    #identity {
    	display: none;
	}
    
Parlons tout d'abord de *#identity*. Cette partie de la règle se situe avant les accolades ({ }), c'est ce que l'on appelle un sélecteur. Il va nous permettre de savoir à quel élément s'applique la règle.

Ici la règle s'applique à l'élément dont l'identifiant est *identity*.

Ensuite, on peut voir 1 propriété qui est appliquée à cet élément.
- *display: none;* lui dit de ne pas s'afficher.

Dans le cas d'une leçon, je n'ai pas besoin de voir s'afficher le bloc avec mon nom et mon prénom, voila comment lui dire de ne pas s'afficher et de ne pas prendre de place.

Je vais maintenant te donner les éléments qui te permettront de bien choisir les éléments que tu vas relooker et les propriétés les plus utiles.

# les sélecteurs utiles

## Le sélecteur de bloc

Pour sélectionner tous les blocs identiques, il me suffit d'utiliser comme sélecteur le nom de la balise:

	::css
    div {
    	display: none;
	}
    
Ce mauvais exemple va dissimuler tous les blocs *div*, autrement dit, tout ton document...

## Le sélecteur d'identifiant

Pour sélectionner un bloc quel qu'il soit sur son identifiant je vais utiliser un # devant l'identifiant, comme l'exemple vu en tout premier lieu.

## Le sélecteur de classe

un bloc possédant une propriété class comme par exemple:

	::html
    <pre class="java">
    	<code>du code </code>
    </pre>

peut être sélectionné, grace au sélecteur de classe(avec un . devant) comme suit:

	::css
    .java {
    	display: none;
	}

Et hop! Encore quelque chose d'intéressant qu'on passe à la trappe.

## Utiliser plusieurs sélecteurs en même temps

Tu peux aussi appliquer une règle à plusieurs sélecteurs, en les séparant par une virgule:

	::css
    h1, #header {
    	display: none;
    }

Ainsi, la règle s'applique à tous les éléments *h1* et au bloc *header*.

## Sélectionner les descendants de

Tu peux sélectionner les descendants d'éléments en mettant un espace entre le parent et le descendant :

	::css
    #title-zone h1 {
    	color: red
    }
    
Cet exemple modifie la couleur du titre de niveau 1 dans le bloc #title-zone, mais n'impacte pas les autres titres dans d'autres blocs.

# Agir sur les grands blocs d'un document Natao

La première chose que l'on doit faire, c'est de décider les blocs qui s'affiche dans notre feuille de style, leur taille et éventuellement les décorer.

## Les faire disparaître

Je te remets le premier exemple sur le CSS:

	::css
    #identity {
    	display: none;
	}
    

*display* permet de modifier la disposition des éléments enfants. Dans la mesure où cette disposition est pilotée d'une autre manière dans Natao, la seule valeur à connaître est *none* qui permet de masquer l'élément.

A appliquer sur les éléments suivants qui ne sont utiles que pour les devoirs:
- *identity*
- *separator*
- *margin*

## Modifier leur taille

### Hauteur et Largeur
	
    ::css
	#identity {
    	width: 200px;
	}
    
    #separator {
    	height: 200px;
    }


Dans l'exemple précédent, j'ai fixé la largeur(*width*) du bloc *identity* à 200 pixels, et la hauteur(*height*) de l'élément *separator* également à 200 pixels.

En effet *identity* est dans un bloc où les éléments sont disposés en ligne. Il prendra la largeur indiquée et les autres éléments du même bloc prendront la place restante.

Dans le cas de *separator*, il est dans un bloc disposé en colonne. En fixant sa taille, le bloc suivant prendra la hauteur qui reste.

### Unités

Dans l'exemple précédent, j'ai utilisé comme unité des pixels(px). Il y en a de nombreuses autres. Je vais t'en citer quelques unes intéressantes:

- *px* pour pixels(ce sont des points à l'écran)
- *pt* pour points(à l'impression)
- *%* qui comme son nom l'indique est une proportion de l'espace disponible. 50% siginifie qu'il occupe la moitité de l'espace.
- *em* qui est pour moi l'unité la plus intéressante. 1em = la taille de police du document. Tu vas donc pouvoir définir plusieurs en éléments qui seront proportionnels à cette taille de police.

## Modifier leur couleur

### en écrivant les propriétés
	::css
    #identity {
    	background-color: red;
        color: #af2356;
    }
    
Voici 2 nouvelles propriétés permettant de modifier des couleurs:
- *color* permet de modifier la couleur du texte.
- *background-color* permet de modifier la couleur du fond.

Comme tu peux le voir, la propriété *background-color* contient un nom de couleur en anglais. La liste de couleurs disponibles est trop grande pour figurer dans ce document. Je t'invite à la consulter [ici](http://www.colors.commutercreative.com/grid/).

La propriété *color* contient un #, suivi d'une valeur de 6 caractères en hexadécimal. Je ne vais pas t'expliquer l'héxadécimal ici, mais ces 6 caractères sont en fait 3 fois 2 caractères. La première paire est pour la composante Rouge, la deuxième pour la composante Verte, et la dernière pour la composante Bleue. Soit RVB ou RGB en anglais. Cette façon d'écrire te permet de choisir très précisément la couleur que tu souhaites contrairement aux noms.

### en utilisant l'outil de choix de couleur

Natao intègre un outil pour t'aider à choisir les couleurs. Celui-ci s'active quand il voit un code couleur valide comme par exemple:

	::css
    color: #111111;
    
c'est à dire commençant par un # suivi de 6 chiffres.

Une fois que tu as tapé ce texte, cliques dessus pour le voir apparaître.

![Chois de couleur](./src/images/thistle.png)

Tu peux y voir 3 composants:

- la barre d'aperçu, celle qui est toute en bas.
- la barre de luminosité, à droite.
- le cercle de teintes.

Tu peux agir sur le diamètre du cercle, en le rapprochant du centre (couleurs fades), ou l'éloignant (couleurs vives). Puis tu peux choisir la couleur en déplaçant le curseur dans le cercle. Enfin, la luminiusité avec le curseur présent dans la barre de droite.

## Modifier les bordures


### 2 syntaxes

Tu peux mettre sur chaque bloc des bordures, comme ceci:

	::css
    #identity {
    	border-width: thin;
        border-style: solid;
        border-color: red;
    }
    
    #separator {
    	border: thin solid red;
    }
    
Dans cet exemple, nous avons appliqué la même bordure aux 2 blocs *identity* et *separator*. Commençons par la syntaxe utilisée pour *identity*.

Tu peux voir 3 propriétés:
- *border-width* qui est l'épaisseur de la bordure, ici elle fine(thin).
- *border-style* qui est le style de la bordure, ici c'est un trait plein (solid).
- *border-color* qui est la couleur de la bordure, ici rouge (red).

Pour *separator* tu peux voir une syntaxe abrégée. Le mot clé *border* est suivi des 3 valeurs associées à la largeur, au style et à la couleur.

### L'épaisseur (width)

Pour cette propriété, il existe 3 valeurs standards:

- *thin* : pour une bordure fine.
- *medium* : pour une bordure moyenne.
- *thick* : pour une bordure épaisse.

Tu peux aussi y mettre des valeurs en pixels(px), en points(pt), etc...

### Le style

Voici 4 valeurs à connaître:

- *dotted* : pour obtenir un trait en pointillés.
- *dashed* : pour obtenir un trait en tirets.
- *solid* : pour obtenir un trait plein.
- *double* : pour obtenir un double-trait(visible à partir de medium).

### Des bordures partielles

Les propriétés que l'on a vu permettent de faire une bordure qui entoure complètement le bloc. On peut avoir besoin de n'avoir qu'une bordure sur un ou 2 côtés. Chaque côté a un mot clé associé:

- *top* : pour la bordure supérieure.
- *bottom* : pour la bordure inférieure.
- *left* : pour la bordure gauche.
- *right* : pour la bordure droite.

Il suffit d'ajouter ce mot-clé après border comme suit:

	::css
    #separator {
    	border-top: thin solid blue;
        border-bottom: thin solid blue;
    }
    
    #margin {
    	border-right-width: thin;
        border-right-style: solid;
        border-right-color: red;
    }

Comme tu peux le voir, cela fonctionne aussi pour la forme abrégée.

# Agir globalement sur le texte

## Modifier la taille de référence du texte

Je te fais un petit rappel sur les unités de mesure:

- *px* pour pixels(ce sont des points à l'écran)
- *pt* pour points(à l'impression)
- *em* qui est pour moi l'unité la plus intéressante. 1em = la taille de police du document.

On peut fixer pour le contenu du document une taille de police de base. Par exemple:

	::css
    #made {
    	font-size: 16px;
    }
    
Cet exemple donne une taille de police de 16px, c'est la taille par défaut. C'est à partir de cette taille par défaut que je vais pouvoir ajuster celle des titres, par exemple.

	::css
    #made h1 {
    	font-size: 2em;
    }
    
    #made h2 {
    	font-size: 1.5em;
    }
    
Ainsi mon titre de niveau 1 (qui correspond à un seul #) fera 2 fois la taille de base, et le titre de niveau 2 (qui correspond à ##) fera 1,5 fois cette taille.

Si je change la taille de base à 20px, les titres resteront proportionnels.

## Modifier la police

On peut modifier la police utilisée grace à la propriété *font-family* comme ceci:

	::css
    #made {
    	font-family: RobotoDraft, Roboto, 'Helvetica Neue', sans-serif;
    }
    
La signification de cette ligne est la suivante : Prends la police *RobotoDraft*, si tu ne la trouve pas *Roboto*, si tu ne la trouve pas *Helvetica Neue* et si tu ne la trouves toujours pas prends la première police de type *sans-serif* que tu as.

Les polices disponibles dépendent du système d'exploitation sur lequel Natao tourne. Soit Windwos, soit MacOs, soit Linux. Il faut donc lui donner plusieurs pistes à explorer et à la fin une piste infaillible.

Voici quelques exemple courants de définition de *font-family*:

| famille    | définition                                          |
|------------|-----------------------------------------------------|
| Serif      | Georgia, serif                                      |
| Serif      | "Palatino Linotype", "Book Antiqua", Palatino, serif|
| Serif      | "Times New Roman", Times, serif                     |
| Sans-Serif | Arial, Helvetica, sans-serif                        |
| Sans-Serif | "Arial Black", Gadget, sans-serif                   |
| Sans-Serif | "Comic Sans MS", cursive, sans-serif                |
| Sans-Serif | Impact, Charcoal, sans-serif                        |
| Sans-Serif | "Lucida Sans Unicode", "Lucida Grande", sans-serif  |
| Sans-Serif | Tahoma, Geneva, sans-serif                          |
| Sans-Serif | "Trebuchet MS", Helvetica, sans-serif               |
| Sans-Serif | Verdana, Geneva, sans-serif                         |   
| Monospace  | "Courier New", Courier, monospace                   |   
| Monospace  | "Lucida Console", Monaco, monospace                 |   

# Agir sur les paragraphes

Avant toute chose, les paragraphes sont des blocs comme les autres:

	::html
    <p>Voici mon paragraphe</p>





