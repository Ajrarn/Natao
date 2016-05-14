# MathJax

La possibilité d'écrire des formules mathématiques n'est pas incluse dans le langage Markdown.
Par contre, il existe un produit, appelé MathJax qui permet de le faire. Natao l'inclut donc également.
MathJax permet de lire plusieurs syntaxe différentes :

* MathML
* TeX
* AsciiMath

Actuellement, Natao te permet d'utiliser TeX et AsciiMath. Pour cela, tu vas devoir entourer tes formules de caractères destinés à MathJax. Ces caractères lui permettront de savoir ce qu'il doit transformer en formules.

## Comment signaler les formules TeX
Pour TeX, il existe 2 signalétiques, la première permet d'utiliser des formules dans la ligne courante et utilise 2 $.

	>Le partage du butin a été établi comme suit $$\frac{1}{2}$$ pour le capitaine, $$\frac{1}{4}$$ pour le navigateur, et l'équipage se partage le reste.

Ce qui donne :
>Le partage du butin a été établi comme suit $$\frac{1}{2}$$ pour le capitaine, $$\frac{1}{4}$$ pour le navigateur, et l'équipage se partage le reste.

La seconde signalétique permet d'écrire la formule à la ligne et centrée. On utilise pour cela 3$.

	>Voici du texte suivi d'une formule $$$ \sqrt{\frac{1}{3}} $$$ et la formule et sa suite apparaissent séparés.

ce qui donne :

>Voici du texte suivi d'une formule $$$ \sqrt{\frac{1}{3}} $$$ et la formule et sa suite apparaissent séparés.

Comme tu le verras par la suite, je n'ai pas documenté cette syntaxe ici. J'ai choisi de présenter uniquement AsciiMath, car c'est la syntaxe la plus simple et la plus courte, d'une part et également car TeX, étant la référence, est particulièrement bien documentée sur internet.

## Comment signaler les formules AsciiMath
Pour AsciiMath, il n'existe qu'une seule formule magique, entourer ta formule de maths de 2 @.
Cela correspond à une formule dans la ligne courante. A toi de changer de paragraphe si tu souhaites la séparer du texte qui l'entoure.

	>Le partage du butin a été établi comme suit @@1/2@@ pour le capitaine, @@1/4@@ pour le navigateur, et l'équipage se partage le reste.

ce qui donne :

>Le partage du butin a été établi comme suit @@1/2@@ pour le capitaine, @@1/4@@ pour le navigateur, et l'équipage se partage le reste.

# Les bases d'AsciiMath

## Poser des opérations
Tout d'abord, tu dois savoir que Natao ne te permet pas de poser des opérations, tu pourras seulement les écrire en ligne.
Je vais te donner de quoi commencer à l'utiliser:

| Caractère souhaité | Syntaxe | Caractère souhaité | Syntaxe |
|:------------------:|:-------:|:------------------:|:-------:|
| @@=@@              | =       | @@!=@@             | !=      |
| @@+@@              | +       | @@<@@              | <       |
| @@-@@              | -       | @@<=@@             | <=      |
| @@xx@@             | xx      | @@>@@              | >       |
| @@-:@@             | -:      | @@>=@@             | >=      |

Ainsi tu peux écrire :

	>@@4 xx 3 = 12@@

    >@@100 -: 4 = 25@@

    >@@200mm < 25cm <= 3dm@@

pour obtenir :

>@@4 xx 3 = 12@@

>@@10 -: 2 = 5@@

>@@200mm < 25cm <= 3dm@@

Penses toujours à mettre des espaces autour des symboles < et > pour éviter qu'il y ait une confusion avec le html.

## Les fractions
Il est très simple d'écrire des fractions, il suffit d'utiliser le symbole "/" pour séparer les deux parties de celle-ci:
Tu peux donc ecrire ceci:

	>@@1/2 + 1/4 = 3/4@@

Pour obtenir cela:

>@@1/2 + 1/4 = 3/4@@


## pi
On va rajouter @@pi@@ pour ceux qui ont commencé les périmètres des cercles, et te voila déjà outillé pour les premières classes:

| Caractère souhaité | Syntaxe |
|:------------------:|:-------:|
| @@pi@@              | pi     |

Ainsi, tu pourras écrire:

@@périmètre = 2 xx pi xx rayon @@

# Concepts un peu plus avancés

## Indice et exposant
Tu peux utiliser le symbole "\_" pour mettre du texte en indice, et le symbole "^" pour mettre du texte en exposant.

	>@@x_1@@

    >@@x^2@@

    >@@x_1^2@@
donne :

>@@x_1@@

>@@x^2@@

>@@x_1^2@@

Il est important de noter que quand tu as besoin des deux, tu dois toujours utiliser l'indice avant l'exposant.

Ces 2 syntaxes ont d'autres effets sur les éléments de formule qui ont besoin d'indice et/ou d'exposant :

	>@@sum_(n=1)^(n=5) 4^n@@

    >@@int_0^1 f(x)dx@@

>@@sum_(n=1)^(n=5) 4^n@@

>@@int_0^1 f(x)dx@@

## Les matrices et vecteurs

Il te suffit d'écrire ceci:

	>@@[[a,b],[c,d]]@@

Pour obtenir une matrice:

>@@[[a,b],[c,d]]@@

Et ceci:

	>@@((a,b),(c,d))@@

Pour obtenir un vecteur:

>@@((a,b),(c,d))@@

# Listes de symboles et fonctions

## Les lettres grecques


| Caractère souhaité | Syntaxe    | Caractère souhaité | Syntaxe    |
|:------------------:|:----------:|:------------------:|:----------:|
| @@alpha@@          | alpha      | @@phi@@            | phi        |
| @@beta@@           | beta       | @@Phi@@            | Phi        |
| @@chi@@            | chi        | @@varphi@@         | varphi     |
| @@delta@@          | delta      | @@pi@@             | pi         |
| @@Delta@@          | Delta      | @@Pi@@             | Pi         |
| @@epsilon@@        | epsilon    | @@psi@@            | psi        |
| @@varepsilon@@     | varepsilon | @@Psi@@            | Psi        |
| @@eta@@            | eta        | @@rho@@            | rho        |
| @@gamma@@          | gamma      | @@sigma@@          | sigma      |
| @@Gamma@@          | Gamma      | @@Sigma@@          | Sigma      |
| @@iota@@           | iota       | @@tau@@            | tau        |
| @@kappa@@          | kappa      | @@theta@@          | theta      |
| @@lambda@@         | lambda     | @@Theta@@          | Theta      |
| @@Lambda@@         | Lambda     | @@vartheta@@       | vartheta   |
| @@mu@@             | mu         | @@upsilon@@        | upsilon    |
| @@nu@@             | nu         | @@xi@@             | xi         |
| @@omega@@          | omega      | @@Xi@@             | Xi         |
| @@Omega@@          | Omega      | @@zeta@@           | zeta       |

