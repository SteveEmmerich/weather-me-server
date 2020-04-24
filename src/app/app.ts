import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import logger from 'koa-logger';
import fetch from 'cross-fetch';
import cors from '@koa/cors';
import { OK, INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status-codes';
import { Weather } from '../models/weather.model';

// todo: env var
const appID = `2b8e51c9b329939cc6860ddee6f6afe2`;
const externalWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?zip=`;
//const externalZipAPI = `https://smartystreets.com/products/apis/us-zipcode-api?auth-id=13892db6-8d62-8c1b-2f0d-830bce34f2e4&auth-token=CcQdOz1e6OVwDwMFfX8w&zipcode=`;
const app = new Koa();
const router = new Router({ prefix: '/v1' });
app.use(logger());
app.use(cors());
app.use(bodyParser());

router.get('/weather', async (ctx, next) => {
  const { zip } = ctx.query;
  /* WIP add zipcode validation
 try {
    const zipUrl = `${externalZipAPI}${zip}&method=GET`;
    const zipRes = await fetch(zipUrl);
    if(zipRes.status === OK) {
      const responseData = await zipRes.json();
      if (responseData.status === 'invalid_zipcode') {
        ctx.body = 
      }

    }
  }*/
  try {
    const url = `${externalWeatherAPI}${zip}&appid=${appID}&units=imperial`;

    const res = await fetch(url);
    console.log(`request status: ${res.status}, ${res.statusText}`);
    if (res.status === OK) {
      try {
        const responseData = await res.json();
        console.log(`response data: ${JSON.stringify(responseData)}`);
        ctx.status = OK;
        ctx.body = new Weather(responseData);
        next();
      } catch (e) {
        ctx.status = INTERNAL_SERVER_ERROR;
        ctx.body = { msg: `Server encountered an error: ${e}` };
        next();
      }
    } else if (res.status === NOT_FOUND) {
      ctx.status = res.status;
      ctx.body = { msg: 'Invalid Zipcode' };
      next();
    } else {
      ctx.status = res.status;
      ctx.body = res.statusText;
      next();
    }
  } catch (e) {
    ctx.status = INTERNAL_SERVER_ERROR;
    ctx.body = { msg: `Server encountered an error: ${e}` };
    next();
  }
});

app.use(router.routes());
//app.use(router.allowedMethods());

app.on('error', console.error);

export default app;
