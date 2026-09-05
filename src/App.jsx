import { useState } from 'react'
import './App.css'

function App() {
  const [activeScreen, setActiveScreen] = useState("home");

  const menuItems = [
    { id: "agenda", label: "Agenda", icon: "▣" },
    { id: "notifications", label: "Avisos", icon: "◉" },
    { id: "music", label: "Música", icon: "♫" },
    { id: "settings", label: "Ajustes", icon: "⚙" },
  ];

  return (
    <>
      <main className='ecora'>
        <section className='watch'>
          <div className='watch-glow' />

          <div className='watch-header'>
            <span>ECORA</span>
            <span className='status'>● ONLINE</span>
          </div>

          {activeScreen === "home" && (
            <section className='home-screen'>
              <p className='greeting'>BEM-VINDO AO</p>

              <h1>ECORA</h1>

              <div className='clock'>
                {new Date().toLocaleDateString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>

              <p className='date'>
                {new Date().toLocaleDateString("pt-BR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </p>

              <button className='main-button'
                onClick={() => setActiveScreen("menu")}>
                ABRIR ECORA
              </button>
            </section>
          )}

          {activeScreen === "menu" && (
            <section className='menu-screen'>
              <div className='screen-title'>
                <span>MENU</span>
                <small>ECORA OS</small>
              </div>

              <div className='menu-grid'>
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    className='menu-item'
                    onClick={() => setActiveScreen(item.id)}>
                    <span className='menu-icon'>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>

              <button
                className='back-button'
                onClick={() => setActiveScreen("home")}>
                ← VOLTAR
              </button>
            </section>
          )}

          {activeScreen === "agenda" && (
            <section className='content-screen'>
              <div className='screen-title'>
                <span>AGENDA</span>
                <small>HOJE</small>
              </div>

              <div className='agenda-item'>
                <strong>09:00</strong>
                <span>Aula / Projeto</span>
              </div>

              <div className='agenda-item'>
                <strong>14:00</strong>
                <span>Desenvolvimento ECORA</span>
              </div>

              <div className='agenda-item'>
                <strong>19:30</strong>
                <span>Estudos</span>
              </div>

              <button
                className='back-button'
                onClick={() => setActiveScreen("menu")}>
                ← MENU
              </button>
            </section>
          )}

          {activeScreen === "notifications" && (
            <section className='content-screen'>
              <div className='screen-title'>
                <span>AVISOS</span>
                <small>3 NOVOS</small>
              </div>

              <div className='notification'>
                <strong>ECORA</strong>
                <span>Sistema iniciado com sucesso</span>
              </div>

              <div className='notification'>
                <strong>AGENDA</strong>
                <span>Você possui compromissos hoje.</span>
              </div>

              <div className='notification'>
                <strong>SISTEMA</strong>
                <span>Todos os módulos estão operacionais.</span>
              </div>

              <button
                className='back-button'
                onClick={() => setActiveScreen("menu")}>
                ← MENU
              </button>
            </section>
          )}

          {activeScreen === "music" && (
            <section className='content-screen music-screen'>
              <div className='screen-title'>
                <span>MÚSICA</span>
                <small>ECORA AUDIO</small>
              </div>

              <div className='album-placeholder'>
                <span>♫</span>
              </div>

              <h2>ECORA EXPERIENCE</h2>
              <p>Interface de demonstração</p>

              <div className='music-controls'>
                <button>◀</button>
                <button className="play-button">▶</button>
                <button>▶</button>
              </div>

              <button
                className='back-button'
                onClick={() => setActiveScreen("menu")}>
                ← MENU
              </button>
            </section>
          )}

          {activeScreen === "settings" && (
            <section className='content-screen'>
              <div className='screen-title'>
                <span>AJUSTES</span>
                <small>ECORA OS</small>
              </div>

              <div className='setting'>
                <span>Brilho</span>
                <span>███████░░░</span>
              </div>

              <div className='setting'>
                <span>Interface</span>
                <span>HOLOGRAPHIC</span>
              </div>

              <div className='setting'>
                <span>Idioma</span>
                <span>PT-BR</span>
              </div>

              <button
                className='back-button'
                onClick={() => setActiveScreen("menu")}>
                ← MENU
              </button>
            </section>
          )}

          <div className='scanline' />
        </section>

        <div className='projection'>
          <div className='projection-line' />
          <span>ECORA VIRTUAL INTERFACE</span>
        </div>
      </main>
    </>
  )
}

export default App
