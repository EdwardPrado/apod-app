# Shopify Frontend Developer Challenge - 2022

The purpose of this challenge was to build an app to help share photos from any of NASA's image APIs. I chose the [Astronomy Picture of the Day (APOD) API](https://github.com/nasa/apod-api) for my take on this challenge.

Live version is [here](https://ep-shopify-challenge.netlify.app/).

# Features

- Image Cards
  - Each card component displays an image, its date, like button, share button (copies a link to that date's post), and an explanation with ellipsis functionality.
- Posts
  - View the whole image, copyright, title, explanation, and like or share while you browse the Post Page for a particular date.
- Search
  - Through the Search page you can query the APOD API for only image posts from the last 24 hours, week, month, or year.
- Likes
  - Liked posts are saved in the browser's local storage
  - View all your liked posts from the Likes Page
- Light and Dark Themes
  - Includes a light and dark theme you can choose from.
  - Selecting a theme stores your choice in the browser's local storage.
  - The App detects and sets the initial theme based on your device's preferred color scheme.

# Setup

1. Download [NodeJs](https://nodejs.org/en/) if it's not already installed
2. Download the [Netlify CLI](https://docs.netlify.com/cli/get-started/) if it's not already installed
3. Use `npm install` in the root folder
4. Add a `.env` file in the root folder with the contents `API_KEY=key_here` where `key_here` is a NASA API key which can be gotten [here](https://api.nasa.gov/).

# Running the App

1. Use `netlify dev` to launch locally

# Production
1. Import project from Git to Netlify
2. Under Environment variables add the following variables:
  - `API_KEY` with the API key
  - `BACKEND_SERVER_PORT` with the server port.  You can set it to 5000.
  - `CI` and set it to false so the build doesn't stop when a warning is encountered.
