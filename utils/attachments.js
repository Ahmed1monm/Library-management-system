import { mkConfig, generateCsv } from "export-to-csv";
import { appendFileSync } from "fs";
import { v4 as uuidv4 } from 'uuid';

export const exportCSV = (data) => {
    const csvConfig = mkConfig({ useKeysAsHeaders: true });
    const csv = generateCsv(csvConfig)(data);
    const filePath = writeFile(csv, "csv");
    return filePath;
}

const writeFile = (data, extension) => {
    try {
        const path = "./assets/";
        const name = uuidv4();
        const file =`${path}${name}.${extension}`
        appendFileSync(file, data);
        return file.slice(1);
    } catch (err) {
        console.error(err);
    }
}