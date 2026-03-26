/**
* Implementa el patrón de diseño Observer
* - Definir tipo OrderStatus para valores "pending", "confirmed", "shipped", "delivered"
* - tipo Order con propiedades id, status, items
* - Interfaz Observer con método update(order: Order): void
* - Interfaz Observable con métodos subscribe, unsubscribe, notify
* - Clase OrderManager que implementa Observable, notifica cuando hay cambios en un pedido
* - MétodoaddOrder(order: Order) Si existe pedido con igual id lanza error
* - getOrder(id: string): Order | undefined
* - updateOrderStatus(id: string, status: OrderStatus) actualiza estado y notifica
* - Si el nuevo estado es igual al actual no hace nada
* - Implementar 2 observers: EmailNotifier y InventoryUpdater, cada uno muestra por consola algo de su responsabilidad
*
*/

/*
type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered";

interface Order {
  id: string;
  status: OrderStatus;
  items: string[];
}

interface Observer {
  update(order: Order): void;
}

interface Observable {
  subscribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
  notify(order: Order): void;
}

class OrderManager implements Observable {
  private orders: Map<string, Order> = new Map();
  private observers: Observer[] = [];

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

    unsubscribe(observer: Observer): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(order: Order): void {
        this.observers.forEach(observer => observer.update(order));
    }

    addOrder(order: Order): void {
        for (let existingOrder of this.orders.values()) {
            if (existingOrder.id === order.id) {
                throw new Error(`Order with id ${order.id} already exists`);
            }
        }
        this.orders.set(order.id, order);
        this.notify(order);
    }

    getOrder(id: string): Order | undefined {
        return this.orders.get(id);
    }

    updateOrderStatus(id: string, status: OrderStatus): void {
        const order = this.orders.get(id);
        if (!order) {
            throw new Error(`Order with id ${id} not found`);
        }
        if (order.status === status) {
            return; // No hace nada si el nuevo estado es igual al actual
        }
        order.status = status;
        this.notify(order);
    }
}

class EmailNotifier implements Observer {
  update(order: Order): void {
    console.log(`EmailNotifier: Order ${order.id} is now ${order.status}`);
  }
}

class InventoryUpdater implements Observer {
  update(order: Order): void {
    console.log(`InventoryUpdater: Updating inventory for order ${order.id} with status ${order.status}`);
  }
}

// Ejemplo de uso
const orderManager = new OrderManager();
const emailNotifier = new EmailNotifier();
const inventoryUpdater = new InventoryUpdater();

orderManager.subscribe(emailNotifier);
orderManager.subscribe(inventoryUpdater);

const order1: Order = { id: "1", status: "pending", items: ["item1", "item2"] };
orderManager.addOrder(order1);

orderManager.updateOrderStatus("1", "confirmed");
orderManager.updateOrderStatus("1", "shipped");
orderManager.updateOrderStatus("1", "delivered");

orderManager.unsubscribe(emailNotifier);

orderManager.updateOrderStatus("1", "pending");
*/