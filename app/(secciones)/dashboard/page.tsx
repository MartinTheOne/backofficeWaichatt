

const Dashboard: React.FC = () => {
  return (
    <div className="flex-1 bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Principal</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-green-400 to-green-500 p-6 rounded-xl text-white">
              <h3 className="text-xl font-semibold mb-2">Total Clientes</h3>
              <p className="text-3xl font-bold">1,247</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6 rounded-xl text-white">
              <h3 className="text-xl font-semibold mb-2">Ingresos del Mes</h3>
              <p className="text-3xl font-bold">$45,680</p>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Actividad Reciente</h2>
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {item}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Nuevo cliente registrado</p>
                    <p className="text-sm text-gray-600">Hace {item} horas</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;