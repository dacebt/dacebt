import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppShell from "./components/AppShell"
import HomePage from "./pages/HomePage"
import ProjectsPage from "./pages/ProjectsPage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<AppShell />}>
					<Route path="/" element={<HomePage />} />
					<Route path="/projects" element={<ProjectsPage />} />
					<Route path="/about" element={<AboutPage />} />
					<Route path="/contact" element={<ContactPage />} />
					<Route path="*" element={<HomePage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
