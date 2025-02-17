// const express = require('express');
// const cors = require('cors');

// const app = express();
// const port = 8000;

// // Configuração do CORS para permitir apenas o domínio do seu frontend
// app.use(cors({
//   origin: 'http://localhost:3000', // Domínio do frontend
//   credentials: true,               // Permite o envio de cookies/credenciais
// }));

// app.use(express.json());

// // Rota para obter o token CSRF
// app.get('/get-csrf-token', (req, res) => {
//   const token = 'dummy-csrf-token'; // Exemplo de token; gere um token real em produção
//   res.json({ token });
// });

// // Rota para o cadastro
// app.post('/register', (req, res) => {
//   const csrfToken = req.headers['x-csrf-token'];
  
//   if (csrfToken !== 'dummy-csrf-token') {
//     return res.status(403).json({ message: 'Token CSRF inválido.' });
//   }

//   const formData = req.body;
//   // Processar o cadastro...

//   res.json({ message: 'Cadastro realizado com sucesso!' });
// });

// app.listen(port, () => {
//   console.log(`Servidor rodando na porta ${port}`);
// });
