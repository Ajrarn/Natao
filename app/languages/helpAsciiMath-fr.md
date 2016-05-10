# MathJax

La possibilité d'écrire des formules mathématiques n'est pas incluse dans le langage Markdown.
Par contre, il existe un produit, appelé MathJax qui permet de le faire. Natao inclut donc également MathJax.
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
Pour AsciiMath, il n'existe qu'une seul formule magique, entourer ta formule de maths de 2 @.
Ce qui correspond à une formule dans la ligne courante. A toi d'aller à la ligne si tu souhaites la séparer.

	>Le partage du butin a été établi comme suit @@1/2@@ pour le capitaine, @@1/4@@ pour le navigateur, et l'équipage se partage le reste.

ce qui donne :

>Le partage du butin a été établi comme suit @@1/2@@ pour le capitaine, @@1/4@@ pour le navigateur, et l'équipage se partage le reste.

# La syntaxe AsciiMath

## Ecrire des opérations
Tout d'abord, tu dois savoir que Natao ne te permet pas de poser des opérations, tu pourras seulement les écrire en ligne.

| Caractère souhaité | Syntaxe |
|:------------------:|:-------:|
| @@+@@              | +       |
| @@-@@              | -       |
| @@xx@@             | xx      |
| @@-:@@             | -:      |
| @@=@@              | =       |

Ainsi tu peux écrire :

	>@@4 xx 3 = 12@@

    >@@100 -: 4 = 25@@

pour obtenir :

>@@4 xx 3 = 12@@

>@@10 -: 2 = 5@@

## Comparer des nombres

| Caractère souhaité | Syntaxe |
|:------------------:|:-------:|
| @@=@@              | =       |
| @@<@@              | <       |
| @@<=@@             | <=      |
| @@>@@              | >       |
| @@>=@@             | >=      |
| @@!=@@             | !=      |

Par exemple:

	>@@200mm < 25cm <= 3dm@@

ce qui donne:
>@@200mm < 25cm <= 3dm@@

## Les lettres grecques
Bien qu'il puisse semble un peu tôt pour réfrencer ces dernières, il y en a une qui est utilisée dès le CM2 : @@pi@@.
Alors nous allons les répertorier ici :

| Caractère souhaité | Syntaxe    |
|:------------------:|:----------:|
| @@alpha@@          | alpha      |
| @@beta@@           | beta       |
| @@chi@@            | chi        |
| @@delta@@          | delta      |
| @@Delta@@          | Delta      |
| @@epsilon@@        | epsilon    |
| @@varepsilon@@     | varepsilon |
| @@eta@@            | eta        |
| @@gamma@@          | gamma      |
| @@Gamma@@          | Gamma      |
| @@iota@@           | iota       |
| @@kappa@@          | kappa      |
| @@lambda@@         | lambda     |
| @@Lambda@@         | Lambda     |
| @@mu@@             | mu         |
| @@nu@@             | nu         |
| @@omega@@          | omega      |
| @@Omega@@          | Omega      |
| @@phi@@            | phi        |
| @@Phi@@            | Phi        |
| @@varphi@@         | varphi     |
| @@pi@@             | pi         |
| @@Pi@@             | Pi         |
| @@psi@@            | psi        |
| @@Psi@@            | Psi        |
| @@rho@@            | rho        |
| @@sigma@@          | sigma      |
| @@Sigma@@          | Sigma      |
| @@tau@@            | tau        |
| @@theta@@          | theta      |
| @@Theta@@          | Theta      |
| @@vartheta@@       | vartheta   |
| @@upsilon@@        | upsilon    |
| @@xi@@             | xi         |
| @@Xi@@             | Xi         |
| @@zeta@@           | zeta       |

Ainsi, tu pourras écrire:

@@périmètre = 2 xx pi xx r @@