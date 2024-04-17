import fs from 'fs';
import path from 'path';

export const writeToFileSync = (file, data, clean = true) => {
  if (fs.existsSync(file) && clean) {
    fs.rmSync(file);
  }
  const directory = path.dirname(file);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
  fs.writeFileSync(file, data);
};
