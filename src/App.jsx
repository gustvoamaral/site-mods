import { useEffect, useState } from 'react';
import './App.css';

function App() {
  // --- ESTADOS DE LOGIN ---
  const [nickLogado, setNickLogado] = useState(''); // Quem está logado
  const [inputNick, setInputNick] = useState('');   // O que está sendo digitado na tela de login

  // --- ESTADOS DO CRUD ---
  const [mods, setMods] = useState([]);
  const [busca, setBusca] = useState(''); 
  const [nome, setNome] = useState('');
  const [versao, setVersao] = useState('');
  const [utilidade, setUtilidade] = useState('');
  const [idEmEdicao, setIdEmEdicao] = useState(null);

  const buscarMods = () => {
    fetch('http://localhost:3000/mods')
      .then(res => res.json())
      .then(dados => setMods(dados))
      .catch(err => console.error("Erro ao carregar mods:", err));
  };

  useEffect(() => {
    buscarMods();
  }, []);

  const limparFormulario = () => {
    setNome(''); setVersao(''); setUtilidade(''); setIdEmEdicao(null);
  };

  const salvarModNoBanco = (e) => {
    e.preventDefault();
    const dadosMod = { nome, versao, utilidade };

    const url = idEmEdicao ? `http://localhost:3000/mods/${idEmEdicao}` : 'http://localhost:3000/mods';
    const metodo = idEmEdicao ? 'PUT' : 'POST';

    fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosMod)
    })
    .then(res => {
      if (res.ok) { buscarMods(); limparFormulario(); }
    });
  };

  const eliminarMod = (id) => {
    if (window.confirm("Deseja remover este mod?")) {
      fetch(`http://localhost:3000/mods/${id}`, { method: 'DELETE' })
      .then(res => { if (res.ok) buscarMods(); });
    }
  };

  const prepararEdicao = (mod) => {
    setNome(mod.nome); setVersao(mod.versao); setUtilidade(mod.utilidade); setIdEmEdicao(mod.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fazerLogin = (e) => {
    e.preventDefault();
    if (inputNick.trim() !== '') {
      setNickLogado(inputNick); // Salva o nick e avança para o painel
    }
  };

  const sair = () => {
    setNickLogado(''); // Limpa o nick e volta pra tela de login
    setInputNick('');
  };

  const modsFiltrados = mods.filter(mod => 
    mod.nome.toLowerCase().includes(busca.toLowerCase())
  );

  // ==========================================
  // TELA DE LOGIN (Aparece se não tiver logado)
  // ==========================================
  if (!nickLogado) {
    return (
      <div className="login-tela">
        <form className="login-box" onSubmit={fazerLogin}>
          <h1>LabyMod - Mods</h1>
          <p>Digite seu nick do Minecraft para acessar o painel</p>
          
          {/* Avatar dinâmico na tela de login (muda enquanto digita) */}
          <div className="login-avatar-preview">
            <img 
              src={inputNick ? `https://mc-heads.net/avatar/${inputNick}/100` : `https://mc-heads.net/avatar/steve/100`} 
              alt="Preview da Skin" 
            />
          </div>

          <input 
            type="text" 
            placeholder="Seu Nick..." 
            value={inputNick} 
            onChange={(e) => setInputNick(e.target.value)} 
            required 
            className="input-login"
          />
          <button type="submit" className="btn-salvar">Entrar no Painel</button>
        </form>
      </div>
    );
  }

  // ==========================================
  // TELA PRINCIPAL (Seu painel completo)
  // ==========================================
  return (
    <div className="container">
      <header>
        {/* NOVO: Header com a foto do jogador */}
        <div className="perfil-header">
          <img src={`https://mc-heads.net/avatar/${nickLogado}/60`} alt="Skin do Jogador" className="avatar-header" />
          <div className="perfil-textos">
            <h1>LabyMod - Mods</h1>
            <p className="usuario">Logado como: <span>{nickLogado}</span></p>
          </div>
        </div>
        
        <div className="acoes-header">
          <div className="contador-badge">
            {modsFiltrados.length} {modsFiltrados.length === 1 ? 'Mod' : 'Mods'}
          </div>
          <button className="btn-sair" onClick={sair}>Sair</button>
        </div>
      </header>

      <section className="form-container">
        <h2>{idEmEdicao ? `✏️ Editando Mod #${idEmEdicao}` : '➕ Cadastrar Novo Mod'}</h2>
        <form onSubmit={salvarModNoBanco}>
          <div className="input-group">
            <input type="text" placeholder="Nome do Mod" value={nome} onChange={(e) => setNome(e.target.value)} required />
            <input type="text" placeholder="Versão" value={versao} onChange={(e) => setVersao(e.target.value)} required />
          </div>
          <textarea placeholder="Utilidade..." value={utilidade} onChange={(e) => setUtilidade(e.target.value)} required></textarea>
          
          <div className="botoes-form">
            <button type="submit" className="btn-salvar">
              {idEmEdicao ? 'Salvar Alterações' : 'Adicionar ao Banco'}
            </button>
            {idEmEdicao && (
              <button type="button" className="btn-cancelar" onClick={limparFormulario}>Cancelar</button>
            )}
          </div>
        </form>
      </section>

      <div className="search-container">
        <input 
          type="text" className="search-input" placeholder="🔍 Pesquisar mod pelo nome..." 
          value={busca} onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className="grid-mods">
        {modsFiltrados.map(mod => (
          <div key={mod.id} className="card-mod">
            <span className="id-tag">#{mod.id}</span>
            <div className="acoes-card">
              <button className="btn-editar" onClick={() => prepararEdicao(mod)}>EDITAR</button>
              <button className="btn-eliminar" onClick={() => eliminarMod(mod.id)}>DELETAR</button>
            </div>
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