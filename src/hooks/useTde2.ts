import { api } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Tde2Indicador {
    nome: string;
    valor: number;
    unidade?: string;
    percentil: number | null;
    interpretacao: string | null;
}

export interface Tde2ResultModel {
    nomePaciente: string;
    anoEscolar: string;
    subteste: "ESCRITA" | "LEITURA" | "ARITMETICA";
    tempoTotalEmSegundos: number;
    resultados: Tde2Indicador[];
}

export interface Tde2IndicadorComPercentil {
    nome: string;
    valor: number;
    unidade?: string;
    percentil: number;
}

export interface Tde2InterpretResult {
    nomePaciente?: string;
    anoEscolar?: string;
    subteste?: string;
    tempoTotalEmSegundos?: number;
    resultados: (Tde2IndicadorComPercentil & { interpretacao: string })[];
}

export interface Tde2RequestPayload {
    nomePaciente: string;
    anoEscolar: string;
    subteste: "ESCRITA" | "LEITURA" | "ARITMETICA";
    pontuacaoTotal: number;
    tempoTotal: number;
    unidadeTempo: "minutos" | "segundos";
    naoSabe: number;
    acertos: number;
    erros: number;
}

export interface Tde2InterpretPayload {
    nomePaciente?: string;
    anoEscolar?: string;
    subteste?: string;
    tempoTotalEmSegundos?: number;
    resultados: Tde2IndicadorComPercentil[];
}

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

/** Passo 1 — envia dados brutos e recebe indicadores calculados (sem percentil) */
export const useTde2Calculate = () => {
    return useMutation({
        mutationFn: async (data: Tde2RequestPayload): Promise<Tde2ResultModel> => {
            const response = await api.post<Tde2ResultModel>("/tde2", data);
            return response.data;
        }
    });
};

/** Passo 2 — envia percentis inseridos manualmente e recebe as interpretações */
export const useTde2Interpret = () => {
    return useMutation({
        mutationFn: async (data: Tde2InterpretPayload): Promise<Tde2InterpretResult> => {
            const response = await api.post<Tde2InterpretResult>("/tde2/interpret", data);
            return response.data;
        }
    });
};
