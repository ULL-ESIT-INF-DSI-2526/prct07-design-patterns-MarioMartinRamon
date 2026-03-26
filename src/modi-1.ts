export class LegacySmtpClient {
  private _connected: boolean = false;
  private _host: string = "";
  private _port: number = -1;
  connect(host: string, port: number): number {
    if (this._connected) {
      throw Error(
        `[SMTP] Client already connected to ${this._host}:${this._port}`,
      );
    }
    console.log(`[SMTP] Connected to ${host}:${port}`);
    this._host = host;
    this._port = port;
    this._connected = true;
    return 0;
  }

  disconnect(): number {
    if (!this._connected) {
      console.log("HERE");
      throw Error("[SMTP] The client is not connected. Nothing to disconnect");
    }
    console.log(`[SMTP] Disconnected`);
    this._connected = false;
    this._host = "";
    this._port = -1;
    return 0;
  }

  sendRaw(
    from: string,
    to: string,
    subject: string,
    body: string,
    isHtml: boolean,
  ): number {
    // 0 = success, 1 = error, 2 = pending
    if (this._connected) {
      console.log(this._connected);
      console.log(
        `[SMTP] Sending from ${from} to [${to}] | subject: "${subject}"`,
      );
      return Math.floor(Math.random() * 3);
    } else {
      throw new Error(`[SMTP] Client not connected yet!`);
    }
  }
}

export type EmailStatus = "enviado" | "fallido" | "pendiente";

export type EmailMessage = {
  from: string,
  subject: string,
  body: string,
  to : string[],
  isHtml: boolean
}

export type EmailResult = {
    messageId: string,
    status: EmailStatus,
    recipients: string[]
}

export interface EmailService {
  send(message: EmailMessage): EmailResult
  sendBulk(messages: EmailMessage[]): EmailResult[]
  getStatus(messageId: string): EmailStatus
}

export class SmtpAdapter implements EmailService {
    public LegacySmtpClient: LegacySmtpClient;
    public host1: string = "";
    public port1: number = 0;
    public results: EmailResult[] = [];
    public timestamp: number = 0;
    public counter: number = 0;


    constructor(LegacySmtpClient: LegacySmtpClient, host: string, port: number) {
      this.LegacySmtpClient = LegacySmtpClient;
      this.host1 = host;
      this.port1 = port;
      this.LegacySmtpClient.connect(this.host1, this.port1);
    }

    close(): number {
      const result = this.LegacySmtpClient.disconnect();
      this.host1 = "";
      this.port1 = -1;
      return result;
    }

    send(message: EmailMessage): EmailResult {
      let tos: string = "";
      const result: EmailResult = {
        messageId: "",
        status: "enviado",
        recipients: []
      }

      result.messageId = `MSG - {${this.timestamp}} - {${this.counter}}`
      this.timestamp++
      this.counter++

      for (let i = 0; i < message.to.length; i++) {
        tos += `${message.to}`
        if (message.to.length !== (i + 1)) tos += ";"
      }
      const legacy = this.LegacySmtpClient.sendRaw(message.from, tos, message.subject, message.body, message.isHtml)
      if (legacy === 0) {
        result.status = "enviado"
      } else if (legacy === 1) {
        result.status = "fallido"
      } else if (legacy === 2) {
        result.status = "pendiente"
      }

      result.recipients = message.to;
      this.results.push(result);
      return result;
    }

    sendBulk(messages: EmailMessage[]): EmailResult[] {
      const result: EmailResult[] = [];
      for (let i = 0; i < messages.length; i++) {
        result.push(this.send(messages[i]));
        this.results.push(this.send(messages[i]))
      }
      return result;
    }

    getStatus(messageId: string): EmailStatus {
      this.results.forEach((msg) => {if(msg.messageId == messageId) return msg.status});
      console.log("messageID no encontrado");
      return "fallido";
    }

    filter(status: EmailStatus): EmailResult[] {
      const resultado: EmailResult[] = this.results.filter(msg => msg.status === status);
      return resultado;
    } 
}