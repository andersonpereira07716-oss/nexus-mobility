import React, { useState } from 'react';
import { CabinPreferences, Routine } from '../../types';
import { CabinPreferencesModal } from './CabinPreferencesModal';

export const PassengerView: React.FC = () => {
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [preferences, setPreferences] = useState<CabinPreferences>({
    quiet_mode: true,
    temperature_celsius: 21,
    music_style: 'Lo-Fi / MPB',
  });

  const [routines] = useState<Routine[]>([
    {
      id: '1',
      passenger_id: 'p1',
      title: 'Ida ao Trabalho',
      origin_address: 'Centro, Patos - PB',
      destination_address: 'Bairro Brasília',
      scheduled_time: '07:30',
      days_of_week: [1, 2, 3, 4, 5],
      active: true,
    },
    {
      id: '2',
      passenger_id: 'p1',
      title: 'Compromisso',
      origin_address: 'Rua Principal',
      destination_address: 'Shopping / Centro',
      scheduled_time: '14:00',
      days_of_week: [1, 3, 5],
      active: true,
    },
  ]);

  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  return (
    <div className="space-y-4">
      {/* Card de Boas-Vindas e Experiência de Cabine */}
      <div className="bg-nexus-card border border-nexus-border rounded-2xl p-5 shadow-xl space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-semibold text-nexus-amber tracking-wider uppercase">Passageiro VIP</p>
            <h2 className="text-xl font-bold">Olá, Anderson</h2>
          </div>
          <button
            onClick={() => setShowPreferencesModal(true)}
            className="text-xs bg-nexus-dark border border-nexus-amber/30 text-nexus-amber px-3 py-1.5 rounded-lg flex items-center space-x-1 hover:bg-nexus-amber/10 transition-colors"
          >
            <span>⚙️ Cabine</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <span className="text-[11px] bg-nexus-dark text-nexus-muted px-2.5 py-1 rounded-md border border-nexus-border">
            {preferences.quiet_mode ? '🔇 Modo Silencioso' : '💬 Conversa Aberta'}
          </span>
          <span className="text-[11px] bg-nexus-dark text-nexus-muted px-2.5 py-1 rounded-md border border-nexus-border">
            ❄️ {preferences.temperature_celsius}°C
          </span>
          <span className="text-[11px] bg-nexus-dark text-nexus-muted px-2.5 py-1 rounded-md border border-nexus-border">
            🎵 {preferences.music_style}
          </span>
        </div>
      </div>

      {/* Formulário de Agendamento */}
      <div className="bg-nexus-card border border-nexus-border rounded-2xl p-5 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-nexus-text">Solicitar ou Agendar Deslocamento</h3>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-nexus-muted block mb-1">Origem</label>
            <input
              type="text"
              placeholder="Digite o local de partida..."
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full bg-nexus-dark border border-nexus-border rounded-xl px-3.5 py-2.5 text-sm text-nexus-text focus:outline-none focus:border-nexus-amber"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-nexus-muted block mb-1">Destino</label>
            <input
              type="text"
              placeholder="Para onde quer ir?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-nexus-dark border border-nexus-border rounded-xl px-3.5 py-2.5 text-sm text-nexus-text focus:outline-none focus:border-nexus-amber"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-nexus-muted block mb-1">Horário (Vazio para imediato)</label>
            <input
              type="time"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
              className="w-full bg-nexus-dark border border-nexus-border rounded-xl px-3.5 py-2.5 text-sm text-nexus-text focus:outline-none focus:border-nexus-amber"
            />
          </div>
        </div>

        <button className="w-full bg-nexus-amber text-nexus-dark font-bold py-3.5 rounded-xl hover:bg-nexus-amberHover transition-colors shadow-lg shadow-nexus-amber/10">
          {scheduleTime ? `Confirmar Agendamento para ${scheduleTime}` : 'Solicitar Deslocamento Imediato'}
        </button>
      </div>

      {/* Rotinas Fixas */}
      <div className="bg-nexus-card border border-nexus-border rounded-2xl p-5 shadow-xl space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold text-nexus-text">Minhas Rotinas Fixas</h3>
          <span className="text-xs text-nexus-amber font-semibold cursor-pointer">+ Adicionar</span>
        </div>

        <div className="space-y-2">
          {routines.map((routine) => (
            <div key={routine.id} className="bg-nexus-dark p-3.5 rounded-xl border border-nexus-border flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-nexus-text">{routine.title}</p>
                <p className="text-xs text-nexus-muted">{routine.origin_address} → {routine.destination_address}</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-nexus-amber bg-nexus-amber/10 border border-nexus-amber/20 px-2 py-1 rounded-md block">
                  {routine.scheduled_time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showPreferencesModal && (
        <CabinPreferencesModal
          preferences={preferences}
          onSave={(newPrefs) => setPreferences(newPrefs)}
          onClose={() => setShowPreferencesModal(false)}
        />
      )}
    </div>
  );
};
