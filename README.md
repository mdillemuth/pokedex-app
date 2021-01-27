# Pokédex App

## Project Showcase

![App Showcase Gif](/pokedex-showcase.gif)

## Project Overview

This is a small web application with HTML, CSS, and JavaScript that loads data from an external API and enables viewing of data points of detail for the user.
The API used for this project is the [Pokémon API](https://pokeapi.co/).

### Handwritten JavaScript Features

Aside from jQuery, the features of the app are implemented without the aid of external libraries.

- Navigation bar
- Contact form with validation
- Modals
  - The individual Pokémon cards are displayed as modals
  - The internal 'Information' link is displayed as a modal
  - The contact form is displayed as a modal
- Accordion
  - The information in the individual Pokémon cards are displayed within accordions
  - The accordions are closed by default and are reset when the card is closed.\
- Cards
- Scroll to top button
  - After scrolling down, users are presented with a red button that, if clicked, takes them back to the top of the application

### Customized Design

Though I don't exactly call myself a designer, I do have a fundamental understanding of UI design and I decided to implement this knowledge throughout this app.

- Colors and contrast
  - I decided to theme the app with the exact blue and yellow used for Pokémon.
  - The app maintains a consistent theme throughout
  - The colors pass the WCAG accessibility standards for contrast
- Visual hierarchy
  - I darkened the background image in Gimp so that it would not clash with the App itself, this raises the visual hierarchy of the key app features, which is the list of Pokémon and the navigation bar.
  - The back-to-top button is in red such that it's rendering is apparent when it appears after a user starts scrolling downwards
  - Contact form validation warnings are implemented in red
- Use of whitespace
  - Implemented with margin and padding in the CSS
- Alignment
  - The Pokémon card accordions are all in alignment
  - Navigation bar links
  - The 'Pokédex App' heading element and the search bar
