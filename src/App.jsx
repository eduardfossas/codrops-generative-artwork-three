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
        <h1 className={styles.title}>
          Generative Artwork with Three.js
          {`\n`}
          <a
            href="http://eduardfossas.vercel.app/"
            rel="noopener noreferrer"
            target="_blank"
            className={styles.author}
          >
            By Eduard Fossas
          </a>
        </h1>

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
