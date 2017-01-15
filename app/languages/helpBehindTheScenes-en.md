[toc]

# Why create Natao?

## A little story ...

I'm a software developer and, like many of my colleagues, I use text/code editors to help me do my work. 

Because my son has dyspraxia, I was asked by his teacher to design MS Word document templates to help him use his laptop at school. Working with a computer at school may sound pretty fun, but, for anyone with dyspraxia, it's actually fraught with pitfalls.

To organize their document files, students must indeed file them into folders by opening a *File Explorer* window. To read, write and edit them, students have to open the document files with a *Word Processing* program. The documents then appear in a new window. Moreveor, to switch to any other document file, students must either go back to the *File Explorer* window, or open yet another window within the *Word Processing* program.
That's a lot of clicking around and navigating back and forth between windows.

For us, software developers, life's more straightforward. Often our text/code editor includes *File Explorer* panels that are continuously displayed to the left of our editor's windows. We therefore never lose sight of the files contained in our project. Even better, newly opened files don't pop up in new windows: they merely appear in the editor's central panel. It's a logical, efficient and time-saving way of working. Natao works similarly.

I then thought that I could give Natao additional functions. Indeed, what if the *File Explorer* window also helped users organize their document files? Done! So here's what Natao can do too:

- Give its users the ability to colorize folder names, so as to give its users helpful visual pointers (this idea has been implemented in other editors too).
- Let its users record folder/sub-folder structures as templates, to facilitate the organization of files and documents across projects.

## The Markdown editor

Let it be known that I have nothing against *Word Processing* programs! They are very powerful tools and work well for most users. But that power makes them complex to handle, which, I feel, doesn't help young students, some of whom struggle with conditions like dyspraxia.

So, are there simpler, non-*Word Processor* solutions out there that help people write and format documents? Yes! ... and no.

### LaTeX

I won't claim to speak for all developers, as not all of them use it, but LaTex is a very powerful *Word Processing* technology. For the ones who know how to harness its power, LaTex can indeed help people generate perfectly formatted texts, without having to use mainstream *Word Processing* programs. It does so by completely separating a document's form from its content.

Its main drawback? Its users have to code their documents, literally. By using certain key words, they indeed organize and structure their text. LaTex's syntax is not always easy to use though. And creating one's own formatting style can be arduous. 

So if LaTex is difficult for adults to learn, how can one even think of having children use it? Is there any other technology out there that young students could use instead of it?

### HTML / CSS

The HTML and CSS syntax, which are both great examples of the form-separated-from-content approach to text formatting, offer solutions.
If you don't know what they are, just know that all web site are written in HTML and CSS: HTML handles content and CSS handles form, sometimes superbly. But in this particular case, it's the HTML syntax that's not easy to handle.

### Markdown

The Markdown language, which generates an HTML-like syntax, combines a simpler approach to some of the ideas found in LaTex and the power of the CSS code.

Upon discovering the Markdown language, I immediately noticed its simplicity and how much faster it was making the writing process. Markdown does that by letting its users stay focused on their text's content, without having to click on any portion of the text, or having to navigate through an array of formatting options to format it. 
The formatting takes place elsewhere, in the style-sheet editor. And when a style-sheet works, it may be re-used in all subsequent documents.

I am aware that writing CSS code is not for everyone, but I hope to facilitate the process in a later version of Natao.

Still, at the core of Natao lie two approaches to text writing and text formatting:

- The Markdown syntax deals with content.
- The CSS syntax deals with form.

# How was Natao created?

(*Before going any further, let me state that the following section deals with coding technology. So if the subject doesn't appeal to you, skip it!*)

Before listing all the tools I used to create Natao, I'd like to mention that they are all open-source, and freely available online for all to use. Without these tools Natao could not have been put together.

## NW.js

To stay simple, **NW.js**, which used to be known as NodeWebkit, is a virtual machine that lets programs run without having to be linked to the Internet. Natao, which is written in JavaScript, HTML and CSS, therefore runs under **NW.js**, with which it is distributed.

Moreveor, **NW.js** is platform-independent: it runs equally well under the Windows, Mac OSX and Linux environments. This allows Natao to run on all three platforms, natively, without having to be coded three times.

## Showdown

**Showdown** transforms the Markdown language into HTML code. Without this tool, no Natao document could be rendered.
**Showdown** also allows the extended form of Markdown called GFM (Github Flavored Markdown) to be used.

## MathJax

This technology gives Natao the ability to render mathematical formulae.

## CodeMirror

This tool lets Natao number lines, highlight portions of the Markdown and CSS syntaxes, etc.

## NeDB

This technology creates a database that runs natively under **Node.js** and that lets Natao record all modifications and work done on one document in a single file. That way, files stay grouped and well organized. 

## Angular

**Angular**, which is the javascript framework developed by Google, stands at the core of Natao.

## OpenDyslexic

I opted to use this font as it's the only one I found that's open-source and free for anyone to use. That almost all fonts for dyslexics are not free is a sad state of affair. So thank you very much to the people behind the OpenDyslexic initiative.

## And many others ...

A few libraries were used to develop Natao. Here's a list of them. 

- **crypto-js** to encrypt the password.
- **css** to analyze the CSS code used by Natao's user.
- **js-beautify** to make the HTML code generated by Showdown readable.
- **lodash**, which is a key set of tools.
- **node-uuid** to generate unique identifiers for each of the explorer nodes.
- **ng-showdown** to make Showdown work with Angular.
- **typicons** used for all of Natao's icons.
- **angular-tree-control$** which is Natao's file explorer.
- **nw-fileDialog** which let the file windows open.
- **angular-i18n** which makes internationalization work.
- **angular-dynamic-locale** which makes sure that Natao's internationalization works perfectly.
- **nsPopover** which makes the little, white, choice or confirmation windows work.
- **angular-ui-switch** which make the switch buttons work, particularly the ones found in the Style Editor.
- **angular-route** which stands behind the proper routing of all of Natao's various pages.
- **ngjs-color-picker** to adapt Inlet to Codemirror.
- **angular-ui-codemirror** to make Codemirror work with Angular.
- **Inlet** which lets Natao's users pick colors in the CSS editor.
- **angular-translate** which is the library that organizes all languages.
- **angular-translate-loader-static-files** is used to load the various language files.
- **jquery** is Angular's base.
- **ngOnboarding** is the module that lets Natao appear on the first run.
