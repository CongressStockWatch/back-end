# Congress Stock Watch


## Project discription:

As of late, it appears some members of Congress are seeing stellar performance in their stock portfolios - or least the awareness of such is increasing. While there is a lot of conjecture on the source of many Congressmembers' gains, this app simply displays the stock trading activity and portfolio performance of Congress members - something that is already publicly available information (See House members trading, Senate trading).

Disclaimer: this app exists purely for informational purposes. Neither this app nor its authors make any inference to the intent behind any Congress member's stock trading activity. Further, nothing provided by this app should be interpreted as financial advice, as it is not.

**Up for discussion**
The MVP of this project is:

1. Display Congress Representative Trades and S&P 500 on graph:
    - The web app will display the previous year performance of the S&P 500 on a graph
    - Users will be able to login using to front end 

**Stretch Goals**
- Be able to choose the portfolios of Congress members to compare against the S&P 500
- Be able to find out Representatives in the Users Zip Code
- Implementing a socket server that sends out email alerts to each user about updates on their store representatives.

### Setup
- Clone repo to your machine.
  - using the `code` button in github 

- Make sure you have `node` installed and up to date
  - node --version
    - v16.13.2 and above
- Make sure you have `nodemon` installed and up to date
  - nodemon --version
    - v2.0.16 and above

- Make sure you have `postgres` installed and up to date
  - postgres --version  
    - v14.4
- Run an `npm i`  in the terminal 
  - this should download all dependencies needed to run the project

#### `.env` requirements

- `DATABASE_URL`- **Deployed-Database-heroku**
- `SECRET`- **Auth** 
- `Twilio-API`- **SendGrid-APiKEY**


#### Running the app
- Database
  
- `nodemon`
    - This is the first step that needs to happen in order to connect to the database and setup the postgres.
    - 
## TESTS

  - `npm test`: to run all test suites

## Team Members:

> Abdinasir Yussuf

> Beau Hibbert

> Brady Davenport

## Credit

**Yahoo Api Docs**
https://www.npmjs.com/package/yahoo-finance

**Quiver API**
https://api.quiverquant.com/