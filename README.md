# hackust-backend
## Purpose
This acts as the centre of the application; a back-end server that will serve a React-Native front end grocery app.

## System Architecture

The Node.js Express server makes use of microservice architecture to provide scalability in the long term. Split among 2 endpoints, customer routes and employee routes can be
called independently, the server connects to a local MongoDB Database which stores all the information related to each order. This data is then used by our machine learning model 
to predict a target price and store to buy an item at that will provide the best value/$. 

The machine learning micro-service also provides the front end with an array of prices that customers should pay for each item, by calculating the average market prices for the items.

## How to run
```node index.js``` in the root folder to start the server, and ```python theapp.py``` in the ```./algo-microservice``` directory to startup the python microservice.
