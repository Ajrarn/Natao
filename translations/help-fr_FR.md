# Syntaxe Markdown


## Paragraphes

Les paragraphes en Markdown sont simplement composées d'une ou plusieurs lignes consécutives suivies par une ou deux lignes vides.

    On July 2, an alien mothership entered Earth's orbit and deployed several dozen saucer-shaped "destroyer" spacecraft, each 15 miles (24 km) wide.

    On July 3, the Black Knights, a squadron of Marine Corps F/A-18 Hornets, participated in an assault on a destroyer near the city of Los Angeles.

## Titres

Tu peux créer un titre en ajoutant un ou plusieurs # au début du texte de votre titre. Le nombre de # que tu utilises détermine l'importance du titre. Plus il y en a et moins il est important.

    # Le niveau le plus important (une balise <H1>)
    ## Le second plus important (une balise <H2>)
    …
    ###### Le 6ème plus important (une balise <H6>)

Tu peux aussi souligner le titre.

    Le niveau le plus important
    ===========================

    Le second plus important
    ------------------------

## Citation

Tu peux indiquer une citation avec un >.

    Abraham Lincoln a dit:

    > Pardon my french


## Donner du style au texte

Tu peux mettre du texte en **gras** ou en  *italique*.

    *Ce texte sera en italique*
    **Ce texte sera en gras**

Tu peux également utiliser le caractère '_' au lieu de '*', pour le gras et l'italique. Cela te permet de combiner les 2 dans un même texte.

    **Tout le monde _doit_ arriver à l'heure aujour'hui.**


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


## Tables

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
