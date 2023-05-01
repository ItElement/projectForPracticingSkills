import { PluginItem } from '@babel/core';

export default function (): PluginItem {
    return {
        visitor: {
            Program(path, state) {
                const forbidden = state.opts.props || [];

                path.traverse({
                    // data-testid это JSXIdentifier
                    JSXIdentifier(current) {
                        const nodeName = current.node.name;

                        // удаляем имя data-testid
                        if (forbidden.includes(nodeName)) {
                            current.parentPath.remove();
                        }
                    },
                });
            },
        },
    };
}
