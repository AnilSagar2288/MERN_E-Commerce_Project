import jwt from 'jsonwebtoken'


export const getToken = (id) =>{
    return jwt.sign({id},process.env.SECRET_KEY,{expiresIn:'15d'})
}