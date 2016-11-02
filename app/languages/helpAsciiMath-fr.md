[toc]
# Comment signaler les formules AsciiMath
Pour signaler une formule mathématique, il suffit de l'entourer de 2 @.
Cela correspond à une formule dans la ligne courante. A toi de changer de paragraphe si tu souhaites la séparer du texte qui l'entoure.

	>Le partage du butin a été établi comme suit @@1/2@@ pour le capitaine, @@1/4@@ pour le navigateur, et l'équipage se partage le reste.

**donne ceci**:

>Le partage du butin a été établi comme suit @@1/2@@ pour le capitaine, @@1/4@@ pour le navigateur, et l'équipage se partage le reste.

# Les bases d'AsciiMath

## Poser des opérations
Tout d'abord, tu dois savoir que Natao ne te permet pas de poser des opérations, tu pourras seulement les écrire en ligne.
Je vais te donner de quoi commencer à l'utiliser:

| Caractère souhaité | Syntaxe |
|:------------------:|:-------:|
| @@=@@              | =       |
| @@+@@              | +       |
| @@-@@              | -       |
| @@xx@@             | xx      |
| @@-:@@             | -:      |
| @@!=@@             | !=      |
| @@<@@              | <       |
| @@<=@@             | <=      |
| @@>@@              | >       |
| @@>=@@             | >=      |

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

**donne ceci**:

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

## Portée des symboles et fonctions

La plupart du temps, la portée des symboles s'applique au prochain caractère.

	>@@sqrt 1/3@@

**donne ceci**:

>@@sqrt 1/3@@

Si tu souhaites appliquer le symbole ou la fonction sur plusieurs caractères, il suffit de mettre des parenthèses autour de l'expression pour laquelle ceka va s'appliquer.

	>@@sqrt(1/3)@@

**donne ceci**:

>@@sqrt(1/3)@@

On voit qu'ici, les parenthèses ne sont pas affichées, mais le symbole racine carrée s'applique à 1/3.

# Listes de symboles et fonctions

## Pour les opérations

| Caractère souhaité | Syntaxe    |
|:------------------:|:----------:|
| @@+@@              | +          |
| @@-@@              | -          |
| @@\*@@             | \*         |
| @@\*\*@@           | \*\*       |
| @@\*\*\*@@         | \*\*\*     |
| @@//@@             | //         |
| @@\\\\@@           | \\\\       |
| @@xx@@             | xx         |
| @@-:@@             | -:         |
| @@ @ @@            | @          |
| @@o+@@             | o+         |
| @@ox@@             | ox         |
| @@o.@@             | o.         |
| @@sqrt@@           | sqrt       |
| @@sum@@            | sum        |
| @@prod@@           | prod       |
| @@^^@@             | ^^         |
| @@^^^@@            | ^^^        |
| @@vv@@             | vv         |
| @@vvv@@            | vvv        |
| @@nn@@             | nn         |
| @@nnn@@            | nnn        |
| @@uu@@             | uu         |
| @@uuu@@            | uuu        |

## Pour les ensembles

| Caractère souhaité | Syntaxe    |
|:------------------:|:----------:|
| @@=@@              | =          |
| @@!=@@             | !=         |
| @@<@@              | <          |
| @@>@@              | >          |
| @@<=@@             | <=         |
| @@>=@@             | >=         |
| @@-<@@             | -<         |
| @@>-@@             | >-         |
| @@in@@             | in         |
| @@!in@@            | !in        |
| @@sub@@            | sub        |
| @@sup@@            | sup        |
| @@sube@@           | sube       |
| @@supe@@           | supe       |
| @@-=@@             | -=         |
| @@~=@@             | ~=         |
| @@\~~@@            | ~~         |
| @@prop@@           | prop       |


## Symboles logiques

| Caractère souhaité | Syntaxe    |
|:------------------:|:----------:|
| @@and@@            | and        |
| @@or@@             | or         |
| @@=>@@             | =>         |
| @@if@@             | if         |
| @@iff@@            | iff        |
| @@AA@@             | AA         |
| @@EE@@             | EE         |
| @@TT@@             | TT         |
| @@ \_&#124;_ @@    | \_&#124;\_ |
| @@ &#124;-- @@     | &#124;--   |
| @@ &#124;== @@     | &#124;==   |


## Groupements
| Caractère souhaité | Syntaxe    |
|:------------------:|:----------:|
| @@(@@              | (          |
| @@)@@              | )          |
| @@[@@              | [          |
| @@]@@              | ]          |
| @@{@@              | {          |
| @@}@@              | }          |
| @@(:@@             | (:         |
| @@:)@@             | :)         |
| @@{:@@             | {:         |
| @@:}@@             | :}         |


## Flèches
| Caractère souhaité | Syntaxe    |
|:------------------:|:----------:|
| @@uarr@@           | uarr       |
| @@darr@@           | darr       |
| @@rarr@@           | rarr       |
| @@->@@             | ->         |
| @@larr@@           | larr       |
| @@harr@@           | harr       |
| @@rArr@@           | rArr       |
| @@lArr@@           | lArr       |
| @@hArr@@           | hArr       |
| @@&#124;->@@       | &#124;->   |



## Accents

| Caractère souhaité | Syntaxe    |
|:------------------:|:----------:|
| @@hat x@@           | hat x     |
| @@bar x@@           | bar x     |
| @@ul x@@            | ul x      |
| @@vec x@@           | vec x     |
| @@dot x@@           | dot x     |
| @@ddot x@@          | ddot x    |

## Autres symboles

| Caractère souhaité | Syntaxe    |
|:------------------:|:----------:|
| @@sqrt@@           | sqrt       |
| @@int@@            | int        |
| @@oint@@           | oint       |
| @@del@@            | del        |
| @@grad@@           | grad       |
| @@+-@@             | +-         |
| @@O/@@             | O/         |
| @@oo@@             | oo         |
| @@aleph@@          | aleph      |
| @@/_@@             | /_         |
| @@:.@@             | :.         |
| @@cdots@@          | cdots      |
| @@vdots@@          | vdots      |
| @@ddots@@          | ddots      |
| @@diamond@@        | diamond    |
| @@square@@         | square     |
| @@CC@@             | CC         |
| @@NN@@             | NN         |
| @@QQ@@             | QQ         |
| @@RR@@             | RR         |
| @@ZZ@@             | ZZ         |

## Les lettres grecques


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

# Tex

Il existe d'autres syntaxes pour écrire des formules mathématiques, la plus connue est TeX, et pour les utilisateurs qui connaisse déjà cette syntaxe, elle a été incluse dans Natao.

## Comment signaler les formules TeX
Pour TeX, il existe 2 signalétiques, la première permet d'utiliser des formules dans la ligne courante et utilise 2 $.

	>Le partage du butin a été établi comme suit $$\frac{1}{2}$$ pour le capitaine, $$\frac{1}{4}$$ pour le navigateur, et l'équipage se partage le reste.

**donne ceci**:

>Le partage du butin a été établi comme suit $$\frac{1}{2}$$ pour le capitaine, $$\frac{1}{4}$$ pour le navigateur, et l'équipage se partage le reste.

La seconde signalétique permet d'écrire la formule à la ligne et centrée. On utilise pour cela 3$.

	>Voici du texte suivi d'une formule $$$ \sqrt{\frac{1}{3}} $$$ et la formule et sa suite apparaissent séparés.

**donne ceci**:

>Voici du texte suivi d'une formule $$$ \sqrt{\frac{1}{3}} $$$ et la formule et sa suite apparaissent séparés.