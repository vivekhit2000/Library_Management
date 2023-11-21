import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'lm-stencil-library-management',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        {src: 'assets'}
      ]
    },
  ],
  testing: {
    browserHeadless: "new",
  },
};
