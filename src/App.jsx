import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [mods, setMods] = useState([]);
  const meuNick = "gusssw"; // Seu nick aqui

  const buscarMods = () => {
    fetch('http://localhost:3000/mods')
      .then(resposta => resposta.json())
      .then(dados => setMods(dados))
      .catch(erro => console.error("Erro ao buscar mods:", erro));
  };

  useEffect(() => {
    buscarMods();
  }, []);

  return (
    <div className="container">
      <header>
        <div className="perfil">
          <h1>⭐ StarDix Mods</h1>
          <p className="usuario">Logado como: <span>{meuNick}</span></p>
        </div>
        <button onClick={buscarMods} className="btn-atualizar">🔄 Atualizar</button>
      </header>

      <div className="grid-mods">
        {mods.length > 0 ? (
          mods.map(mod => (
            <div key={mod.id} className="card-mod">
              <span className="id-tag">#{mod.id}</span>
              <div className="card-header">
                <h2>{mod.nome}</h2>
                <span className="badge-v">{mod.versao}</span>
              </div>
              <p className="utilidade">{mod.utilidade}</p>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>Nenhum mod catalogado no StarDix ainda...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;