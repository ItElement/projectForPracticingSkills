import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { BuildOptions } from './types/config';

export function buildPlugins(
    {
        paths, isDev, apiUrl, project,
    }: BuildOptions,
): webpack.WebpackPluginInstance[] {
    const isProd = !isDev;

    const plugins = [
        // указываем файл, который используется как шаблон
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        // отслеживаем сколько процентов сборки завершено
        new webpack.ProgressPlugin(),
        // в приложение можем прокидывать глобальные переменные
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
            __PROJECT__: JSON.stringify(project),
        }),
        // определяем кольцевые зависимости
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: true,
        }),
        // проверку типов выносим в отдельный процесс
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
                mode: 'write-references',
            },
        }),
    ];

    if (isDev) {
        // для автоматического обновления при изминениях
        plugins.push(new ReactRefreshWebpackPlugin());
        plugins.push(new webpack.HotModuleReplacementPlugin());
        // для анализа размера бандла
        plugins.push(new BundleAnalyzerPlugin({
            openAnalyzer: false,
        }));
    }

    if (isProd) {
        // плагин, чтобы css отдельно от js был
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }));
        // настраиваем передачу в bundle переводов
        plugins.push(new CopyPlugin({
            patterns: [
                { from: paths.locales, to: paths.buildLocales },
            ],
        }));
    }

    return plugins;
}
