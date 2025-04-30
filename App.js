import { useState } from "react";
import Chart from "chart.js/auto";
import { Radar } from "react-chartjs-2";

// ... (perguntas mesmas de antes)

export default function App() {
  const [respostas, setRespostas] = useState(Array(perguntas.length).fill(null));
  const [resultado, setResultado] = useState(null);
  const [grafico, setGrafico] = useState(null);

  const calcularResultado = () => {
    const total = respostas.reduce((acc, val) => acc + (val ?? 0), 0);

    let nivel = "";
    if (total <= 10) nivel = "🔴 ESTOQUE CEGO";
    else if (total <= 18) nivel = "🟡 ESTOQUE REATIVO";
    else if (total <= 25) nivel = "🟠 ESTOQUE CONTROLADO";
    else nivel = "🟢 ESTOQUE INTELIGENTE";

    setResultado({ texto: nivel, total });
    setGrafico({
      labels: ["Organização", "Automatização", "Controle", "Integração", "Previsibilidade"],
      datasets: [
        {
          label: "Sua Empresa",
          data: gerarRadar(total),
          backgroundColor: "rgba(255,206,86,0.3)",
          borderColor: "#f4c542",
        },
        {
          label: "Construshow Ideal",
          data: [3, 3, 3, 3, 3],
          borderColor: "#4caf50",
          borderDash: [5, 5],
        },
      ],
    });
  };

  const gerarRadar = (pontos) => {
    if (pontos <= 10) return [1, 0.5, 0.5, 0.5, 0.5];
    if (pontos <= 18) return [1.5, 1.5, 1.5, 1.5, 1.5];
    if (pontos <= 25) return [2, 2, 2, 2, 2];
    return [3, 3, 3, 3, 3];
  };

  return (
    <div style={{ maxWidth: '700px', margin: 'auto', padding: '20px' }}>
      <h1>Diagnóstico de Estoque</h1>
      {perguntas.map((pergunta, idx) => (
        <div key={idx} style={{ marginBottom: '20px' }}>
          <p><strong>{pergunta.texto}</strong></p>
          {pergunta.opcoes.map((op, i) => (
            <label key={i} style={{ display: 'block' }}>
              <input
                type="radio"
                name={`pergunta-${idx}`}
                onChange={() => {
                  const nova = [...respostas];
                  nova[idx] = op.pontos;
                  setRespostas(nova);
                }}
              /> {op.texto}
            </label>
          ))}
        </div>
      ))}
      <button onClick={calcularResultado}>Ver Diagnóstico</button>
      {resultado && (
        <div style={{ marginTop: '30px' }}>
          <h2>Resultado: {resultado.texto}</h2>
          <p>Total de pontos: {resultado.total}</p>
          <ul>
            <li><strong>Problema:</strong> Estoque com baixa inteligência operacional.</li>
            <li><strong>Implicação:</strong> Retrabalho, perdas, falta de previsão.</li>
            <li><strong>Atributo:</strong> BI, alerta, coletores, integração filiais.</li>
            <li><strong>Benefício:</strong> Eficiência, prevenção de ruptura, agilidade.</li>
          </ul>
          <div style={{ width: '100%', maxWidth: 600 }}>
            <Radar data={grafico} />
          </div>
        </div>
      )}
    </div>
  );
}
