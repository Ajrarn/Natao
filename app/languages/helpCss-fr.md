# Introduction

Ce document n'a pas pour vocation de t'expliquer tout le CSS, mais d'en comprendre au moins le minimum pour habiller tes documents Natao. Il n'est donc pas exhaustif.

Par contre, il y a de nombreuses notions à découvrir que tu pourrais trouver ardues. Si tu ne t'en sens pas le courage, et je peux le comprendre, fais toi aider par un quelqu'un s'y connaissant un peu pour personnaliser tes feuilles de style. Il devrait trouver dans le présent document de précieuses informations pour l'aider.

# Notions indispensables

Avant de découvrir comment personnaliser les documents avec CSS, il faut comprendre comment ils sont construits.

## XML

Le XML est un langage de balisage qui permet de décrire n'importe quel document avec des balises personnalisées.

Une balise, c'est un nom entouré des signes < et >, par exemple:

	<paragraphe>

Mais ce n'est pas tout, un type de balise va permettre de spécifier un ensemble de caratères en son sein. Pour cela, nous utilisons une balise ouvrante et une balise fermante qui s'écrit comme suit:

	</paragraphe>
    
Donc, si je souhaite définir un paragraphe à l'aide cette balise, je vais l'écrire comme suit:

	<paragraphe>Et voici la première phrase de mon paragraphe. Et maintenant, la deuixème.</paragraphe>
    
On peut également mettre à l'intérieur d'un paire de balises ouvrante et fermante d'autres balises:

	<document>
    	<titre>Mon titre</titre>
    	<paragraphe>Un petit paragraphe.</paragraphe>
    	<paragraphe>Et un autre.</paragraphe>
    </document>
    
Ici, j'ai un ensemble appelé document contenant un titre et deux paragraphes.

Maintenant, j'ai arbitrairement choisi le nom de mes balises pour qu'elles m'aident à expliquer le concept. Tout le monde peut imaginer les balises qu'il souhaite utiliser et la manière de les agencer en XML. Mais ça deviendrait vite le bazard si on se mettait tous à écrire des documents chacun à notre manière.

Il existe donc des modèles standards utilisés dans l'industrie, DocBook par exemple pour rédiger des livres, ou le HTML pour les sites webs.

## HTML

Le HTML est donc un ensemble de balises permettant de décrire une page web ou un document. Le plus important à savoir, c'est que l'interpréteur Markdown génère du HTML et que c'est ce dernier que nous allons pouvoir habiller avec du CSS.

Donc, tu apprendras ici quelles balises sont générées et avec cela, tu pourras modifier l'apparence ton document.

On ne va pas voir tout de suite les différentes balises, mais je vais te montrer l'exemple précédent en HTML.

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
     
# Structure d'un document Natao

	<div id="viewer" class="viewer" layout="column">
    	<div flex layout="column" layout-align="start stretch">
        	<div class="haut" layout="row" layout-align="start stretch">
            	<div class="identity" layout="column" layout-align="center stretch">
                	<p>Ton nom</p>
                    <p>Ton prénom</p>
                    <p>Ta classe</p>
                </div>
                <div class="title-zone" flex layout="column" layout-align="center stretch">
                    <h1>Titre</h1>
                    <p id="dateCreated">Date de création</p>
                </div>
            </div>
            <div class="notation"></div>
            <div class="devoir" flex layout="row" layout-align="start stretch">
                <div class="marge"></div>
                <div class="rendu">
                	...Et ici le contenu de ce que tu as rédigé en Markdown
                </div>
            </div>
        </div>
    </div>
    
Ca fait beaucoup de texte, et on n'a pas encore vu le Markdown transformé