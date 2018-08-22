import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import MemoryFS from 'memory-fs';
import { createBundleRenderer } from 'vue-server-renderer';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import serverConfig from './server.config';
import clientConfig from './client.config';

const bundlePath = path.resolve(process.cwd(), 'dist/assets/vue-ssr-server-bundle.json');
const clientManifestPath = path.resolve(process.cwd(), 'dist/assets/vue-ssr-client-manifest.json');

const template = fs.readFileSync(path.resolve(process.cwd(), 'template.html'), 'utf-8');

// create a renderer
const createRenderer = (bundle, clientManifest) => {
  return createBundleRenderer(bundle, {
    template,
    clientManifest,
  });
}

// bundle for client-render
const buildClientApp = (app, returnManifest) => {
  const compiler = webpack(clientConfig);
  const devOption = {
    publicPath: clientConfig.output.publicPath,
    stats: 'minimal',
    hot: true,
  };
  const devMiddleware = webpackDevMiddleware(compiler, devOption);
  const msf = devMiddleware.fileSystem;
  const hotMiddleware = webpackHotMiddleware(compiler);
  app.use(devMiddleware);
  app.use(hotMiddleware);
  compiler.hooks.done.tap('extract_client_manifest', () => {
    const newManifest = JSON.parse(msf.readFileSync(clientManifestPath, 'utf-8'));
    returnManifest(newManifest);
  });
}

// bundle for server-render
const buildServerApp = (returnBundle) => {
  const compiler = webpack(serverConfig);
  const mfs = new MemoryFS();
  compiler.outputFileSystem = mfs;
  compiler.watch({}, err => {
    if (err) throw err;
    const newBundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'));
    returnBundle(newBundle);
  });
}

// create renderer for dev env
export const createRenderer_dev = (app, returnRenderer) => {
  let bundle;
  let bundleIsReady;
  let clientManifest;
  let clientManifestIsReady;
  buildClientApp(app, newManifest => {
    clientManifest = newManifest;
    clientManifestIsReady = true;
    updateRenderer();
  });
  buildServerApp(newBundle => {
    bundle = newBundle;
    bundleIsReady = true;
    updateRenderer();
  });
  const updateRenderer = () => {
    if (bundleIsReady && clientManifestIsReady) {
      const renderer = createRenderer(bundle, clientManifest);
      returnRenderer(renderer);
      bundleIsReady = false;
      clientManifestIsReady = false;
    }
  }
}

// create renderer for prod env
export const createRenderer_prod = (returnRenderer) => {
  const bundle = require(bundlePath);
  const clientManifest = require(clientManifestPath);
  const renderer = createRenderer(bundle, clientManifest);
  returnRenderer(renderer);
}
