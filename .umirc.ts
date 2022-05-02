import { defineConfig } from 'dumi';
import { join } from 'path';
import { readdirSync } from 'fs';

const pkgList = readdirSync(join(__dirname, 'packages')).filter((pkg) => pkg.charAt(0) !== '.');

const alias = pkgList.reduce((pre, pkg) => {
  pre[`@building-block/${pkg}`] = join(__dirname, 'packages', pkg, 'src');
  return {
    ...pre,
  };
}, {});

const tailPkgList = pkgList
  .map((path) => [join('packages', path, 'src'), join('packages', path, 'src', 'components')])
  .reduce((acc, val) => acc.concat(val), []);

// more config: https://d.umijs.org/config
export default defineConfig({
  title: 'building-block',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  locales: [['zh-CN', '中文']],
  resolve: {
    includes: ['packages/editor', 'docs'],
  },
  alias: {
    ...alias
  },
  navs: {
    'zh-CN': [
      null,
      {
        title: 'v0.1.0',
      },
    ],
  },
});
