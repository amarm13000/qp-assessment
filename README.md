For demo assume there are 2 users:
1. user1 as admin role
2. user2 as user role

I the project I have not put no-auth routes login, signup(not a requirement here)
 
 
---------------------- For testing the APIs for the above two users----------------------------
Go to file auth.js in src/middleware

Set roleId 1(admin) and userId:1 
    OR
Set roleId 2(user) and userId:1