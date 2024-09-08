import { Router } from "express";


const NotFoundRouter = Router();


NotFoundRouter.get('*', (_, res) => {
  res.status(404).render('pageNotFound404');
});


export default NotFoundRouter;