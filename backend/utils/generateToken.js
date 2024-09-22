import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })

    res.cookie("jwt", token, {
        maxAge: 15 * 25 * 60 * 60 * 1000, //milisecond
        httpOnly:true,  //prevent XSS attacks
        sameSite: "strict", //csrf attacks request forgery
        secure: process.env.NODE_ENV !== "development"
    })
}

export default generateTokenAndSetCookie