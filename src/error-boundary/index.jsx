import "./index.css";
import ErrorBoundary from "./ErrorBoundary";
import ErroableComponent from "./ErroableComponent";

export default function App() {
  return (
    <ErrorBoundary fallback={"Fallback UI"}>
      <ErroableComponent />
    </ErrorBoundary>
  );
}
