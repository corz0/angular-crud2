import {Request, Response} from 'express';

class IndexController{
    public index(req : Request, res : Response){
        res.send('API is in /api/games');
    }
} 

const indexController = new IndexController()
export default  indexController;