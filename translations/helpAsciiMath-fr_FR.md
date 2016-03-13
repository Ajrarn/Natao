# MathJax

La possibilité d'écrire des formules mathématiques n'est pas incluse dans le langage Markdown.
Par contre, il existe un produit, appelé MathJax qui permet de le faire. Natao inclut donc également MathJax.
MathJax permet de lire plusieurs syntaxe différentes :

* MathML
* TeX
* AsciiMath

La plus facile de ces trois langages est AsciiMath, c'est pour cela que ce langage sera détaillé plus bas.


# Les deux syntaxes permettant d'écrire des formules

Pour transformer tes documents Markdown, en document correctement présenté, Natao utilise Showdown.
Comme Showdown ne connait rien aux mathématiques, il faut lui dire de passer le relais à MathJax. Pour cela, nous allons utiliser le symbôle $.

L'utilisation de deux, $ autour de la formule, informe Showdown que c'est une formule qui s'affiche dans la même ligne que la ligne courante.
L'utilisation de trois $ signifie que tu souhaites que cette formule soit sur sa propre ligne.

Exemple:

    je pense que $$1/3$$ de litre de lait suffit. $$$sqrt(1/3)$$$ apparait sur sa propre ligne.

Ce qui donne :
je pense que $$1/3$$ de litre de lait suffit. $$$sqrt(1/3)$$$ apparait sur sa propre ligne.


# La syntaxe AsciiMath