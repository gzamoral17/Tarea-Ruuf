import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [techoX, setTechoX] = useState(''); // Estado para la dimensión X del techo
  const [techoY, setTechoY] = useState(''); // Estado para la dimensión Y del techo
  const [panelA, setPanelA] = useState(''); // Estado para la dimensión A del panel
  const [panelB, setPanelB] = useState(''); // Estado para la dimensión B del panel
  const [maxPaneles, setMaxPaneles] = useState(null); // Estado para el resultado

  // Manejar el envío del formulario
  const manejarEnvio = async (e) => {
    e.preventDefault(); // Evitar que la página se recargue
    try {
      // Realizar una solicitud POST al backend
      const respuesta = await axios.post('http://127.0.0.1:5000/calcular', {
        techo_x: parseInt(techoX), // Convertir los valores a enteros
        techo_y: parseInt(techoY),
        panel_a: parseInt(panelA),
        panel_b: parseInt(panelB),
      });
      // Actualizar el estado con el resultado devuelto por el backend
      setMaxPaneles(respuesta.data.max_paneles);
    } catch (error) {
      console.error('Error al calcular los paneles:', error); // Mostrar errores en consola
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Calculadora de Paneles</h1>
      <form onSubmit={manejarEnvio}>
        <div>
          <label>Dimensión del techo (X):</label>
          <input
            type="number"
            value={techoX}
            onChange={(e) => setTechoX(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Dimensión del techo (Y):</label>
          <input
            type="number"
            value={techoY}
            onChange={(e) => setTechoY(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Dimensión del panel (A):</label>
          <input
            type="number"
            value={panelA}
            onChange={(e) => setPanelA(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Dimensión del panel (B):</label>
          <input
            type="number"
            value={panelB}
            onChange={(e) => setPanelB(e.target.value)}
            required
          />
        </div>
        <button type="submit">Calcular</button>
      </form>
      {maxPaneles !== null && (
        <h2>Máximo número de paneles: {maxPaneles}</h2>
      )}
    </div>
  );
}

export default App;
