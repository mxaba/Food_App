# Food-App

This app will be able to book meals and add meals for users

## Getting Started
Clone the Repo.
-------------
`git clone https://github.com/mxaba/Food_App`
## Prerequisites
The following tools will be needed to run this application 

successfully:
* Node v10.15.0 or above
* Npm v6.4 or above
* PostgressSQL
## Endpoints
- GET **api/v1/meals/** Chef can get all meals options they 

uploaded
- POST **api/v1/meals/** Chef can add meal options linked to 

their account
- PUT **api/vi/meals/:mealId** Chef can update their meal 

options
- DELETE **api/v1/meals/:mealId** Chef can delete their meal 

options
- GET **api/v1/menu/** Chef and Users can Get the menu for the 

day 
- POST **api/v1/menu** Chef can Set a menu for the day 
- GET **api/v1/orders** Get All Orders
- POST **api/v1/orders** Users can make orders
- PUT **api/v1/orders/:orderId** Users can modify their orders
## Installation
**On your Local Machine**
- Pull the [develop](git clone https://github.com/mxaba/Food_App) 

branch off this repository
- Run `npm install` to install all dependencies
- Run npm start to start the app
- Access endpoints on **localhost:8000**
## Running the tests
Run `npm test` in the terminal for the cloned folder.
## Built With
* [Node.js](http://www.nodejs.org/) - Runtime-Enviroment
## Author
* **Mcebo Samuel Xaba**
