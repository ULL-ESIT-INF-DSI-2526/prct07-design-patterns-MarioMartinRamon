import { describe, expect, test } from 'vitest';
import { LegacySmtpClient, EmailStatus, EmailResult, EmailMessage, SmtpAdapter } from '../src/modi-1.js'

describe('Test Modi', () => {
  
    test('Test de constructor', () => {
      const viejo = new LegacySmtpClient();
      const nuevo = new SmtpAdapter(viejo, "viejuno", 15);
      expect(() => viejo.connect("test", 1)).toThrow(
        `[SMTP] Client already connected to viejuno:15`,
      );
      expect(nuevo.host1).toBe("viejuno");
      expect(nuevo.port1).toBe(15);
    });

    test('Test de close', () => {
      const viejo = new LegacySmtpClient();
      const nuevo = new SmtpAdapter(viejo, "viejuno", 15);
      nuevo.close()
      expect(nuevo.host1).toBe("");
      expect(nuevo.port1).toBe(-1);
      expect(() => viejo.disconnect()).toThrow(
        `[SMTP] The client is not connected. Nothing to disconnect`,
      );
    });

    test('Test de send', () => {
      const viejo = new LegacySmtpClient();
      const nuevo = new SmtpAdapter(viejo, "viejuno", 15);
      const msg: EmailMessage = {
        from: "Julio",
        subject: "Algo",
        body: "JEJE",
        to : ["Ana", "Alberto"],
        isHtml: true
      }
      const result: EmailResult = nuevo.send(msg);
      expect(result.messageId).toBe("MSG - {0} - {0}");
      expect(result.status).toBeOneOf(["enviado" , "fallido" , "pendiente"]);
      expect(result.recipients[0]).toBe("Ana");
      expect(result.recipients[1]).toBe("Alberto");
    });

    test('Test de sendBulk', () => {
      const viejo = new LegacySmtpClient();
      const nuevo = new SmtpAdapter(viejo, "viejuno", 15);
      const msg1: EmailMessage = {
        from: "Julio",
        subject: "Algo",
        body: "JEJE",
        to : ["Ana", "Alberto"],
        isHtml: true
      }
      const msg2: EmailMessage = {
        from: "Julio",
        subject: "Algo",
        body: "JEJE",
        to : ["Ana", "Alberto"],
        isHtml: true
      }
      const msg3: EmailMessage = {
        from: "Julio",
        subject: "Algo",
        body: "JEJE",
        to : ["Ana", "Alberto"],
        isHtml: true
      }
      const arr = [msg1, msg2, msg3];
      const result: EmailResult[] = nuevo.sendBulk(arr);
    expect(result[0].messageId).toBe("MSG - {0} - {0}");
    expect(result[1].messageId).toBe("MSG - {2} - {2}");
    expect(result[2].messageId).toBe("MSG - {4} - {4}");
    expect(result[0].recipients[0]).toBe("Ana");
    expect(result[1].recipients[1]).toBe("Alberto");
    });

    test('Test de getStatus', () => {
      const viejo = new LegacySmtpClient();
      const nuevo = new SmtpAdapter(viejo, "viejuno", 15);
      const msg1: EmailMessage = {
        from: "Julio",
        subject: "Algo",
        body: "JEJE",
        to : ["Ana", "Alberto"],
        isHtml: true
      }
      const msg2: EmailMessage = {
        from: "Julio",
        subject: "Algo",
        body: "JEJE",
        to : ["Ana", "Alberto"],
        isHtml: true
      }
      const msg3: EmailMessage = {
        from: "Julio",
        subject: "Algo",
        body: "JEJE",
        to : ["Ana", "Alberto"],
        isHtml: true
      }
    const arr = [msg1, msg2, msg3];
    nuevo.sendBulk(arr);
    const result = nuevo.getStatus("MSG - {0} - {0}");
    expect(result).toBeOneOf(["enviado" , "fallido" , "pendiente"]);
    const result2 = nuevo.getStatus("MSG - {110} - {110}");
    expect(result2).toBe("fallido");
    });
});