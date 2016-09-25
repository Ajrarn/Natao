# The Markdown Language

To write a text with Natao, you are going to have to learn a new language called Markdown. Rest assured: this will be much easier than learning a foreign tongue.

The Markdown language was created in 2004 by John Gruber, with significant help from Aaron Swartz.

It was designed to help format text documents with simple, readable signs and characters, like the pound sign ( # ) or the greater-than sign ( > ).

Producing a text with Natao consists of including these signs and other characters to your document to instruct Natao on how to format the text you are writing.
Of course, any Markdown document you produce with Natao will be readable and usable in any other Markdown program.

The document you are currently reading was actually written in Markdown, with Natao.

# Basic Syntax

## Paragraphs

Paragraphs in Markdown are created by inserting a blank line between two portions of text. 
In the first blockquote that follows, you can see two text excerpts, separated by a blank line space. In the second blockquote, you can see how Natao formats the two paragraphs.

                When Zarathustra was thirty years old, he left his home and the lake of his home, and went into the mountains.
        There he enjoyed his spirit and his solitude, and for ten years did not weary of it. But at last his heart changed,- and rising one morning with the rosy dawn, he went before the sun, and spake thus unto it:
    
                Thou great star! What would be thy happiness if thou hadst not those for whom thou shinest!

When Zarathustra was thirty years old, he left his home and the lake of his home, and went into the mountains. There he enjoyed his spirit and his solitude, and for ten years did not weary of it. But at last his heart changed,- and rising one morning with the rosy dawn, he went before the sun, and spake thus unto it:

Thou great star! What would be thy happiness if thou hadst not those for whom thou shinest!

## Titles

You can create a title by adding one or a few pound or hash signs ( # ) at the beginning of your text.
The number of ( # ) you add determines how important the title is. Note that you may only add up to six (#) signs.

The following example shows you how the titles of this particular document have been designed.

    # Basic Syntax
    ## Paragraphs
    ## Titles
    ### Within a Line

We also recommend that you do not go beyond three title levels for readability.

## Headers

You may create an underlined, numbered, first-level header by inserting at least one equal sign ( = ) under the header's text.

    This is the header text.
    =

You may create a second-level header by inserting at least one hyphen-minus sign ( - ) under the header text. The Markdown language is set up to number these headers automatically.

    The is the second-level header text.
    -

Please note that Markdown only permits two header levels. Note also that the titles that use the ( # ) signs are easier to read. We recommend that you use them.

## Highlight Text Elements

You may decide to bring your readers' attention to specific parts or portions of your text. 

Place a star sign ( * ) before and after the word(s) you would like highlighted, and the text will become italicized.

*This text will be italicized.*

Place two star signs ( * ) before and after the word(s) you would like highlighted, and the text will be put in bold.

**This text will be put in bold.**

You may also add an underscore sign ( _ ) in front and after some text to combine the italics and the bold letters.

    **Everyone _must_ arrive on time today.**

**Everyone _must_ arrive on time today.**

You may choose to strike-through a word or words by adding two tilde signs ( ~ ) before and after the word(s) you would like to strike-through.

    ~~A mistake.~~

~~A mistake.~~

Please note that some of Natao's default style-sheets allow you to underline portions of a text with a red line.

## Conclusion

The basic Markdown syntax allows anyone to write clear documents. The elements of syntax that follow should allow you to go a step further.

# Citations

You may create a citation by adding a greater-than symbol ( > ) in front of the text you would like to have appear as a quote. As long as your lines start with ( > ), your text will remain a citation.

    Abraham Lincoln wrote:

    > I desire to see the time when education, and by its means, morality, sobriety, enterprise and industry, shall become much more general than at present.

Abraham Lincoln wrote:

> I desire to see the time when education, and by its means, morality, sobriety, enterprise and industry, shall become much more general than at present.

If you wish the name of the author to appear in the citation block itself, write the citation as follows:

    > One need not be a chamber to be haunted.

    > **Emily Dickinson*

> One need not be a chamber to be haunted.

> *Emily Dickinson*

# Unformatted Blocks

## Within a Line

To highlight a few words within a larger section of text, use quotation marks.
The font of the highlighted words or word will change, but the text's overall formatting will remain unchanged. In the example that follows, the star signs ( * ) are added to create even more emphasis.

    This text is `important` and here, it becomes even `**more**` important.

This text is 'important' and here, it becomes even '**more**' important

## Over Many Lines

The grayed out blockquotes we've used in this guide were created as follows: start the lines of text that need to be part of the box with four empty character spaces, or one use of the TAB-key on your keyboard.

    As an example, here's some text:

        An example of text.

As an example, here's some text:

    An example of text.

You may also insert three grave accents ( ` ) to indicate the beginning and the end of a block of grayed out text:

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

# Lists

## Unnumbered Lists

You may create unnumbered lists by adding a star sign ( * ) or an underscore sign ( _ ) in front of each portion of text.

    * This is some text.
    * Here, some text.
    * I just wrote some words.

    - This is some text
    - Here, some text.
    - I just wrote some words.

- This is some text
- Here, some text.
- I just wrote some words.

## Numbered Lists

You may create a numbered list simply and logically by beginning each list item by a number.

    1. This is some text
    2. Here, some text.
    3. I just wrote some words.

1. This is some text
2. Here, some text.
3. I just wrote some words.

## Indented Lists

You may create tabbed lists by adding one TAB-key space, or four empty character spaces, in front of the text that needs to be indented.

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

# Tables

Creating tables with the original version of the Markdown syntax is not possible. We can create them by using a variant of Markdown called "GFM", which stands for "Git-Hub Flavored Markdown".

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

Columns are drawn by using vertical bars or pipe signs ( | ).
Table headers are separated from rows by using hyphen-minus signs ( - ).
Colon signs ( : ) are used to align the columns as follows:

* Place a colon on the right, and the text becomes right-aligned.
* Place colons on both sides of a vertical bar or pipe, and the text is centered.
* If not colons are used, the text becomes left-aligned.

You should note that, although vertical bars or pipes are needed to create columns, they do not need to be aligned for the table appear properly in its final print-ready form. That said, aligning them makes reading the Markdown tables easier.
Finally, note that the tables will appear in the center of your document's page.

# Images

You may insert images in your document by directing Natao to the image's URL location on your computer:

    ![Image of Yaktocat](./src/images/myLessons.png)

![Logo de Natao](./natao.png)

Please, be aware that images are not saved within Natao or any of its databases. If you use your database on more than one computer, you will have to copy your image(s) along side the Natao.db file and modify the images' URL within your document.

# Links

## Inline

You can create an inline link by wrapping link-text in brackets ( [ ] ), and then wrapping the link in parentheses ( ( ) ).

For example, to create a hyperlink to https://github.com/Ajrarn/Natao, with a link text that says, Natao is on Github!, you'd write the following Markdown code:

    [Natao is on Github!](https://github.com/Ajrarn/Natao)

[Natao is on Github!](https://github.com/Ajrarn/Natao)

## Reference

Reference-style links use a second set of square brackets, inside which you place a label of your choosing to identify the link:

    Natao should be on [Github][github.natao].

Natao should be on [Github][github.natao].

Then, anywhere in the document (usually at the end), you define your link-label by putting it in between brackets followed by a colon, and then followed by the destination between quotations marks:

    [github.natao]: https://github.com/Ajrarn/Natao  "Natao on Github"

You will note that the link-labels you place at the end of your document remain invisible in the document's final, ready-to-print version. The labels only pop up when you drag your mouse's cursor above the link within your document. 
Creating those link-labels allows you to stay organized and to use them more than once in your text.

[github.natao]: https://github.com/Ajrarn/Natao  "Natao sur Github"
