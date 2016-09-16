# Les bases

Pour rédiger un texte avec Natao, tu vas devoir apprendre un nouveau langage.
Rassures toi, ce n'est pas comme apprendre une langue étrangère.
Cela consiste à ajouter certains signes (ou caractères) à ton texte.
Ce langage permettra à Natao de comprendre comment tu souhaites organiser ton document.
Tu décris ce que tu souhaites et Natao met en page pour toi.
Ce langage s'appelle le **Markdown**. Nous allons commencer par les bases de la mise en page, et tu vas voir, c'est un langage très facile.

D'ailleurs, la documentation que tu es en train de lire a été écrite en Markdown, et avec Natao.

## Séparer des mots
C'est facile, il suffit de mettre un ou plusieurs espaces entre chaque mot. Alors pourquoi en faire un paragraphe ?

Ce qu'il y a d'important, c'est que tu peux utiliser *plusieurs* espaces pour séparer des mots, autant que tu veux. Quand ton document sera traité, il n'en mettra qu'un seul, voici un exemple:

	J'ai                                 faim !
    
**donne ceci**:

J'ai                                 faim !


Alors si espacer davantage les mots dans ton éditeur te permet de mieux les discerner, ne t'en prives pas ! Ton document, une fois mis en page et imprimé, respectera les normes classiques de mise en forme.


## Séparer des Paragraphes

Par défaut, tant que tu ne sépares pas tes phrases par des lignes vides, Natao considère qu'elles font partie d'un même paragraphe. Il ne va donc pas à la ligne et toutes tes phrases font partie d'un même bloc de phrases: c'est un paragraphe !

    j'écris une phrase courte. J'en écris une autre sur la même ligne.
    
    J'écris une autre phrase.
    Mais cette fois-ci, je vais à la ligne

**donne ceci**:

j'écris une phrase courte. J'en écris une autre sur la même ligne.
    
J'écris une autre phrase.
Mais cette fois-ci, je vais à la ligne

Notes que Natao n'est allé à la ligne que quand nous avons sauté une ligne. Sachant cela, tu peux aller à la ligne aussi souvent que tu le souhaites, tant que tu ne sautes de ligne, c'est le même paragraphe.



## Titres

Tu vas aussi avoir besoin d'organiser ton document. Et tu peux le faire grace aux différents titres.

Tu peux créer un titre en ajoutant un ou plusieurs # au début du texte de ton titre. Le nombre de # que tu utilises détermine l'importance du titre. Plus il y en a et moins il est important.
L'exemple ci-dessous ne sera pas illustré, car il perturberait la présentation de cette aide. Mais les premiers titres que tu vas voir sont ceux de ce document :

    ::markdown::
    # Les bases
    ## Séparer des mots
    ## Séparer des paragraphes
    ## Titres
    …
    ###### et tu peux aller jusqu'à 6 niveaux


## Mettre en valeur du texte

Tu peux valoriser du texte, c'est à dire faire ressortir certains mots ou phrases, pour qu'on les remarque.
Tu as deux niveaux de valorisation qui s'obtiennent en entourant le mot ou le groupe de mots du caractère \*.
Un seul \* le met en valeur, deux \* signifient qu'il est très important. Par défaut, la première mise en valeur, met le texte en italique, la deuxième, le met en gras.
Mais tu peux changer les règles (avec les feuilles de style qui sont expliquées dans une autre partie), en souligner un en rouge par exemple.

    *Ce texte sera valorisé*
    
    **Ce texte sera très remarqué**
    
**donne ceci**:

*Ce texte sera valorisé*

**Ce texte sera très remarqué**

Tu peux également utiliser le caractère '_' au lieu de '*', pour les valorisations. Cela te permet de combiner les 2 dans un même texte.

    **Tout le monde _doit_ arriver à l'heure aujourd'hui.**
    
**donne ceci**:

**Tout le monde _doit_ arriver à l'heure aujourd'hui.**

Enfin, il existe une dernière valorisation de texte qui consiste à signifier qu'il est faux, en le rayant par exemple

    ~~une bêtise~~
    
**donne ceci**:

~~une bêtise~~

## Afficher les caractères spéciaux
Nous avons vu que les # placés en début de ligne et les \* permettent de valoriser le texte.
Mais comment faire si on veut précisément afficher un # en début de ligne ou un \* dans notre texte ?

Nous allons utiliser ce qu'on appelle un caractère d'échappement. En mettant un \ devant le caractère en question, on dit à l'interpréteur MarkDown de l'afficher et de ne surtout pas l'interpréter. Par exemple :

	\# en début de texte, avec un \* sans valoriser ce qui suit.
    
**donne ceci**:

\# en début de texte, avec un \* sans valoriser ce qui suit.

# Syntaxe avancée

La syntaxe de base te permet déjà de rédiger de nombreux documents. Les éléments qui suivent te permettront de faire encore mieux.
Et c'est toujours aussi simple.

## Citation

Tu peux indiquer une citation avec un >. Tant que tes lignes commencent par des >, on reste dans le bloc de citation.

    Abraham Lincoln a dit:

    > Pardon my french

Abraham Lincoln a dit:

> Pardon my french

Si tu souhaites que l'auteur apparaisse dans le bloc de citation, il te suffit simplement de l'écrire comme ceci:

    > Pardon my french

    > *Abraham Lincoln*

> Pardon my french

> *Abraham Lincoln*

## Blocs non mis en page

### Au sein d'une ligne

Utilise des guillemets obliques \` pour afficher le texte tel quel, sans mise en page.

Dans l'exemple ci-dessous, les \* ne transformeront pas le texte super important, ils seront visibles (tout comme avec le caractère d'échappement) :

    Et voila un texte `important` mais là, il devient  `**Super**Important`.
    
**donne ceci**:

Et voila un texte `important` mais là, il devient  `**Super**Important`.


### Sur plusieurs lignes

Les encarts gris que tu as vu jusqu'à présent pour te montrer des exemples ont été faits avec cette technique. Tu pourras maintenant facilement la reproduire.
Pour créer ce genre d'encart, il faut que toutes les lignes le composant commencent par 4 espaces ou une tabulation. Ca va te paraître bizarre, mais le premier encart gris est le code permettant de faire le deuxième bloc :

    Voici un exemple de code

        Le code en exemple...
        ...à la ligne
        
**donne ceci**:

Voici un exemple de code
	
    Le code en exemple...
    ...à la ligne

Tu peux aussi utiliser 3 guillemets obliques \` pour indiquer le début et la fin du bloc :

	::gfm::
    Voici mon code:

    ```
    #x = 0
    x = 2 + 2
    	what **is**     x
    ```
    
**donne ceci**:

Voici mon code:

```
#x = 0
x = 2 + 2
	what **is**     x
```

Comme le contenu n'est pas mis en page, tu peux constater 3 choses:

- Les #, les \* ne participent pas à la mise en page.
- Chaque ligne est à sa place, elles ne sont pas redisposées pour faire des paragraphes.
- chaque espace est conservé.

## Listes

### listes non ordonnées

Tu peux créer une liste non ordonnée en mettant devant chaque article un \* ou un -, tous deux suivis d'un espace.

    ::markdown::
    * Article
    * Article
    * Article

    - Article
    - Article
    - Article
    
**donne ceci**:

- Article
- Article
- Article

Préfères l'usage des tirets pour ne pas faire de confusion avec la valorisation. Mais il est bon de savoir que les \* peuvent faire la même chose.

### Listes ordonnées

Tu peux créer une liste ordonnée en précédant chaque article par un nombre.

    ::markdown::
    1. Article 1
    2. Article 2
    3. Article 3

**donne ceci**:

1. Article 1
2. Article 2
3. Article 3


### Listes imbriquées

Tu peux créer des listes imbriquées en ajoutant 1 tabulation ou 4 espaces avant les articles de la liste 'fille'.

    ::markdown::
    1. Article 1
        1. Un point important de l'article 1.
        2. Un autre point à considérer.
    2. Article 2
        * Une règle dont l'ordre nous indifère.
        * Une autre règle.
        * Et une dernière.
    3. Article 3

**donne ceci**:

1. Article 1
    1. Un point important de l'article 1.
    2. Un autre point à considérer.
2. Article 2
  * Une règle dont l'ordre nous indifère.
  * Une autre règle.
  * Et une dernière.
3. Article 3


## Tableaux

Pour faire un tableau présentable, il va falloir le dessiner avec les caractères *pipe* (|), *tiret*(-) et *deux-points*(:).

### Mon premier tableau

Commençons par le plus simple des tableaux.

	::gfm::
    |A|B|
	|-|-|
	|z|w|
    |y|v|
    |x|u|
    
**donne ceci**:

|A|B|
|-|-|
|z|w|
|y|v|
|x|u|

Nous avons tout simplement représenté 2 colonne en entourant le contenu de chaque colonne par les pipes (|).

Nous avons également séparé l'entête du tableau, du reste des données par une ligne avec un tiret (-) dans chaque colonne.

L'entête est valorisé et se différencie du contenu du tableau.

### Aspect dans l'éditeur

Examinons le tableau suivant:

	::gfm::
    |Un joli entête|
	|----|
	|b                       |
    |c'est bizarre|
    |d|

**donne ceci**:
    
|Un joli entête|
|----|
|b                       |
|c'est bizarre|
|d|

Notes que le résultat est un tableau correct, alors que le texte dans l'éditeur est difficile à associer à un tableau.

Mais regardons de plus près:
- le nombre de tirets entre 2 pipes n'a pas d'importance et sépare bien l'entête du reste des valeurs.
- le nombre d'espaces n'impacte pas non plus l'aspect du tableau
- Ce qui compte c'est que les contenus des colonnes soient entourés par des pipes.

Notre tableau est syntaxiquement correct, mais n'est pas très lisible dans l'éditeur. Essayons de le rendre lisible.

	::gfm::
    |Un joli entête|
	|--------------|
	|b             |
	|c'est bizarre |
	|d             |
    
Ce tableau qui nous donne le même résultat est plus facile à lire.

|Un joli entête|
|--------------|
|b             |
|c'est bizarre |
|d             |


### Alignement
Nous allons maintenant préciser pour chaque colonne comment aligner les colonnes de données. Le tableau suivant:

	::gfm::
	|Un joli entête|Un joli entête bis  |
	|:------------:|-------------------:|
	|b             |b                   |
	|c'est bizarre |c'est pas si bizarre|
	|d             |d                   |
    
**donne ceci**:
    
|Un joli entête|Un joli entête bis  |
|:------------:|-------------------:|
|b             |b                   |
|c'est bizarre |c'est pas si bizarre|
|d             |d                   |

La ligne qui sert de séparateur entre l'entête et les données a été agrémenté de nouveaux symboles: les deux-points(:).

- Si l'on entoure les tirets de deux-points(:), l'alignement est centré.
- Si l'on met les deux-points(:) à la fin, l'alignement est à droite.
- Inutile de les mettre à gauche, car l'alignement par défaut est à gauche.




### Un tableau avec plusieurs exemple

Le tableau ci-dessous utilise à la fois des propriétés d'alignement, et des propriétés de valorisation de texte.

	::gfm::
    | Les Tables     | Sont             | Cool  |
    | -------------- |:----------------:| -----:|
    | **col 3 est**  | alignée à droite | $1600 |
    | col 2 est      | *centrée*        |   $12 |
    | zebra stripes  | ~~une bêtise~~   |    $1 |

**donne ceci**:

| Les Tables     | Sont             | Cool  |
| -------------- |:----------------:| -----:|
| **col 3 est**  | alignée à droite | $1600 |
| col 2 est      | *centrée*        |   $12 |
| zebra stripes  | ~~une bêtise~~   |    $1 |


Enfin, n'hésitez pas à copier/coller des lignes entières pour vous faciliter la création de tableaux.

## Images

Tu peux aussi insérer une image, en utilisant son emplacement, dans l'exemple, son URL :

    ::gfm::
    ![Logo de Natao](./natao.png)

![Logo de Natao](./natao.png)

Attention, pour l'instant, les images ne sont pas sauvegardées dans Natao. Si tu utilises ta base de données sur plusieurs ordinateurs, il se peut que tu doives modifier l'adresse de l'image, mais tu dois surtout penser à la déplacer avec ton fichier Natao.db.


## Liens


### En ligne

Tu peux créer un lien en ligne en mettant le texte sur lequel figure le lien entre crochets ( `[ ]` ) et tout de suite après, entre parenthèse ( `( )` ), là où conduit ce lien :

	::gfm::
    [Natao est sur Github!](https://github.com/Ajrarn/Natao)

**donne ceci**:

[Natao est sur Github!](https://github.com/Ajrarn/Natao)

### Référence

Le lien de type référence utilise une deuxième paire de crochets, dans lequel tu lui donnes un nom unique qui est son identifiant:

    ::gfm::
    Natao est sur [Github][github.natao] normalement.

**donne ceci**:

Natao est sur [Github][github.natao] normalement.

Notes bien que tu n'as pas encore écrit où allait ce lien. Pour ce faire, mais généralement, on les mets à la fin, tu vas pouvoir définir où va ce lien et lui donner un titre (quand tu survoles le lien).

Donc tu remets l'identifiant entre crochets, suivi de :, de la destination et enfin d'un titre entre guillemets.

    ::gfm::
    [github.natao]: https://github.com/Ajrarn/Natao  "Natao sur Github"

Tu noteras également que cette description ne s'affiche pas. Mais quand tu survoles le lien de ton texte, tu vois apparaître le titre. Mais à quoi cela peut-il servir ?
A organiser toutes tes références, mais surtout à réutiliser les mêmes à plusieurs endroits. Il te suffit d'utiliser le même identifiant.
Par exemple, [ici][github.natao], c'est le même lien que celui utilisé dans l'exemple.


[github.natao]: https://github.com/Ajrarn/Natao  "Natao sur Github"





