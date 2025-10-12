import HourglassGrid from "./components/HourglassGrid"

function App() {
  return (
    <>
      <HourglassGrid />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          padding: "2rem",
          backgroundColor: "transparent",
        }}
      >
        {/* Your portfolio content will go here */}
        <h1>Portfolio 2025</h1>
        <p>Your content goes here...</p>
      </div>
    </>
  )
}

export default App
