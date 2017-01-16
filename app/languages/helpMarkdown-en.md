[toc]

# The Markdown Computer Language

Working with Natao means using a simple, computer-based language called Markdown.

The Markdown computer syntax is designed to help its users format documents with common signs and characters, like the pound sign ( # ) or the greater-than sign ( > ). By inserting such signs within your Natao-produced document, you will similarly be able to format your document.

In the following sections, we are going to go over the Markdown syntax, starting with the basics.

By the way, the text you are currently reading was itself written in Markdown with Natao.

# Basic Syntax

## Separating Words

It's easy to add blank spaces between words to separate them. Simply add one or more spaces between each one of the words you write, as the following example illustrates:

I am                               hungry!

**Results in:**

I am hungry.

Note that no matter how many spaces you add between words, in your document's final, ready-to-print output, it will look like you only added one blank space, as is the norm in text formatting standards.
So, if adding blank spaces between words help you better read them, do so. In the final document, your words will be separated normally.

## Paragraphs

Create paragraphs by adding blank spaces between your lines. Otherwise Natao considers that your sentences are all part of the same paragraph or block of text.

	This is the first sentence. This is the second sentence. They are part of the same paragraph because I didn't add any blank space between them.

	I've written another sentence, but I then added a blank space after it.
	As a result, the second sentence appears separated from the first sentence.

**Results in:**

This is the first sentence. This is the second sentence. They appear as being part of the same paragraph because I didn't add any blank space between them.

I've written another sentence, but I then added a blank space after it.
As a result, the second sentence appears separated from the first sentence.

Keep in mind that as you write your text in Natao's Editor panel, you may insert as many line-breaks as you see fit. As long as you don't insert blank spaces, Natao will keep your sentences within the same paragraph.

## Titles

You can keep your document visually organized by creating titles. You create titles by adding one or a few pound or hash-tag signs ( # ) at the beginning of the text that you'd like to have appear as a title. The number of pound or hash-tag signs ( # ) you add determines how important the title is. Note that you may only add up to six ( # ) of these signs.

The following example shows you how the titles of this particular document have been designed.

::markdown::
# Basic Syntax
## Paragraphs
## Titles
### Within a Line
###### And the Maximum number of Pound Signs

To help readability, we recommend that you do not go beyond three title levels.

## Emphasizing Text Elements

You may decide to bring your readers' attention to specific parts of your text. You may do so for single words or for groups of words.

Place a single star sign ( * ) before and after the word(s) you'd like to highlight, and, by default, the text's letters will become slanted to the right, or italicized.

*This text will be italicized.*

Place two star signs ( * ) before and after the word(s) you'd like to emphasize, and, by default, the text's letters will become slighty thicker and darker, or bold.

**This text is in bold.**

You may also add a single underscore sign ( _ ) before and after some word or words to combine the italics and the bold letters.

    **Everyone _must_ arrive on time today.**

**Results in:**

**Everyone _must_ arrive on time today.**

You may also choose to strike-through a word or words by adding two tilde signs ( ~ ) before and after the word or words you'd like to cross out.

    ~~A mistake.~~

**Results in:**

~~A mistake.~~

As mentioned above, adding a single star sign ( * ) or a couple of them before and after words will respectively italicize or embolden your word or words. This default behavior may be changed by editing Natao's style-sheets. You could then decide that adding star signs in fact means underlining a word or a group of words with, for example, a red line.

## Special Characters

What if we wanted to have a star sign ( * ) or a hash tag ( # ) actually appear in our text, without having them influence the appearance of certain words or portions of text?

By placing a backlash sign ( \ ) before a special character, one may use any character without it interfering with the appearance of the text. For example, write \# within your text to have the hash sign ( \# ) appear as it is.

## Conclusion

The basic Markdown syntax allows anyone to write standard documents. But there's more. The simple elements of syntax that follow should allow you to go a step further. And it's still quite easy.

# Citations

You may create a citation by adding a greater-than symbol ( > ) in front of the text that you'd like to have appear as a quote. As long as your sentences start with ( > ), your text will remain part of the same citation.

    Emily Dickinson wrote:

    > One need not be a chamber to be haunted.

**Results in:**

Emily Dickinson wrote:

> One need not be a chamber to be haunted.

If you wish to have the name of the author appear in the citation block itself, add a greater-than symbol ( > ) before the authors' name, with a couple of star signs ( * ) for added emphasis, as follows:

    > One need not be a chamber to be haunted.

    > *Emily Dickinson*

**Results in:**

> One need not be a chamber to be haunted.

> *Emily Dickinson*

# Unformatted Blocks

## Within a Line

To display a word or words without any formatting, place a grave accent sign ( ` ) before and after the word or words. In the example that follows, the star signs ( * ) placed within the grave accent signs ( ` ) appear as what they are, as star signs.

    This text is `important` and here, it becomes even `**more**` important.

**Results in:**

This text is 'important' and here, it becomes even '**more**' important

## Over Many Lines

The grayed out block-quotes seen throughout this guide were created as follows: by inserting, before the lines of text that need to be part of the box, four empty character spaces, or one use of your keyboard's TAB-key.

    As an example, here's some text:

        An example of text.

**Results in:**

As an example, here's some text:

    An example of text.

You may also insert three grave accents ( ` ) to indicate the beginning and the end of a block of grayed out text:

  ::gfm
    Here's my formula:

    ```
    x = 0
    x = 2 + 2
    ```

**Results in:**

Here's my formula:

```
x = 0
x = 2 + 2
```

Because the content of the text is not formatted, three details become noticeable:

- The hash-tag and star signs don't impact the formatting.
- Each sentence appears as is, not as a paragraph.
- Each blank space remains as is.

# Highlighting Code

Unformatted block-quotes are often used to display programming code.

Because Natao is not intended for use by computer programmers, its capacities as a computer code editor are deactivated by default. You may reactivate these dormant capacities by starting your section of computer code with three grave accent signs ( ` ), followed by two colons signs ( : ) placed right before your first sentence, as follows:

    ```
	::typescript
    class MyClass extends MyfirstClass {
    	
        constructor(private message: string){}
        
        public sayHello() {
        	console.log ('hello ' + message);
        }
    }
    ```

**Results in:**

```
::typescript
class MyClass extends MyfirstClass {

	constructor(private message: string){}

	public sayHello() {
		console.log ('hello ' + message);
	}
}
```

# Lists

## Unnumbered Lists

You may create an unnumbered list by adding a star sign ( * ) or a hyphen-minus sign ( - ) in front of each list item, as the following example illustrates:

    ::markdown
    * This is some text.
    * Here, some text!
    * I just wrote some words.

**and**

    ::markdown
    - This is some text
    - Here, some text.
    - I just wrote some words.

**Result in:**

- This is some text
- Here, some text!
- I just wrote some words.

We suggest you use a minus sign ( - ) instead of a star sign ( * ) for such lists, to avoid any confusion with emphasizing.

## Numbered Lists

You may create a numbered list simply and logically by beginning each list item by a number, as follows:

    ::markdown
    1. Item One
    2. Item Two
    3. Item Three

**Results in:**

1. Item One
2. Item Two
3. Item Three

## Indented Lists

You may indent a list by adding four blank spaces, or a TAB, before the item making up the indented list, as follows:

    ::markdown
    1. Write some text here:
        1. And add a detail about that text here.
        2. And another detail here.
    2. Write additional text here:
        * Add details to your text.
        * Keep writing.
        * And some last words.
    3. Start a new indented sentence.

**Results in:**

1. Write some text here:
    1. And add a detail about that text here.
    2. And another detail here.
2. Write additional text here:
  * Add details to your text.
  * Keep writing.
  * And some last words.
3. Start a new indented sentence.

# Tables

## A Basic Table

You may create a basic table by sketching one, right in your document in Natao's Editor panel, with pipe signs ( | ), hyphen-minus signs ( - ), and colon signs ( : ), like so:

	::gfm
    |A|B|
	|-|-|
	|z|w|
    |y|v|
    |x|u|

**Results in:**

|A|B|
|-|-|
|z|w|
|y|v|
|x|u|

This simple table's two columns were created by using the vertical bars ( | ). Its header was separated from the rows by using minus signs ( - ). The colon signs ( : ) were used to highlight the table's title.

Let's create another table, this time one that's a bit more complex.

In the Editor panel, let's write or paste-in the following section:

	::gfm
    |A pretty headline|
	    |----|
	    |b                       |
    |it's strange|
    |d|

**Results in:**
  
|A pretty headline|
|----|
|b                       |
|it's strange|
|d|

Here again, note that, although the table appears correctly in the Viewer panel, in the Editor, the text looks nothing like a table. In other words:

- No matter how many minus signs you include within the pipe signs, the table headline still appears correctly.
- No matter how many blank spaces you include, the table's appearance in the Viewer panel remains unchanged.
- All that matters is that the content of each columns must have a pipe sign before and after it.

That said, aligning the signs that make up your table in your Editor-panel makes reading the Markdown tables easier. So let's try to do that with our example table:

	::gfm
  |A pretty headline|
	|--------------|
	|b             |
	|it's strange  |
	|d             |

**Results in**

|A pretty headline|
|-----------------|
|b                |
|it's strange     |
|d                |

It is the same table as seen in the previous example, although, this time, its Editor panel version is easier to read.

Finally, note that tables appear in the center of the pages you create.

## Aligning Table Content

By default, table content is aligned to the left. However, that default position can be altered by using colon signs ( : ), as follows.

	::gfm
	|Pretty headline|Pretty headline bis  |
	|:------------:|-------------------:|
	|b             |b                   |
	|it's strange  |not so strange      |
	|d             |d                   |

**Results in:**

|Pretty headline|Pretty headline bis  |
|:------------:|-------------------:|
|b             |b                   |
|it's strange  |not so strange      |
|d             |d                   |

In other words:

- Placing one colon sign before and after the minus signs ( - ), the content is centered.
- Placing two colon signs after the minus signs ( - ), the content is aligned to the right.

## A Complex Table

In the following table, we have changed how content is aligned and how text is emphasized.

	::gfm
    | Tables         | Are              | Cool  |
    | -------------- |:----------------:| -----:|
    | **col 3 is**   | right aligned    | $1600 |
    | col 2 is       | *centered*       |   $12 |
    | zebra stripes  | ~~a mistake~~    |    $1 |

**Results in:**

| Tables         | Are              | Cool  |
| -------------- |:----------------:| -----:|
| **col 3 is**   | right aligned    | $1600 |
| col 2 is       | *centered*       |   $12 |
| zebra stripes  | ~~a mistake~~    |    $1 |

# Images

You may insert images in your document, as we've done with the Natao logo, like so:

    ::gfm
    ![Logo de Natao](./natao.png)

**Results in:**

![Logo de Natao](./natao.png)

## Using Natao to insert an image

- Create a folder called "Natao_images" within your database folder (if such folder doesn't already exist).
- Copy the image you would like to use to that folder.
- In the Editor panel, place your computer's cursor where you'd like to have the image appear.
- Click on Natao's "Insert Image" button.
- Select the image you've copied to your folder and let Natao create the Markdown code you are going to paste at your cursor's location.

## Breaking Down the Markdown Syntax

Here's an example of the sort of code Natao is going to generate for you:

	::gfm
	![newImage](file:/Mon%20chemin%20de%20fichier/mon%20image.png)

Let's deconstruct this code:

- The exclamation point sign ( ! ) announces the beginning of the code.
- The text surrounded by bracket signs ( [ ] ) is the text that appears in lieu of the image.
- The URL that starts with ( file:// ) shows the images' location on your computer. In this particular example, the word "file" indicates that the image is located on your machine. In the case of an image located online, the URL code would start with ( http:// ) or ( https:// ). For images already present within Natao, there is no need for anything.
- Note the %20: just like for internet URLs, the Markdown language doesn't like blank spaces and replaces them with %20.

# Links

## Online

You may create a hyperlink by: 

1. Placing the linked-text within brackets ( [ ] ). 
2. Wrapping the thus-created link between parentheses ( ( ) ).

	::gfm
    [Natao is on Github!](https://github.com/Ajrarn/Natao)

**Results in:**

[Natao is on Github!](https://github.com/Ajrarn/Natao)

## Reference Links

Reference-style links use a second set of square brackets, inside which you place a label of your own choosing to identify the link:

	::gfm
    Natao should be on [Github][github.natao].

**Results in:**

Natao should be on [Github][github.natao].

In the example above, [github.natao] is called the link-label. To transform it into a reference link, you need to define its destination. 

To do so, anywhere in the document (usually at the end), paste-in your link-label, insert a colon after it, and place its URL destination right after. Then, between quotation marks, give your link-label the title that will pop up each time your drag your cursor over your link-label.

    ::gfm
    [github.natao]: https://github.com/Ajrarn/Natao  "Natao is on Github"

Note that, wherever you place them, link-labels remain invisible in the document's final, ready-to-print version. Their pop-up labels only appear when you drag your cursor above the link within your document.

Creating link-labels allows you to stay organized and use them more than once in your text. To do so, simply use the same link-label: for this [word][github.natao], we used the link-label used in the example above.

[github.natao]: https://github.com/Ajrarn/Natao  "Natao is on Github"
