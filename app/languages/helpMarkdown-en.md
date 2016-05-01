# The Markdown Language

To write a text with Natao, you are going to have to learn a new language. But do not worry as this will be nothing like learning a foreign tongue.
Producing a text with Natao consists of including certain signs and characters to your document. These signs and characters, which are designed to help Natao format the text you are writing for you, constitute the Markdown language.
Let's start with its very easy to learn basic principles.

By the way, the document you are currently reading was written in Markdown, with Natao.

# Basic Syntax

## Paragraphs

Paragraphs in Markdown are simply composed of one or two consecutive lines followed by one or two empty lines. 
In the first blockquote that follows, you can see two bits of text separated by one empty line. In the second blockquote, you can see how Natao formats them.

        When Zarathustra was thirty years old, he left his home and the lake of his home, and went into the mountains. There
    he enjoyed his spirit and his solitude, and for ten years did not weary of it. But at last his heart changed,- and rising one morning with the rosy dawn, he went before the sun, and spake thus unto it:
    
        "O grand astre ! Quel serait ton bonheur, si tu n'avais pas ceux que tu éclaires ?

Lorsque Zarathoustra eut atteint sa trentième année, il quitta sa patrie et le lac de sa patrie et s'en alla dans la montagne.
Là il jouit de son esprit et de sa solitude et ne s'en lassa point durant dix années.
Mais enfin son coeur se transforma, - et un matin, se levant avec l'aurore, il s'avança devant le soleil et lui parla ainsi :

"O grand astre ! Quel serait ton bonheur, si tu n'avais pas ceux que tu éclaires ?

## Titles

You can create a title by adding one or a few pound or hash signs (#) at the beginning of your text.
The number of (#) you add determines how important the title is. You may only add up to six (#) signs. The following example shows you how the titles of this particular document have been designed.

    # Basic Principles
    ## Paragraphs
    ## Titles
    ### etc.

You may underline a title as follows:

    The most important level
    ========================

    The second most important level
    -------------------------------

You will only have access to two title levels, but your Markdown will be more readable in a Markdown program other than Natao. Note that the titles that use the (#) are easier to read. We recommend you use that.

We also recommend that you do not go beyond three title levels for readability.

## Highlight Text Elements

You may decide to bring your readers' attention to specific parts or portions of you text. Two highlighting levels can be achieved by placing a star sign (*) before and after the word or words you want to highlight. One (*) will italicize the text, while two (*) will put the text in bold.

Some of the style-sheets available by default in Natao also allow you to underline portions of text with a red line for instance.

    *This text will be italicized.*
    **This text will be put in bold.**

*This text will be italicized.*
**This text will be put in bold.**

You may also add the underscore sign ( _ ) in front and after some text to combine the italics and bold letters.

    **Everyone _must_ arrive on time today.**

**Everyone _must_ arrive on time today.**

Finally, you may choose to cross-out a word or words by adding the tilde sign (~).

    ~~A mistake.~~

~~A mistake.~~

# Advanced Syntax

The basic Markdown syntax allows anyone to write clear documents. The simple elements of syntax that follow should allow you to go a step further.

## Citations

You may create a citation by adding a greater-than symbol (>) in front of the text you'd like to have appear as a quote. As long as your lines start with (>), your text will remain a citation.

    Abraham Lincoln wrote:

    > I desire to see the time when education, and by its means, morality, sobriety, enterprise and industry, shall become much more general than at present.

Abraham Lincoln wrote:

> I desire to see the time when education, and by its means, morality, sobriety, enterprise and industry, shall become much more general than at present.

If you wish the name of the author to appear in the citation bloc, write the citation as follows:

    > One need not be a chamber to be haunted.

    > **Emily Dickinson*

> One need not be a chamber to be haunted.

> *Emily Dickinson*

## Unformatted Blocks

### Within a Line

To highlight a few words within a larger section of text, use quotation marks.
The font of the highlighted words or word will change but the text's overall formatting will remain unchanged. In the example that follows, the star signs (*) are added for even more emphasis.

    This text is `important` and here, it becomes even `**more**` important.

This text is 'important' and here, it becomes even '**more**' important

### Over Many Lines

The grayed out blockquotes we've been using in this guide were created as follows: start the lines of text that need to be part of the box with four empty character spaces or one use of the TAB key.

    As an example, here's some text:

        An example of text.

As an example, here's some text:

    An example of text.

You may also three grave accents ( ` ) to indicate the beginning and the end of a the block of grayed out text:

    Here's my text:

    ```
    x = 0
    x = 2 + 2
    ```

Here's my text:

```
x = 0
x = 2 + 2
```

## Lists

### Unordered Lists

You may create unordered lists by adding a star sign (*) or an underscore sign ( _ ) in front of each portion of text.

    * This is some text.
    * Here, some text.
    * Just wrote some words.

    - This is some text
    - Here, some text.
    - Just wrote some words.

- This is some text
- Here, some text.
- Just wrote some words.

### Ordered Lists

Tu peux créer une liste ordonnée en précédant chaque article par un nombre.

    1. This is some text
    2. Here, some text.
    3. I just wrote some words.

1. This is some text
2. Here, some text.
3. I just wrote some words.

### Indented Lists

You may create tabbed lists by adding one TAB space or four empty character spaces in front of the text that needs to be indented.

    1. Write some text here:
        1. And add a detail about that text here.
        2. And another detail here.
    2. Write additional text here:
        * Add details to your text.
        * Keep writing.
        * And some last words.
    3. Start a new indented sentence.

1. Write some text here:
    1. And add a detail about that text here.
    2. And another detail here.
2. Write additional text here:
  * Add details to your text.
  * Keep writing.
  * And some last words.
3. Start a new indented sentence.

## Tables

Creating tables with the original version of the Markdown syntax is not possible. We can create them by using a variant of Markdown called GFM, which stands for Git-Hub Flavored Markdown.

Creating a table consists of drawing your table with symbols as follows:

    | Tables        | Are           | Cool  |
    | ------------- |:-------------:| -----:|
    | **col 3 is**  | right-aligned | $1600 |
    | col 2 is      | *centered*    |   $12 |
    | zebra stripes | ~~are neat~~  |    $1 |

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| **col 3 is**  | right-aligned | $1600 |
| col 2 is      | *centered*    |   $12 |
| zebra stripes | ~~are neat~~  |    $1 |

Columns are drawn by using vertical bars or piptes ( | ).
Table headers are separated from rows by using hyphen-minus signs ( - ).
Colon signs ( : ) are used to align the columns as follows:

* Place a colon on the right, and the text becomes right-aligned.
* Place colons on both sides of a vertical bar or pipe, and the text is centered.
* If not colons are used, the text becomes left-aligned.

You should note that, although vertical bars or pipes are needed to create columns, they do not need to be aligned for the table appear properly in its final print-ready form. That said, aligning them makes reading the Markdown tables easier.

## Images

You may insert images in your document by directing Natao to the image's URL location on your computer:

    ![Image of Yaktocat](./src/images/myLessons.png)

![Logo de Natao](./natao.png)

Please, be aware that images are not saved within Natao or any of its databases. If you use your database on more than one computer, you will have to copy your image along side the Natao.db file and modify the image's URL within your document.

## Links

### Inline

You can create an inline link by wrapping link text in brackets ([ ]), and then wrapping the link in parentheses (( )).

For example, to create a hyperlink to https://github.com/Ajrarn/Natao, with a link text that says, Natao est sur Github!, you'd write this in Markdown:

    [Natao est sur Github!](https://github.com/Ajrarn/Natao)

[Natao est sur Github!](https://github.com/Ajrarn/Natao)

### Reference

Reference-style links use a second set of square brackets, inside which you place a label of your choosing to identify the link:

    Natao est sur [Github][github.natao] normalement.

Natao est sur [Github][github.natao] normalement.

Then, anywhere in the document (usually at the end), you define your link label by putting it in between brackets followed by a colon, followed by the destination between quotations marks:

    [github.natao]: https://github.com/Ajrarn/Natao  "Natao sur Github"

You will note that reference-words you place at the end of your document remain invisible in the document's final, ready-for-print version. The reference-words only pop up when you put your cursor above the link within your document. This allows you to organize your references, and to use them more than once in your text.

[github.natao]: https://github.com/Ajrarn/Natao  "Natao sur Github"
