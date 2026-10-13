
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./Holograma3D.css";

export default function Holograma3D() {
  const containerRef = useRef(null);
  const [forma, setForma] = useState("cristal");
  const [rotacaoAutomatica, setRotacaoAutomatica] = useState(true);

  const formaRef = useRef("cristal");
  const rotacaoRef = useRef(true);

  useEffect(() => {
    formaRef.current = forma;
  }, [forma]);

  useEffect(() => {
    rotacaoRef.current = rotacaoAutomatica;
  }, [rotacaoAutomatica]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Cena 3D
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#030b12");

    // Câmera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 4;

    // Renderizador
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    );
    renderer.setSize(
      container.clientWidth,
      container.clientHeight
    );
    container.appendChild(renderer.domElement);

    // Grupo que contém o objeto
    const holograma = new THREE.Group();
    scene.add(holograma);

    // Material luminoso ciano
    const material = new THREE.MeshBasicMaterial({
      color: "#48f5ff",
      wireframe: true,
    });

    // Geometrias disponíveis
    const geometrias = {
      cristal: new THREE.IcosahedronGeometry(1, 1),
      esfera: new THREE.SphereGeometry(0.85, 24, 16),
      torus: new THREE.TorusKnotGeometry(0.6, 0.2, 100, 12),
    };

    let objeto;

    function criarObjeto(nome) {
      if (objeto) {
        holograma.remove(objeto);
        objeto.geometry.dispose();
      }

      objeto = new THREE.Mesh(geometrias[nome], material);
      holograma.add(objeto);
    }

    criarObjeto(formaRef.current);

    // Linhas circulares para dar aparência futurista
    const aneis = [];

    for (let i = 0; i < 2; i++) {
      const geometria = new THREE.TorusGeometry(
        1.25 + i * 0.12,
        0.008,
        8,
        100
      );

      const materialAnel = new THREE.MeshBasicMaterial({
        color: "#168bff",
        transparent: true,
        opacity: 0.65,
      });

      const anel = new THREE.Mesh(geometria, materialAnel);
      anel.rotation.x = Math.PI / 2 + i * 0.6;
      holograma.add(anel);
      aneis.push(anel);
    }

    // Animação
    let frameId;
    let formaAtual = formaRef.current;

    function animar() {
      frameId = requestAnimationFrame(animar);

      if (formaAtual !== formaRef.current) {
        formaAtual = formaRef.current;
        criarObjeto(formaAtual);
      }

      if (rotacaoRef.current) {
        holograma.rotation.y += 0.008;
        holograma.rotation.x += 0.003;

        aneis.forEach((anel, index) => {
          anel.rotation.z += index === 0 ? 0.004 : -0.003;
        });
      }

      renderer.render(scene, camera);
    }

    animar();

    // Ajustar ao tamanho do painel
    function redimensionar() {
      const largura = container.clientWidth;
      const altura = container.clientHeight;

      if (!largura || !altura) return;

      camera.aspect = largura / altura;
      camera.updateProjectionMatrix();
      renderer.setSize(largura, altura);
    }

    const observador = new ResizeObserver(redimensionar);
    observador.observe(container);

    return () => {
      cancelAnimationFrame(frameId);
      observador.disconnect();

      Object.values(geometrias).forEach((geometria) => {
        geometria.dispose();
      });

      material.dispose();

      aneis.forEach((anel) => {
        anel.geometry.dispose();
        anel.material.dispose();
      });

      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <section className="holograma-painel">
      <header className="holograma-cabecalho">
        <div>
          <span className="holograma-ponto" />
          <strong>ECORA // HOLOGRAMA</strong>
        </div>

        <span className="holograma-status">
          SIMULAÇÃO 3D
        </span>
      </header>

      <div
        className="holograma-canvas"
        ref={containerRef}
      />

      <div className="holograma-controles">
        <label htmlFor="forma-holograma">
          Modelo 3D
        </label>

        <select
          id="forma-holograma"
          value={forma}
          onChange={(evento) => setForma(evento.target.value)}
        >
          <option value="cristal">Cristal</option>
          <option value="esfera">Esfera</option>
          <option value="torus">Nó energético</option>
        </select>

        <button
          type="button"
          onClick={() =>
            setRotacaoAutomatica((anterior) => !anterior)
          }
        >
          {rotacaoAutomatica
            ? "Pausar rotação"
            : "Retomar rotação"}
        </button>
      </div>

      <p className="holograma-aviso">
        PROJEÇÃO VIRTUAL — nenhum holograma físico está sendo emitido.
      </p>
    </section>
  );
}