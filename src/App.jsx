import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const meuNick = "gusssw";
  const [mods, setMods] = useState([]);

  // Estados para o formulário
  const [nome, setNome] = useState('');
  const [versao, setVersao] = useState('');
  const [utilidade, setUtilidade] = useState('');

  // 1. BUSCAR MODS (GET)
  const buscarMods = () => {
    fetch('http://localhost:3000/mods')
      .then(res => res.json())
      .then(dados => setMods(dados))
      .catch(err => console.error("Erro ao carregar mods:", err));
  };

  useEffect(() => {
    buscarMods();
  }, []);

  // 2. SALVAR NOVO MOD (POST)
  const salvarModNoBanco = (e) => {
    e.preventDefault();
    const novoMod = { nome, versao, utilidade };

    fetch('http://localhost:3000/mods', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoMod)
    })
    .then(res => {
      if (res.ok) {
        buscarMods();
        setNome(''); setVersao(''); setUtilidade('');
      }
    })
    .catch(err => console.error("Erro ao salvar:", err));
  };

  // 3. DELETAR MOD (DELETE)
  const eliminarMod = (id) => {
    if (window.confirm("Deseja mesmo remover este mod do painel StarDix?")) {
      fetch(`http://localhost:3000/mods/${id}`, {
        method: 'DELETE',
      })
      .then(res => {
        if (res.ok) buscarMods();
      })
      .catch(err => console.error("Erro ao eliminar:", err));
    }
  };

  return (
    <div className="container">
      <header>
        <div className="perfil">
          <h1>⭐ StarDix Mods</h1>
          <p className="usuario">Logado como: <span>{meuNick}</span></p>
        </div>
      </header>

      <section className="form-container">
        <h2>➕ Cadastrar Novo Mod</h2>
        <form onSubmit={salvarModNoBanco}>
          <div className="input-group">
            <input 
              type="text" placeholder="Nome do Mod" 
              value={nome} onChange={(e) => setNome(e.target.value)} required 
            />
            <input 
              type="text" placeholder="Versão" 
              value={versao} onChange={(e) => setVersao(e.target.value)} required 
            />
          </div>
          <textarea 
            placeholder="Para que serve este mod?" 
            value={utilidade} onChange={(e) => setUtilidade(e.target.value)} required
          ></textarea>
          <button type="submit" className="btn-salvar">Adicionar ao Banco de Dados</button>
        </form>
      </section>

      <hr />

      <div className="grid-mods">
        {mods.map(mod => (
          <div key={mod.id} className="card-mod">
            <span className="id-tag">#{mod.id}</span>
            <button className="btn-eliminar" onClick={() => eliminarMod(mod.id)}>Excluir</button>
            <div className="card-header">
              <h2>{mod.nome}</h2>
              <span className="badge-v">{mod.versao}</span>
            </div>
            <p className="utilidade">{mod.utilidade}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;