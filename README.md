Live Link: [http://localhost:3000](http://localhost:3000)

Application Routes:

## Auth
<hr />
[POST] - api/v1/auth/signup 


## User
<hr />
[GET] - api/v1/users (GET) <br />
[GET Single] - api/v1/users/648d4d6c4b51c07888083a10 <br />
[PATCH] - api/v1/users/648d4d6c4b51c07888083a10 <br />
[DELETE] - api/v1/users/648d565a82ae71caffdca873 <br />

## Cows
<hr />
[POST] - api/v1/cows <br />
[GET] - api/v1/cows <br />
[GET Single] - api/v1/cows/648da4e0d1e0a99c8295d2a3 <br />
[PATCH] - api/v1/cows/648da4e0d1e0a99c8295d2a3 <br />
[DELETE] - api/v1/cows/648ebc0320969e183ebc3e99 <br /><br />
Pagination and Filtering routes of Cows <br />
[GET] - api/v1/cows?page=1&limit=10 <br />
[GET] - api/v1/cows?sortBy=price&sortOrder=asc <br />
[GET] - api/v1/cows?minPrice=20000&maxPrice=70000 <br />
[GET] - api/v1/cows?location=Chattogram <br />
[GET] - api/v1/cows?searchTerm=Cha <br />

## Orders
<hr />
[POST] - api/v1/orders <br />
[GET] - api/v1/orders <br />