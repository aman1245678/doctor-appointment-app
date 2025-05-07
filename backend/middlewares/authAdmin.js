import jwt from 'jsonwebtoken';

// Admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers;

        if (!atoken) {
            return res.json({success:false,message:'Not Authorized login Again'})
        }

        // Verify the token
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

        // Check if the decoded token contains the admin role or any other identifier
        // Assuming the token payload contains a 'role' field
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({success:false,message:'Not Authorized login Again'})
        }

        // If everything is fine, proceed to the next middleware or route handler
        next();

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
       
    }
};

export default authAdmin;