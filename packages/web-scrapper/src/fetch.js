import fs from 'fs-extra';
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

/**
 * @param {*} url
 */
export async function fetchWebpage(url) {
  const name = url.split('/').at(-1);
  const dir = './cache';

  if (!fs.existsSync(dir)) fs.emptyDirSync(dir);

  const fileName = `${dir}/${name}.html`;

  if (fs.existsSync(fileName)) {
    const fileStat = fs.statSync(fileName);

    const now = new Date().getTime();
    const endTime = new Date(fileStat.mtime).getTime() + 86400000; // 1days in miliseconds

    if (fileStat && now < endTime) return fs.promises.readFile(fileName, { encoding: 'utf-8' });
  }

  const data = await (await fetch(url)).text();
  fs.writeFileSync(fileName, data);

  return data;
}

/**
 * @param {string} url
 * @param {Array<number>} columnNumbers
 * @returns
 */
export async function fetchTableData(url, columnNumbers) {
  try {
    const html = await fetchWebpage(url);

    const { window } = new JSDOM(html);
    const document = window._document;

    const tableData = [];

    const rows = document.querySelectorAll('table.wikitable tbody tr');
    rows.forEach((/** @type {{ querySelectorAll: (arg0: string) => any; }} */ row) => {
      const columns = row.querySelectorAll('td');

      const rowData = [];
      columnNumbers.forEach((idx) => {
        if (idx < columns.length) {
          const data = columns[idx].textContent.trim();
          rowData.push(data);
        }
      });
      tableData.push(rowData);
    });

    return tableData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}
