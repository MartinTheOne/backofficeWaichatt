'use client'
import { useState } from 'react';
import { Trash2, Calculator, TrendingUp, FileText, Edit, DollarSign, Search, Calendar, User } from 'lucide-react';

const ContabilidadComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('todos');

  const [transactions] = useState([
    {
      id: 1,
      date: '2024-06-01',
      description: 'Pago de servicios - Cliente ABC',
      type: 'Ingreso',
      category: 'Servicios',
      amount: 15000,
      client: 'Juan Pérez',
      status: 'Completado'
    },
    {
      id: 2,
      date: '2024-06-02',
      description: 'Compra de suministros de oficina',
      type: 'Egreso',
      category: 'Gastos Operativos',
      amount: -2500,
      client: 'Oficina Central',
      status: 'Completado'
    },
    {
      id: 3,
      date: '2024-06-03',
      description: 'Consultoría empresarial - XYZ Corp',
      type: 'Ingreso',
      category: 'Consultoría',
      amount: 25000,
      client: 'María González',
      status: 'Pendiente'
    },
    {
      id: 4,
      date: '2024-06-04',
      description: 'Pago de alquiler',
      type: 'Egreso',
      category: 'Gastos Fijos',
      amount: -8000,
      client: 'Inmobiliaria Sur',
      status: 'Completado'
    },
    {
      id: 5,
      date: '2024-06-05',
      description: 'Desarrollo de software - Tech Solutions',
      type: 'Ingreso',
      category: 'Desarrollo',
      amount: 35000,
      client: 'Carlos Rodriguez',
      status: 'Completado'
    }
  ]);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'todos' || 
                         (selectedFilter === 'ingresos' && transaction.type === 'Ingreso') ||
                         (selectedFilter === 'egresos' && transaction.type === 'Egreso');
    
    return matchesSearch && matchesFilter;
  });

  const totalIngresos = transactions.filter(t => t.type === 'Ingreso').reduce((sum, t) => sum + t.amount, 0);
  const totalEgresos = transactions.filter(t => t.type === 'Egreso').reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const balance = totalIngresos - totalEgresos;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Contabilidad</h1>
              <p className="text-gray-600">Gestiona tus finanzas y transacciones</p>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-green-400 to-green-500 p-6 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Total Ingresos</p>
                  <p className="text-2xl font-bold">${totalIngresos.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-200" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-red-400 to-red-500 p-6 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm">Total Egresos</p>
                  <p className="text-2xl font-bold">${totalEgresos.toLocaleString()}</p>
                </div>
                <FileText className="h-8 w-8 text-red-200" />
              </div>
            </div>
            <div className={`bg-gradient-to-r ${balance >= 0 ? 'from-blue-400 to-blue-500' : 'from-orange-400 to-orange-500'} p-6 rounded-xl text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`${balance >= 0 ? 'text-blue-100' : 'text-orange-100'} text-sm`}>Balance</p>
                  <p className="text-2xl font-bold">${balance.toLocaleString()}</p>
                </div>
                <DollarSign className={`h-8 w-8 ${balance >= 0 ? 'text-blue-200' : 'text-orange-200'}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar transacciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
              />
            </div>
            <div className="flex space-x-2">
              {['todos', 'ingresos', 'egresos'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                    selectedFilter === filter
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800">Transacciones ({filteredTransactions.length})</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                        transaction.type === 'Ingreso' 
                          ? 'bg-gradient-to-br from-green-400 to-green-600' 
                          : 'bg-gradient-to-br from-red-400 to-red-600'
                      }`}>
                        {transaction.type === 'Ingreso' ? '+' : '-'}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">{transaction.description}</h3>
                        <p className="text-gray-600">{transaction.category}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${
                          transaction.type === 'Ingreso' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          ${Math.abs(transaction.amount).toLocaleString()}
                        </p>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          transaction.status === 'Completado' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{transaction.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <User className="h-4 w-4" />
                        <span className="text-sm">{transaction.client}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4 lg:mt-0">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContabilidadComponent;