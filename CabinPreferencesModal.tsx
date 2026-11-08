import React from 'react';
import { CabinPreferences } from '../../types';

interface Props {
  preferences: CabinPreferences;
  onSave: (newPrefs: CabinPreferences) => void;
  onClose: () => void;
}

export const CabinPreferencesModal: React.FC<Props> = ({ preferences, onSave, onClose }) => {
  const [prefs, setPrefs] = React.useState<CabinPreferences>(preferences);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 z-50">
      <div className="bg-nexus-card border border-nexus-border w-full max-w-md rounded-2xl p-6 space-y-6 shadow-2xl">
        <div className="flex justify-between items-center border-b border-nexus-border pb-3">
          <div>
            <h3 className="text-lg font-bold text-nexus-text">Ambiente de Cabine</h3>
            <p className="text-xs text-nexus-muted">Personalize sua experiência a bordo</p>
          </div>
          <button onClick={onClose} className="text-nexus-muted hover:text-nexus-text text-xl">✕</button>
        </div>

        {/* Quiet Mode */}
        <div className="flex items-center justify-between p-3.5 bg-nexus-dark rounded-xl border border-nexus-border">
          <div>
            <p className="text-sm font-semibold text-nexus-text">Modo Silencioso</p>
            <p className="text-xs text-nexus-muted">Viagem tranquila sem conversas paralelas</p>
          </div>
          <input
            type="checkbox"
            checked={prefs.quiet_mode}
            onChange={(e) => setPrefs({ ...prefs, quiet_mode: e.target.checked })}
            className="w-5 h-5 accent-nexus-amber rounded cursor-pointer"
          />
        </div>

        {/* Ar Condicionado */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-nexus-muted font-medium">Temperatura do Ar</span>
            <span className="text-nexus-amber font-bold">{prefs.temperature_celsius}°C</span>
          </div>
          <input
            type="range"
            min="18"
            max="25"
            value={prefs.temperature_celsius}
            onChange={(e) => setPrefs({ ...prefs, temperature_celsius: Number(e.target.value) })}
            className="w-full accent-nexus-amber cursor-pointer"
          />
        </div>

        {/* Estilo Musical */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-nexus-muted block">Estilo Musical Preferido</label>
          <div className="grid grid-cols-3 gap-2">
            {['Suave', 'Lo-Fi / MPB', 'Sem Música'].map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => setPrefs({ ...prefs, music_style: style })}
                className={`py-2 px-1 text-xs rounded-lg border font-medium transition-all ${
                  prefs.music_style === style
                    ? 'bg-nexus-amber/20 border-nexus-amber text-nexus-amber'
                    : 'bg-nexus-dark border-nexus-border text-nexus-muted hover:text-nexus-text'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            onSave(prefs);
            onClose();
          }}
          className="w-full bg-nexus-amber text-nexus-dark font-bold py-3.5 rounded-xl hover:bg-nexus-amberHover transition-colors shadow-lg shadow-nexus-amber/10"
        >
          Salvar Preferências
        </button>
      </div>
    </div>
  );
};
