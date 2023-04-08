# AllPacka

This is an app that helps you and your friend prepare for any and every trip!

Once you fork and clone this repo, you will need to install the
depenedencies in BOTH the client folder AND the server folder

    npm install --> !! In both '/server' and '/client'

The server and the client is bundled with vite and the command to
run a development make sure your in the client folder, then run...

    npm run dev

To test the server with postman, or another app, enter the
server folder and run

    npm start

You're now up and running! Happy Hackinig!!

## The file tree structure

- /

  - /client

    - /App.jsx
    - /index.html
    - /index.jsx

    - /layout // -> Things that hangout on every page

      - rootLayouy.jsx

    - /pages

      - /login
        - login.jsx
        - /loginComponents
        - ...presentational components
      - /signup
        - signup.jsx
        - /signupComponents
          - ...presentational components

    - /src
      - /assets
      - /App.css
      - /App.jsx
      - /index.css
      - /main.jsx
      - /
