import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import { BuildOptions } from './types/config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function buildPlugins({paths}:BuildOptions):webpack.WebpackPluginInstance[] {

  return [
    //указываем файл, который используется как шаблон
    new HtmlWebpackPlugin({
      template: paths.html
    }),
    //отслеживаем сколько процентов сборки завершено
    new webpack.ProgressPlugin(),
    // плагин, чтобы css отдельно от js было
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',

    })
  ]
}