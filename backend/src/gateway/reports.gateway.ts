import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ReportsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId;
    if (typeof userId === 'string' && userId.length > 0) {
      // Join a unique room for this user so we can send notifications to all their active tabs
      void client.join(`user_${userId}`);
    }
  }

  handleDisconnect() {
    // Rooms are automatically left upon disconnect
  }

  notifyCitizenAboutComment(
    citizenId: number,
    reportId: number,
    commentContent: string,
  ) {
    this.server.to(`user_${citizenId}`).emit('new_comment', {
      reportId,
      message: 'An officer commented on your report!',
      content: commentContent,
    });
  }
}
