Live Link: [https://cow-hut-auth-ochre.vercel.app/](https://cow-hut-auth-ochre.vercel.app/)

Cow Hut Routes:

I have also added the POSTMAN json so you can easily hit the routes

## Auth (User)
<hr />
[POST] - <a>https://cow-hut-auth-ochre.vercel.app/api/v1/auth/signup</a>  
[POST] - <a>https://cow-hut-auth-ochre.vercel.app/api/v1/auth/login</a> 
[POST] - <a>https://cow-hut-auth-ochre.vercel.app/api/v1/auth/refresh-token</a> 

## Auth (Admin)
<hr />
[POST] - <a>https://cow-hut-auth-ochre.vercel.app/api/v1/admins/create-admin</a> 
[POST] - <a>https://cow-hut-auth-ochre.vercel.app/api/v1/admins/login</a> 

## User
<hr />
[GET] - <a>https://cow-hut-auth-ochre.vercel.app/api/v1/users</a> [Admin access] <br />
[GET Single] - <a>https://cow-hut-auth-ochre.vercel.app/api/v1/users/648d4d6c4b51c07888083a10</a> [Admin access] <br />
[PATCH] - <a>https://cow-hut-auth-ochre.vercel.app/api/v1/users/648d4d6c4b51c07888083a10</a> [Admin access] <br />
[DELETE] - <a>https://cow-hut-auth-ochre.vercel.app/api/v1/users/648d565a82ae71caffdca873</a> [Admin access] <br />

## Cows
<hr />
[POST] - <a>https://cow-hut-auth-ochre.vercel.app/api/v1/cows</a> [Seller access] <br />
[GET] - <a>https://cow-hut-auth-ochre.vercel.app/api/v1/cows</a> [Admin, Seller, Buyer access] <br />
[GET Single] - <a>https://cow-hut-auth-ochre.vercel.app/api/v1/cows/648da4e0d1e0a99c8295d2a3</a> [Admin, Seller, Buyer access] <br />
[PATCH] - <a>https://cow-hut-auth-ochre.vercel.app/api/v1/cows/648da4e0d1e0a99c8295d2a3</a> [Admin access] <br />
[DELETE] - <a>https://cow-hut-auth-ochre.vercel.app/api/v1/cows/648ebc0320969e183ebc3e99</a> [Admin access] <br /><br />
Pagination and Filtering routes of Cows <br />
[GET] - <a>https://cow-hut-auth-ochre.vercel.app/api/v1/cows?page=1&limit=10</a> [Admin, Seller, Buyer access] <br />
[GET] - <a>https://cow-hut-auth-ochre.vercel.app/api/v1/cows?sortBy=price&sortOrder=asc</a> [Admin, Seller, Buyer access] <br />
[GET] - <a>https://cow-hut-auth-ochre.vercel.app/api/v1/cows?minPrice=20000&maxPrice=70000</a> [Admin, Seller, Buyer access] <br />
[GET] - <a>https://cow-hut-auth-ochre.vercel.app/api/v1/cows?location=Chattogram</a> [Admin, Seller, Buyer access] <br />
[GET] - <a>https://cow-hut-auth-ochre.vercel.app/api/v1/cows?searchTerm=Cha</a> [Admin, Seller, Buyer access] <br />

## Orders
<hr />
[POST] - <a>https://cow-hut-auth-ochre.vercel.app/api/v1/orders</a> <br />
[GET] - <a>https://cow-hut-auth-ochre.vercel.app/api/v1/orders</a> <br />