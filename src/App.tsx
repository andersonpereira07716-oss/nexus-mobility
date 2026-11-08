import React, { useState } from 'react';

interface CabinPreferences {
  quietMode: boolean;
  temperature: number;
  musicStyle: string;
}

interface Routine {
  id: string;
  title: string;
  origin: string;
  destination: string;
  time: string;
}

interface TripRequest {
  id: string;
  passengerName: string;
  origin: string;
  stopover?: string;
  destination: string;
  price: number;
  time: string;
  status: 'pending' | 'accepted' | 'completed';
  chat: { sender: string; text: string }[];
}

export default function App() {
  const [tab, setTab] = useState<'passenger' | 'driver' | 'admin'>('passenger');
  const [origin, setOrigin] = useState('');
  const [stopover, setStopover] = useState('');
  const [destination, setDestination] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [showCabinModal, setShowCabinModal] = useState(false);
  const [showPixModal, setShowPixModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [cabin, setCabin] = useState<CabinPreferences>({
    quietMode: true,
    temperature: 21,
    musicStyle: 'Lo-Fi / MPB',
  });

  const [routines] = useState<Routine[]>([
    { id: '1', title: 'Ida ao Trabalho', origin: 'Centro, Patos - PB', destination: 'Bairro Brasília', time: '07:30' },
    { id: '2', title: 'Volta da Faculdade', origin: 'UFCG Patos', destination: 'Centro, Patos - PB', time: '22:10' }
  ]);

  const [activeTrips, setActiveTrips] = useState<TripRequest[]>([
    { 
      id: 't1', 
      passengerName: 'Anderson Pereira', 
      origin: 'Centro, Patos - PB', 
      stopover: 'Farmácia Popular',
      destination: 'Bairro Brasília', 
      price: 34.00, 
      time: '07:30', 
      status: 'accepted',
      chat: [{ sender: 'Motorista', text: 'Veículo posicionado na origem.' }]
    }
  ]);

  const [completedHistory, setCompletedHistory] = useState([
    { id: 'h1', date: '07/11/2026', route: 'Centro → Shopping', price: 22.00, status: 'Concluído' },
    { id: 'h2', date: '06/11/2026', route: 'UFCG → Centro', price: 18.50, status: 'Concluído' }
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleCalculateRoute = () => {
    if (!origin || !destination) {
      alert('Por favor, informe a origem e o destino.');
      return;
    }
    const baseRate = 12.00;
    const kmFactor = stopover ? 15.00 : 10.00;
    const calculated = baseRate + kmFactor;
    setEstimatedPrice(Number(calculated.toFixed(2)));
  };

  const handleConfirmRequest = () => {
    if (estimatedPrice === null) return;
    const newTrip: TripRequest = {
      id: Date.now().toString(),
      passengerName: 'Anderson Pereira',
      origin: origin || 'Centro',
      stopover: stopover || undefined,
      destination: destination || 'Destino',
      price: estimatedPrice,
      time: scheduleTime || 'Imediato',
      status: 'pending',
      chat: []
    };
    setActiveTrips([newTrip, ...activeTrips]);
    setShowPixModal(true);
    showToast('🚀 Solicitação com parada e cabine configurada!');
  };

  const handleSendMessage = (tripId: string) => {
    if (!chatMessage.trim()) return;
    setActiveTrips(activeTrips.map(t => {
      if (t.id === tripId) {
        return { ...t, chat: [...t.chat, { sender: tab === 'passenger' ? 'Anderson' : 'Motorista', text: chatMessage }] };
      }
      return t;
    }));
    setChatMessage('');
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#F8FAFC] p-4 max-w-md mx-auto space-y-4 font-sans pb-16 relative">
      {toastMessage && (
        <div className="fixed top-4 left-4 right-4 max-w-md mx-auto bg-[#D4AF37] text-black px-4 py-3 rounded-xl shadow-2xl z-50 text-xs font-bold flex items-center justify-between">
          <span>{toastMessage}</span>
        </div>
      )}

      <header className="flex justify-between items-center border-b border-gray-800 pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#997A15] flex items-center justify-center shadow-lg shadow-[#D4AF37]/20">
            <svg className="w-6 h-6 text-[#0B0F19]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-wider text-white leading-tight">NEXUS</h1>
            <p className="text-[9px] text-[#D4AF37] tracking-widest uppercase font-semibold">Mobility Premier</p>
          </div>
        </div>
        <button onClick={() => setShowHistoryModal(true)} className="text-xs px-2.5 py-1.5 rounded-lg bg-[#161F30] border border-gray-800 text-[#D4AF37] hover:border-[#D4AF37]">
          📜 Histórico
        </button>
      </header>

      <div className="bg-[#161F30] p-1.5 rounded-xl border border-gray-800 flex space-x-1">
        <button onClick={() => setTab('passenger')} className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${tab === 'passenger' ? 'bg-[#D4AF37] text-black shadow' : 'text-gray-400'}`}>Passageiro</button>
        <button onClick={() => setTab('driver')} className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${tab === 'driver' ? 'bg-[#D4AF37] text-black shadow' : 'text-gray-400'}`}>Motorista</button>
        <button onClick={() => setTab('admin')} className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${tab === 'admin' ? 'bg-[#D4AF37] text-black shadow' : 'text-gray-400'}`}>Admin</button>
      </div>

      {tab === 'passenger' && (
        <div className="space-y-4">
          <div className="bg-[#161F30] border border-gray-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">Concierge Privativo</p>
                <h2 className="text-xl font-bold">Olá, Anderson</h2>
              </div>
              <button onClick={() => setShowCabinModal(true)} className="text-xs bg-[#0B0F19] border border-[#D4AF37]/30 text-[#D4AF37] px-3 py-1.5 rounded-lg flex items-center space-x-1">
                <span>⚙️ Cabine</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[11px] bg-[#0B0F19] text-gray-400 px-2.5 py-1 rounded-md border border-gray-800">{cabin.quietMode ? '🔇 Silencioso' : '💬 Conversa'}</span>
              <span className="text-[11px] bg-[#0B0F19] text-gray-400 px-2.5 py-1 rounded-md border border-gray-800">❄️ {cabin.temperature}°C</span>
              <span className="text-[11px] bg-[#0B0F19] text-gray-400 px-2.5 py-1 rounded-md border border-gray-800">🎵 {cabin.musicStyle}</span>
            </div>
          </div>

          <div className="bg-[#161F30] border border-gray-800 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-base font-bold">Solicitar com Rota Dinâmica</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Origem</label>
                <input type="text" placeholder="Ex: Centro" value={origin} onChange={(e) => setOrigin(e.target.value)} className="w-full bg-[#0B0F19] border border-gray-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-[#D4AF37]" />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Parada Opcional (Ex: Farmácia)</label>
                <input type="text" placeholder="Adicionar parada no caminho..." value={stopover} onChange={(e) => setStopover(e.target.value)} className="w-full bg-[#0B0F19] border border-gray-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-[#D4AF37]" />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Destino Final</label>
                <input type="text" placeholder="Ex: Bairro Brasília" value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full bg-[#0B0F19] border border-gray-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-[#D4AF37]" />
              </div>
            </div>

            {estimatedPrice !== null && (
              <div className="bg-[#0B0F19] p-3.5 rounded-xl border border-[#D4AF37]/30 flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-400">Tarifa Fixa com Parada</p>
                  <p className="text-sm font-semibold text-[#D4AF37]">Previsibilidade Total</p>
                </div>
                <span className="text-lg font-bold text-white">R$ {estimatedPrice.toFixed(2)}</span>
              </div>
            )}

            {estimatedPrice === null ? (
              <button onClick={handleCalculateRoute} className="w-full bg-[#D4AF37] text-black font-bold py-3.5 rounded-xl shadow-lg">
                Calcular Rota e Preço
              </button>
            ) : (
              <button onClick={handleConfirmRequest} className="w-full bg-emerald-500 text-black font-bold py-3.5 rounded-xl shadow-lg">
                Confirmar e Gerar Pix
              </button>
            )}
          </div>

          {/* Chat Ativo na Visão do Passageiro */}
          <div className="bg-[#161F30] border border-gray-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <h3 className="text-base font-bold">Chat Direto com o Motorista</h3>
            <div className="bg-[#0B0F19] p-3 rounded-xl border border-gray-800 h-28 overflow-y-auto space-y-2 text-xs">
              {activeTrips[0]?.chat.map((c, i) => (
                <div key={i} className={`p-2 rounded-lg ${c.sender === 'Anderson' ? 'bg-[#D4AF37]/20 text-right' : 'bg-gray-800'}`}>
                  <span className="font-bold text-[#D4AF37]">{c.sender}: </span>
                  <span>{c.text}</span>
                </div>
              ))}
              {activeTrips[0]?.chat.length === 0 && <p className="text-gray-500 text-center pt-6">Nenhuma mensagem ainda.</p>}
            </div>
            <div className="flex space-x-2">
              <input type="text" placeholder="Enviar mensagem ao motorista..." value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} className="flex-1 bg-[#0B0F19] border border-gray-800 rounded-xl px-3 py-2 text-xs text-white" />
              <button onClick={() => handleSendMessage(activeTrips[0].id)} className="bg-[#D4AF37] text-black font-bold px-4 py-2 rounded-xl text-xs">Enviar</button>
            </div>
          </div>
        </div>
      )}

      {tab === 'driver' && (
        <div className="space-y-4">
          <div className="bg-[#161F30] border border-gray-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Painel do Motorista</h2>
              <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
            </div>
            {activeTrips.map((trip) => (
              <div key={trip.id} className="bg-[#0B0F19] p-4 rounded-xl border border-gray-800 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-[#D4AF37] font-bold">{trip.time}</span>
                  <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Pago via Pix</span>
                </div>
                <p className="text-sm font-semibold">{trip.origin} {trip.stopover ? `➔ 📍 ${trip.stopover}` : ''} → {trip.destination}</p>
                <p className="text-xs text-gray-400">Passageiro: {trip.passengerName} | R$ {trip.price.toFixed(2)}</p>
                
                {/* Chat no Painel do Motorista */}
                <div className="bg-black/40 p-2.5 rounded-lg space-y-1 text-xs max-h-24 overflow-y-auto">
                  {trip.chat.map((c, i) => (
                    <div key={i}><span className="text-[#D4AF37]">{c.sender}:</span> {c.text}</div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input type="text" placeholder="Responder passageiro..." value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} className="flex-1 bg-[#0B0F19] border border-gray-800 rounded-lg px-2.5 py-1.5 text-xs text-white" />
                  <button onClick={() => handleSendMessage(trip.id)} className="bg-[#D4AF37] text-black font-bold px-3 py-1.5 rounded-lg text-xs">Enviar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'admin' && (
        <div className="bg-[#161F30] border border-gray-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <h2 className="text-xl font-bold">Gestão Operacional & Faturamento</h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#0B0F19] p-3 rounded-xl border border-gray-800"><p className="text-xs text-gray-400">Viagens Totais</p><p className="text-lg font-bold">{completedHistory.length + activeTrips.length}</p></div>
            <div className="bg-[#0B0F19] p-3 rounded-xl border border-gray-800"><p className="text-xs text-gray-400">Receita Bruta</p><p className="text-lg font-bold text-[#D4AF37]">R$ 182,50</p></div>
          </div>
        </div>
      )}

      {/* Modal Histórico e Recibos */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#161F30] border border-gray-800 w-full max-w-md rounded-2xl p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h3 className="text-base font-bold">Histórico de Viagens & Recibos</h3>
              <button onClick={() => setShowHistoryModal(false)} className="text-gray-400 text-xl">✕</button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {completedHistory.map((h) => (
                <div key={h.id} className="bg-[#0B0F19] p-3 rounded-xl border border-gray-800 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-semibold text-white">{h.route}</p>
                    <p className="text-gray-400">{h.date} • {h.status}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <span className="font-bold text-[#D4AF37] block">R$ {h.price.toFixed(2)}</span>
                    <button onClick={() => alert(`Recibo Nexus emitido para a rota ${h.route} no valor de R$ ${h.price.toFixed(2)}.`)} className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] px-2 py-0.5 rounded text-[10px]">Baixar Recibo</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal Pix */}
      {showPixModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#161F30] border border-gray-800 w-full max-w-xs rounded-2xl p-6 text-center space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold">Pagamento Pix</h3>
            <div className="bg-white p-3 rounded-xl inline-block">
              <div className="w-32 h-32 bg-[#0B0F19] flex items-center justify-center text-[#D4AF37] text-xs font-mono p-2 rounded">
                [ QR CODE PIX ]
              </div>
            </div>
            <p className="text-sm font-bold text-[#D4AF37]">Valor: R$ {estimatedPrice?.toFixed(2)}</p>
            <button onClick={() => { setShowPixModal(false); setEstimatedPrice(null); setOrigin(''); setStopover(''); setDestination(''); showToast('✅ Pagamento aprovado com sucesso!'); }} className="w-full bg-emerald-500 text-black font-bold py-3 rounded-xl">
              Simular Pagamento Aprovado
            </button>
          </div>
        </div>
      )}

      {/* Modal Cabine */}
      {showCabinModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 z-50">
          <div className="bg-[#161F30] border border-gray-800 w-full max-w-md rounded-2xl p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h3 className="text-lg font-bold">Ambiente de Cabine</h3>
              <button onClick={() => setShowCabinModal(false)} className="text-gray-400 text-xl">✕</button>
            </div>
            <div className="flex items-center justify-between p-3.5 bg-[#0B0F19] rounded-xl border border-gray-800">
              <p className="text-sm font-semibold">Modo Silencioso</p>
              <input type="checkbox" checked={cabin.quietMode} onChange={(e) => setCabin({ ...cabin, quietMode: e.target.checked })} className="w-5 h-5 accent-[#D4AF37]" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Temperatura</span>
                <span className="text-[#D4AF37] font-bold">{cabin.temperature}°C</span>
              </div>
              <input type="range" min="18" max="25" value={cabin.temperature} onChange={(e) => setCabin({ ...cabin, temperature: Number(e.target.value) })} className="w-full accent-[#D4AF37]" />
            </div>
            <button onClick={() => setShowCabinModal(false)} className="w-full bg-[#D4AF37] text-black font-bold py-3.5 rounded-xl shadow-lg">Salvar Preferências</button>
          </div>
        </div>
      )}
      <footer className="text-center text-xs text-gray-500 pt-2">Nexus Mobility Platform • Patos, PB</footer>
    </div>
  );
}
