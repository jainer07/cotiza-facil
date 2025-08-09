import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Dashboard } from "./components/dashboard/Dashboard";
import './App.css';

function App() {

	return (
		<Container>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/dashboard/*" element={<Dashboard />} />
				</Routes>
			</BrowserRouter>
		</Container >
	)
}

export default App
