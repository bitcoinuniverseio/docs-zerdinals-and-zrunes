# Zerdinals and ZRunes documentation

Public documentation for the Zcash digital-artifact product: Zerdinals inscriptions, ZRunes fungible assets, collections, and the ZordiScan explorer.

## Read this first

There is one way people lose these assets, and it is easy to do by accident: an artifact sits on a
single transparent output, and a wallet that does not know about inscriptions can spend it as a fee
or as change. [How to avoid that](docs/faq.md) is the first answer in the FAQ, and the product says
the same thing at the top of its own Learn page.

## Start here

1. [What Zerdinals are](docs/zerdinals.md)
2. [What ZRunes are](docs/zrunes.md)
3. [ZRC-20 tokens, and why some figures come with a second opinion](docs/tokens.md)
4. [Protocol specifications, in plain language](docs/protocol-specs.md)
5. [Inscribing a Zerdinal](docs/inscribing.md)
6. [ZRunes guide: etch, mint, transfer](docs/zrunes-guide.md)
7. [ZordiScan](docs/zordiscan.md)
8. [Privacy on Zcash, honestly](docs/privacy.md)
9. [Frequently asked questions](docs/faq.md)

## The product itself

<https://zrunes.io>. Every figure it prints is read from Zcash blocks by nodes Universe operates.
Where two independent readers of ZRC-20 disagree, it prints both and names each, rather than
choosing one silently. Where the chain has not been read in full, it says so instead of showing an
empty catalogue.
