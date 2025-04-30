
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const perguntas = [
  {
    texto: "Como sua empresa organiza o estoque físico?",
    opcoes: [
      { texto: "Sem padrão definido.", pontos: 0 },
      { texto: "Por categorias sem mapeamento.", pontos: 1 },
      { texto: "Setores definidos.", pontos: 2 },
      { texto: "Ruas, avenidas e pulmões com coletores.", pontos: 3 },
    ],
  },
  {
    texto: "Como você analisa o giro de estoque?",
    opcoes: [
      { texto: "Não analisa.", pontos: 0 },
      { texto: "Só quando há falta ou excesso.", pontos: 1 },
      { texto: "Com planilhas mensais.", pontos: 2 },
      { texto: "Com BI automatizado.", pontos: 3 },
    ],
  },
  {
    texto: "Como é feita a conferência de entrada dos produtos?",
    opcoes: [
      { texto: "Visual e sem registro.", pontos: 0 },
      { texto: "Papel e planilha.", pontos: 1 },
      { texto: "Leitor de código simples.", pontos: 2 },
      { texto: "Conferência cega com coletores.", pontos: 3 },
    ],
  },
  {
    texto: "Como trata produtos com avarias?",
    opcoes: [
      { texto: "Mistura no estoque.", pontos: 0 },
      { texto: "Separa sem registro.", pontos: 1 },
      { texto: "Registra como devolução.", pontos: 2 },
      { texto: "Classifica e rastreia no sistema.", pontos: 3 },
    ],
  },
  {
    texto: "Como é a gestão entre filiais?",
    opcoes: [
      { texto: "Cada uma por si.", pontos: 0 },
      { texto: "Telefone ou mensagens.", pontos: 1 },
      { texto: "Planilhas compartilhadas.", pontos: 2 },
      { texto: "Consulta saldos em tempo real.", pontos: 3 },
    ],
  },
  {
    texto: "O que acontece ao atingir estoque mínimo?",
    opcoes: [
      { texto: "Só percebe na ruptura.", pontos: 0 },
      { texto: "Aviso manual do vendedor.", pontos: 1 },
      { texto: "Planilha semanal.", pontos: 2 },
      { texto: "Alerta automático + sugestão de compra.", pontos: 3 },
    ],
  },
  {
    texto: "Como evita vendas sem estoque?",
    opcoes: [
      { texto: "Não evita.", pontos: 0 },
      { texto: "Consulta visual antes.", pontos: 1 },
      { texto: "Alerta manual no sistema.", pontos: 2 },
      { texto: "Bloqueio ou redirecionamento automático.", pontos: 3 },
    ],
  },
  {
    texto: "Como trata múltiplos de venda?",
    opcoes: [
      { texto: "Vende qualquer quantidade.", pontos: 0 },
      { texto: "Depende da memória do vendedor.", pontos: 1 },
      { texto: "Há aviso na venda.", pontos: 2 },
      { texto: "Obrigação automatizada no sistema.", pontos: 3 },
    ],
  },
  {
    texto: "Como controla produtos reservados para entrega futura?",
    opcoes: [
      { texto: "Mistura com estoque comum.", pontos: 0 },
      { texto: "Etiqueta física.", pontos: 1 },
      { texto: "Registro em planilha.", pontos: 2 },
      { texto: "Separação automática como saldo reservado.", pontos: 3 },
    ],
  },
  {
    texto: "Como é feita a separação para entrega?",
    opcoes: [
      { texto: "Só começa após pagamento.", pontos: 0 },
      { texto: "Manual e lenta.", pontos: 1 },
      { texto: "Separação sem integração com vendas.", pontos: 2 },
      { texto: "Alerta automático após carrinho fechado.", pontos: 3 },
    ],
  },
];

export default function App() {
  const [respostas, setRespostas] = useState(Array(perguntas.length).fill(null));
  const [resultado, setResultado] = useState(null);

  const calcularResultado = () => {
    const total = respostas.reduce((acc, val) => acc + (val ?? 0), 0);
    if (total <= 10) setResultado("🔴 ESTOQUE CEGO");
    else if (total <= 18) setResultado("🟡 ESTOQUE REATIVO");
    else if (total <= 25) setResultado("🟠 ESTOQUE CONTROLADO");
    else setResultado("🟢 ESTOQUE INTELIGENTE");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Diagnóstico de Estoque</h1>
      {perguntas.map((pergunta, idx) => (
        <div key={idx} className="mb-4 border p-4 rounded">
          <p className="font-semibold mb-2">{pergunta.texto}</p>
          {pergunta.opcoes.map((op, i) => (
            <div key={i} className="mb-1">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`pergunta-${idx}`}
                  onChange={() => {
                    const nova = [...respostas];
                    nova[idx] = op.pontos;
                    setRespostas(nova);
                  }}
                />
                {op.texto}
              </label>
            </div>
          ))}
        </div>
      ))}
      <Button onClick={calcularResultado}>Ver Diagnóstico</Button>
      {resultado && (
        <div className="mt-6 text-xl font-bold text-center">
          Resultado: {resultado}
        </div>
      )}
    </div>
  );
}
