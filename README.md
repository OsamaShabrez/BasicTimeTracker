# Time Tracker in Symfony 4 & React.JS

A simple time tracking web application built on React.JS as frontend while using Symfony 4 at the backend.

## How to set it up
- clone this repo
- cd repo..
- `$ composer install`
- `php bin/console doctrine:database:create` (`.evn` file is already provided for easy installation)
- `php bin/console doctrine:migrations:migrate` to run migrations
- `php bin/console doctrine:fixtures:load` to load dummy data into the database
- `php -S 127.0.0.1:8000 -t public`

Open `127.0.0.1:8000` on your fav browser to access project.

In case you want to change or recompile the react source, do not forget `npm install` inside public folder. Issue `npm run start:prod` for production and `npm run start:dev` for development rebuild.

## Report
It was a reasonably sized project and I enjoyed doing it. I spent roughly around 6-8 hours on it.

##### Backend
It was my first time using symfony so I had to do some reading there. I hope I have got it right and like the way, any experienced symfony developer would do it. I used annotations for application routes, migrations to create database and data fixtures for dummy data.

##### Database
Considering it was a small task, I decided to go with SQLite. It comes with a small footprint and needs no additional maintenance routine for configuration. Great choice to something like this.

##### Frontend
The frontend is based on React.JS and Bootstrap 4. Maybe I have overdone it a little bit but I like the way it looks now. This is also the component I spent most of my time at. Previously, I was always using redux for storing state, having actions and more. So my starter kit (more than a starter) kind of had everything configured for that. Rather than stripping it down, I found a nice basic starter kit here: https://github.com/adeelibr/react-starter removed unwanted dependencies and added what I like to have for this project or something like it in future. It is basic react.JS with bootstrap 4 ready to go: https://github.com/adeelibr/react-starter.

Although a small application, I have divided it into multiple small components which not only looks neat at a glance but it also offers great flexibility for more features and code maintenance in future. It is a blend of smart and dumb components, which allows easier development while keeping the props list in check as well.

##### Like/Dislikes and More
Setting up a whole project for something small like this is always a turnoff unless you have starter kits available. I have made one so it should be fast for future use.

The thing I liked most was how this small looking application covered almost all the aspect of a web app. Although we are still missing delete and update.

If I had more time (_if I wanted to invest more time...?_):
- I would have worked on lowering the production build size. Currently, it is sitting at around 435kb and it can be lowered with some intelligent imports and webpack configs to optimization. I realized it later and decided it might not be worth it. I am using bootstrap which includes jquery, pooper.js and its js files. I only use jQuery for back-to-top-button which can be converted to HTML/CSS only and then we don't need any js files from bootstrap. My imports from lodash and reactstrap are optimized but maybe we can further decrease the size elsewhere.
- I very much like the current frontend architecture and I think it is pretty solid to have further improvements but I would spend some time at the backend, double checking the incoming requests for clean input and more.
- **Implemented a reset timer button :)**
