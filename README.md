# resvg-nitro-demo

svg to image demo use [resvg.js](https://github.com/yisibl/resvg-js) with [nitro.js](https://nitro.unjs.io/guide#quick-start)

## How to start

```
git clone git@github.com:lizy0329-biubiubiu/resvg-nitro-demo.git
cd resvg-nitro-demo
pnpm i
pnpm dev
```

## Send file

1. download the [bruno](https://github.com/usebruno/bruno) client
2. set a post request(http://localhost:3000/api/genImageFormSvg) in bruno-client
3. upload text.svg in body tab
4. send!

the image is gen in your rootDir.

## How to gen poster form client

```javascript
// @cancidas/dom-to-svg was fixed the inlineResources error
import {documentToSVG, elementToSVG, inlineResources} from '@cancidas/dom-to-svg';

// html
<div
    id="poster-baba"
>
  <!-- render content -->
</div>

// script
const svgDocument = elementToSVG(document.getElementById('poster-baba'));
await inlineResources(svgDocument.documentElement);
const svgString = new XMLSerializer().serializeToString(svgDocument);
const blob = new Blob([svgString], {type: 'image/svg+xml'});

const formData = new FormData();
formData.append('file', blob, '测试demo');
await fetch('http://localhost:3000/api/genImageFormSvg', {
    method: 'POST',
    body: formData
});

```

![image](https://github.com/lizy0329-biubiubiu/resvg-nitro-demo/assets/103976180/ee4fe2c2-dcc6-4d66-b34f-069b34df30f7)

![image](https://github.com/lizy0329-biubiubiu/resvg-nitro-demo/assets/103976180/45a965c3-7f0e-4304-95ed-ada8f2199ef8)

