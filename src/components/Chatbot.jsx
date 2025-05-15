import { useState } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const responses = {
    'hola': '¡Hola! ¿En qué puedo ayudarte hoy?',
    'servicio': 'Ofrecemos mantenimiento y reparación de dispositivos electrónicos, venta de equipos reacondicionados y accesorios compatibles.',
    'precio': 'Los precios varían según el servicio o producto. Puedes consultar nuestra sección de productos y servicios para más detalles.',
    'horario': 'Nuestro horario de atención es de lunes a Jueves de 10:00 AM a 5:00 PM.',
    'contactar': 'Puedes contactarnos al (507) 6913-2396 o enviarnos un email a chrisdrs.dev@3mprnd.com',
    'default': 'Lo siento, no entiendo tu pregunta. ¿Podrías reformularla?'
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);

    // Simulacion de respuesta del bot
    const botResponse = { 
      text: getBotResponse(input.toLowerCase()),
      sender: 'bot'
    };
    setTimeout(() => {
      setMessages(prev => [...prev, botResponse]);
    }, 500);

    setInput('');
  };

  const getBotResponse = (message) => {
    for (const [key, value] of Object.entries(responses)) {
      if (message.includes(key)) {
        return value;
      }
    }
    return responses.default;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-accent text-text p-4 rounded-full shadow-lg hover:bg-contrast transition-colors"
        >
          💬
        </button>
      ) : (
        <div className="bg-text rounded-lg shadow-xl w-80 h-96 flex flex-col">
          <div className="bg-accent text-text p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Chat de Ayuda</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-text hover:text-light"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === 'user'
                      ? 'bg-accent text-text'
                      : 'bg-contrast text-light'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-contrast">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escribe tu mensaje..."
                className="flex-1 border border-contrast rounded-lg px-4 py-2 focus:outline-none focus:border-accent bg-text text-background"
              />
              <button
                onClick={handleSend}
                className="bg-accent text-text px-4 py-2 rounded-lg hover:bg-contrast transition-colors"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot; 