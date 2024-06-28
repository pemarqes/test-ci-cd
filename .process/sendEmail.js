const fs = require("fs");
const nodemailer = require("nodemailer");

// Função para ler o arquivo JSON
function lerArquivoJSON(caminhoArquivo) {
  try {
    const jsonString = fs.readFileSync(caminhoArquivo, "utf8");
    return JSON.parse(jsonString);
  } catch (err) {
    console.error("Erro ao ler o arquivo JSON:", err);
    return null;
  }
}

// Função para enviar email com o Nodemailer
async function enviarEmail(dadosEmail) {
  // Configuração do transporte de email (substitua com seus dados)
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "coleman13@ethereal.email",
      pass: "WY116MAvEVHEzqdgbe"
    }
  });

  // Corpo do email
  let emailBody = `
        <h2>Validação Deploy</h2>
        <p>Status: ${dadosEmail.result.status}</p>
        <p>Data de Conclusão: ${dadosEmail.result.completedDate}</p>
        <p>Componentes Deployed: ${dadosEmail.result.numberComponentsDeployed}</p>
        <p>Id Deployed: ${dadosEmail.result.id}</p>
    `;

  // Opções do email
  let mailOptions = {
    from: "pedro.marques@beecloud.com",
    to: "pedro.marques@beecloud.com",
    subject: "Validação Deploy",
    html: emailBody
  };

  // Enviar email
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email enviado:", info.response);
  } catch (err) {
    console.error("Erro ao enviar email:", err);
  }
}

// Caminho para o arquivo JSON
const caminhoArquivoJSON = "deploy.json";

// Ler o arquivo JSON
const dados = lerArquivoJSON(caminhoArquivoJSON);

// Verificar se foi possível ler o arquivo e enviar o email
if (dados) {
  enviarEmail(dados);
}
