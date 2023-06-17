Live Link: [http://localhost:3000](http://localhost:3000)

Application Routes:

## Auth
<hr />
[POST] - api/v1/auth/signup 


## User
<hr />
[GET] - api/v1/users (GET) <br />
api/v1/users/6177a5b87d32123f08d2f5d4 (Single GET) <br />
api/v1/users/6177a5b87d32123f08d2f5d4 (PATCH) <br />
api/v1/users/6177a5b87d32123f08d2f5d4 (DELETE) <br />

## Cows
<hr />
api/v1/cows (POST) <br />
api/v1/cows (GET) <br />
api/v1/cows/6177a5b87d32123f08d2f5d4 (Single GET) <br />
api/v1/cows/6177a5b87d32123f08d2f5d4 (PATCH) <br />
api/v1/cows/6177a5b87d32123f08d2f5d4 (DELETE) <br />
Pagination and Filtering routes of Cows <br />
api/v1/cows?pag=1&limit=10 <br />
api/v1/cows?sortBy=price&sortOrder=asc <br />
api/v1/cows?minPrice=20000&maxPrice=70000 <br />
api/v1/cows?location=Chattogram <br />
api/v1/cows?searchTerm=Cha <br />

## Orders
<hr />
api/v1/orders (POST) <br />
api/v1/orders (GET) <br />