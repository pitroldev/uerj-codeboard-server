/* eslint-disable @typescript-eslint/no-var-requires */
const tsconfig = require('./tsconfig.json')

const { paths } = tsconfig.compilerOptions
const alias = {}
Object.keys(paths).forEach(key => {
  const [value] = paths[key]
  const parsedKey = key.replace('/*', '')
  const parsedValue = value.replace('/*', '')
  alias[parsedKey] = parsedValue
})

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
