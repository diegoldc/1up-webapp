# 1up

## [See the App!](https://1up-app.netlify.app/)

![App Logo](./src/assets/1upLogo.png)

## Description

This app is for gamers to find reviews of games before buying them so as not to loose money. Once bought and played they can come back and write their own review.

#### [Client Repo here](https://github.com/diegoldc/json-server)

#### [Server Repo here](https://github.com/diegoldc/1up-webapp)

## Technologies, Libraries & APIs used

Technologies and libraries used in the project HTML, CSS, Javascript, React, axios, Bootstrap, react pop-up, RAWG.io API, neumorphism.io.

## Backlog Functionalities

On the future we would like to add some of these functionalities:

- User authentication
- User rating
- Add RAWG.io calls (available for RAWG.io premium members - not us at the moment): game youtube links, twitch links and suggested similar games.
- Filter by newest and top rated
- Add a list of platforms that sell each game

# Client Structure

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **explore** - As a user I want to access the homepage to see an overview of popular or new games, and quickly access other sections of the app
- **game page** - As a user I want to view detailed information about a selected game, such as its description, tags, platforms, and user reviews
- **add game to vault** - As a user I want to add games to my vault of owned or played games, so I can keep track of the ones I’m most interested in
- **vault** - As a user I want to access a vault or collection of games I have added
- **my reviews** - As a user I want to access a list of all the reviews I have written, so I can easily manage or reference them later
- **profile** - As a user I want access my information quickly and condensed in one place
- **game reviews** - As a user I want to read reviews of a game written by other users, so I can decide if I want to play it
- **write a review** - As a user I want to write and submit my own review for a game, including giving it a rating and if I would recommend it or not so that I can share my opinion with others
- **edit a review** - As a user I want to edit or update my review if I change my opinion about a game after playing it more
- **delete a review** - As a user I want to delete a review that I wrote if I no longer want it to be visible
- **game search** - As a user I want to search for specific games by title, genre, or platform so that I can easily find games that interest me
- **related games** - As a user I want to see recommendations for similar or related games such as games of the same series, when viewing a game’s details, so I can discover new games

## Client Routes

## React Router Routes (React App)

| Path                                  | Page              | Components                             | Behavior                                           |
| ------------------------------------- | ----------------- | -------------------------------------- | -------------------------------------------------- |
| `/explore`                            | StorePage         | SearchBar, FilterBar,StoreGameCard     | Home page, shows a list of games to browse         |
| `/games/:gameId`                      | GamePage          | ReviewCard,CarouselScreen,GameCarousel | Shows details of a selected game                   |
| `/games/:gameId/addReview`            | AddReview         |                                        | Review form, add a review to selected game         |
| `/games/:gameId/editReview/:reviewId` | EditReviewPage    |                                        | Edit review form, edit selected review             |
| `/profiles`                           | ProfilePage       |                                        | Show user data                                     |
| `/vault`                              | Libreary          |                                        | Shows all games on my vault                        |
| `/search/:filterName/:filterId/:tag`  | FilteredSearch    | StoreGameCard                          | Shows games by chosen filter                       |
| `/vault/:myGameId`                    | MyGamePage        | CarouselScreen                         | Displays information of owned game                 |
| `/games/:gameId/addToVault`           | AddToVault        |                                        | Form to add game to your vault                     |
| `/vault/fallback`                     | FallbackVaultPage |                                        | Alert user that game selected is already in vault  |
| `/vault/:myGameId/edit`               | EditMyGame        |                                        | Game form to edit information on owned game        |
| `/myReviews/:UserId`                  | MyReviewsPage     | ReviewCard                             | Shows all reviews made by user                     |
| `/play`                               | PlayPage          |                                        | Click to see...                                    |
| `*`                                   | NotFoundPage      |                                        | Shows a warning that requested path does not exist |

## Other Components

- Navbar
- Footer

## Links

### Collaborators

[Developer 1 name](www.github-url.com)

[Developer 2 name](www.github-url.com)

### Project

[Repository Link Client](www.your-github-url-here.com)

[Repository Link Server](www.your-github-url-here.com)

[Deploy Link](www.your-deploy-url-here.com)

### Trello

[Link to your trello board](www.your-trello-url-here.com)

### Slides

[Slides Link](www.your-slides-url-here.com)
