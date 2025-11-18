import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext'

// Easter egg console message
console.log(
  '%c╔════════════════════════════════════════════════════╗\n' +
  '║                                                    ║\n' +
  '║        ---   Protocol Ice   ---                    ║\n' +
  '║                                                    ║\n' +
  '║                  ╱|、                              ║\n' +
  '║                 (˚ˎ 。7                            ║\n' +
  '║                  |、˜〵                             ║\n' +
  '║                 じしˍ,)ノ                           ║\n' +
  '║                                                    ║\n' +
  '║      💭 "I\'m gonna sleep \'cause you live           ║\n' +
  '║               in my daydreams..."                  ║\n' +
  '║                                                    ║\n' +
  '╚════════════════════════════════════════════════════╝',
  'color: #0ea5e9; font-weight: bold; font-size: 12px; font-family: monospace;'
);

console.log(
  '%c🎵 Stay cool, keep dreaming ❄️',
  'color: #14b8a6; font-size: 14px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);'
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
