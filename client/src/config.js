let DB_ROUTE;
if (process.env.NODE_ENV === 'production') {
    DB_ROUTE = "https://memories202021.herokuapp.com/";
} else {
    DB_ROUTE = "http://localhost:8000";
}

export default DB_ROUTE;