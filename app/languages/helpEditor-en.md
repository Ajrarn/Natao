# The main buttons bar

![Image of MenuBar](./src/images/menuBar.png)

This bar, located at the top of the Editor panel, lets you access the core functions of Natao.

## Zoo-In and Zoom-Out

 - <span class="typcn typcn-zoom-out-outline"></span> Lets you decrease the size of all the characters used in Natao's user interface.
 - <span class="typcn typcn-zoom-in-outline"></span> Lets you increase the size of all the characters used in Natao's user interface.

You should note that Natao saves interface modifications automatically. You won't have to go over them again after you've re-launched Natao.

## The Dyslexia button

<span class="typcn typcn-lightbulb"></span> lets you activate OpenDyslexic characters for the whole of the program's interface.
These characters are especially designed to increase words' readability for dyslexics.

You should note that the characters used in the document style-sheets do not have a dyslexia mode (more on style-sheets further down).

## The Three Panels button

- <span class="typcn typcn-th-menu-outline"></span> lets you hide or display the Explorer panel, which is also where **My Courses** figure.
- <span class="typcn typcn-edit"></span> lets you hide or display the Markdown Editor panel.
- <span class="typcn typcn-eye-outline"></span> lets you hide or display the Viewer panel.

## The Print button

<span class="typcn typcn-printer"></span> lets you print the document visible in the Viewer panel.

## The Help button

<span>?</span> lets you open the Natao's Help window. This is what you are currently reading.

## The Settings button

<span class="typcn typcn-cog-outline"></span> lets you access Natao's settings.

# The *My Courses* button:

## The documents Explorer's tool bar

![Image of ExplorerBar](./src/images/myLessons.png)

This bar displays three extra buttons which let you:
- <span class="typcn typcn-book"></span> paste copied or cut content present in Natao's clipboard
- <span class="typcn typcn-download-outline"></span> import content from a file.
- <span class="typcn typcn-plus-outline"></span> add a folder at the root of **My Courses**. During the creation of the folder, you have the option of selecting one of Natao's folder structure templates. This will add sub-folders to the folder you're creating.

## The Explorer panel

![Image of Explorer](./src/images/explorer.png)

Folders and documents are organized here as you see fit.
- One click on a folder icon will either open or close it.
- One click on the folder's name will open a pop-up tool menu that will let you edit aspects of the folder.
- One click on a document will open it at once in the Editor panel, as an editable Markdown text, and in the Viewer panel as it will appear once printed.

## The Folder pop-up tool menu lets you:

 ![Image of Explorer](./src/images/folderOptions.png)

- <span class="typcn typcn-edit"></span> modify the folder's name, its color, and its default style-sheet. You should note that modifying the folder's style-sheet neither changes the style of that folder's sub-folders nor the documents it contains.
- <span class="typcn typcn-folder-add"></span> add a sub-folder to the folder you've selected. Here, you may also choose to use one Natao's folder structure templates. Natao will automatically create sub-folders that correspond to that template.
- <span class="typcn typcn-document-add"></span> add a document to the selected folder.
- <span class="typcn typcn-tabs-outline"></span> copy the selected folder and its content to Natao's clipboard.
- <span class="typcn typcn-scissors-outline"></span> cut the selected folder and its content to Natao's clipboard.
- <span class="typcn typcn-book"></span> paste the selected folder and its content to Natao's clipboard.
- <span class="typcn typcn-export-outline"></span> export the selected folder and its content as a single file.
- <span class="typcn typcn-download-outline"></span> import a file's content to the selected folder.
- <span class="typcn typcn-flow-children"></span> save the selected folders' sub-folder structure as a new template. Please, be aware that the content of these folders and sub-folders is not saved. The new template will be usable each time you create new folders and sub-folders.
- <span class="typcn typcn-trash"></span> delete the selected folder and its content.

# The Editor panel

The Editor gives you the space to write down your text with Markdown signs; to know this unique syntax, consult the appropriate Help section. The Editor panel displays a grayed out margin which either shows signs or line numbers, depending on the context. For instance, little triangles may appear there, which, once clicked, let you fold or unfold your document and thus help you look at your document's overall structure.

You may have already noticed that the Editor panel highlights elements of your Markdown text with colors and different character sizes. This should help you better make sense of your document.

Three input-fields are available:

- *Title*: your document's title is independent of the text's core content. This allows you to see it within the Explorer panel. The document's title also appears in the Viewer panel.
- *Style*:  the one you select modifies your document’s formatting. Styles can be modified.
- *Creation Date*: by default, this is the day's date as it appears on your computer. However, you can modify it: you could make it the date at which you are supposed to return your homework. Please note that the way the date appears in your document depends on the style-sheet you've selected.

 Besides the three input-fields, additional buttons are present. These function similarly to the ones seen in the Explorer panel. They let you:
- <span class="typcn typcn-tabs-outline"></span> copy the active document, including its input-fields, to Natao's clipboard.
- <span class="typcn typcn-scissors-outline"></span> cut the active document to Natao's clipboard.
- <span class="typcn typcn-export-outline"></span> export the active document to a file.
- <span class="typcn typcn-trash"></span> delete the active document. When you do, the Editor and Viewer windows will disappear, until you create a new document.

## The Editor Settings button

This button <span class="typcn typcn-cog"></span> lets you change the way the content seen in the Editor panel is displayed. The two available options are specifically designed to help people with visuospatial perception difficulties. This button lets you:
- add gray and white stripes to your document. Some of the document's lines will turn gray, while others will remain white. This juxtaposition of gray and white lines will help you navigate your document faster.
- Add space between the lines by increasing their size. Be aware that this setting adversely impacts the way the computer's cursor is positioned. For now, once you've modified this setting, close down the Editor panel by either quitting Natao or getting into Natao's overall Settings panel. This should make put the cursor in its proper position.

# The Viewer panel

This panel, the simplest of the three, may also be the most important. With it, you can see what your document will look like once printed. When you click on the <span class="typcn typcn-printer"></span> button, the entire Viewer panel will expand before asking you if you want to print your document or not.
