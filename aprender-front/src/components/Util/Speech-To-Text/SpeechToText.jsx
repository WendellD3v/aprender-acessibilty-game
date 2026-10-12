
import { useState } from "react";

export default function SpeechToText() {
  const [texto, setTexto] = useState("");
  const [ouvindo, setOuvindo] = useState(false);

  function iniciarReconhecimento() {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Seu navegador não suporta reconhecimento de voz.");
      console.log("Seu navegador não suporta reconhecimento de voz.")
      return;
    }
    console.log('passou')
    const reconhecimento = new SpeechRecognition();

    reconhecimento.lang = "pt-BR";
    reconhecimento.continuous = false;
    reconhecimento.interimResults = true;

    reconhecimento.onresult = (event) => {
      let resultado = "";

      for (let i = 0; i < event.results.length; i++) {
        resultado += event.results[i][0].transcript + " ";
      }

      console.log(event.results)
      setTexto(resultado.trim());
    };

    reconhecimento.onstart = () => setOuvindo(true);
    reconhecimento.onend = () => setOuvindo(false);

    reconhecimento.onerror = (event) => {
      console.error("Erro no reconhecimento:", event.error);
      setOuvindo(false);
    };

    reconhecimento.start();

    window.reconhecimentoVoz = reconhecimento;
  }

  function pararReconhecimento() {
    window.reconhecimentoVoz?.stop();
    setOuvindo(false);
  }

  return (
    <main>
      <h1>Conversor de voz para texto</h1>

      <button onClick={iniciarReconhecimento} disabled={ouvindo}>
        Iniciar gravação
      </button>

      <button onClick={pararReconhecimento} disabled={!ouvindo}>
        Parar gravação
      </button>

      <p>{ouvindo ? "Ouvindo..." : "Microfone parado"}</p>

      <textarea
        value={texto}
        onChange={(event) => setTexto(event.target.value)}
        placeholder="O texto reconhecido aparecerá aqui..."
        rows={10}
        cols={50}
      />
    </main>
  );
}
