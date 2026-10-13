# UNSPORTY portfolio project card

## Goal

Add UNSPORTY as the first project in Zakaria Safi's portfolio, accurately presenting the delivered Zid e-commerce storefront in English and Arabic.

## Scope

- Copy the supplied UNSPORTY storefront screenshot into `public/unsporty.png` for the card thumbnail.
- Add UNSPORTY as the first item in both localized `projects.items` collections.
- Link the card to `https://unsporty.com/`, opening it in a new tab through the existing project-card behavior.
- Keep the existing `Projects` component unchanged so the card preserves the portfolio's established responsive layout, hover effects, and accessibility behavior.

## Content

The English entry will describe end-to-end storefront development on Zid: visual interface and UX, product and category pages, navigation, cart, wishlist, responsive mobile design, and a contemporary visual identity.

The Arabic entry will convey the supplied project description with the same scope. Both entries will use the tags `Zid`, `E-commerce`, `Responsive Design`, and `UX/UI`.

## Verification

- A focused test will assert that both locale data sets list UNSPORTY first and contain the expected URL and image path.
- The production build and linter will run successfully.
- A browser check will confirm the card appears first, the supplied thumbnail loads, and the external project link is available.
