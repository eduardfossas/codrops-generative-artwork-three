import { Canvas } from "@react-three/fiber";
import { Lygia } from "./pages/Lygia";
import { Richter } from "./pages/Richter";
import { RichterFarben } from "./pages/RichterFarben";
import { DeStijl } from "./pages/DeStijl";
import { Route, Link } from "wouter";
import { OrthographicCamera } from "./components/Orthographic";
import styles from "./App.module.css";
import { Shapes } from "./pages/Shapes";

function App() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.titlewrap}>
          <h1 className={styles.title}>Generative Artwork with Three.js</h1>
          <nav className={styles.meta}>
            <a
              href="http://eduardfossas.vercel.app/"
              rel="noopener noreferrer"
              target="_blank"
              className={styles.metalink}
            >
              By Eduard Fossas
            </a>
            <a
              href="https://tympanus.net/codrops/?p=84650"
              rel="noopener noreferrer"
              target="_blank"
              className={styles.metalink}
            >
              Read the tutorial
            </a>
            <a
              href="https://github.com/eduardfossas/codrops-generative-artwork-three"
              rel="noopener noreferrer"
              target="_blank"
              className={styles.metalink}
            >
              GitHub
            </a>
            <a
              href="https://tympanus.net/codrops/demos/"
              rel="noopener noreferrer"
              target="_blank"
              className={styles.metalink}
            >
              All Demos
            </a>
            </nav>
        </div>

        <nav className={styles.nav}>
          <Link className={styles.link} href="/">
            Lygia
          </Link>
          <span className={styles.separator}>|</span>
          <Link className={styles.link} href="/richter">
            Richter
          </Link>
          <span className={styles.separator}>|</span>
          <Link className={styles.link} href="/richter-farben">
            Richter Farben
          </Link>
          <span className={styles.separator}>|</span>
          <Link className={styles.link} href="/de-stijl">
            De Stijl
          </Link>
          <span className={styles.separator}>|</span>
          <Link className={styles.link} href="/shapes">
            Shapes
          </Link>
        </nav>
      </header>
      <Canvas camera={{ position: [0, 0, 86] }}>
        <OrthographicCamera />

        <Route path="/">
          <Lygia key="lygia" />
        </Route>

        <Route path="/richter">
          <Richter />
        </Route>

        <Route path="/richter-farben">
          <RichterFarben />
        </Route>

        <Route path="/de-stijl">
          <DeStijl />
          <ambientLight intensity={2.2} color="#ffffff" />
          <directionalLight
            position={[0, 40, 100]}
            intensity={1}
            color="#ffffff"
          />
        </Route>

        <Route path="/shapes">
          <Shapes />
        </Route>
      </Canvas>
    </>
  );
}

export default App;
