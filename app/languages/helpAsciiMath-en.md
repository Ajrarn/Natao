[toc]

# Writing formulae in AsciiMath

When you write a mathematical formula, surround it with two at-signs ( @@ ), as follows:

        >The loot was shared as follows, @@1/2@@ for the captain, @@1/4@@ for the helmsman, and the remainder for the rest of the crew.

Which gives:

>The loot was shared liek so: @@1/2@@ for the captain, @@1/4@@ for the helmsman, and the remainder for the rest of the crew.

As illustrated above, the math formula portion of your text will appear as an inline formula contained within the rest of your text. To separate the formula from your text, simply start a new paragraph by adding a blank space between your formulae (as discussed in the Markdown Help document).

# Basic AsciiMath

## Basic Operations

With Natao, you may only write in-line operations.

Here are some examples:

|  AsciiMath Syntax  | Character |
|:------------------:|:--------------:|
| @@=@@              |        =       |
| @@+@@              |        +       |
| @@-@@              |        -       |
| @@xx@@             |        xx      |
| @@-:@@             |        -:      |
| @@!=@@             |        !=      |
| @@<@@              |        <       |
| @@<=@@             |        <=      |
| @@>@@              |        >       |
| @@>=@@             |        >=      |

You may thus write:

    >@@4 xx 3 = 12@@

    >@@100 -: 4 = 25@@

    >@@200mm < 25cm <= 3dm@@

to obtain:

>@@4 xx 3 = 12@@

>@@10 -: 2 = 5@@

>@@200mm < 25cm <= 3dm@@

Remember to leave spaces before and after the less-than ( < ) signs and greater-than signs ( > ) to avoid any confusion with HTML code.

## Fractions

Use the slash sign ( / ) to separate two portion of a single formula, as follows:

        >@@1/2 + 1/4 = 3/4@@

You should get the following:

>@@1/2 + 1/4 = 3/4@@

## Pi

If you've started learning how to calculate circle perimeters, you'll be asked to use the Pi sign in your calculations. Simply surround the word Pi with two at-signs ( @ ), as follows:

| AsciiMath Syntax | Charcater |
|:----------------:|:---------:|
| @@pi@@           | pi        |

You may thus write:

@@perimeter = 2 xx pi xx radius @@

# Advanced AsciiMath

## Indexes & Exponents

You may use the underscore-sign ( _ ) after a plain text number or expression to indicate that an index follows.

When a caret-sign ( ^ ) is written after a plain text number or expression, an exponent appears, as follows:

    >@@x_1@@

    >@@x^2@@

    >@@x_1^2@@

Which gives:

>@@x_1@@

>@@x^2@@

>@@x_1^2@@

You should note that when you need to show the index and the exponent symbols at the same time, you should always use the index sign first.

These two types of symbols can also be used to change the elements of a mathematical formula, as the following examples illustrate:

    >@@sum_(n=1)^(n=5) 4^n@@

    >@@int_0^1 f(x)dx@@

    >@@sum_(n=1)^(n=5) 4^n@@

    >@@int_0^1 f(x)dx@@

## Matrices & Vectors

The AsciiMath notation for matrices is as follows:

        >@@[[a,b],[c,d]]@@

You will then get the following matrix:

>@@[[a,b],[c,d]]@@

The AsciiMath notation for vectors is as follows:

        >@@((a,b),(c,d))@@

You will then obtain the following vector:

>@@((a,b),(c,d))@@

## Symbols & Functions

Usually, AsciiMath syntax symbols affect the characters that follow them. For instance, by writing the following example:

        >@@sqrt 1/3@@

You get:

>@@sqrt 1/3@@

If you wish to apply a symbol, or a function, to a group of characters, simply write parentheses around the group of characters, as follows:

    >@@sqrt(1/3)@@

You will then obtain:

>@@sqrt(1/3)@@

In the examples above, you will notice that the parentheses are not visible, and that the AsciiMath square root symbol is applied to (1/3).

# List of Symbols and Functions

## Operations

| AsciiMath Syntax | Character |
|:----------------:|:---------:|
| @@+@@            | +         |
| @@-@@            | -         |
| @@\*@@           | \*        |
| @@\*\*@@         | \*\*      |
| @@\*\*\*@@       | \*\*\*    |
| @@//@@           | //        |
| @@\\\\@@         | \\\\      |
| @@xx@@           | xx        |
| @@-:@@           | -:        |
| @@ @ @@          | @         |
| @@o+@@           | o+        |
| @@ox@@           | ox        |
| @@o.@@           | o.        |
| @@sqrt@@         | sqrt      |
| @@sum@@          | sum       |
| @@prod@@         | prod      |
| @@^^@@           | ^^        |
| @@^^^@@          | ^^^       |
| @@vv@@           | vv        |
| @@vvv@@          | vvv       |
| @@nn@@           | nn        |
| @@nnn@@          | nnn       |
| @@uu@@           | uu        |
| @@uuu@@          | uuu       |

## Ensembles

| AsciiMath Syntax | Character |
|:----------------:|:---------:|
| @@=@@            | =         |
| @@!=@@           | !=        |
| @@<@@            | <         |
| @@>@@            | >         |
| @@<=@@           | <=        |
| @@>=@@           | >=        |
| @@-<@@           | -<        |
| @@>-@@           | >-        |
| @@in@@           | in        |
| @@!in@@          | !in       |
| @@sub@@          | sub       |
| @@sup@@          | sup       |
| @@sube@@         | sube      |
| @@supe@@         | supe      |
| @@-=@@           | -=        |
| @@~=@@           | ~=        |
| @@\~~@@          | ~~        |
| @@prop@@         | prop      |

## Logic symbols

| AsciiMath Syntax | Character |
|:----------------:|:---------:|
| @@and@@          | and       |
| @@or@@           | or        |
| @@=>@@           | =>        |
| @@if@@           | if        |
| @@iff@@          | iff       |
| @@AA@@           | AA        |
| @@EE@@           | EE        |
| @@TT@@           | TT        |
| @@ \_&#124;_ @@  | \_&#124;\_ |
| @@ &#124;-- @@   | &#124;--   |
| @@ &#124;== @@   | &#124;==   |

## Grouping

| AsciiMath Syntax | Character |
|:----------------:|:---------:|
| @@(@@            | (         |
| @@)@@            | )         |
| @@[@@            | [         |
| @@]@@            | ]         |
| @@{@@            | {         |
| @@}@@            | }         |
| @@(:@@           | (:        |
| @@:)@@           | :)        |
| @@{:@@           | {:        |
| @@:}@@           | :}        |

## Arrows

| AsciiMath Syntax | Character |
|:----------------:|:---------:|
| @@uarr@@         | uarr      |
| @@darr@@         | darr      |
| @@rarr@@         | rarr      |
| @@->@@           | ->        |
| @@larr@@         | larr      |
| @@harr@@         | harr      |
| @@rArr@@         | rArr      |
| @@lArr@@         | lArr      |
| @@hArr@@         | hArr      |
| @@&#124;->@@       | &#124;->   |

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

| AsciiMath Syntax | Character |
|:----------------:|:---------:|
| @@sqrt@@         | sqrt      |
| @@int@@          | int       |
| @@oint@@         | oint      |
| @@del@@          | del       |
| @@grad@@         | grad      |
| @@+-@@           | +-        |
| @@O/@@           | O/        |
| @@oo@@           | oo        |
| @@aleph@@        | aleph     |
| @@/_@@           | /_        |
| @@:.@@           | :.        |
| @@cdots@@        | cdots     |
| @@vdots@@        | vdots     |
| @@ddots@@        | ddots     |
| @@diamond@@      | diamond   |
| @@square@@       | square    |
| @@CC@@           | CC        |
| @@NN@@           | NN        |
| @@QQ@@           | QQ        |
| @@RR@@           | RR        |
| @@ZZ@@           | ZZ        |

## Greek Letters

| AsciiMath Syntax   | Character  | 
|:------------------:|:----------:|
| @@alpha@@          | alpha      |
| @@beta@@           | beta       |
| @@chi@@            | chi        |
| @@delta@@          | delta      |
| @@Delta@@          | Delta      |
| @@epsilon@@        | epsilon    |
| @@varepsilon@@     | varepsilon |
| @@eta@@            | eta        |
| @@gamma@@          | gamma      |
| @@Gamma@@          | Gamma      |
| @@iota@@           | iota       |
| @@kappa@@          | kappa      |
| @@lambda@@         | lambda     |
| @@Lambda@@         | Lambda     |
| @@mu@@             | mu         |
| @@nu@@             | nu         |
| @@omega@@          | omega      |
| @@Omega@@          | Omega      |
| @@phi@@            | phi        |
| @@Phi@@            | Phi        |
| @@varphi@@         | varphi     |
| @@pi@@             | pi         |
| @@Pi@@             | Pi         |
| @@psi@@            | psi        |
| @@Psi@@            | Psi        |
| @@rho@@            | rho        |
| @@sigma@@          | sigma      |
| @@Sigma@@          | Sigma      |
| @@tau@@            | tau        |
| @@theta@@          | theta      |
| @@Theta@@          | Theta      |
| @@vartheta@@       | vartheta   |
| @@upsilon@@        | upsilon    |
| @@xi@@             | xi         |
| @@Xi@@             | Xi         |
| @@zeta@@           | zeta       |

# TeX

Other syntax, besides AsciiMath, can be used to write mathematical formulae. The most known of these is called TeX (pronounced Tek). It has been included in Natao.

## Tex Mathematical Formulae

In TeX, formulae can either be centered or written as inline formulae.

### Inline Formulae:

The formula appears within a line of text. Simply start and end your formula with two dollar signs ( $$ ), as follows:

        >The loot was thus shared: $$\frac{1}{2}$$ for the captain, $$\frac{1}{4}$$ for the helmsman, and the remainder for the rest of the crew.

Which gives:

>The loot was thus shared: $$\frac{1}{2}$$ for the captain, $$\frac{1}{4}$$ for the helmsman, and the remainder for the rest of the crew.

### Centered Formulae:

The formula appears after the line of text, in the center of the document's page. Simply start and end your formula with three dollar signs ( $$$ ), like so:

        >Here is some text followed by a formula $$$\sqrt{\frac{1}{3}}$$$. The formula appears separately from the text.

Which gives:

>Here is some text followed by a formula $$$\sqrt{\frac{1}{3}}$$$. The formula appears separately from the text.
