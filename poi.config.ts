import { Config } from 'poi'

const config: Config = {
  entry: 'src/index.tsx',
  plugins: [
    {
      resolve: '@poi/plugin-typescript',
      options: {
        babel: true,
      },
    },
  ],
  devServer: {
    port: 4040,
  },
}

export default config
