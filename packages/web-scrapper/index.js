import { writeFileSync } from 'fs';
import { scrappingUrls } from './constants.js';
import { fetchTableData } from './src/fetch.js';

export async function getVideoFormats() {
  const colums = {
    // format: 0,
    extensions: 1,
    // container: 2,
    // videoCodecs: 3,
    // audioCodecs: 4,
  };

  const data = await fetchTableData(scrappingUrls.videoFormats, Object.values(colums));

  const dataObj = convertMatrixToObject(data, Object.keys(colums));
  console.log([...data], { ...dataObj });

  dataObj.extensions = dataObj.extensions.map((x) => x.split(' ').filter((x) => x.startsWith('.')));
  console.log({ ...dataObj });

  const extensionsSet = [...new Set(dataObj.extensions.flat().filter((x) => x.startsWith('.')))];
  writeFileSync('./cache/extensions.js', `export const videoExtensions = ${JSON.stringify(extensionsSet)};`);
}

/**
 *
 * @param {any[][]} matrix
 * @param {string[]} labels
 * @returns
 */
function convertMatrixToObject(matrix, labels) {
  const data = {};
  matrix.forEach((row) => {
    row.forEach((element, idx) => {
      data[labels[idx]] ??= [];
      data[labels[idx]].push(element);
    });
  });

  return data;
}

await getVideoFormats();
