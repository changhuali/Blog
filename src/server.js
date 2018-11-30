import path from 'path';
import express from 'express';
import { createRenderer_dev, createRenderer_prod } from '../tools/webpack/devServer';
import { logReqInfo } from './server/middleware';
import config  from '../config/app.config';

const app = express();

/* 
* Get createRenderer func by env.
* It must be implemented as early as possible,
* otherwise some request for static assets will be process by express.static,
* but express.static will send assets that in the dist directory instead of in memory.
*/
let createRenderer;
let renderer;
if (__IS_DEV_ENV__) {
  createRenderer = createRenderer_dev(app, buildRenderer => renderer = buildRenderer);
} else {
  renderer = createRenderer_prod();
}
// Log req info
app.use(logReqInfo);
// Proxy static assets to dist dir
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(express.static(path.resolve(__dirname, '../public')));

const render = (req, res) => {
  const context = {
    url: req.url,
    title: 'Li blog',
  };
  renderer.renderToString(context)
    .then(html => {
      res.end(html);
    })
    .catch((err) => {
      if (err.code === 404) {
        res.status(404).end('Page not found');
      } else {
        res.status(500).end('Internal Server Error');
      }
    });
}

app.get('*', (req, res) => {
  if (!__IS_DEV_ENV__) {
    render(req, res);
  } else {
    createRenderer()
      .then(() => {
        render(req, res);
      })
      .catch(err => {
        res.status(500).end('Internal Server Error');
      });
  }
});

app.listen(9000, () => {
  console.log(`The app has started at http://${config.host}:${config.port}`.green);
});
