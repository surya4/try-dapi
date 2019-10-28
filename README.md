# Project try-dapi -  activity feed of data

## Configuration and dependecies

- **Platform:** node v12.13.0
- **Framework**: express
- **Template Engine**: ejs
- **Storage**: redis
- **Extra**: ngrok (to expose local server with public urls), Webhooks and SSE

App contains 4 parts :

1. connection to bank for client side
2. Get user details related - user data, user account details, balance and transactions
3. Api to - start payment, resume payment, beneficiary list
4. jobs status

Authenticate:

1. Implement js library to connect to bank and enter sand box details,
2. get accessCode and then call exchangetoken to get JWT whihc will have 1 hour expiry.
3. store this token in localstorage or redis or any memory so you can use it easily.

Payment and user data:
1.By default app is running at given port. We are listening data from remote dapi server via webhooks and passing it TO UI by Server side events.
2. To run and develop with webhooks, we will use ngrok, it will get an ip bound to local server. WE can pass this ip to dapis webhook form to recieve events .
Ex with ngrok <http://localhost:3000> will run on <http://e3300d33.ngrok.io> as well.
3. Data or payment api will get token from redis and pass it to dapi server , if success it will shoot **post.webhooks** to start listening incoming data from dapi.
4. We will store this data in **redis list** and access it with **lpush / rpop**.
5. A SSE will be running in background every and reading data from redis and passing it to UI.

Screen 1 or home screen:
![alt text](/src/public/images/home.png)

Activity example for data/payment:
![alt text](/src/public/images/user.png)

## How to run

1. Resolve the dependecies - if you and missing dependecy then please download all - **node, ngrok and redis**
2. Run redis server with command **redis-server**
3. get ngrok id for your local with command **./ngrok http 3000** or PORT of your choice
4. Set up your .env files:
    - APP_SECRET=xxxx
    - APP_KEY=xxxx
    - HOST=localhost
    - PORT=3000
    - REDIS_PORT=6379
    - REDIS_HOST=localhost
    - WEBHOOK_URL= **{{ngrok ip}}/webhooks**
5. Create dapi app from dapi dashboard and enter details
    - WEBHOOK_URL - one you entered in .env
    - callback - running local host with post
    - your ip address
6. Download node dependecies with command **npm i** and run with command **npm start**
7. Open HOST:PORT in browser
8. Authenticate by connecting to connecting to bank. Click on client connect and then click again to reverify. The following screen will open bank page login page. Select your bank and login to authenticate. **You can not do any of the below without going through this step.**
8. To fetch payment/user data click on either of them it will populate the UI as it recieves the data.
9. To check status of any job click on job dashboard which will open form. Enter job id to get status.
  