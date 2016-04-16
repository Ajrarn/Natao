# Les bases

Pour rédiger un texte avec Natao, tu vas devoir apprendre un nouveau langage.
Rassures toi, ce n'est pas comme apprendre une langue étrangère.
Cela consiste à ajouter certains signes (ou caractères) à ton texte.
Ce langage permettra à Natao de comprendre comment tu souhaites organiser ton document.
Tu décris ce que tu souhaites et Natao met en page pour toi.
Ce langage s'appelle le **Markdown**. Nous allons commencer par les bases de la mise en page, et tu vas voir, c'est un langage très facile.

D'ailleurs, la documentation que tu es en train de lire a été écrite en Markdown, et avec Natao.


## Paragraphes

Les paragraphes en Markdown sont simplement composés d'une ou plusieurs lignes consécutives suivies par une ou deux lignes vides.
Dans le bloc gris que tu vois en dessous, tu peux voir deux paragraphes séparés par une ligne vide, juste en dessous, tu peux voir comment Natao le met en forme :

    Lorsque Zarathoustra eut atteint sa trentième année, il quitta sa patrie et le lac de sa patrie et s'en alla dans la montagne.
    Là il jouit de son esprit et de sa solitude et ne s'en lassa point durant dix années.
    Mais enfin son coeur se transforma, - et un matin, se levant avec l'aurore, il s'avança devant le soleil et lui parla ainsi :

    "O grand astre ! Quel serait ton bonheur, si tu n'avais pas ceux que tu éclaires ?

Lorsque Zarathoustra eut atteint sa trentième année, il quitta sa patrie et le lac de sa patrie et s'en alla dans la montagne.
Là il jouit de son esprit et de sa solitude et ne s'en lassa point durant dix années.
Mais enfin son coeur se transforma, - et un matin, se levant avec l'aurore, il s'avança devant le soleil et lui parla ainsi :

"O grand astre ! Quel serait ton bonheur, si tu n'avais pas ceux que tu éclaires ?

## Titres

Tu vas aussi avoir besoin d'organiser ton document. Et tu peux le faire grace aux différents titres.

Tu peux créer un titre en ajoutant un ou plusieurs # au début du texte de ton titre. Le nombre de # que tu utilises détermine l'importance du titre. Plus il y en a et moins il est important.
L'exemple ci-dessous ne sera pas illustré, car il perturberait la présentation de cette aide. Mais les premiers titres que tu vas voir sont ceux de ce document :

    # Les bases
    ## Paragraphes
    ## Titres
    …
    ###### et tu peux aller jusqu'à 6 niveaux

Tu peux aussi souligner le titre.

    Le niveau le plus important
    ===========================

    Le second plus important
    ------------------------

Tu ne disposeras alors que de deux niveaux pour tes titres, mais ton Markdown sera plus lisible dans un éditeur Markdown différent de Natao.
Ici, la première syntaxe, celle avec les # est beaucoup plus lisible, c'est celle que je te recommande.

Si je peux te donner un bon conseil, ne dépasses pas trois niveaux de titre dans tes documents. Cela améliorera grandement sa lisibilité.

## Mettre en valeur du texte

Tu peux valoriser du texte, c'est à dire faire ressortir certains mots ou phrases, pour qu'on les remarque.
Tu as deux niveaux de valorisation qui s'obtiennent en entourant le mot ou le groupe de mots du caractère \*.
Un seul \* le met en valeur, deux \* signifient qu'il est très important. Par défaut, la première mise en valeur, met le texte en italique, la deuxième, le met en gras.
Mais tu peux changer les règles (avec les feuilles de style qui sont expliquées dans une autre partie), en souligner un en rouge par exemple.

    *Ce texte sera valorisé*
    **Ce texte sera très remarqué**

*Ce texte sera valorisé*
**Ce texte sera très remarqué**

Tu peux également utiliser le caractère '_' au lieu de '*', pour les valorisations. Cela te permet de combiner les 2 dans un même texte.

    **Tout le monde _doit_ arriver à l'heure aujourd'hui.**

**Tout le monde _doit_ arriver à l'heure aujourd'hui.**

Enfin, il existe une dernière valorisation de texte qui consiste à signifier qu'il est faux, en le rayant par exemple

    ~~une bêtise~~

~~une bêtise~~


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

Utilise des guillemets obliques \` pour afficher le texte tel quel, sans mise en page, avec une police un peu différente tout de même.
Dans l'exemple ci-dessous, les \* ne transformeront pas le texte super important, ils seront visibles :

    Et voila un texte `important` mais là, il devient  `**Super**Important`.

Et voila un texte `important` mais là, il devient  `**Super**Important`.

### Sur plusieurs lignes

Les encarts gris que tu as vu jusqu'à présent pour te montrer des exemples ont été faits avec cette technique. Tu pourras maintenant facilement la reproduire.
Pour créer ce genre d'encarts, il faut que toutes les lignes le composant commencent par 4 espaces ou une tabulation. Ca va te paraître bizarre, mais le premier encart gris est le code permettant de faire le deuxième bloc :

    Voici un exemple de code

        Le code en exemple..

Voici un exemple de code

    Le code en exemple..

Tu peux aussi utiliser 3 guillemets obliques \` pour indiquer le début et la fin du bloc :


    Voici mon code:

    ```
    x = 0
    x = 2 + 2
    what is x
    ```

Voici mon code:

```
x = 0
x = 2 + 2
what is x
```



## Listes

### listes non ordonnées

Tu peux créer une liste non ordonnée en mettant devant chaque article un '*' ou un '_'.

    * Article
    * Article
    * Article

    - Article
    - Article
    - Article

- Article
- Article
- Article

### Listes ordonnées

Tu peux créer une liste ordonnée en précédant chaque article par un nombre.

    1. Article 1
    2. Article 2
    3. Article 3

1. Article 1
2. Article 2
3. Article 3


### Listes imbriquées

Tu peux créer des listes imbriquées en ajoutant 1 tabulation ou 4 espaces avant les articles de la liste 'fille'.

    1. Article 1
        1. Un point important de l'article 1.
        2. Un autre point à considérer.
    2. Article 2
        * Une règle dont l'ordre nous indifère.
        * Une autre règle.
        * Et une dernière.
    3. Article 3

1. Article 1
    1. Un point important de l'article 1.
    2. Un autre point à considérer.
2. Article 2
  * Une règle dont l'ordre nous indifère.
  * Une autre règle.
  * Et une dernière.
3. Article 3


## Tableaux

Les tableaux tels que tu vas les voir ne font pas partie de Markdown. Par contre, ils font partie de GFM qui est la syntaxe Markdown utilisée par Github.
Et Showdown qui est utilisé par Natao pour l'affichage comprend le GFM. Donc, autant profiter.
Ecrire un tableau consiste pratiquement à le dessiner à l'aide de caractères (ou symboles).

    | Les Tables     | Sont             | Cool  |
    | -------------- |:----------------:| -----:|
    | **col 3 est**  | alignée à droite | $1600 |
    | col 2 est      | *centrée*        |   $12 |
    | zebra stripes  | ~~une bêtise~~   |    $1 |


| Les Tables     | Sont             | Cool  |
| -------------- |:----------------:| -----:|
| **col 3 est**  | alignée à droite | $1600 |
| col 2 est      | *centrée*        |   $12 |
| zebra stripes  | ~~une bêtise~~   |    $1 |


On dessine les colonnes avec des pipes ( | ), et on sépare l'entête des autre lignes avec le -.
Les : sur la séparation permettent de choisir comment le texte des colonnes est aligné:

* : à droite, le texte s'aligne à droite
* des 2 côtés et le texte est centré.
* si l'on ne précise rien, le texte est aligné à gauche.

Les pipes sont obligatoires pour délimiter les colonnes, mais il n'est pas indispensable qu'elles soient alignées.
Cela dit, quand elles sont alignées, le Markdown est plus lisible.

## Images

Tu peux aussi insérer une image, en utilisant son emplacement, dans l'exemple, son URL :

    ![Image of Yaktocat](./src/images/myLessons.png)

![Logo de Natao](./natao.png)

Attention, pour l'instant, les images ne sont pas sauvegardées dans Natao. Si tu utilises ta base de données sur plusieurs ordinateurs, il se peut que tu doives modifier l'adresse de l'image, mais tu dois surtout penser à la déplacer avec ton fichier Natao.db.


## Liens

Showdown et donc Natao permet de faire 2 types de liens:
 * *en ligne*
 * *référence*.

### En ligne

Tu peux créer un lien en ligne en mettant le texte sur lequel figure le lien entre crochets ( `[ ]` ) et tout de suite après, entre parenthèse ( `( )` ), là où conduit ce lien :


    [Natao est sur Github!](https://github.com/Ajrarn/Natao)

[Natao est sur Github!](https://github.com/Ajrarn/Natao)

### Référence

Le lien de type référence utilise une deuxième paire de crochets, dans lequel tu lui donnes un nom unique qui est son identifiant:

    Natao est sur [Github][github.natao] normalement.

Natao est sur [Github][github.natao] normalement.

Notes bien que tu n'as pas encore écrit où allait ce lien. Pour ce faire, mais généralement, on les mets à la fin, tu vas pouvoir définir où va ce lien et lui donner un titre (qaund tu survoles le lien).

Donc tu remets l'identifiant entre crochets, suivi de :, de la destination et enfin d'un titre entre guillemets.

    [github.natao]: https://github.com/Ajrarn/Natao  "Natao sur Github"

Tu noteras également que cette description ne s'affiche pas. Mais quand tu survoles le lien de ton texte, tu vois apparaître le titre. Mais à quoi cela peut-il servir ?
A organiser toutes tes références, mais surtout à réutiliser les mêmes à plusieurs endroits. Il te suffit d'utiliser le même identifiant.


[github.natao]: https://github.com/Ajrarn/Natao  "Natao sur Github"





