// Para usar ES Modules é necessário definir "type": "module" no package.json
import app from './src/app.js';

// process.env.PORT é uma variável no ambiente de produção.
const port = process.env.PORT || 3000;

app.listen(port, (message) => {
    console.log(`The Book House Store API it's running in http://localhost:${port}`);
    
    if (message) {
        console.log(message);
    };
});