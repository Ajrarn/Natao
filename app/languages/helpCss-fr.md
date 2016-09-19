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

    
# Le CSS

On y arrive enfin, tu vas pouvoir personnaliser ton document grace à ce qui suit. En CSS, on écrit des règles qui vont être appliquées au HTML. Voici un exemple de règle:

	::css
    #identity {
    	display: none;
    	width: 0px;
	}
    
Parlons tout d'abord de *#identity*. Cette partie de la règle se situe avant les accolades ({ }), c'est ce que l'on appelle un sélecteur. Il va nous permettre de savoir à quel élément s'applique la règle.

Ici la règle s'applique à l'élément dont l'identifiant est *identity*.

Ensuite, on peut voir 2 propriétés qui sont appliquées à cet élément.
- *display: none;* lui dit de ne pas s'afficher.
- *width: 0px;* lui dit d'avoir une largeur nulle.

Dans le cas d'une leçon, je n'ai pas besoin de voir s'afficher le bloc avec mon nom et mon prénom, voila comment lui dire de ne pas s'afficher et de ne pas prendre de place.

Je vais maintenant te donner les éléments qui te permettront de bien choisir les éléments que tu vas relooker et les propriétés les plus utiles.

## les sélecteurs

### Le sélecteur de bloc

Pour sélectionner tous les blocs identiques, il me suffit d'utiliser comme sélecteur le nom de la balise:

	::css
    div {
    	display: none;
	}
    
Ce mauvais exemple va dissimuler tous les blocs *div*, autrement dit, tout ton document...

### Le sélecteur d'identifiant

Pour sélectionner un bloc quel qu'il soit sur son identifiant je vais utiliser un # devant l'identifiant, comme l'exemple vu en tout premier lieu.

### Le sélecteur de classe

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
    