[toc]

# The Markdown Language

Working with Natao means using a simple, computer-based language called Markdown.

Created in 2004 by John Gruber, with significant help from Aaron Swartz, the Markdown language is designed to help its users format text documents with simple, common signs and characters, like the pound sign ( # ) or the greater-than sign ( > ). 
By inserting such signs within your document, you will tell Natao how to format and organize your document.

In the sections, we are going to go over the Markdown syntax, starting with the basics.

By the way, the text you are currently reading was itself written in Markdown within Natao.

# Basic Syntax

## Separating Words

It's easy to add blank spaces between words to separate them. Simply add one or more spaces between each word, as you write them, like so:

I am                               hungry!

**Results in:**

I am hungry.

Do note that no matter how many spaces you add between words, in your document's final version, it will look like you only added one blank space, as is the norm.
So if adding blank spaces between the words you write help you better read them, do so! In the final document, your words will be separated normally.

## Paragraphs

As long as you don't insert blank spaces between your sentences, Natao considers that they are all part of the same block of text or paragraph.

               This is the first sentence. This is the second sentence that follows as I didn't add any blank space between the two sentences. 

I've written another sentence, and added a blank space afterward.
As a result, the second sentence appears after a jump.

**Results in:**

This is the first sentence. This is the second sentence that follows as I didn't add any blank space between the two sentences. 

I've written another sentence, and added a blank space afterward.
As a result, the second sentence appears after a jump.

Keep in mind that as you write your text in Natao's Editor window, you may insert as many line-breaks as you see fit. As long as you don't insert blank spaces, Natao will keep your sentences within the same paragraph.

## Titles

You can keep your document visually organized by creating titles. You create titles by adding one or a few pound or hash signs ( # ) at the beginning of the text that you would like to have appear as a title. The number of pound or hash signs ( # ) you add determines how important the title is. Note that you may only add up to six (#) signs.

The following example shows you how the titles of this particular document have been designed.

::markdown::
# Basic Syntax
## Paragraphs
## Titles
### Within a Line
###### And the Maximum number of Pound Signs

We also recommend that you do not go beyond three title levels for readability.

## Highlight Text Elements

You may decide to bring your readers' attention to specific parts of your text. You may do so for single words or groups of words.

Place a single star sign ( * ) before and after the word(s) you'd like to highlight, and, by default, the text's letters will become slanted to the right, or italicized.

*This text will be italicized.*

Place two star signs ( * ) before and after the word(s) you'd like to highlight, and, by default, the text's letters will become darker, or bold.

**This text is in bold.**

You may also add a single underscore sign ( _ ) before and after some word or words to combine the italics and the bold letters.

    **Everyone _must_ arrive on time today.**

**Results in:**

**Everyone _must_ arrive on time today.**

You may also choose to strike-through a word or words by adding two tilde signs ( ~ ) before and after the word or words you would like to cross out.

    ~~A mistake.~~

**Results in:**

~~A mistake.~~

As mentioned above, adding a single star sign ( * ) or a couple of them before and after words will respectively italicize or bolden your word or words. This default behavior may be changed by editing Natao's style-sheets (see the guide), so that adding star signs may instead by used to underline a word or a group of words with, for example, a red line.

## Special Characters

What if we wanted to have a star sign ( * ) or a hash tag ( # ) actually appear in our text, without having them influence the appearance of certain words or portions of our text?

By placing a backlash sign ( \ ) before a special character, on may use any character without it interfering with the appearance of the text.

Write \# within your text to have the hash sign ( \# ) appear as it is.

## Conclusion

The basic Markdown syntax allows anyone to write standard documents. The simple elements of syntax that follow should allow you to go a step further. And it's still quite easy.

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

To display a word or words without any formatting, place a grave accent sign ( ` ) before and after the word or words.
In the example that follows, the star signs ( * ) placed within the grave accent signs ( ` ) appear as what they are, star signs.

    This text is `important` and here, it becomes even `**more**` important.

**Results in:**

This text is 'important' and here, it becomes even '**more**' important

## Over Many Lines

The grayed out blockquotes seen throughout this guide were created as follows: insert before the lines of text that need to be part of the box four empty character spaces, or one use of the TAB-key on your keyboard.

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
- The hash and star signs don't impact the formatting.
- Each sentence appears as is and not as paragraphs.
- Each blank space remains as is.

# Highlighting Code

Unformatted blockquotes are often used to display programming code.

Because Natao is not intended for computer programmers, its capacities as a programming Markdown tool are deactivated by default. You may reactivate these dormant capacities by starting your section of computer code with three grave accent signs ( ` ), followed by two colons ( : ) placed right before your first sentence, as follows:

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

You may create an unnumbered list by adding a star sign ( * ) or a hyphen-minus sign ( - ) in front of each list item.

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

We suggest you use a minus sign instead of a star sign for such lists to avoid any confusion with highlighting.

## Numbered Lists

You may create a numbered list simply and logically by beginning each list item by a number.

    ::markdown
    1. Item One
    2. Item Two
    3. Item Three

**Results in:**

1. Item One
2. Item Two
3. Item Three

## Indented Lists

You may indent a list by adding four blank spaces or a TAB before the item making up the indented list.

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

You may create a basic table by sketching one with vertical bars or pipe signs ( | ), hyphen-minus signs ( - ), and colon signs ( : ), like so:

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

The two columns were created by using the vertical bars ( | ). The table header was separated from the rows by using hyphen-minus signs ( - ). And the colon signs ( : ) were used to highlight the table's title.

Let's create another table, this time one that's a bit more complex. In the Editor window, let's insert the following section:

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

Here again, note that although the table appears correctly in the Viewer window, in the Editor, the text looks nothing like a table.

- Note that no matter how many minus signs you include within the pipe signs, the table headline still appears correctly.
- Note that the number of blank spaces you include has no impact on the table's appearance.
- What matters is that the content of each columns must have a pipe sign before and after it.

That said, aligning them makes reading the Markdown tables easier, so let's try to do that with our example table:

	::gfm
  |A pretty headline|
	|--------------|
	|b             |
	|it's strange  |
	|d             |

**Results in the same table as above, although its Editor window version is easier to read:**

|A pretty headline|
|-----------------|
|b                |
|it's strange     |
|d                |

Finally, note that tables appear in the center of the pages you create.

## Aligning Table Content

By default, table content is aligned to the left. Still, that default position can be altered by using colon signs ( : ), as follows.

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

- Placing one colon sign before and after the minus signs ( - ), the content is centered.
- Placing two colon signs after the minus signs ( - ), the content is aligned to the right.

## A Complex Table

In the following table, we have changed how content is aligned and how text is highlighted.

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

You may insert images in your document, as we've done with the Natao logo here:

    ::gfm
    ![Logo de Natao](./natao.png)

**Results in:**

![Logo de Natao](./natao.png)

Please, be aware that images are not saved within Natao or any of its databases. If you use your database on more than one computer, you will have to copy your image(s) along side the Natao.db file and modify the images' URL within your document.

## Using Natao to insert an image

- Create a folder called "Natao_images" within your database folder (if it doesn't exist already).
- Copy the image you would like to insert in your document to that folder.
- Place your computer's cursor over the spot inside the Editor window where you'd like to have the image appear.
- Click on the "Insert Image" button.
- Select the image you've copied to your folder and let Natao create the Markdown code you are going to copy at your cursor's location.

## Breaking Down the Markdown Syntax

Here's an example of the sort of code that Natao is going to generate for you:

	::gfm
	![newImage](file:/Mon%20chemin%20de%20fichier/mon%20image.png)

This code is composed of three sections:

- The exclamation point sign ( ! ) announces the beginning of the code.
- The text surrounded by bracket signs ( [ ] ) is the text that appears in lieu of the image.
- The URL that starts with ( file:// ) shows the images' location on your computer. The word "file" indicates that the image is located on your machine. In the case of an image located on-line, the URL code would start with ( http:// ) or ( https:// ). For images already present within Natao, there is no need for anything.
- Note the %20: just like for internet URLs, the Markdown language doesn't like blank spaces and replaces them with %20.

# Links

## Online

You may create a hyperlink by, first, placing the link-text within brackets ( [ ] ), and, second, by wrapping the thus-created link between parentheses ( ( ) ).

	::gfm
    [Natao is on Github!](https://github.com/Ajrarn/Natao)

**Results in:**

[Natao is on Github!](https://github.com/Ajrarn/Natao)

## Reference Links

Reference-style links use a second set of square brackets, inside which you place a label of your choosing to identify the link:

	::gfm
    Natao should be on [Github][github.natao].

**Results in:**

Natao should be on [Github][github.natao].

In the example above, [github.natao] is called the link-label. To transform it into a reference link, you need to define it destination. 

To do so, anywhere in the document (usually at the end), copy your link-label, insert a colon after it and place its URL destination right after. Then, between quotations marks, give your link-label the title that will pop up each time your drag your cursor over your link label.

    ::gfm
    [github.natao]: https://github.com/Ajrarn/Natao  "Natao is on Github"

Note that, wherever you place them, link-labels remain invisible in the document's final, ready-to-print version. Their pop-up labels only appear when you drag your cursor above the link within your document.

Creating link-labels allows you to stay organized and use them more than once in your text. To do so, simply use the same link-label: for this [word][github.natao], we used the link-label used in the example above.

[github.natao]: https://github.com/Ajrarn/Natao  "Natao is on Github"


