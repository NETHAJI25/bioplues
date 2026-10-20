import { WebSocketServer, WebSocket } from 'ws';
import type { Server } from 'http';
import { env } from '../config/env.ts';

interface Client {
  ws: WebSocket;
  id: string;
  subscriptions: Set<string>;
}

export class WSServer {
  private wss: WebSocketServer;
  private clients = new Map<string, Client>();

  constructor(server: Server) {
    this.wss = new WebSocketServer({ server, path: '/ws' });
    this.setup();
  }

  private setup() {
    this.wss.on('connection', (ws) => {
      const clientId = crypto.randomUUID();
      const client: Client = {
        ws,
        id: clientId,
        subscriptions: new Set(),
      };
      this.clients.set(clientId, client);

      ws.send(JSON.stringify({ type: 'connected', clientId }));

      ws.on('message', (data) => {
        try {
          const msg = JSON.parse(data.toString());
          if (msg.type === 'subscribe' && msg.channel) {
            client.subscriptions.add(msg.channel);
            ws.send(JSON.stringify({ type: 'subscribed', channel: msg.channel }));
          } else if (msg.type === 'unsubscribe' && msg.channel) {
            client.subscriptions.delete(msg.channel);
          }
        } catch (e) {
          // ignore
        }
      });

      ws.on('close', () => {
        this.clients.delete(clientId);
      });
    });
  }

  broadcast(channel: string, data: any) {
    const message = JSON.stringify({ type: 'event', channel, data, timestamp: new Date().toISOString() });
    for (const client of this.clients.values()) {
      if (client.subscriptions.has(channel) || channel === 'all') {
        if (client.ws.readyState === WebSocket.OPEN) {
          client.ws.send(message);
        }
      }
    }
  }

  emitScanProgress(scanId: string, progress: number, status: string, message?: string) {
    this.broadcast(`scan:${scanId}`, {
      type: 'scan_progress',
      scanId,
      progress,
      status,
      message,
    });
  }

  emitFinding(scanId: string, finding: any) {
    this.broadcast(`scan:${scanId}`, {
      type: 'finding',
      finding,
    });
  }

  emitLog(scanId: string, log: string) {
    this.broadcast(`scan:${scanId}`, {
      type: 'log',
      log,
    });
  }
}

import crypto from 'crypto';
export let wsServer: WSServer | null = null;
export const initWebSocket = (server: Server): WSServer => {
  if (!wsServer) {
    wsServer = new WSServer(server);
  }
  return wsServer;
};
