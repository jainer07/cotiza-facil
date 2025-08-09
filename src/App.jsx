import { HashRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Dashboard } from "./components/dashboard/Dashboard";
import './App.css';

function App() {

	return (
		<Container>
			<HashRouter>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/dashboard/*" element={<Dashboard />} />
				</Routes>
			</HashRouter>
		</Container >
	)
}

export default App
