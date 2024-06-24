import React, { useState } from "react";
import axios from "axios";
import logo from "./assets/favicon.svg";

const backAPI = process.env.BACK_URL;

const App = () => {
  const [matricula, setMatricula] = useState("");
  const [alumno, setAlumno] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setMatricula(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${backAPI}/api/alumno/get-by-matricula/${matricula}`);
      setAlumno(response.data);
      setError("");
    } catch (err) {
      setError("Alumno no encontrado. Por favor verifica la matrícula.");
      setAlumno(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
          <span className="text-xl font-bold">Sys Extension</span>
        </div>
      </nav>
      <div className="container mx-auto p-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-center">Buscar Alumno por Matrícula</h1>
        <div className="mb-6 flex items-center">
          <input
            type="text"
            value={matricula}
            onChange={handleInputChange}
            placeholder="Ingrese matrícula"
            className="p-2 border border-gray-300 rounded mr-2 w-64"
          />
          <button
            onClick={handleSearch}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Buscar
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {alumno && (
          <div className="bg-white p-6 shadow-md rounded w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Datos del Alumno</h2>
            <p><strong>Nombre:</strong> {alumno.nombre} {alumno.apellido}</p>
            <p><strong>Cédula:</strong> {alumno.ci}</p>
            <p><strong>Matrícula:</strong> {alumno.matricula}</p>
            <p><strong>Email:</strong> {alumno.email}</p>
            <p><strong>Rol:</strong> {alumno.rol}</p>
            <p><strong>Carrera:</strong> {alumno.carrera.carrera} ({alumno.carrera.abrev})</p>
            <p><strong>Curso:</strong> {alumno.curso.curso} ({alumno.curso.abrev})</p>
            <p><strong>Promoción:</strong> {alumno.promo.promo} ({alumno.promo.abrev})</p>
            <p><strong>Total de Horas de Extensión:</strong> {alumno.total_horas.horas}</p>
            <h3 className="text-lg font-bold mt-4 mb-2">Horas Extra:</h3>
            {alumno.total_horas_extra.map((horas_extra) => (
              <div key={horas_extra._id} className="mb-4 p-4 border border-gray-200 rounded">
                <p><strong>Proyecto: </strong>{horas_extra.projecto.titulo}</p>
                <p><strong>Hora extra: </strong> {horas_extra.horas}</p>
              </div>
            ))}
            <h3 className="text-lg font-bold mt-4 mb-2">Proyectos</h3>
            {alumno.projectos.map((proyecto) => (
              <div key={proyecto._id} className="mb-4 p-4 border border-gray-200 rounded">
                <p><strong>Título:</strong> {proyecto.titulo}</p>
                <p><strong>Resumen:</strong> {proyecto.resumen}</p>
                <p><strong>Duración:</strong> {new Date(proyecto.duracion.inicio).toLocaleDateString()} - {new Date(proyecto.duracion.fin).toLocaleDateString()}</p>
                <p><strong>Presupuesto:</strong> {proyecto.presupuesto.total}</p>
                <p><strong>Objetivos:</strong> {proyecto.objetivos}</p>
                <p><strong>Estado:</strong> {proyecto.estado}</p>
                <h4 className="font-bold mt-2">Actividades</h4>
                {proyecto.actividades.map((actividad) => (
                  <p key={actividad._id}><strong>{actividad.titulo}:</strong> {new Date(actividad.dia).toLocaleDateString()} ({actividad.hora_extension})</p>
                ))}

                <h4 className="font-bold mt-2 mb-2">Alumnos Responsables:</h4>
                {proyecto.alumnos_responsables.map((alumnos_responsables) => (
                  <div key={alumnos_responsables._id} className="mb-4 p-4 border border-gray-200 rounded">
                    <p><strong>Nombre y Apellido: </strong> {alumnos_responsables?.nombre} {alumnos_responsables?.apellido}</p>
                  </div>
                ))}
                <h4 className="font-bold mt-2 mb-2">Alumnos Colaboradores:</h4>
                {proyecto.alumnos_colaboradores.map((alumnos_colaboradores) => (
                  <div key={alumnos_colaboradores._id} className="mb-4 p-4 border border-gray-200 rounded">
                    <p><strong>Nombre y Apellido: </strong> {alumnos_colaboradores?.nombre} {alumnos_colaboradores?.apellido}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
