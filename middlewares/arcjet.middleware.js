import aj from "../config/arcjet.js"
const arcjetMiddleware = async (req, res, next) => {
    try{
    let decision=await aj.protect(req,{requested:1});    

    if(decision.isDenied()){
        if (decision.reason.isRateLimit()) {
            return res.status(429).json({ error: "Too Many Requests" });
          }

          if(decision.reason.isBot()){
            return res.status(403).json({ error: "Bot Detected" });
          }

          return res.status(403).json({ error: 'Access denied' });

    }

    next();
}catch(error){
    console.log("Error in arcjet middleware",error);
    next(error);
}
}
export default arcjetMiddleware;