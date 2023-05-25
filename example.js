import babel from '@babel/core';

import plugin from './src/index.js';

(async () => {
  const esmSource = `
    import MyMath from './math.js';
    import { sum } from './math.js';

    export { sum };
    export default sum(1, 2);
  `;

  const cjsSource = `
    const MyMath = require('./math.js');
    const { sum } = MyMath;

    module.exports.sum = sum;
    module.exports.default = sum(1, 2);
  `;

  const result = await babel.transform(esmSource, {
    compact: false,
    plugins: [plugin],
    sourceMaps: true,
  });

  console.log(result?.code);
})();
