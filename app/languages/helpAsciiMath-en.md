# MathJax

One cannot write mathematical formulae with the Markdown language. Another markup language, MathJax, permits it, which is why it's been included in Natao.

Although MathJax supports three different syntaxes (MathML, TeX, and AsciiMath), Natao's current version can only accommodate TeX and AsciiMath.

To let Natao know that part of your text is a mathematical formula, simply surround it with MathJax characters.

## Writing formuale in TeX

In TeX, math formulae can appear in two forms.

### Inline Formulae:

The formula appears within a line of text. Simply start and end your formula with two dollar signs [$$]:

	>The loot was shared as follows, $$\frac{1}{2}$$ for the captain, $$\frac{1}{4}$$ for the helmsman, and the remainder for the rest of the crew.

Which gives:

>The loot was shared as follows, $$\frac{1}{2}$$ for the captain, $$\frac{1}{4}$$ for the helmsman, and the remainder for the rest of the crew.

### Centered Formulae

The formula appears after the line of text, in the center of the document's page. Start and end your formula with three dollar signs [$$$]:

	>Here is some text followed by a formula $$$\sqrt{\frac{1}{3}}$$$. The formula appear separate from the text.

Which gives:

>Here is some text followed by a formula $$$\sqrt{\frac{1}{3}}$$$. The formula appear separate from the text.

##Writing formuale in AsciiMath

With AsciiMath, you only need to surround your mathematical formula with two at-signs [@@]. The math will then appear as an inline formula, within the rest of the text.

	>The loot was shared as follows, @@1/2@@ for the captain, @@1/4@@ for the helmsman, and the remainder for the rest of the crew.

Which gives:

>The loot was shared as follows, @@1/2@@ for the captain, @@1/4@@ for the helmsman, and the remainder for the rest of the crew.

To have the formula appear on its own in the center of the page, simply create a new paragraph using the Makdown syntax, as follows:

>Here is some text followed by a formula @@1/3@@. The formula appear separate from the text.

# Basic AsciiMath

## Basic Operations

Natao can only allow you to write in-line operations. Here are some examples:

|  Syntax  | Character |  Syntax  | Character |
|:--------:|:---------:|:--------:|:---------:|
| @@=@@    | =         | @@!=@@   | !=        |
| @@+@@    | +         | @@<@@    | <         |
| @@-@@    | -         | @@<=@@   | <=        |
| @@xx@@   | xx        | @@>@@    | >         |
| @@-:@@   | -:        | @@>=@@   | >=        |

You may thus write:

	>@@4 xx 3 = 12@@

    >@@100 -: 4 = 25@@

    >@@200mm < 25cm <= 3dm@@

to obtain :

>@@4 xx 3 = 12@@

>@@10 -: 2 = 5@@

>@@200mm < 25cm <= 3dm@@

Remember to leave spaces before and after the less-than ( < ) and greater-than signs ( > ) to avoid any confusion with HTML.

## Fractions

Use the slash sign ( / ) to separate two portion of a single formula, as follows:

	>@@1/2 + 1/4 = 3/4@@

You should get the following:

>@@1/2 + 1/4 = 3/4@@

## pi

f you have started calculating circle perimeters, you may use the Pi sign by surrounding it with two at signs ( @ ), as follows:

|  Syntax  | Charcater |
|:--------:|:---------:|
| @@pi@@   | pi        |

You may thus write:

@@perimeter = 2 xx pi xx radius @@

# Advanced Operations

## Indexes & Exponents

You may use the underscore sign ( _ ) after a plain text number or expression to indicate that an index follows. When a caret sign ( ^ ) is written after a plain text number or expression, an exponent appears.

	>@@x_1@@

    >@@x^2@@

    >@@x_1^2@@

Gives:

>@@x_1@@

>@@x^2@@

>@@x_1^2@@

You should note that when you need to have the two of them at the same time, you should always use the index sign first.

These two types of symbols can also be used to changed the elements of a mathematical expression formula.

	>@@sum_(n=1)^(n=5) 4^n@@

    >@@int_0^1 f(x)dx@@

>@@sum_(n=1)^(n=5) 4^n@@

>@@int_0^1 f(x)dx@@

## Matrices & Vectors

The ASCIIMath notation for matrices is as follows:

	>@@[[a,b],[c,d]]@@

You will then get obtain following matrix:

>@@[[a,b],[c,d]]@@

The ASCIIMath notation for vectors is as follows:

	>@@((a,b),(c,d))@@

You will then obtain the following vector:

>@@((a,b),(c,d))@@

## Symbols and Functions

Usually, symbols are applied to the characters that follow.
By writing the following exemple:

	>@@sqrt 1/3@@

You obtain:

>@@sqrt 1/3@@

If you wish to apply the symbol or the functions to a group of characters, simply write parenthses around the group of characters, as follows:

	>@@sqrt(1/3)@@

You will then obtain:

>@@sqrt(1/3)@@

In the exemples above, you will notice that the parentheses do not appear, and that the square root symbol is applied to 1/3.

# List of Symbols and Functions

## Operations

| AsciiMath Syntax | Character  |
|:----------------:|:----------:|
| @@+@@            | +          |
| @@-@@            | -          |
| @@\*@@           | \*         |
| @@\*\*@@         | \*\*       |
| @@\*\*\*@@       | \*\*\*     |
| @@//@@           | //         |
| @@\\\\@@         | \\\\       |
| @@xx@@           | xx         |
| @@-:@@           | -:         |
| @@ @ @@          | @          |
| @@o+@@           | o+         |
| @@ox@@           | ox         |
| @@o.@@           | o.         |
| @@sqrt@@         | sqrt       |
| @@sum@@          | sum        |
| @@prod@@         | prod       |
| @@^^@@           | ^^         |
| @@^^^@@          | ^^^        |
| @@vv@@           | vv         |
| @@vvv@@          | vvv        |
| @@nn@@           | nn         |
| @@nnn@@          | nnn        |
| @@uu@@           | uu         |
| @@uuu@@          | uuu        |

## Ensembles

| AsciiMath Syntax | Character  |
|:----------------:|:----------:|
| @@=@@            | =          |
| @@!=@@           | !=         |
| @@<@@            | <          |
| @@>@@            | >          |
| @@<=@@           | <=         |
| @@>=@@           | >=         |
| @@-<@@           | -<         |
| @@>-@@           | >-         |
| @@in@@           | in         |
| @@!in@@          | !in        |
| @@sub@@          | sub        |
| @@sup@@          | sup        |
| @@sube@@         | sube       |
| @@supe@@         | supe       |
| @@-=@@           | -=         |
| @@~=@@           | ~=         |
| @@\~~@@          | ~~         |
| @@prop@@         | prop       |

## Logic symbols

| AsciiMath Syntax | Character  |
|:----------------:|:----------:|
| @@and@@          | and        |
| @@or@@           | or         |
| @@=>@@           | =>         |
| @@if@@           | if         |
| @@iff@@          | iff        |
| @@AA@@           | AA         |
| @@EE@@           | EE         |
| @@TT@@           | TT         |

Three symbols that one may write in the Makdrown language remain:

	>@@ \_|_ @@
 	>@@ |-- @@
 	>@@ |== @@

 >@@ \_|_ @@
 >@@ |-- @@
 >@@ |== @@

## Grouping

| AsciiMath Syntax | Character  |
|:----------------:|:----------:|
| @@(@@            | (          |
| @@)@@            | )          |
| @@[@@            | [          |
| @@]@@            | ]          |
| @@{@@            | {          |
| @@}@@            | }          |
| @@(:@@           | (:         |
| @@:)@@           | :)         |
| @@{:@@           | {:         |
| @@:}@@           | :}         |


## Arrows

| AsciiMath Syntax | Character  |
|:----------------:|:----------:|
| @@uarr@@         | uarr       |
| @@darr@@         | darr       |
| @@rarr@@         | rarr       |
| @@->@@           | ->         |
| @@larr@@         | larr       |
| @@harr@@         | harr       |
| @@rArr@@         | rArr       |
| @@lArr@@         | lArr       |
| @@hArr@@         | hArr       |

And the following arrow which does not work in a Markdown table:

	> @@|->@@

> @@|->@@

## Accents

| AsciiMath Syntax | Character |
|:----------------:|:---------:|
| @@hat x@@        | hat x     |
| @@bar x@@        | bar x     |
| @@ul x@@         | ul x      |
| @@vec x@@        | vec x     |
| @@dot x@@        | dot x     |
| @@ddot x@@       | ddot x    |

## Other Symbols

| AsciiMath Syntax | Character  |
|:----------------:|:----------:|
| @@sqrt@@         | sqrt       |
| @@int@@          | int        |
| @@oint@@         | oint       |
| @@del@@          | del        |
| @@grad@@         | grad       |
| @@+-@@           | +-         |
| @@O/@@           | O/         |
| @@oo@@           | oo         |
| @@aleph@@        | aleph      |
| @@/_@@           | /_         |
| @@:.@@           | :.         |
| @@cdots@@        | cdots      |
| @@vdots@@        | vdots      |
| @@ddots@@        | ddots      |
| @@diamond@@      | diamond    |
| @@square@@       | square     |
| @@CC@@           | CC         |
| @@NN@@           | NN         |
| @@QQ@@           | QQ         |
| @@RR@@           | RR         |
| @@ZZ@@           | ZZ         |

## Greek Letters

| AsciiMath Syntax | Character  | AsciiMath Syntax   | Character  |
|:----------------:|:----------:|:------------------:|:----------:|
| @@alpha@@        | alpha      | @@phi@@            | phi        |
| @@beta@@         | beta       | @@Phi@@            | Phi        |
| @@chi@@          | chi        | @@varphi@@         | varphi     |
| @@delta@@        | delta      | @@pi@@             | pi         |
| @@Delta@@        | Delta      | @@Pi@@             | Pi         |
| @@epsilon@@      | epsilon    | @@psi@@            | psi        |
| @@varepsilon@@   | varepsilon | @@Psi@@            | Psi        |
| @@eta@@          | eta        | @@rho@@            | rho        |
| @@gamma@@        | gamma      | @@sigma@@          | sigma      |
| @@Gamma@@        | Gamma      | @@Sigma@@          | Sigma      |
| @@iota@@         | iota       | @@tau@@            | tau        |
| @@kappa@@        | kappa      | @@theta@@          | theta      |
| @@lambda@@       | lambda     | @@Theta@@          | Theta      |
| @@Lambda@@       | Lambda     | @@vartheta@@       | vartheta   |
| @@mu@@           | mu         | @@upsilon@@        | upsilon    |
| @@nu@@           | nu         | @@xi@@             | xi         |
| @@omega@@        | omega      | @@Xi@@             | Xi         |
| @@Omega@@        | Omega      | @@zeta@@           | zeta       |
