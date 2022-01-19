# Shopify Frontend Developer Challenge - 2022

The purpose of this challenge was to build an app to help share photos from any of NASA's image APIs. I chose the [Astronomy Picture of the Day (APOD) API](https://github.com/nasa/apod-api) for my take on this challenge.

Live version is [here](#).

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
- Hidden API Key
  - Requests are rerouted to an Express Js backend through a proxy to prevent the user from accessing the API key.

# Setup

1. Download [NodeJs](https://nodejs.org/en/) if it's not already installed
2. Navigate into both the frontend and backend folders and use `npm install`

### Backend Folder

1. Add a file called `.env` with `API_KEY = Key_Here` as its contents to the backend folder. Replace `Key_Here` with your NASA API key that can be gotten [here](https://github.com/nasa/apod-api).

# Running the App

1. Navigate into the backend folder and use `npm start` to start the backend.
2. Navigate into the frontend folder and use `npm start` to start the frontend.

# Dev Scripts

### Backend

1. Use `npm run devStart` in the backend folder to start the backend with [Nodemon](https://www.npmjs.com/package/nodemon). Nodemon will automatically restart the node application when file changes in the directory are detected.
