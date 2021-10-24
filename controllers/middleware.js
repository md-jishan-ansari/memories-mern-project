import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            console.log("you are not logged in! Please login to get access.");
            return res.status(400).json({ message: "Yu are not logged in Please login to get access." });
        }
        console.log(token);
        const isCustomAuth = token?.length < 500;

        let decodedData, userId;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, process.env.JWT_SECRET);

            userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);

            userId = decodedData?.sub;
        }

        req.userId = userId;

        next();
    } catch (error) {
        console.log("auth error:-", error);
    }
};

export default auth;
