const TicketList = require("./ticket-list");

class Sockets {
  constructor(io) {
    this.io = io;

    this.ticketList = new TicketList();

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      socket.on("solicitar-ticket", (_, callback) => {
        const nuevoTicket = this.ticketList.crearTicket();
        callback(nuevoTicket);
      });
      socket.on("siguiente-ticket", (usuario, callback) => {
        const { agente, escritorio } = usuario;
        const suTicket = this.ticketList.asignarTicket(agente, escritorio);
        callback(suTicket);
        this.io.emit("ticket-asignado", this.ticketList.ultimos13);
      });
    });
  }
}

module.exports = Sockets;
