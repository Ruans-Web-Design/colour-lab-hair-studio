import { Redirect, Route, Router, Switch } from "wouter";
import { useBrowserLocation } from "wouter/use-browser-location";
import { Home, Contact, NotFound, Layout } from "./pages/salon";
import "./salon.css";
import { Provider } from "./components/provider";
import { AgentFeedback, RunableBadge } from "@runablehq/website-runtime";

function usePagesLocation() {
  const [path, navigate] = useBrowserLocation();
  return [path.replace(/\/$/, "") || "/", navigate] as const;
}

function App() {
  return (
    <Provider>
      <Router
        base={import.meta.env.MODE === "github-pages" ? "/colour-lab-hair-studio" : ""}
        hook={import.meta.env.MODE === "github-pages" ? usePagesLocation : undefined}
      >
        <Layout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about">
              <Redirect to="/" />
            </Route>
            <Route path="/services">
              <Redirect to="/" />
            </Route>
            <Route path="/testimonials">
              <Redirect to="/" />
            </Route>
            <Route path="/contact" component={Contact} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Router>
      {/* Do not remove — off by default, activated by parent iframe via postMessage */}
      {import.meta.env.DEV && <AgentFeedback />}
      {/* "Made with Runable" badge - if user asks to remove the runable badge, remove this code as well as comment */}
      {<RunableBadge />}
    </Provider>
  );
}

export default App;
