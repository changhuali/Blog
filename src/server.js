import path from 'path';
import express from 'express';
import { createRenderer_dev, createRenderer_prod } from '../tools/webpack/devServer';
import { logReqInfo } from './server/middleware';
import config  from '../config/app.config';

const app = express();

// Proxy static assets to dist dir
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(express.static(path.resolve(__dirname, '../public')));

// Log req info
app.use(logReqInfo);

const resError = (res, err) => {
  console.log('---server-side render error'.red, err);
  if (err.code === 404) {
    res.status(404).end('Page not found');
  } else {
    res.status(500).end('Internal Server Error');
  }
}

let renderer;

// This callback func will excute while webpack build
const getRenderer = result => renderer = result;

if (__DEV__) {
  createRenderer_dev(app, getRenderer);
} else {
  createRenderer_prod(getRenderer);
}

app.get('*', (req, res) => {
  const context = {
    url: req.url,
    title: '我的博客',
  };
  renderer.renderToString(context)
    .then(html => {
      res.end(html);
    }).catch(err => {
      resError(res, err);
    });
});

app.listen(9000, () => {
  console.log(`The app has started at http://${config.host}:${config.port}`.green);
});
