import fs from "fs";
import path from "path";

const dynamicImportDefaults = async (dirUrl: string) => {
    const absoluteDir = path.resolve(dirUrl);
    const files = fs.readdirSync(absoluteDir);
    const modules = [];

    for (const file of files) {
        if (file.endsWith(".js") || file.endsWith(".ts")) {
            const fileName = path.basename(file, path.extname(file));
            const fullPath = path.join(absoluteDir, file);

            const imported = require(fullPath);

            modules.push({
                moduleName: fileName,
                moduleImported: imported.default || imported,
            });
        }
    }

    return modules;
}

export default dynamicImportDefaults