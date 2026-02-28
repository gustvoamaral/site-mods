import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [nickLogado, setNickLogado] = useState(''); 
  const [inputNick, setInputNick] = useState('');   

  const [mods, setMods] = useState([]);
  const [busca, setBusca] = useState(''); 
  
  const [filtroCategoria, setFiltroCategoria] = useState('Todas');
  const [ordenacao, setOrdenacao] = useState('Recentes');

  const [nome, setNome] = useState('');
  const [versao, setVersao] = useState('');
  const [categoria, setCategoria] = useState('FPS'); 
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
    setNome(''); setVersao(''); setCategoria('FPS'); setUtilidade(''); setIdEmEdicao(null);
  };

  const salvarModNoBanco = (e) => {
    e.preventDefault();
    const dadosMod = { nome, versao, categoria, utilidade }; 

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
    setNome(mod.nome); 
    setVersao(mod.versao); 
    setCategoria(mod.categoria || 'FPS');
    setUtilidade(mod.utilidade); 
    setIdEmEdicao(mod.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fazerLogin = (e) => {
    e.preventDefault();
    if (inputNick.trim() !== '') {
      setNickLogado(inputNick); 
    }
  };

  const sair = () => {
    setNickLogado(''); 
    setInputNick('');
  };

  let modsProcessados = mods.filter(mod => 
    mod.nome.toLowerCase().includes(busca.toLowerCase())
  );

  if (filtroCategoria !== 'Todas') {
    modsProcessados = modsProcessados.filter(mod => (mod.categoria || 'Outros') === filtroCategoria);
  }

  if (ordenacao === 'A-Z') {
    modsProcessados.sort((a, b) => a.nome.localeCompare(b.nome));
  } else if (ordenacao === 'Z-A') {
    modsProcessados.sort((a, b) => b.nome.localeCompare(a.nome));
  } else if (ordenacao === 'Recentes') {
    modsProcessados.sort((a, b) => b.id - a.id);
  }

  const categoriasDisponiveis = ['Todas', 'FPS', 'PvP', 'Visual', 'Utilitário', 'Outros'];

  // ==========================================
  // TELA DE LOGIN 
  // ==========================================
  if (!nickLogado) {
    return (
      <div className="login-tela">
        <form className="login-box" onSubmit={fazerLogin}>
          
          {/* NOVO: DIV QUE ALINHA A LOGO E O TÍTULO */}
          <div className="header-box">
            <img src="https://www.labymod.net/page/tpl/assets/images/white_wolf.png" alt="LabyMod Logo" className="logo-labymod" />
            <h1>LabyMod - Mods</h1>
          </div>

          <p>Digite seu nick do Minecraft para acessar o painel</p>
          <div className="login-avatar-preview">
            <img src={inputNick ? `https://mc-heads.net/avatar/${inputNick}/100` : `https://mc-heads.net/avatar/steve/100`} alt="Preview da Skin" />
          </div>
          <input type="text" placeholder="Seu Nick..." value={inputNick} onChange={(e) => setInputNick(e.target.value)} required className="input-login" />
          <button type="submit" className="btn-salvar">Entrar no Painel</button>
        </form>
      </div>
    );
  }

  // ==========================================
  // PAINEL PRINCIPAL
  // ==========================================
  return (
    <div className="container">
      <header>
        <div className="perfil-header">
          <img src={`https://mc-heads.net/avatar/${nickLogado}/60`} alt="Skin" className="avatar-header" />
          <div className="perfil-textos">
            <h1> Meus Mods</h1>
            <p className="usuario">Logado como: <span>{nickLogado}</span></p>
          </div>
        </div>
        <div className="acoes-header">
          <div className="contador-badge">
            {modsProcessados.length} {modsProcessados.length === 1 ? 'Mod encontrado' : 'Mods encontrados'}
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
            
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="select-form" required>
              <option value="FPS">FPS</option>
              <option value="PvP">PvP</option>
              <option value="Visual">Visual</option>
              <option value="Utilitário">Utilitário</option>
              <option value="Outros">Outros</option>
            </select>
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
        <input type="text" className="search-input" placeholder="🔍 Pesquisar mod pelo nome..." value={busca} onChange={(e) => setBusca(e.target.value)} />
      </div>

      <div className="controlo-container">
        <div className="filtros-categoria">
          {categoriasDisponiveis.map(cat => (
            <button 
              key={cat} 
              className={`btn-categoria ${filtroCategoria === cat ? 'ativo' : ''}`}
              onClick={() => setFiltroCategoria(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <select className="select-ordenacao" value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)}>
          <option value="Recentes">Mais Recentes</option>
          <option value="A-Z">A - Z</option>
          <option value="Z-A">Z - A</option>
        </select>
      </div>

      <div className="grid-mods">
        {modsProcessados.map(mod => (
          <div key={mod.id} className="card-mod">
            <span className="id-tag">#{mod.id}</span>
            <div className="acoes-card">
              <button className="btn-editar" onClick={() => prepararEdicao(mod)}>EDITAR</button>
              <button className="btn-eliminar" onClick={() => eliminarMod(mod.id)}>DELETAR</button>
            </div>
            <div className="card-header">
              <h2>{mod.nome}</h2>
              <span className="badge-v">{mod.versao}</span>
              <span className="badge-cat">{mod.categoria || 'Outros'}</span>
            </div>
            <p className="utilidade">{mod.utilidade}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;