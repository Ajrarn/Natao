# Les bases

Pour rédiger un texte avec Natao, tu vas devoir apprendre un nouveau langage.
Un langage qui lui permettra de comprendre comment tu souhaites organiser ton document.
Ce langage s'appelle le Markdown. Nous allons commencer par les bases de la mise en page, et tu vas voir, c'est un langage très facile.


## Paragraphes

Les paragraphes en Markdown sont simplement composées d'une ou plusieurs lignes consécutives suivies par une ou deux lignes vides.

    On July 2, an alien mothership entered Earth's orbit and deployed several dozen saucer-shaped "destroyer" spacecraft, each 15 miles (24 km) wide.

    On July 3, the Black Knights, a squadron of Marine Corps F/A-18 Hornets, participated in an assault on a destroyer near the city of Los Angeles.

Autrement dit, tant que tu ne sautes pas de ligne, Natao considère que c'est le même paragraphe.

## Titres

Tu vas aussi avoir besoin d'organiser ton document. Et tu peux le faire grace aux différents titres.

Tu peux créer un titre en ajoutant un ou plusieurs # au début du texte de ton titre. Le nombre de # que tu utilises détermine l'importance du titre. Plus il y en a et moins il est important.

    # Le niveau le plus important (une balise <H1>)
    ## Le second plus important (une balise <H2>)
    …
    ###### Le 6ème plus important (une balise <H6>)

Tu peux aussi souligner le titre.

    Le niveau le plus important
    ===========================

    Le second plus important
    ------------------------

Tu ne disposera alors que de deux niveaux pour tes titres, mais ton Markdown sera plus lisible.

Si je peux te donner un bon conseil, ne dépasses pas trois niveaux de titre dans tes documents. Cela améliorera grandement sa lisibilité.

## Citation

Tu peux indiquer une citation avec un >. Tant que tes lignes commencent par des >, on reste dans le bloc de citation.

    Abraham Lincoln a dit:

    > Pardon my french

Si tu souhaites que l'auteur apparaisse dans le bloc de citation, il te suffit simplement de l'écrire comme ceci:

    > Pardon my french
    > *Abraham Lincoln*


## Mettre en valeur du texte

Tu peux valoriser du texte, c'est à dire faire ressortir certains mots ou phrases, pour qu'on les remarque.
Tu as deux niveaux de valorisation qui s'obtiennent en entourant le mot ou le groupe de mots du caractère \*.
Un seul \* le met en valeur, deux \* signifie qu'il est très important. Par défaut, la première mise en valeur, met le texte en italique, la deuxième, le met en gras.
Mais tu peux changer les règles, en souligner un en rouge par exemple.

    *Ce texte sera valorisé*
    **Ce texte sera très remarqué**

Tu peux également utiliser le caractère '_' au lieu de '*', pour les valorisations. Cela te permet de combiner les 2 dans un même texte.

    **Tout le monde _doit_ arriver à l'heure aujourd'hui.**


# Syntaxe avancée

La syntaxe de base te permet déjà de rédiger de nombreux documents. Les éléments qui suivent te permettront de faire encore mieux.
Et c'est toujours aussi simple.


## Listes

### listes non ordonnées

Tu peux créer une liste non ordonnée en mettant devant chaque article un '*' ou un '_'.

    * Article
    * Article
    * Article

    - Article
    - Article
    - Article

### Listes ordonnées

Tu peux créer une liste ordonnée en précédant chaque article par un nombre.

    1. Article 1
    2. Article 2
    3. Article 3


### Listes imbriquées

Tu peux créer des listes imbriquées en ajoutant 2 espaces avant les articles de la liste 'fille'.

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
Ecrire un tableau consiste pratiquement à le dessiner à l'aide caractères.

  Tables aren't part of the core Markdown spec, but they are part of GFM and Showdown supports them by turning on the flag `tables`.

    ```
    | Tables        | Are           | Cool  |
    | ------------- |:-------------:| -----:|
    | **col 3 is**  | right-aligned | $1600 |
    | col 2 is      | *centered*    |   $12 |
    | zebra stripes | ~~are neat~~  |    $1 |
    ```

this will produce this:

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| **col 3 is**  | right-aligned | $1600 |
| col 2 is      | *centered*    |   $12 |
| zebra stripes | ~~are neat~~  |    $1 |


    Colons can be used to align columns.

    The outer pipes (|) are **NOT** optional. But you don't need to make the raw Markdown line up prettily.

    You can also use other markdown syntax inside them.


## Code formatting

### Inline formats

Use single backticks (\`) to format text in a special monospace format. Everything within the backticks appear as-is, with no other special formatting.

    Here's an idea: why don't we take `SuperiorProject` and turn it into `**Reasonable**Project`.

### Multiple lines

Showdown wraps a code block in both `<pre>` and `<code>` tags.

To produce a code block in Markdown, simply indent every line of the block by at least 4 spaces or 1 tab.

    This is a normal paragraph:

        This is a code block.

You can also use triple backticks to format text as its own distinct block.


    Check out this neat program I wrote:

    ```
    x = 0
    x = 2 + 2
    what is x
    ```


## Links

Showdown supports two style of links: *inline* and *reference*.

### Inline

You can create an inline link by wrapping link text in brackets ( `[ ]` ), and then wrapping the link in parentheses ( `( )` ).

For example, to create a hyperlink to `showdown.github.io`, with a link text that says, Showdown is great!, you'd write this in Markdown:

    [Showdown is great!](http://showdown.github.io/)

### Reference

Reference-style links use a second set of square brackets, inside which you place a label of your choosing to identify the link:

    This is [an example][id] reference-style link.

Then, anywhere in the document (usually at the end), you define your link label like this, on a line by itself:

    [id]: http://example.com/  "Optional Title Here"



