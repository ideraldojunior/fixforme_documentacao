/**
 * Cliente de API para comunicação com o backend Spring Boot.
 *
 * ⚠️ AJUSTE AQUI:
 * - Troque BASE_URL pelo endereço real do seu backend (IP da máquina na rede
 *   local, já que o emulador/celular não enxerga "localhost" do seu PC).
 *   Ex: 'http://192.168.0.10:8080/api'
 * - Se os nomes dos campos que o backend devolve forem diferentes dos usados
 *   aqui (nome, email, avaliacao, especializacoes, fotoUrl), ajuste a
 *   interface `Prestador` e os pontos onde ela é usada nas telas.
 */

export const BASE_URL = 'http://192.168.0.10:8080/api';

/**
 * 🧪 MODO MOCK
 * Deixe true para testar a busca/filtro/navegação sem precisar do backend
 * rodando. Quando o Spring Boot estiver pronto, é só mudar para false.
 */
export const USE_MOCK = true;

const MOCK_DELAY_MS = 500; // simula latência de rede

const MOCK_PRESTADORES: Prestador[] = [
  {
    id: 1,
    nome: 'Cleber Santana',
    email: 'cleber@gmail.com',
    avaliacao: 4.5,
    especializacoes: ['Azulejista', 'Pintor'],
    fotoUrl: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: 2,
    nome: 'Marcos Oliveira',
    email: 'marcos.oliveira@gmail.com',
    avaliacao: 4.8,
    especializacoes: ['Pintor', 'Gesseiro'],
    fotoUrl: 'https://i.pravatar.cc/150?img=13',
  },
  {
    id: 3,
    nome: 'Ana Paula Ferreira',
    email: 'ana.ferreira@gmail.com',
    avaliacao: 4.2,
    especializacoes: ['Eletricista'],
    fotoUrl: 'https://i.pravatar.cc/150?img=45',
  },
  {
    id: 4,
    nome: 'João Pereira',
    email: 'joao.pereira@gmail.com',
    avaliacao: 3.9,
    especializacoes: ['Encanador', 'Azulejista'],
    fotoUrl: 'https://i.pravatar.cc/150?img=33',
  },
  {
    id: 5,
    nome: 'Roberta Lima',
    email: 'roberta.lima@gmail.com',
    avaliacao: 5,
    especializacoes: ['Marceneiro'],
    fotoUrl: 'https://i.pravatar.cc/150?img=48',
  },
];

function simularDelay<T>(valor: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(valor), MOCK_DELAY_MS));
}

export interface Prestador {
  id: number | string;
  nome: string;
  email: string;
  avaliacao: number; // ex: 4.5
  especializacoes: string[];
  fotoUrl?: string; // URL da foto de perfil (se não vier, usamos um placeholder)
}

export interface EnvioServicoPayload {
  prestadorId: number | string;
  descricao: string;
  valor: number;
}

/**
 * Busca prestadores filtrando por especialização.
 * Se `especializacao` vier vazio, o backend pode optar por devolver todos
 * (ajuste essa regra no controller do Spring conforme preferir).
 */
export async function buscarPrestadores(especializacao: string): Promise<Prestador[]> {
  if (USE_MOCK) {
    const termo = especializacao.trim().toLowerCase();

    const filtrados = !termo
      ? MOCK_PRESTADORES
      : MOCK_PRESTADORES.filter((p) =>
          p.especializacoes.some((esp) => esp.toLowerCase().includes(termo))
        );

    return simularDelay(filtrados);
  }

  const url = `${BASE_URL}/prestadores?especializacao=${encodeURIComponent(especializacao)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Erro ao buscar prestadores (status ${response.status})`);
  }

  return response.json();
}

/**
 * Busca os detalhes de um único prestador pelo id.
 */
export async function buscarPrestadorPorId(id: string | number): Promise<Prestador> {
  if (USE_MOCK) {
    const encontrado = MOCK_PRESTADORES.find((p) => String(p.id) === String(id));

    if (!encontrado) {
      throw new Error(`Prestador com id ${id} não encontrado (mock)`);
    }

    return simularDelay(encontrado);
  }

  const url = `${BASE_URL}/prestadores/${id}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Erro ao buscar prestador (status ${response.status})`);
  }

  return response.json();
}

/**
 * Envia a solicitação de serviço (descrição + valor) para um prestador.
 */
export async function enviarServico(payload: EnvioServicoPayload): Promise<void> {
  if (USE_MOCK) {
    console.log('[MOCK] Serviço "enviado":', payload);
    await simularDelay(null);
    return;
  }

  const response = await fetch(`${BASE_URL}/servicos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Erro ao enviar serviço (status ${response.status})`);
  }
}