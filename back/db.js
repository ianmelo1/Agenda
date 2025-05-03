const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/agenda', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB conectado com sucesso!'))
.catch(err => console.error('❌ Erro ao conectar no MongoDB:', err));
