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
const buildServerApp = (setRenderer, returnBundle) => {
  const compiler = webpack(serverConfig);
  const mfs = new MemoryFS();
  compiler.outputFileSystem = mfs;
  // reset renderer before each rebuild
  compiler.hooks.beforeCompile.tap('extract_client_manifest', () => {
    setRenderer(null);
  });
  compiler.watch({}, err => {
    if (err) throw err;
    const newBundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'));
    returnBundle(newBundle);
  });
}

// create renderer for dev env
export const createRenderer_dev = (app, fallbackFn) => {
  let bundle;
  let bundleIsReady;
  let clientManifest;
  let clientManifestIsReady;
  let renderer;
  let resolveRenderer = null;
  const updateRenderer = () => {
    if (bundleIsReady && clientManifestIsReady) {
      renderer = createRenderer(bundle, clientManifest)
      if (resolveRenderer) {
        resolveRenderer(renderer);
        resolveRenderer = null;
      }
      bundleIsReady = false;
      clientManifestIsReady = false;
    }
  };
  const setRenderer = (val) => {
    renderer = val;
  }
  buildClientApp(app, newManifest => {
    clientManifest = newManifest;
    clientManifestIsReady = true;
    updateRenderer();
  });
  buildServerApp(setRenderer, newBundle => {
    bundle = newBundle;
    bundleIsReady = true;
    updateRenderer();
  });
  return () => new Promise((resolve) => {
    if (renderer) {
      resolve(renderer);
    } else {
      console.info('[info] wait until bundle finished\n'.yellow);
      resolveRenderer = resolve;
    }
  });
}

// create renderer for prod env
export const createRenderer_prod = () => {
  const bundle = require(bundlePath);
  const clientManifest = require(clientManifestPath);
  const renderer = createRenderer(bundle, clientManifest);
  return () => Promise.resolve(renderer);
}
