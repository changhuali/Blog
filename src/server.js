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
if (__DEV__) {
  createRenderer = createRenderer_dev(app);
} else {
  createRenderer = createRenderer_prod();
}
// Log req info
app.use(logReqInfo);
// Proxy static assets to dist dir
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(express.static(path.resolve(__dirname, '../public')));

app.get('*', (req, res) => {
  const context = {
    url: req.url,
    title: 'Li blog',
  };
  createRenderer()
    .then(renderer => {
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
    })
    .catch(err => {
      res.status(500).end('Internal Server Error');
    });
});

app.listen(9000, () => {
  console.log(`The app has started at http://${config.host}:${config.port}`.green);
});
