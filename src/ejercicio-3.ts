/**
 * Implementa el patrón de diseño Adapter que cumpla lo siguiente:
 * - El objetivo es adaptar un sistema de pagos antiguo (Legacy) para que funcione con una nueva interfaz estándar de la aplicación.
 * * 1. Define la interfaz objetivo (Target):
 * - Interfaz `PaymentProcessor` con el método `processPayment(amount: number, currency: string): boolean`
 * * 2. Define la clase existente / incompatible (Adaptee):
 * - Clase `LegacyPaymentSystem`
 * - Método `makeTransaction(usdAmount: number, description: string): string`
 * - Este método asume que siempre cobra en dólares (USD). Si `usdAmount` es mayor a 0, devuelve un string simulando un ID de transacción (ej. "TXN-12345"). Si es 0 o menor, lanza un error "Invalid amount".
 * * 3. Crea la clase Adaptadora (Adapter):
 * - Clase `LegacyPaymentAdapter` que implementa la interfaz `PaymentProcessor`.
 * - Su constructor debe recibir una instancia de `LegacyPaymentSystem`.
 * - Implementa `processPayment`. Dentro de este método debes adaptar los datos antes de llamar al sistema legacy:
 * - Si `currency` es "EUR", convierte la cantidad a dólares (multiplica el amount por 1.10).
 * - Si `currency` es "USD", mantén la cantidad intacta.
 * - Si es cualquier otra moneda, lanza un error "Currency not supported".
 * - Llama a `makeTransaction` del sistema legacy pasando el importe convertido y una descripción genérica como "Online Store Purchase".
 * - Si la transacción devuelve un ID, retorna `true`. Si el sistema legacy lanza un error, captúralo (try/catch), muestra un mensaje por consola y retorna `false`.
 * * 4. Crea el cliente que usará la interfaz estándar:
 * - Clase `CheckoutService` que recibe en su constructor un objeto de tipo `PaymentProcessor`.
 * - Método `checkout(total: number, currency: string): void` que invoque el procesamiento del pago e imprima por consola si la compra fue exitosa o falló.
 * * 5. Demuestra el funcionamiento:
 * - Instancia el `LegacyPaymentSystem`.
 * - Instancia el `LegacyPaymentAdapter` pasándole el sistema legacy.
 * - Instancia el `CheckoutService` inyectándole el adaptador.
 * - Ejecuta un checkout exitoso en "USD", un checkout exitoso en "EUR", un checkout fallido por importe negativo, y un checkout que falle por moneda no soportada (ej. "GBP").
 */

interface PaymentProcessor {
  processPayment(amount: number, currency: string): boolean;
}

class LegacyPaymentSystem {
  private desc: string = "";
  makeTransaction(usdAmount: number, description: string): string {
    if (usdAmount > 0) {
      this.desc = description;
      return `TXN-${Math.floor(Math.random() * 100000)}`;
    } else {
      throw new Error("Invalid amount");
    }
  }
}

class LegacyPaymentAdapter implements PaymentProcessor {
  private legacySystem: LegacyPaymentSystem;

  constructor(legacySystem: LegacyPaymentSystem) {
    this.legacySystem = legacySystem;
  }

  processPayment(amount: number, currency: string): boolean {
    let usdAmount: number;

    if (currency === "EUR") {
      usdAmount = amount * 1.1;
    } else if (currency === "USD") {
      usdAmount = amount;
    } else {
      console.error("Currency not supported");
      return false;
    }

    try {
      const transactionId = this.legacySystem.makeTransaction(
        usdAmount,
        "Online Store Purchase",
      );
      console.log(`HECHO: ${transactionId}`);
      return true;
    } catch (error: any) {
      console.error(`FALLIDO: ${error.message}`);
      return false;
    }
  }
}

class CheckoutService {
  private paymentProcessor: PaymentProcessor;

  constructor(paymentProcessor: PaymentProcessor) {
    this.paymentProcessor = paymentProcessor;
  }

  checkout(total: number, currency: string): void {
    const success = this.paymentProcessor.processPayment(total, currency);
    if (success) {
      console.log("Compra exitosa");
      console.log(`Total: ${total} ${currency}`);
    } else {
      console.log("Compra fallida");
    }
  }
}

// Demostración
const legacySystem = new LegacyPaymentSystem();
const adapter = new LegacyPaymentAdapter(legacySystem);
const checkoutService = new CheckoutService(adapter);

checkoutService.checkout(100, "USD");
checkoutService.checkout(100, "EUR");
