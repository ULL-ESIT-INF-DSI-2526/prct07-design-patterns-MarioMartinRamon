/*
export class AppConfig {
   private static instance: AppConfig
   private config: Map<string, string>


   private constructor() {
       this.config = new Map<string, string>()
   }


   public static getInstance(): AppConfig {
       if (!AppConfig.instance) {
           AppConfig.instance = new AppConfig()
       }
       return AppConfig.instance
   }


   set(key: string, value: string): void {
       AppConfig.instance.config.set(key, value)
   }


   get(key: string): string | undefined {
       return AppConfig.instance.config.get(key)
   }


   getAll(): Map<string, string> {
       return AppConfig.instance.config
   }


   reset(): void {
       if (AppConfig.instance.config.get("env") === "test") {
           AppConfig.instance.config.clear()
       } else {
           console.log("Error: No se puede resetear la configuración, env no es test")
       }
   }


   loadProfile(profile: "development" | "production"): void {
       if (profile === "development") {
           AppConfig.instance.config.set("apiUrl", "http://localhost:3000")
           AppConfig.instance.config.set("theme", "dark")
           AppConfig.instance.config.set("lang", "es")
       } else if (profile === "production") {
AppConfig.instance.config.set("apiUrl", "https://api.miapp.com")
           AppConfig.instance.config.set("theme", "light")
           AppConfig.instance.config.set("lang", "en")
       }
   }
}


// Simulación de dos módulos distintos
const moduleA = () => {
   const config = AppConfig.getInstance()
   config.set("env", "test")
   console.log("Module A - Config set: ", config.getAll())
}


const moduleB = () => {
   const config = AppConfig.getInstance()
   console.log("Module B - Config get: ", config.getAll())
}


moduleA()
moduleB()


const config1 = AppConfig.getInstance()
const config2 = AppConfig.getInstance()
console.log("¿Ambas referencias son iguales? ", config1 === config2)
*/