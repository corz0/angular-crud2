import {Request, Response} from 'express';

import pool from '../database'
import { resolveSoa } from 'dns';

class GamesController{
    public async index(req : Request, res : Response){
        const games = await pool.query('SELECT * FROM games');
        res.json(games);
    }

    public async getOne(req : Request, res : Response): Promise<any>{
        const { id } = req.params;
        const games = await pool.query('SELECT * FROM games where id = ?', [id])
        if (games.length > 0) {
            return res.json(games[0]);
        }
        res.json({text:'GAME not found'})
    }

    public async create(req : Request, res : Response): Promise<void>{
        console.log(req.body);
        await pool.query('INSERT INTO games set ?', [req.body]);
        res.json({message: 'Juego guardado'});
    }

    public async delete(req : Request, res : Response): Promise<void>{
        const { id } = req.params;
        await pool.query('DELETE FROM games WHERE id = ?', [ id]);
        res.json('juego eliminado');
    }

    public async update(req : Request, res : Response): Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE games set ? WHERE id = ?', [req.body, id]);
        res.json('ACTUALIZANDO juego '+ req.params.id);
    }
} 

const gamesController = new GamesController()
export default gamesController;