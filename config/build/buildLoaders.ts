import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';

export function buildLoaders({isDev}: BuildOptions):webpack.RuleSetRule[] {

  const cssLoader = {
      test: /\.s[ac]ss$/i,
      use: [
        // Creates `style` nodes from JS strings
        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        // Translates CSS into CommonJS
        {
          loader: "css-loader",
          // добавление css модулей
          options: {
            modules: {
              // для работы с модулями и обычными файлами совместно
              auto: (resPath: string) => Boolean(resPath.includes('.module.')),
              localIdentName: isDev
                ? '[path][name]__[local]--[hash:base64:5]'
                : '[hash:base64:8]'
            },
          }
        },
        // Compiles Sass to CSS
        "sass-loader",
      ],
    }

  // Если не используем тайпскрипт, то нужен babel-loader
  const typescriptLoader = {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    }

  return [
    typescriptLoader,
    cssLoader,
  ]
}