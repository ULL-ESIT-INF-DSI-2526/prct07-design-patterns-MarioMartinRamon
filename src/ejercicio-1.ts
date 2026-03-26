/**
 * Se quiere desarrollar una herramienta que exporte informes a distintos formatos:

    PDF.
    Word.
    HTML.

Cada exportador debe implementar una operación export(content: string): string, que devuelva una representación del contenido en el formato correspondiente.

La aplicación principal genera el contenido del informe, pero no debe conocer cómo se construye cada exportador concreto.

Tenga en cuenta los siguientes requisitos:

    Diseñe una jerarquía de clases para representar exportadores.
    Diseñe una jerarquía de creadores que utilice Factory Method.
    El cliente debe poder generar el mismo informe en varios formatos sin depender de clases concretas.
    La solución debe quedar preparada para añadir fácilmente un formato Markdown.

Amplíe el ejercicio, añadiendo una operación común getFileExtension(): string en los productos.
 */

/*
export interface Exporter {
  export(content: string): string;
  getFileExtension(): string;
}

export class PDFExporter implements Exporter {
  export(content: string): string {
    return `PDF: ${content}`;
  }
  getFileExtension(): string {
    return "pdf";
  }
}

export class WordExporter implements Exporter {
  export(content: string): string {
    return `Word: ${content}`;
  }
  getFileExtension(): string {
    return "docx";
  }
}

export class HTMLExporter implements Exporter {
  export(content: string): string {
    return `HTML: ${content}`;
  }
  getFileExtension(): string {
    return "html";
  }
}

export class MarkdownExporter implements Exporter {
  export(content: string): string {
    return `Markdown: ${content}`;
  }
  getFileExtension(): string {
    return "md";
  }
}

export abstract class ExporterFactory {
  public abstract createExporter(): Exporter;

  public gerateReport(content: string): void {
    const exporter = this.createExporter();
    const exportedContent = exporter.export(content);
    console.log(`Generated report in ${exporter.getFileExtension()}: ${exportedContent}`);
  }
}

export class PDFExporterFactory extends ExporterFactory {
  public createExporter(): Exporter {
    return new PDFExporter();
  }
}

export class WordExporterFactory extends ExporterFactory {
  public createExporter(): Exporter {
    return new WordExporter();
  }
}

export class HTMLExporterFactory extends ExporterFactory {
  public createExporter(): Exporter {
    return new HTMLExporter();
  }
}

export class MarkdownExporterFactory extends ExporterFactory {
  public createExporter(): Exporter {
    return new MarkdownExporter();
  }
}

export function clientCode(factory: ExporterFactory, content: string): void {
  factory.gerateReport(content);
}

const content = "Este es el contenido del informe.";
clientCode(new PDFExporterFactory(), content);
clientCode(new WordExporterFactory(), content);
clientCode(new HTMLExporterFactory(), content);
clientCode(new MarkdownExporterFactory(), content);
*/