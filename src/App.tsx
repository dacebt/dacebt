import { lazy } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppShell from "./components/AppShell"

const HomePage = lazy(() => import("./pages/HomePage"))
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"))
const AboutPage = lazy(() => import("./pages/AboutPage"))
const ContactPage = lazy(() => import("./pages/ContactPage"))

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
