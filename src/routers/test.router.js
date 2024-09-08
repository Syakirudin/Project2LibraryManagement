import { Router } from "express";


const testRouter = Router();


testRouter.get("/", (req, res) => {
    res.render('homepage', { title: 'Homepage', message: 'Welcome to the Homepage!' });
  });

export default testRouter;