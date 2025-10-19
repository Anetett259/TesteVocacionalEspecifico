// Conecta o código aos elementos do HTML
const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaInstrucoes = document.querySelector(".caixa-instrucoes");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

// Suas 25 questões do Teste Vocacional Específico – Área de Tecnologia da Informação
const questoes = [
    // Programação e Desenvolvimento (1-5)
    { enunciado: "1. Gosto de criar códigos e desenvolver programas do zero." },
    { enunciado: "2. Tenho interesse em aprender novas linguagens de programação." },
    { enunciado: "3. Gosto de resolver bugs e encontrar soluções lógicas para erros." },
    { enunciado: "4. Tenho paciência para testar e aprimorar projetos de software." },
    { enunciado: "5. Sinto satisfação ao ver um sistema ou jogo funcionando corretamente." },

    // Design de Jogos e Experiência do Usuário (UX/UI) (6-10)
    { enunciado: "6. Gosto de desenhar, criar personagens e pensar no visual de jogos." },
    { enunciado: "7. Tenho interesse em como o jogador interage com o jogo." },
    { enunciado: "8. A estética e a experiência do usuário são tão importantes quanto a programação." },
    { enunciado: "9. Tenho criatividade para imaginar mundos e histórias." },
    { enunciado: "10. Gosto de usar ferramentas de design e modelagem 3D." },

    // Banco de Dados e Análise de Dados (11-15)
    { enunciado: "11. Gosto de organizar informações e estruturar dados de forma lógica." },
    { enunciado: "12. Tenho curiosidade sobre como funcionam bancos de dados." },
    { enunciado: "13. Gosto de transformar dados em informações úteis para decisões." },
    { enunciado: "14. Tenho atenção aos detalhes e gosto de analisar padrões." },
    { enunciado: "15. Me interesso por aprender SQL, análise de dados e relatórios." },

    // Redes e Infraestrutura (16-20)
    { enunciado: "16. Gosto de entender como os computadores se comunicam entre si." },
    { enunciado: "17. Tenho interesse em montar, configurar e manter redes." },
    { enunciado: "18. Gosto de lidar com hardware e equipamentos tecnológicos." },
    { enunciado: "19. Tenho paciência para seguir procedimentos técnicos." },
    { enunciado: "20. Gosto de resolver problemas de conexão ou funcionamento." },

    // Inteligência Artificial e Inovação (21-25)
    { enunciado: "21. Tenho interesse em como as máquinas podem aprender e tomar decisões." },
    { enunciado: "22. Gosto de estudar temas como IA, automação e robótica." },
    { enunciado: "23. Tenho curiosidade sobre o futuro da tecnologia e suas aplicações." },
    { enunciado: "24. Gosto de experimentar e criar soluções tecnológicas novas." },
    { enunciado: "25. Tenho interesse em unir criatividade com inovação." }
];

// Correspondência de Questões por Subárea (do seu documento)
// As questões são agrupadas por subárea, então a lógica é mais simples
const correspondenciaQuestoesPorSubarea = {
    "Programação e Desenvolvimento": [1, 2, 3, 4, 5],
    "Design de Jogos e UX/UI": [6, 7, 8, 9, 10],
    "Banco de Dados e Análise de Dados": [11, 12, 13, 14, 15],
    "Redes e Infraestrutura": [16, 17, 18, 19, 20],
    "Inteligência Artificial e Inovação": [21, 22, 23, 24, 25]
};

// Variáveis de estado
let atual = 0;
let questaoAtual;
let pontuacoes = {
    "Programação e Desenvolvimento": 0,
    "Design de Jogos e UX/UI": 0,
    "Banco de Dados e Análise de Dados": 0,
    "Redes e Infraestrutura": 0,
    "Inteligência Artificial e Inovação": 0
};

// As alternativas fixas para a escala de 1 a 5
const alternativasNumericas = [
    { texto: "1 - Discordo totalmente", valor: 1 },
    { texto: "2 - Discordo parcialmente", valor: 2 },
    { texto: "3 - Neutro", valor: 3 },
    { texto: "4 - Concordo parcialmente", valor: 4 },
    { texto: "5 - Concordo totalmente", valor: 5 }
];

function mostraQuestao() {
    if (atual >= questoes.length) {
        mostraResultado();
        return;
    }
    // Esconde as instruções uma vez que o teste começa
    if (atual === 0) {
        caixaInstrucoes.style.display = 'none';
        // Ajusta o título para quando o teste está em andamento
        document.querySelector("h1").textContent = "Teste Vocacional - TI";
    }

    questaoAtual = questoes[atual];
    caixaPerguntas.textContent = questaoAtual.enunciado;
    caixaAlternativas.textContent = "";
    mostraAlternativas();
}

function mostraAlternativas() {
    for (const alternativa of alternativasNumericas) {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa.valor));
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function respostaSelecionada(valorResposta) {
    const numeroQuestao = atual + 1; // Ajuste para começar do 1

    for (const subarea in correspondenciaQuestoesPorSubarea) {
        if (correspondenciaQuestoesPorSubarea[subarea].includes(numeroQuestao)) {
            pontuacoes[subarea] += valorResposta;
        }
    }

    atual++;
    mostraQuestao();
}

function mostraResultado() {
    // Restaura o título original para a tela de resultados
    document.querySelector("h1").textContent = "Seu Perfil na TI!";
    caixaPerguntas.textContent = ""; // Limpa a pergunta
    caixaAlternativas.textContent = "";

    let perfilFinal = "Não foi possível determinar um perfil claro.";
    let maiorPontuacao = -1;
    let subareasComMaiorPontuacao = [];

    for (const subarea in pontuacoes) {
        if (pontuacoes[subarea] > maiorPontuacao) {
            maiorPontuacao = pontuacoes[subarea];
            subareasComMaiorPontuacao = [subarea];
        } else if (pontuacoes[subarea] === maiorPontuacao && maiorPontuacao > 0) {
            subareasComMaiorPontuacao.push(subarea);
        }
    }

    // Descrições das subáreas (do seu documento)
    const perfisSubareas = {
        "Programação e Desenvolvimento": "Raciocínio lógico, foco em código, resolução de problemas e criação de sistemas.",
        "Design de Jogos e UX/UI": "Criatividade, senso estético, empatia com o usuário e visão de experiência de jogo.",
        "Banco de Dados e Análise de Dados": "Organização, atenção aos detalhes, análise de informações e pensamento estratégico com dados.",
        "Redes e Infraestrutura": "Perfil técnico, metódico e voltado à estabilidade e segurança dos sistemas de rede.",
        "Inteligência Artificial e Inovação": "Curiosidade científica, gosto por desafios e visão de futuro na tecnologia."
    };

    if (subareasComMaiorPontuacao.length > 0) {
        if (subareasComMaiorPontuacao.length === 1) {
            perfilFinal = `Sua maior afinidade é com: <strong>${subareasComMaiorPontuacao[0]}</strong>.`;
            perfilFinal += `<p><strong>Perfil e Habilidades Relacionadas:</strong><br>${perfisSubareas[subareasComMaiorPontuacao[0]]}</p>`;
        } else {
            // Se houver empate
            perfilFinal = `Você possui um perfil híbrido, com forte afinidade em: <strong>${subareasComMaiorPontuacao.join(" e ")}</strong>.`;
            perfilFinal += `<p>Isso significa que você tem potencial para atuar em mais de um campo dentro da TI, o que é ótimo para o mercado atual!</p>`;
            subareasComMaiorPontuacao.forEach(subarea => {
                perfilFinal += `<p><strong>${subarea}:</strong> ${perfisSubareas[subarea]}</p>`;
            });
        }
    }

    perfilFinal += `<br><p>Prof.ª Anete T. Trasel – Coordenação do Curso Técnico de Programação de Jogos</p>`;

    textoResultado.innerHTML = `
        <h2>Seu Resultado no Teste Vocacional de TI</h2>
        <p>${perfilFinal}</p>
        <button onclick="location.reload()">Refazer Teste</button>
    `;
    caixaResultado.style.display = 'block';
}

// Inicia o quiz
mostraQuestao();