import { promises } from 'node:fs';
import { join, resolve } from 'node:path';
import { Resvg } from '@resvg/resvg-js';

const __dirname = resolve();

export default eventHandler(async (event) => {
    const formData = await readMultipartFormData(event);

    formData.forEach((item) => {
        if (item.type === 'image/svg+xml') {
            const resvg = new Resvg(item.data, {
                fitTo: {
                    mode: 'width',
                    value: 1000,
                },
                font: {
                    fontFiles: [
                        join(
                            __dirname,
                            'server/public/SourceHanSansCN-Regular.otf'
                        ),
                    ], // Load custom fonts.
                    loadSystemFonts: false, // It will be faster to disable loading system fonts.
                    defaultFontFamily: 'Source Han Sans CN',
                },
                logLevel: 'debug',
            });

            const pngData = resvg.render();
            const pngBuffer = pngData.asPng();

            console.info(
                'Original SVG Size:',
                `${resvg.width} x ${resvg.height}`
            );
            console.info(
                'Output PNG Size  :',
                `${pngData.width} x ${pngData.height}`
            );

            // 写入系统
            promises.writeFile(
                join(__dirname, `./${item.name}-out.png`),
                pngBuffer
            );
        }
    });

    return { message: '⚡️ Tadaa!', images: ['img/pig.png'] };
});
