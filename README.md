# Project try-dapi -  activity feed of data

## Configuration

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

Payment snd user data:
1.By default app is running at 3000 port. We are listening data from remote dapi server via webhooks and passing it UI by Server side events.
2. To run and develop with webhooks, we use ngrok, it will get an ip bound to localhost. WE can pass this ip to dapis form to recieve events .
./ngrok http 3000 will become <http://e3300d33.ngrok.io>
3. data or payment api will get token from redis and hot dapi server , if success it will hot shoot post.webhooks to start listening incoming data from dapi.
4. We will store this data in redis list and access it with lpush / rpop.
5. A SSE will be running in background every and reading data from redis and passing it to UI.

Screen 1 or home screen:
![alt text](/src/public/images/home.png)

Activity example:
![alt text](/src/public/images/user.png)
