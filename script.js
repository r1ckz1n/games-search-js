const cardContainer = document.querySelector(".card-container");
const inputBusca = document.querySelector("#input-busca");
let dados = [];

// Função para carregar os dados do JSON.
// Usamos window.onload para garantir que os dados sejam carregados assim que a página estiver pronta.
window.onload = async function() {
  try {
    const resposta = await fetch("data.json");
    dados = await resposta.json();
    renderizarCards(dados); // Exibe todos os cards inicialmente
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  }
}

function iniciarBusca() {
  const termoBusca = inputBusca.value.toLowerCase();

  const resultados = dados.filter(dado => {
    const nome = dado.nome.toLowerCase();
    const descricao = dado.descricao.toLowerCase();
    return nome.includes(termoBusca) || descricao.includes(termoBusca);
  });

  renderizarCards(resultados);
}

function renderizarCards(cardsParaRenderizar) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar os novos
    for (const dado of cardsParaRenderizar) {
        const article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p>${dado.ano}</p>
            <p>${dado.descricao}</p>
            <a href="${dado.link}" target="_blank">Saiba mais</a> 
        `;
        cardContainer.appendChild(article);
    }
}

// --- Animação de Hiperespaço ---
function createStarfield() {
    const starCounts = { small: 300, medium: 150, large: 50 };
    const body = document.body;

    // Função para criar um tipo de estrela
    const createStars = (type, count) => {
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.classList.add('star', `star-${type}`);

            // Posição aleatória
            const x = Math.random() * 100;
            const y = Math.random() * 100;

            star.style.left = `${x}vw`;
            star.style.top = `${y}vh`;

            // Duração e atraso da animação aleatórios para um piscar mais natural
            star.style.animationDuration = `${Math.random() * 5 + 3}s`; // Duração entre 3s e 8s
            star.style.animationDelay = `${Math.random() * 5}s`;

            body.appendChild(star);
        }
    };

    createStars('small', starCounts.small);
    createStars('medium', starCounts.medium);
    createStars('large', starCounts.large);
}

createStarfield();
