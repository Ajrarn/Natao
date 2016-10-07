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
    
Cette paire de balise définit une *boite* (tout simplement car elle contient quelque chose).
    
**Attention** le nom d'une balise ne contient qu'un seul mot (c'est à dire sans espace), l'exemple suivant ne sera pas valide :

	::xml
	<en tete></en tete>
    
mais le suivant si:

	::xml
	<en-tete></en-tete>

    
Donc, si je souhaite définir une boite paragraphe à l'aide de ma balise *paragraphe*, je vais l'écrire comme suit:

	::xml
	<paragraphe>Et voici la première phrase de mon paragraphe.
    Et maintenant, la deuxième.</paragraphe>
    
On peut également mettre à l'intérieur d'une boite d'autres boites:

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
  
J'ai mis dans l'exemple, la balise ouvrante et la balise fermante pour que tu puisses voir que le nom de la balise utilisée est *div* (qui est une boite sans signification particulière). Le plus important ici, ce sont les attributs :

	::string
	id="viewer" layout="column"
    
- *id* qui signifie identifiant.
- *layout* qui n'est pas un attribut standard, mais qui signifie la disposition au sein de cet élément dans Natao:
	- *column* signifie en colonne
    - *row* signifie en ligne


Donc, nous pouvons voir ici que notre élément *div* a pour identifiant *viewer* et une disposition en colonne. Les boites qui sont à l'intérieur se disposent en colonne.

Pour simplifier la compréhension, nous utiliserons l'identifiant des boites pour les désigner (car les div sont utilisés partout). Ainsi, au lieu de parler de boites *div*, nous parlerons de la boite *viewer*.

A l'intérieur de notre première boite, nous en avons une autre qui s'étire(*layout-align="start stretch"*) et prend toute la place disponible(*flex*) :

	::html
	<div flex layout="column" layout-align="start stretch"></div>
    
Sa disposition est en colonne et on peut voir qu'elle contient 3 boites intéressantes :

	::html
	<div flex layout="column" layout-align="start stretch">
    	<div id="haut" layout="row" layout-align="start stretch"></div>
    	<div id="notation"></div>
    	<div id="content" flex layout="row" layout-align="start stretch"></div>
	</div>
    

    
- une boite *header*
- une boite *separator*
- une boite *content*

## la boite *header*
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
    
Ce dernier est composé de 2 boites:
- *identity*
- *title-zone*

Ces 2 boites sont disposées sur la même ligne et vont s'étirer dans cette ligne en commençant à gauche:

	::html
	<div id="header" layout="row" layout-align="start stretch">
    
Au sein de *identity*, ton nom, ton prénom et ta classe vont se disposer en colonne.

Au sein de *title-zone*, le titre du document et sa date de création apparaîtront en colonne.

## la boite *separator*

C'est une boite vide, qui servira à créer un espace de notation entre le titre et le contenu de ton devoir.

## la boite *content*
	
    ::html
	<div id="content" flex layout="row" layout-align="start stretch">
    	<div id="margin"></div>
        <div id="made">
        	...Et ici le contenu de ce que tu as rédigé en Markdown
        </div>
   	</div>

Ce dernier est lui même composé de 2 boites qu'il va disposer en ligne:
- *margin* qui est une marge à gauche permettant à ton enseignant de corriger ton devoir.
- *made* qui est la zone de rendu de ton document Markdown.

    
# Une règle CSS

On y arrive enfin, tu vas pouvoir personnaliser ton document grace à ce qui suit. En CSS, on écrit des règles qui vont être appliquées au HTML. Voici un exemple de règle:

	::css
    #identity {
    	display: none;
	}
    
Parlons tout d'abord de *#identity*. Cette partie de la règle se situe avant les accolades ({ }), c'est ce que l'on appelle un sélecteur. Il va nous permettre de savoir à quella boite s'applique la règle.

Ici la règle s'applique à la boite dont l'identifiant est *identity*.

Ensuite, on peut voir 1 propriété qui est appliquée à cette boite.
- *display: none;* lui dit de ne pas s'afficher.

Dans le cas d'une leçon, je n'ai pas besoin de voir s'afficher la boite avec mon nom et mon prénom, voila comment lui dire de ne pas s'afficher et de ne pas prendre de place.

Je vais maintenant te donner les éléments qui te permettront de bien choisir les boites que tu vas relooker et les propriétés les plus utiles.

# les sélecteurs utiles

## Le sélecteur de boite

Pour sélectionner toutes les boites identiques, il me suffit d'utiliser comme sélecteur le nom de la balise:

	::css
    div {
    	display: none;
	}
    
Ce mauvais exemple va dissimuler toutes les boites *div*, autrement dit, tout ton document...

## Le sélecteur d'identifiant

Pour sélectionner une boite quel qu'elle soit sur son identifiant je vais utiliser un # devant l'identifiant, comme l'exemple vu en tout premier lieu.

## Le sélecteur de classe

Une boite possédant une propriété class comme par exemple:

	::html
    <pre class="java">
    	<code>du code </code>
    </pre>

peut être sélectionnée, grace au sélecteur de classe(avec un . devant) comme suit:

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

Ainsi, la règle s'applique à tous les éléments *h1* et à la boite *header*.

## Sélectionner les descendants de

Tu peux sélectionner les descendants de boites en mettant un espace entre le parent et le descendant :

	::css
    #title-zone h1 {
    	color: red
    }
    
Cet exemple modifie la couleur du titre de niveau 1 dans la boite #title-zone, mais n'impacte pas les autres titres dans d'autres boites.

# Agir sur les grands boites d'un document Natao

La première chose que l'on doit faire, c'est de décider les boites qui s'affichent dans notre feuille de style, leur taille et éventuellement les décorer.

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


Dans l'exemple précédent, j'ai fixé la largeur(*width*) de la boite *identity* à 200 pixels, et la hauteur(*height*) de la boite *separator* également à 200 pixels.

En effet *identity* est dans une boite où les éléments sont disposés en ligne. Il prendra la largeur indiquée et les autres éléments de la même boite prendront la place restante.

Dans le cas de *separator*, il est dans une boite disposée en colonne. En fixant sa taille, la boite suivante prendra la hauteur qui reste.

### Unités

Dans l'exemple précédent, j'ai utilisé comme unité des pixels(px). Il y en a de nombreuses autres. Je vais t'en citer quelques unes intéressantes:

- *px* pour pixels(ce sont des points à l'écran)
- *pt* pour points(à l'impression)
- *%* qui comme son nom l'indique est une proportion de l'espace disponible. 50% siginifie qu'il occupe la moitité de l'espace.
- *em* qui est pour moi l'unité la plus intéressante. 1em = la taille de police du document. Tu vas donc pouvoir définir plusieurs éléments qui seront proportionnels à cette taille de police.

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

Une fois que tu as tapé ce texte (#111111;), cliques dessus pour le voir apparaître.

![Chois de couleur](./src/images/thistle.png)

Tu peux y voir 3 composants:

- la barre d'aperçu, celle qui est toute en bas.
- la barre de luminosité, à droite.
- le cercle de teintes.

Tu peux agir sur le diamètre du cercle, en le rapprochant du centre (couleurs fades), ou l'éloignant (couleurs vives). Puis tu peux choisir la couleur en déplaçant le curseur dans le cercle. Enfin, la luminiusité avec le curseur présent dans la barre de droite.

## Modifier les bordures


### 2 syntaxes

Tu peux mettre sur chaque boite des bordures, comme ceci:

	::css
    #identity {
    	border-width: thin;
        border-style: solid;
        border-color: red;
    }
    
    #separator {
    	border: thin solid red;
    }
    
Dans cet exemple, nous avons appliqué la même bordure aux 2 boites *identity* et *separator*. Commençons par la syntaxe utilisée pour *identity*.

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

Les propriétés que l'on a vu permettent de faire une bordure qui entoure complètement la boite. On peut avoir besoin de n'avoir qu'une bordure sur un ou 2 côtés. Chaque côté a un mot clé associé:

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

## Modifier les marges

Chaque boite possède 2 types de marge:
- une marge extérieure (propriété *margin* qui n'est pas notre boite du même nom), qui permet de définir à quelle distance minimale d'une autre boite se situe la notre.
- une marge intérieur (mot-clé *padding*), qui permet de définir à quelle distance minimale d'un bord de notre boite apparaitra la première boite interne.

De la même manière que les bordures, les mots-clés peuvent être suffixés de *top*, *bottom*, *left* et *right* :

````
::css
#made {
	margin: 10px;
    padding: 20px;
}

#made h1 {
	margin-top: 30px;
}
```

Ici nous voyons que la boite *made* sera éloignée de la boite *separator* d'au moins 10pixels, et que les boites qu'elle contient seront à 20 pixels de ses bords.

Nous voyons également que les titres de niveau 1(*h1*), s'écarten de la boite précédente de 30 pixels.

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

Les polices disponibles dépendent du système d'exploitation sur lequel Natao tourne. Soit Windwos, soit MacOs, soit Linux. Il faut donc lui donner plusieurs pistes à explorer et à la fin une piste infaillible(la famille).

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

## Souligner du texte

Soulignons tout le texte:

	::css
    #made {
    	text-decoration: underline;
    }
    
## l'épaisseur du texte

La propriété *font-weight* permet de régler l'épaisseur du texte:
- *lighter* pour un texte plus fin que d'habitude
- *normal* pour un texte normal.
- *bold* pour un texte gras.
- *bolder* pour un texte très gras.

Mettons tout le texte en gras comme ceci:

	::css
    #made {
    	font-weight: bold;
    }

## Le style de texte

La propriété *font-style* permet de déterminer si un texte est:
- *normal*: avec des caractères verticaux.
- *italic*: avec des caractères penchés.

Mettons tout notre texte en italique comme ceci:

	::css
	#made {
    	font-style: italic;
    }
    
## L'alignement du texte

La propriété *text-align* permet de choisir l'alignement du texte. Elle peut avoir les valeurs suivantes:
- *left*, pour coller le texte à gauche.
- *right*, pour coller le texte à droite.
- *center*, pour centrer le texte.
- *justify*, pour que le texte se colle à la fois à gauche et à droite, qu'il prenne toute la place.

```
::css
#made p {
	text-align: center;
}
```
    
Pour les vers d'une poésie par exemple.

## Indenter la première ligne

La propriété *text-indent* permet d'indenter la première ligne d'une boite de texte:

	::css
    #made p {
    	text-indent: 1.5em;
    }

# Agir sur les boites de texte individuellement

Voici un exemple de document Markdown avec des paragraphes, des titres, et du texte valorisé:

	::markdown
    # Titre 1
    ## Titre 1.1
    ### Titre 1.1.1
    ...
    ###### Titre 1.1.1.1.1.1
    
    Voici mon premier paragraphe, avec sa première ligne simple.
    Suivie d'une deuxième ligne.
    
    Et maintenant le *paragraphe* suivant avec des mots **valorisés** voire ~~barrés~~
    
Ce texte en Markdown devrait donner ce code HTML:

	::html
    <h1>Titre 1</h1>
    <h2>Titre 1.1</h2>
    <h3>Titre 1.1.1</h3>
    ...
    <h6>Titre 1.1.1.1.1.1</h6>
    
    <p>Voici mon premier paragraphe, avec sa première ligne simple.Suivie d'une deuxième ligne.</p>
    <p>Et maintenant le <em>paragraphe</em> suivant avec des mots <strong>valorisés</strong> voire <del>barrés</del></p>
    
Nous pouvons voir que le nombre de # d'un titre correspond au numéro qui suit le h de la boite de titre. Ainsi # devient une boite *h1* et ainsi de suite.

Les paragraphes sont dans des boites *p*.

Le mot *paragraphe* qui était entouré de 1 `*` est dans une boite *em*.

Le mot *valorisés* qui était entouré de 2 `*`est dans une boite *strong*.

Enfin, le mot *barrés* qui était entouré de 2 `~`est dans une boite *del*.

Tous ces boites sont des boites comme les autres. Par conséquent, tout ce que nous avons vu jusqu'à présent peut être appliqué à un de ceux-ci:
- les couleurs de fond et de texte
- le changement de police
- le changement de taille de police
- le soulignement
- l'épaisseur du texte
- son style

Ces boites ont déjà une apparence par défaut. Ainsi une boite *em* est par défaut en italique, une boite *strong* est par défaut en gras, une boite *del* est par défaut barré et les titres ont également des tailles par défaut. Ne modifiez que ce qui est utile.

Si tu as besoin qu'en plus d'être en gras, le texte très valorisé soit en rouge et souligné ecris ceci:

	::css
    strong {
    	color: red;
        text-decoration: underline;
    }

# La numérotation automatique

Voici le code que j'ai utilisé pour le style des leçons:

```
::css
#made {counter-reset: chapitre section sous-section;}

#made  h1 {
    font-family: "Courier New", Courier, monospace;
    margin-bottom: 20px;
    margin-top: 50px;
    font-size: 1.5em;
    counter-reset: section;
}

#made  h1:before {
	counter-increment: chapitre;
    content: counter(chapitre,upper-roman) " - ";  
}

#made h2 {
    font-size: 1.2em;
    counter-reset: sous-section;
}

#made h2:before {
    counter-increment: section;
    content: counter(chapitre) "." counter(section) "  ";
}
#made  h3:before {
    counter-increment: sous-section;
    content: counter(chapitre) "." counter(section) "." counter(sous-section) "  ";
}
```

Tout d'abord je voudrais te montrer 2 nouveaux sélecteurs:
- *h1:before*
- *h1:after*

J'ai ajouté *:before* au sélecteur de boite *h1*. C'est une pseudo-classe, il y en a d'autres, mais celle-ci va nous permettre de rajouter du contenu avant la boite choisi. Au besoin on aurait pu faire la même chose avec la pseudo-classe *after*.

Et maintenant, nous allons parler des compteurs. Pour générer une numérotation automatique, j'utilise des compteurs. Je commence par initialiser leur valeur, les remettre à 1:

	::css
	#made {counter-reset: chapitre section sous-section;}
    
*counter-reset* remet tous les compteurs spécifiés à 0. Ici, les compteurs que l'on a nommé *chapitre*, *section* et *sous-section* prennent une valeur à 0.

Les compteurs sont chacun associés à un type de boite (de niveau de titre donc):
- *chapitre* pour *h1*.
- *section* pour *h2*.
- *sous-section* pour *h3*.

A chaque nouveau *h1*(chapitre), je remets à 0 le compteur de *h2*, *section*.

A chaque nouveau *h2*(section), je remets à 0 le compteur de *h3*, *sous-section*.

Ce qui se traduit par le css suivant.

````
::css
#made  h1 {
    counter-reset: section;
}

#made h2 {
    counter-reset: sous-section;
}
```

Examinons maintenant les *before* des boites h1 et h2:

```
::css
#made  h1:before {
    counter-increment: chapitre;
    content: counter(chapitre,upper-roman) " - ";
}

#made h2:before {
    counter-increment: section;
    content: counter(chapitre) "." counter(section) "  ";
}

```

La première chose à voir est l'utilisation de la propriété *counter-increment* associée au compteur *chapitre* pour *h1:before* et au compteur *section* pour *h2:before*. Cette instruction ajoute 1 au compteur sélectionné.

Ensuite, il y a la propriété *content*. Cette propriété permet de modifier le contenu d'une boite. Ici, nous nous situons avant(*before*) la boite *h1* ou avant la boite *h2*.

En commençant par la boite *h2*, tu peux voir que la propriété *content* contient *counter(chapitre) "." counter(section) "  "*. Cela veut dire:

- la valeur du compteur *chapitre* (*counter(chapitre)*),
- suivi d'un point,
- suivi de la valeur du compteur *section* (*counter(section)*),
- suivi d'un espace,
- et enfin suivi de notre boite *h2* donc notre titre, car tout ce l'on a vu avant s'écrit avant *h2*.

Maintenant si l'on regarde la boite *h1*, tu peux voir que la propriété *content* contient *counter(chapitre,upper-roman) " - "*. Cela veut dire:

- la valeur du compteur *chapitre*, mais en chiffre romains, en majuscule (*counter(chapitre,upper-roman)*),
- suivi d'un espace, d'un tiret, un nouvel espace,
- et enfin, suivi de notre boite *h1*.

Comme tu as du le remarquer, pour *h2* j'utilise *counter(section)* et pour *h1* j'utilise *counter(chapitre,upper-roman)*. Dans le deuxième cas, je spécifie l'écriture en chiffre romain, et dans le premier, je ne mets que le compteur.
C'est parce qu'il écrit par défaut en *decimal*. Je pourrais écrire *counter(section,decimal)*, mais il ferait exactement la même chose.

Voici les différentes valeurs possibles, et quand je le sais à quoi ça correspond:

- *decimal* pour l'affichage en chiffres arabes (ceux qu'on utilise d'habitude),
- *decimal-leading-zero* pour afficher en chiffres arabes, mais en rajoutant un 0 dans les dizaines,
- *lower-roman* en chiffre romains, mais en minuscules,
- *upper-roman* en chiffres romains et en majuscule,
- *lower-greek* en chiffres grecs,
- *lower-latin*, 
- *upper-latin*,
- *armenian*,
- *georgian*, 
- *lower-alpha* en lettres en minuscule,
- *upper-alpha* en lettre en majuscule.

    

