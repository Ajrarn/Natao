[toc]

# Introduction

The following document does not explain in detail how CSS works. It only describes how CSS works within Natao, with the express purpose of making it easy to change the appearance of documents produced within Natao.

Still, although this document's scope is limited, a few notions need to be explained even before we start discussing on CSS. You may find it difficult to wrap your mind around some of these. Therefore, don't hesitate to seek the help of a person already aware of CSS, and who might be able to help you customize your Natao style-sheets for you.

Let's start with HTML.

# Basic HTML

One needs to understand how Natao's documents are constructed, and, for that, one needs to know about HTML.

## XML

### Tags

The XML language sets rules that help programs such as Natao encode and format documents in an easily readable manner.

To write an XML document that works, one must define which elements of the document  appear within it, and how.

To do so, tags are used. These are case sensitive and are written between less-than and greater-than signs, like so: <paragraph> or <b>

Usually, all tags within a XML text appear in pairs: once as an opened tag and ones as a closed tag.

An opened tag appears as a word surrounded by a less-than and greater-than sign, like so:

        ::xml
        <paragraph>

A closed tag appears as a word surrounded by a less-than and a greater-than sign, with the addition of a slash sign positioned right after the less-than sign, like so:

        ::xml
        </paragraph>

These tag pairs constitute "boxes", quite simply because they contain some bits of text called "elements".
    
**Beware**: tags can only contain one word. If two are present, they must appear without space between them.

For instance, the following example is wrong:

        ::xml
        <contact info></contact info>
    
While the following example is correct:

        ::xml
        <contact-info></contact-info>

So, if I want to define a paragraph box with the paragraph tag, I need to write my XML code like so:

        ::xml
        <paragraph>This is my paragraph's first sentence.
And here is my second sentence.</paragraph>

Note: in the example above, the words "This is my paragraph's first sentence.
And here is my second sentence." are the elements.

I can also put boxes within boxes, as follows:

        ::xml
    <document>
        <title>My title</title>
        <paragraph>A short paragraph.</paragraph>
        <paragraph>And another.</paragraph>
    </document>
    
Incidentally, I have now created "a document" containing a title and two paragraphs.

By the way, a third type of tag exists in the XML language. It is called the "solo tag", as opposed to the "tag pair". These solo tags are opened and closed at the same time. No element can therefore be placed between them. For instance:

        ::xml
        <Items/>

### Attributes

Let's take a look at the following example:

        ::xml
        <alignment paragraph="centered">A short paragraph.</paragraph>
        <alignment paragraph="left">A less short paragraph.</paragraph>
        <invisible paragraph>And another paragraph.</paragraph>

To each *paragraph* tag we have added attributes, between quotes, before closing the tag by using a greater-than sign. Each of these attributes makes the tags they refer to more specific by adding more information.

In the example above, we used two attributes:

- The *alignment* attribute, which value is 'centered' in the first paragraph and 'left' in the second paragraph.
- The *invisible* attribute which has no particular value.

Each new attributes adds details to their tags, details that Natao exploits to format the text appropriately.

### Standards


In the previous examples, I gave my tags random names, like *paragraph* or *contact-info*, to help me explain how tags work in XML. Imagining tags left and and right would be easy, but would make XML useless as a way for everyone to use XML.

That is why models have been devised to help people work in an efficient and consistent way across the board, whether in the book publishing, by using the DocBook model, or in the web-publishing industry, by using HTML.

## HTML

HTML is therefore a set of tags used to create web pages.
As regards Natao, just know that the Markdown syntax used in Natao generates HTML code natively and that it is that HTML code that we are going to shape with CSS.

As a result, we are only going to learn a few HTML tags here, the ones you will need to modify Natao's style-sheets.

Let's get "our HTML feet wet" by re-writing one of our previous examples in HTML:

        ::html
        <html>
        <header>
                ...
        </header>
        <body>
                <h1>My title</h1>
                <p>A short paragraph.</p>
                <p>And another.</p>
      </body>
     </html>
     
This is basically how traditional web pages are written: 
There's a *header* section, which we won't get into here as it remains invisible in the final document. And there's a *body* section, which contains what's visible in the final document, with a level 1 title (the most important ones) written as *h1* and paragraphs noted as *p*.
     
# Structure of a Natao Document

Let's look at the core structure of a Natao document.

Note: it's going to be a lot to take in at first, mainly because we haven't talked about Markdown when transformed into HTML yet, but it's important to take note of it to help us understand how to edit the appearance of a Natao document.

        ::html
        <div id="viewer" layout="column">
        <div flex layout="column" layout-align="start stretch">
                <div id="haut" layout="row" layout-align="start stretch">
                <div id="identity" layout="column" layout-align="center stretch">
                        <p>Your last name</p>
                    <p>Your first name</p>
                    <p>Your grade</p>
                </div>
                <div id="title-zone" flex layout="column" layout-align="center stretch">
                    <h1>Titre</h1>
                    <p id="dateCreated">Creation date</p>
                </div>
            </div>
            <div id="separator"></div>
            <div id="content" flex layout="row" layout-align="start stretch">
                <div id="margin"></div>
                <div id="made">
                        Here will appear what you wrote in your document.
                </div>
            </div>
        </div>
    </div>

Let's take a look at the first tag:

        ::html
        <div id="viewer" layout="column">
    </div>

Note that I kept the *div* open and closed tags, which in this instance work together as a box with no particular signification.
What we need to pay attention to here are the attributes:

        ::string
        id="viewer" layout="column"
    
- *id* stands for identifier.
- *layout*, which is not a standard attribute, indicates how the layout elements appear in Natao:
        - *column* means that the elements appear as a column.
        - *row* means that the elements appear in a row.

In other words, *div* which is identified as *viewer* appears as a column. The boxes which appear within it appear as columns.

To simplify things further, we'll use the boxes' identification to designate them (because divs are used everywhere). We will therefore not speak of *div* boxes, but of the *viewer* box.

Inside the first box, we have a second one which is stretched out (*layout-align="start stretch"*) and which takes all the room it can (*flex*), like so:

        ::html
        <div flex layout="column" layout-align="start stretch"></div>
   
It too appears as a column. Moreover, we can that it contains three interesting boxes:

        ::html
        <div flex layout="column" layout-align="start stretch">
        <div id="high" layout="row" layout-align="start stretch"></div>
        <div id="notation"></div>
        <div id="content" flex layout="row" layout-align="start stretch"></div>
        </div>
    
- A *header* box.
- A *separator* box.
- A *content* box.

## The *header* box

```
::html
<div id="header" layout="row" layout-align="start stretch">
    <div id="identity" layout="column" layout-align="center stretch">
        <p>Your last name</p>
        <p>Your first name</p>
        <p>Your grade</p>
    </div>
    <div id="title-zone" flex layout="column" layout-align="center stretch">
        <h1>Titre</h1>
        <p id="dateCreated">Creation Date</p>
    </div>
</div>
```
    
The *header* box is composed of two boxes:

- *identity*
- *title-zone*

These two boxes are written on the same line and are going to stretch over that line, starting from the left:

        ::html
        <div id="header" layout="row" layout-align="start stretch">
    
Within the *identity* box, your last name, your first name, and your grade will appear in a column.

Within the *title-zone* box, the document's title and its creation date will appear  in a column.

## The *separator* box

The *separator* box is empty. It will create a blank space between your document's title and your written text.

## The *content* box

    ::html
        <div id="content" flex layout="row" layout-align="start stretch">
        <div id="margin"></div>
        <div id="made">
                Here will appear what you wrote in your document.
        </div>
        </div>

The *content* box is composed of two boxes which will appear on the same line:

- *margin* stands for the margin to the left of your document, where your teacher will leave her or his marks.
- *made* stands for your Markdown document's render zone.
    
# A CSS Rule

This is the section where we start talking about modifying your document to fit it to your own personal needs. 

CSS is used to write the formatting rules which will be applied to your document's HTML code. What follows is an example of one such rule:

        ::css
    #identity {
        display: none;
        }
    
Let's start with *#identity*:

This section of the CSS rule, positioned before the bracket signs ( { } ), is called a selector. Selectors indicate which box CSS rules are applied to. In the example above, the rule is applied to the *identity* identifier. 

We then notice a particular property that's applied to this box:

- *display: none;*, which keeps the box from appearing and therefore taking up any extra room in the document.

How does this related to your homework or class assignment? In such case, you are not going to need the box to appear with your last and first names. 

Let's now take a look at the bits that are going to help you pick the best box for your document, the boxes which you will transform to fit your formatting needs. 

# The Useful Selectors

## The Box Selectors

To select all identical boxes, I merely need to use as selector the name of the tag:
        ::css
    div {
        display: none;
        }

This bad example is going to hide all the *div* boxes, that is, all your document.

## The Identifier Selector

To select any box, whatever might his identifier be, I'm going to use a hash-tag sign ( # ) in front of the identifier, as seen in our original example. 

## The Class Selector

What follows is a box that has a class property:

        ::html
    <pre class="java">
        <code>some code </code>
    </pre>

It may be selected thanks to the class selector with a period sign ( . ) in front of it, as follows:

        ::css
    .java {
        display: none;
        }

And here again, we make something interesting disappear. 


## Using Many Selectors at Once

You may apply a rule to many selectors at the same time, by separating them with a comma, as follows: 

        ::css
    h1, #header {
        display: none;
    }

Here, the rule is applied to all *h1* elements and to the *header* box.

## Selecting Box Descendants

You can select the box descendants by adding a space between the parent and the descendant:

        ::css
    #title-zone h1 {
        color: red
    }

The example above modifies the color of the level 1 title in the box #title-zone, without affecting any of the other box titles. 

# Affecting Natao's Large Boxes

We must first decide which of the document's boxes will appear in our style-sheet, as well as their sizes. Once that is done, we can choose how best to change their appearance. 

## Making Boxes Disappear

Once again, here's the first CSS example we used:

        ::css
    #identity {
        display: none;
        }    

*display* allows us to modify the so-called child selectors. The way Natao modifies such selectors is unique to Natao. As a result, the only value one needs to know is *none*, which makes the elements invisible.

To be applied to the following elements, which are only useful for homework related documents:

- *identity*
- *separator*
- *margin*

## Modifying Box Sizes

### Height and Width
        
    ::css
        #identity {
        width: 200px;
        }
    
    #separator {
        height: 200px;
    }

In the preceding example, I fixed the *width* of the *identity* box to 200 pixels, and the *height* of the *separator* box to 200 pixels as well.

*identity* is located in a box which elements are in a line. The separator will use the indicated width and the other elements of the box will use the left-over room.

In the case of the *separator*, it is located in a column box. By fixing its size, the box that follows will use the height space that's left over.

### Units

In the preceding example, I used the pixels (px) units. There are many others, among which are:

- *px* for pixels, which represent screen points.
- *pt* for points, which are used for printing documents.
- *%* used to delineate a usable portion of the screen. 50% means that we are using half of the screen's space.
- *em*, which might be the most interesting unit. 1em represents the font size for the entirety of the document. You'll therefore be able to define a few elements which will be proportional to this font size.

## Modifying Colors

### By Changing Their Properties

        ::css
    #identity {
        background-color: red;
        color: #af2356;
    }
    
Here are two new properties to be use to modify colors: 

- *color* lets you modify the text's color.
- *background-color* , as its name suggests, lets you modify the background color.

Note: the list of available colors is too large to be included here, but if you can still get it by using the following [link](http://www.colors.commutercreative.com/grid/).

In the example above you'll noticed that the *color* property contains a hash sign ( # ) followed by six hexadecimal characters. These six characters are in fact made up of three pairs of characters: the first pair is for red, the second is for green, and the third is for blue, which is the RGB color space. This lets you pick the colors you need very precisely.

### By Using the Color Picker

A color picker has been integrated to Natao. It will come into play as soon as Natao recognizes a valid color code, that is series of six characters following a hash sign, as follows:

        ::css
    color: #111111;
    
As soon as you've typed the color code, in this case (#111111;), click on it to see it pop up.

![Color choice](./src/images/thistle.png)

Three componants are noticeable:

- A preview bar, at the bottom.
- A brightness bar, on the right.
- A hue circle.

You can choose to play with the hue circle's diameter by bringing it closer to its center (the colors fade), or by bringing it away from the center (the colors intensity). 
You can choose a color by moving your cursor within the circle.
You can pick your color's brightness by sliding the brightness bar shuttle.

## Modifying Borders

### Two Syntax

You may add borders to your boxes like so: 

        ::css
    #identity {
        border-width: thin;
        border-style: solid;
        border-color: red;
    }
    
    #separator {
        border: thin solid red;
    }

In the previous example, we've applied to same border to the two boxes, *identity* and *separator*. 

The *identity* box has three properties:

- *border-width* which describes the thickness of the border, which, in our example, is thin).
- *border-style* which describes the border's style, which in our example is a solid line. 
- *border-color* which describes the border's color, which in our example is red.

The *separator* box uses three abbreviated syntax: the key word *border* is followed by three values referring to the border's width, style and color.

### Width

This property has three standard values:

- *thin* for a thin border.
- *medium* for a medium border.
- *thick* for a thick border.

You may also add other values to it, in pixels (px), or points (pt), etc.

### Style

Four values need to be known:

- *dotted* to get a dotted line border.
- *dashed* to get a border made of dashes.
- *solid* to get a plain line border.
- *double* to get a border made of two lines, which only become visible with medium borders.

### Partial Borders

You may chose to give your box a partial border, of either one or two or three sides. Each side has an associated word:


- *top* which refers to the top border.
- *bottom* which refers to the bottom border.
- *left* which refers to the left border.
- *right* which refers to the right border.

Simply add one of the above key words after border to affect it:

        ::css
    #separator {
        border-top: thin solid blue;
        border-bottom: thin solid blue;
    }
    
    #margin {
        border-right-width: thin;
        border-right-style: solid;
        border-right-color: red;
    }

## Modifying Margins

Each box has two types of margins: 

- An external margin (that is, the *margin* property, not the similarly named box) om): it helps us define how close our margin will come to our box.
- An internal margin, (key-word *padding*): it helps us define how close our margin will come to our internal box.

Just as is the case for borders, key-words can be followed by *top*, *bottom*, *left* et *right*, as follows

````
::css
#made {
        margin: 10px;
    padding: 20px;
}

#made h1 {
        margin-top: 30px;
}
```

In the above example, we can see that our *made* box will be at least 10 pixels away from our *made* box, and that the box they contain will be 20 pixels away from the borders.

We can also notice that the level 1 titles (*h1*) will be 30 pixels way from the previous box.

# Applying Changes to the Text Globally

## Modifying the Text's Reference Size

Let's use this opportunity to go over the size unites again: 

- *px* for pixels, which represent screen points.
- *pt* for points, which are used for printing documents.
- *em*, which might be the most interesting unit. 1em represents the font size for the entirety of the document.

You can choose a font size for the entirety of your document, like so: 

        ::css
    #made {
        font-size: 16px;
    }
    
This example gives us a default 16px font size. From here, you may adjust the font size of titles for example:


        ::css
    #made h1 {
        font-size: 2em;
    }
    
    #made h2 {
        font-size: 1.5em;
    }
    
Thus, my level 1 title (which corresponds to only one hash sign ( # )) will be twice teh size of the base font size. The level 2 title (which corresponds to two has signs ( ## )) will be 1.5 times the font size.

If I change the default font size to 20px, the size of the document's title will change proportionally.

## Modifying the Font

You can modify the font that's used in your document thanks to the *font-family* property, as follows: 

        ::css
    #made {
        font-family: RobotoDraft, Roboto, 'Helvetica Neue', sans-serif;
    }
    
This line of code asks Natao to use the *RobotoDraft* font. If that font is not found, Natao is asked to use the *Roboto* font. If not that can't happen, the *Helvetica Neue* font should be used. And in case it can't be found, the first *sans-serif* font it finds should be used.
In other words, you should consider giving Natao the option to pick from two or three fonts before asking it to use a family of fonts. 

Note that the font you will have access to to write your Natao document will dependent on the fonts present on your computer. 

Here are a few of these *font-family*:

| Family     | Definition                                          |
|------------|-----------------------------------------------------|
| Serif      | Georgia, serif                                      |
| Serif      | "Palatino Linotype", "Book Antiqua", Palatino, serif|
| Serif      | "Times New Roman", Times, serif                     |
| Sans-Serif | Arial, Helvetica, sans-serif                        |
| Sans-Serif | "Arial Black", Gadget, sans-serif                   |
| Sans-Serif | "Comic Sans MS", cursive, sans-serif                |
| Sans-Serif | Impact, Charcoal, sans-serif                        |
| Sans-Serif | "Lucida Sans Unicode", "Lucida Grande", sans-serif  |
| Sans-Serif | Tahoma, Geneva, sans-serif                          |
| Sans-Serif | "Trebuchet MS", Helvetica, sans-serif               |
| Sans-Serif | Verdana, Geneva, sans-serif                         |   
| Monospace  | "Courier New", Courier, monospace                   |   
| Monospace  | "Lucida Console", Monaco, monospace                 | 

## Underlining a Text

Let's underline a bit of text:

        ::css
    #made {
        text-decoration: underline;
    }
    
## Text thickness

The *font-weight* property lets you change the text's thickness:

- *lighter* for a text that's thinner than usual.
- *normal* for a normal text.
- *bold* for a bold text.
- *bolder* for an extra-bold text.

Let's put the entirety of our document's text in bold, like so: 

        ::css
    #made {
        font-weight: bold;
    }

## Text Style

The *font-style* property let's us decide if a portion of text is:

- *normal*: with straight characters.
- *italic*: with slanted characters.

Let's put the entirety of our document's text in italic, like so:

        ::css
        #made {
        font-style: italic;
    }
    
## Text Alignment

The *text-align* property let's us pick how our text is aligned. It is used as follows: 

- *left*, to move the text to the left.
- *right*, to move the text to the right.
- *center*, to center the text.
- *justify*, for the text to spread evenly.

Let's write an example which we could use to write a poem's verses:


```
::css
#made p {
        text-align: center;
}
```

## Indenting a First Line

The *text-indent* property lets us indent a box's first line, like so:

        ::css
    #made p {
        text-indent: 1.5em;
    }

# Affecting Individual Text Boxes

What follows is an example of a Markdown document with paragraphs, titles, and some highlighted text: 

        ::markdown
    # Title 1
    ## Title 1.1
    ### Title 1.1.1
    ...
    ###### Title 1.1.1.1.1.1

The code written above describes that a first paragraph is followed by a first line which is itself followed by a second line. 
The following *paragraph* with **highlighted** and even ~~struck-through~~ words. 
    
Written in HTML, this Markdown text gives the following code:

        ::html
    <h1>Title 1</h1>
    <h2>Title 1.1</h2>
    <h3>Title 1.1.1</h3>
    ...
    <h6>Title 1.1.1.1.1.1</h6>
    
    <p>The code written above describes that a first paragraph is followed by a first line which is itself followed by a second line.</p>
    <p>The following <em>paragraph</em> with <strong>highlighted</strong> and even <del>struck-through</del> words.</p>
    
You can notice here that the number of hash signs ( # ) used in a title corresponds to the number that follows the <h> of the title box. In other words, one hash sign becomes *h1* and so on. 

The paragraphs are in the *p* boxes. 
The word *paragraph* which was surrounded by one star sign ( * ) is in the *em* box.
The word *highlighted* which was surrounded by two star signs ( ** ) is in the *strong* box.
The word *struck-through* which was surrounded by two tilde signs ( ~ ) is in the *del box.

All of the boxes referred to above are normal boxes. As a result, everything we've seen so far on how to modify boxes can be used on them: 

- Changing the background and text colors.
- Changing the font.
- Changing the font size.
- Underlining.
- Changing the thickness of the text.
- Changing the style of the text.

These boxes have a default appearance. A *em* box is in italic by default. A *strong* box is in bold by default. A *del* box is struck-through by default. And the titles also have default sizes. I suggest that you only modify the bits that you need to modify.

If you also need the bold text to be made red or underlined, do it as follows: 

        ::css
    strong {
        color: red;
        text-decoration: underline;
    }

# Automatic Numerotation

Here's the code I used for the lesson style:

```
::css
#made {counter-reset: chapter section sub-section;}

#made  h1 {
    font-family: "Courier New", Courier, monospace;
    margin-bottom: 20px;
    margin-top: 50px;
    font-size: 1.5em;
    counter-reset: section;
}

#made  h1:before {
        counter-increment: chapter;
    content: counter(chapter,upper-roman) " - ";  
}

#made h2 {
    font-size: 1.2em;
    counter-reset: sub-section;
}

#made h2:before {
    counter-increment: section;
    content: counter(chapter) "." counter(section) "  ";
}
#made  h3:before {
    counter-increment: sub-section;
    content: counter(chapter) "." counter(section) "." counter(sub-section) "  ";
}
```

I'd like to use this opportunity to show you two new selectors: 
- *h1:before*
- *h1:after*

I've added *:before* to the *h1* box selector as a pseudo-class. There are others like it, but this one is going to allow us to add content to whatever box we chose.  We could have done the same with the *after* pseudo-class. 

Let's talk about counters. To generate numbers automatically, I use counters. I start by initializing their value by setting them to 1:

        ::css
        #made {counter-reset: chapter section sub-section;}

*counter-reset* sets all the specified counters to 0. Here the counters which we've called *chapter*, *section*, and *sub-section* all get a value of 0.

These counters are all linked to a title-level type of box:

- *chapter* for *h1*.
- *section* for *h2*.
- *sub-section* for *h3*.

For each new *h1* level (chapter), I set the *h2* level (*section*) counter to 0.
For each new *h2* level (section), I set the *h3* level (*sub-section*) counter to 0.

In CSS we then get:

````
::css
#made  h1 {
    counter-reset: section;
}

#made h2 {
    counter-reset: sub-section;
}
```

Let's now take a look at the *before* of the h1 and h2 boxes:

```
::css
#made  h1:before {
    counter-increment: chapter;
    content: counter(chapter,upper-roman) " - ";
}

#made h2:before {
    counter-increment: section;
    content: counter(chapter) "." counter(section) "  ";
}

```

Let's first look at the use of the *counter-increment* property, which is linked to the *chapter* counter for *h1:before* and to the *section* counter for *h2:before*. This order adds 1 to the selected counter.

Then comes the *content* property. It lets us modify the content of a box. Here, we're positioned *before* the *h1* box or *before* the *h2* box.

Starting with the *h2* box, we can see that the *content* property contains *counter(chapter) "." counter(section) "  "*, which broken down means:

- The value of the *chapter* counter (*counter(chapitre)*),
- followed by a period,
- followed by the value of the *section* counter (*counter(section)*),
- followed by a blank space,
- and finally followed by our *h2* box, and therefore our title, because everything we've looked at before is situated before *h2*.

If we look at the *h1* box, you may notice that the *content* property contains *counter(chapter,upper-roman) " - "*, which means:

- The value of the *chapter* counter, in upper case roman numerals (*counter(chapter,upper-roman)*),
- followed by a blank-space, and a blank-space,
- and finally, our *h1* box.

For *h2*, I use *counter(section)*, and for *h1* and use *counter(chapter,upper-roman)*. In the second case, I specify that roman numerals need to be used, and in the first, I don't put in the counter. This is because it is written in *decimal* by default. I could have written *counter(section,decimal)*, but it would have been the same thing.

Here are the various possible values, and when I know what they correspond to:

- *decimal* to write Arabic numerals (which we usually use),
- *decimal-leading-zero* to write Arabic numbers with a 0 in the decimals,
- *lower-roman* in roman numerals, lower case,
- *upper-roman* in roman numerals, upper case,
- *lower-greek* in Greek numerals,
- *lower-latin*, 
- *upper-latin*,
- *armenian*,
- *georgian*, 
- *lower-alpha* in lower case letters,
- *upper-alpha* in upper case letters.
