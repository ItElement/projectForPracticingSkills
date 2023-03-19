import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildResolvers } from './buildResolvers';
import { buildDevServer } from './buildDevServer';

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const { mode, paths, isDev } = options;

    return {
        mode,
        // Стартовая точка
        entry: paths.entry,
        // Куда и как будем делать сборку приложения
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
            publicPath: '/',
        },
        plugins: buildPlugins(options),
        module: {
            // обработка файлов выходящих за рамки js
            rules: buildLoaders(options),
        },
        // расширения, в которых при импорте не будем указывать расширения
        resolve: buildResolvers(options),
        // отслеживаем где произошла ошибка
        // также проверяем, если продакшн версия, то отключаем
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,
    };
}
