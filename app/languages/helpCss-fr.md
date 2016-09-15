# Introduction

Ce document n'a pas pour vocation de t'expliquer tout le CSS, mais d'en comprendre au moins le minimum pour habiller tes documents Natao. Il n'est donc pas exhaustif.

Par contre, il y a de nombreuses notions à découvrir que tu pourrais trouver ardues. Si tu ne t'en sens pas le courage, et je peux le comprendre, fais toi aider par un quelqu'un s'y connaissant un peu pour personnaliser tes feuilles de style. Il devrait trouver dans le présent document de précieuses informations pour l'aider.

# Notions indispensables

Avant de découvrir comment personnaliser les documents avec CSS, il faut comprendre comment ils sont construits.

## XML

### Les balises

Le XML est un langage de balisage qui permet de décrire n'importe quel document avec des balises personnalisées.
Ces balises marchent en général par paire ouvrante et fermante.

Une balise ouvrante, c'est un nom entouré des signes < et >, par exemple:

	::xml::
	<paragraphe>


Une balise fermante comporte le même nom mais commence par </

	::xml::
	</paragraphe>
    
Cette paire de balise définit un **bloc**.
    
**Attention** le nom d'une balise ne contient qu'un seul mot (c'est à dire sans espace), l'exemple suivant ne sera pas valide :

	::xml::
	<en tete></en tete>
    
mais le suivant si:

	::xml::
	<en-tete></en-tete>

    
Donc, si je souhaite définir un bloc paragraphe à l'aide de ma balise paragraphe, je vais l'écrire comme suit:

	::xml::
	<paragraphe>Et voici la première phrase de mon paragraphe. Et maintenant, la deuixème.</paragraphe>
    
On peut également mettre à l'intérieur d'un bloc d'autres blocs:

	::xml::
	<document>
    	<titre>Mon titre</titre>
    	<paragraphe>Un petit paragraphe.</paragraphe>
    	<paragraphe>Et un autre.</paragraphe>
    </document>
    
Ici, j'ai un ensemble appelé document contenant un titre et deux paragraphes.

Enfin, il existe un dernier type de balises qui sont ouvrantes et fermantes à la fois, car on ne peut rien mettre dedans. Par exemple:

	::xml::
	<saut-de-page/>
    
Notes que le caractère / apparait juste avant le >.

### Les attributs

Examinons l'exemple suivant:

	::xml::
	<paragraphe alignement="centré">Un petit paragraphe.</paragraphe>
    <paragraphe alignement="gauche">Un moins petit paragraphe.</paragraphe>
    <paragraphe invisible>Et un autre.</paragraphe>

Nous pouvons voir ici qu'à chaque balise *paragraphe*, nous avons ajouté des attributs avant de fermer la balise ouvrante.

Nous avons 2 attributs:
- l'attribut *alignement* qui a pour valeur 'centré' au premier paragraphe et 'gauche' au deuxième.
- l'attribut *invisible* qui n'a pas de valeur.

Chaque attribut ajoute une information exploitable à nos balises.

### Standards

Maintenant, j'ai arbitrairement choisi le nom de mes balises pour qu'elles m'aident à expliquer le concept. Tout le monde peut imaginer les balises qu'il souhaite utiliser et la manière de les agencer en XML. Mais ça deviendrait vite le bazard si on se mettait tous à écrire des documents chacun à notre manière.

Il existe donc des modèles standards utilisés dans l'industrie, DocBook par exemple pour rédiger des livres, ou le HTML pour les sites webs.

## HTML

Le HTML est donc un ensemble de balises permettant de décrire une page web. Le plus important à savoir, c'est que l'interpréteur Markdown génère du HTML et que c'est ce dernier que nous allons pouvoir habiller avec du CSS.

Donc, tu apprendras ici quelles balises sont générées et avec cela, tu pourras modifier l'apparence de ton document.

On ne va pas voir tout de suite les différentes balises, mais je vais te montrer l'exemple précédent en HTML.

	::html::
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


	::html::
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
            <div id="notation"></div>
            <div id="devoir" flex layout="row" layout-align="start stretch">
                <div id="marge"></div>
                <div id="rendu">
                	...Et ici le contenu de ce que tu as rédigé en Markdown
                </div>
            </div>
        </div>
    </div>
    
Ca fait beaucoup de texte, et on n'a pas encore vu le Markdown transformé. Mais cette connaissance est indispensable à l'habillage d'un document.

Commençons par analyser la première balise :

	::html::
	<div id="viewer" layout="column">
    </div>
  
J'ai mis dans l'exemple, la balise ouvrante et la balise fermante pour que tu puisses voir que le nom de la balise utilisée est *div* (qui est un bloc sans signification particulière). Le plus important ici, ce sont les attributs :

	::string::
	id="viewer" layout="column"
    
- **id** qui signifie identifiant.
- **layout** qui n'est pas un attribut standard, mais qui signifie disposition dans Natao.


Donc, nous pouvons voir ici que notre élément **div** a pour identifiant *viewer*, pour classe *viewer* et une disposition en colonne.

A l'intérieur de notre premier bloc, nous en avons un autre qui s'étire et prends toute la place disponible :

	::html::
	<div flex layout="column" layout-align="start stretch"></div>
    
Sa disposition est en colonne et on peut voir qu'il contient 3 blocs intéressants :

	::html::
	<div flex layout="column" layout-align="start stretch">
    	<div id="haut" layout="row" layout-align="start stretch"></div>
    	<div id="notation"></div>
    	<div id="devoir" flex layout="row" layout-align="start stretch"></div>
	</div>
    
- un bloc *div* avec la classe *haut*
- un bloc *div* avec la classe *notation*
- un bloc *div* avec la classe *devoir*

## le bloc *haut*
```
::html::
<div id="header" layout="row" layout-align="start stretch">
    <div id="identity" layout="column" layout-align="center stretch">
    	<p>Ton nom</p>
    	<p>Ton prénom</p>
    	<p>Ta classe</p>
    </div>
    <div id="titleZone" flex layout="column" layout-align="center stretch">
    	<h1>Titre</h1>
    	<p id="dateCreated">Date de création</p>
    </div>
</div>
```
    
Ce dernier est composé de


    
    