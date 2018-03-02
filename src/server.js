import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import graphqlHttp from 'koa-graphql';
import mongoose from 'mongoose';
import { schema } from './schema';

const app = new Koa();
const router = Router();
const port = process.env.port || 5000;

mongoose.connect('mongodb://localhost/database');

app.use(bodyParser());

router.all('/graphql');

app.use(router.routes()).use(router.allowedMethods());
app.use(graphqlHttp({
  schema,
  graphiql: true,
}));

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

