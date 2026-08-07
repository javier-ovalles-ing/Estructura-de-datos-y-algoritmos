/*
RECURSIVIDAD Y RELACIONES DE RECURRENCIA

RECURSIVIDAD: 

Es una técnica de programación en la que una función se llama a sí misma para resolver un problema. Se utiliza para dividir un problema en subproblemas más pequeños y manejables.

Un algoritmo es recursivo cuando se llama asi mismo para resolver una version mas pequena del mismo problema.

Para evitar un ciclo infinito, una funcion nesesita dos componentes:

Caso base: La condición de parada. Es el problema en su versión más simple, el cual se resuelve directamente sin volver a llamar a la función.

Paso recursivo: La llamada a la propia función, reduciendo el tamaño del problema hacia el caso base.

Ejemplo clásico: Factorial de  n (n!)

El factorial de n es n (n-1)!, con el caso base de que 0! = 1.
*/ 

    function factorial(n) {
        // 1. Caso base
        if (n === 0) {
            return 1;
        }
        // 2. Paso recursivo
        return n * factorial(n - 1);
    }
/*

    RELACIONES DE RECURRENCIA

    Son ecuaciones matematias que describen una susesion de terminos en funcion de los terminos anteriores. Se utilizan para analizar el tiempo de ejecucion de algoritmos recursivos. 

    metodos para resolver relaciones de recurrencia:

     1. Método de sustitución (o inducción)

    Consiste en adivinar una solución candidata (una cota, por ejemplo T(n) = O(n log n)) y luego demostrarla formalmente por inducción matemática, sustituyendo la hipótesis en la propia definición de la recurrencia.

    Pasos del método
    1. Adivinar la forma de la solución (basándose en intuición, casos pequeños o el árbol de recursión).
    2. Plantear la hipótesis inductiva: suponer que la fórmula es válida para todos los valores menores que n.
    3. Sustituir la hipótesis dentro de la recurrencia original.
    4. Verificar algebraicamente que se cumple para n, ajustando constantes si es necesario.
    5. Comprobar el caso base.

Ejemplo 1: Recurrencia lineal simple
T(n) = 2T(n/2) + n
T(1) = 1

Paso 1 — Adivinar: proponemos que T(n) = O(n log n), es decir, queremos probar:

T(n) ≤ c · n · log n     (para alguna constante c > 0 y n suficientemente grande)

Paso 2 — Hipótesis inductiva: asumimos que se cumple para n/2:

T(n/2) ≤ c · (n/2) · log(n/2)

Paso 3 — Sustituir en la recurrencia:

T(n) = 2T(n/2) + n
     ≤ 2[c · (n/2) · log(n/2)] + n
     = c·n·log(n/2) + n
     = c·n·[log n − log 2] + n
     = c·n·log n − c·n + n

Paso 4 — Verificar:

T(n) ≤ c·n·log n − c·n + n
     = c·n·log n − (c−1)·n

Si elegimos c ≥ 1, entonces −(c−1)·n ≤ 0, por lo tanto:

T(n) ≤ c·n·log n   ✔️

Conclusión: T(n) = O(n log n).


    2. METODO DEL ARBOL DE RECURSION
    
    consiste en representar la ejecucion de un algoritmo recursivo como un arbol, donde cada nodo representa una llamada a la funcion y sus hijos representan las llamadas recursivas que realiza. Se analiza el costo de cada nivel del arbol y se suman para obtener el costo total.

    Este método es ideal para adivinar la solución antes de aplicar sustitución, o para resolver directamente recurrencias irregulares.

    Pasos del método

1. Dibujar el nodo raíz con el costo f(n) (el trabajo "extra" en cada llamada, sin contar recursión).
2. Expandir cada nivel: ¿cuántos hijos tiene cada nodo? ¿cuál es el tamaño del problema en cada hijo?
3. Calcular el costo total de cada nivel (número de nodos × costo por nodo).
4. Determinar la profundidad del árbol (cuántos niveles hay hasta llegar al caso base).
5. Sumar el costo de todos los niveles (generalmente es una serie geométrica o aritmética).

ejemplo: 

    T(n) = 2T(n/2) + n        (n = costo de "mezclar")

Nivel 0: 1 nodo de tamaño n → costo n

Nivel 1: 2 nodos de tamaño n/2 → costo total 2 · (n/2) = n

Nivel 2: 4 nodos de tamaño n/4 → costo total 4 · (n/4) = n

Nivel k: 2^k nodos de tamaño n / 2^k → costo total 2^k · (n/2^k) = n
 
 Cuántos niveles hay? El árbol termina cuando el tamaño del subproblema llega a 1:

n / 2^k = 1   →   k = log₂ n

Suma total:

T(n) = (número de niveles) × (costo por nivel)
     = (log₂ n + 1) × n
     = Θ(n log n)

3. Teorema Maestro (Master Theorem)

Solo funciona para recurrencias de la forma exacta:

T(n) = a·T(n/b) + f(n)

donde:

a ≥ 1 → número de subproblemas
b > 1 → factor de reducción del tamaño
f(n) → costo del trabajo "extra" fuera de la recursión (dividir + combinar)

⚠️ No aplica si los subproblemas no son de tamaño uniforme (ej. T(n/2) + T(n/3)), ni si a o b no son constantes.

l valor clave: n^(log_b a)

Este término representa el costo si todo el trabajo se concentrara en las hojas del árbol de recursión. Se compara contra f(n) para saber quién "domina" el crecimiento total.

Los tres casos

Caso 1 — Las hojas dominan

Si f(n) = O(n^(log_b a − ε))  para algún ε > 0

Entonces:

T(n) = Θ(n^(log_b a))

(f(n) crece más lento que n^(log_b a) por un factor polinomial)

Caso 2 — Equilibrio entre niveles

Si f(n) = Θ(n^(log_b a))

Entonces:

T(n) = Θ(n^(log_b a) · log n)

(f(n) crece al mismo ritmo que n^(log_b a))

Caso 3 — La raíz domina

Si f(n) = Ω(n^(log_b a + ε))  para algún ε > 0,
Y además se cumple la condición de regularidad: a·f(n/b) ≤ c·f(n) para c < 1

Entonces:

T(n) = Θ(f(n))

(f(n) crece más rápido que n^(log_b a), y el trabajo se concentra en el nivel superior)

📌 Importante: existe una "zona gris" entre los tres casos. Si f(n) no cae claramente en ninguno (por ejemplo, difiere por un factor logarítmico en vez de polinomial), el Teorema Maestro no es aplicable y hay que usar sustitución o árbol de recursión (o la versión extendida del teorema).

Ejemplos resueltos paso a paso

Ejemplo A — Merge Sort

T(n) = 2T(n/2) + n
a = 2, b = 2, f(n) = n
Calcular n^(log_b a) = n^(log₂ 2) = n^1 = n
Comparar f(n) = n contra n^1 = n → son iguales → Caso 2
Resultado: T(n) = Θ(n log n)

Ejemplo B — Búsqueda binaria

T(n) = T(n/2) + O(1)
a = 1, b = 2, f(n) = 1
Calcular n^(log_b a) = n^(log₂ 1) = n^0 = 1
Comparar f(n) = 1 contra 1 → son iguales → Caso 2
Resultado: T(n) = Θ(log n)

Ejemplo C — Multiplicación de matrices (algoritmo ingenuo recursivo)

T(n) = 8T(n/2) + n²
a = 8, b = 2, f(n) = n²
Calcular n^(log_b a) = n^(log₂ 8) = n^3
Comparar f(n) = n² contra n^3 → f(n) crece más lento (por un factor polinomial n) → Caso 1
Resultado: T(n) = Θ(n³)

Ejemplo D — Algoritmo de Strassen

T(n) = 7T(n/2) + n²
a = 7, b = 2, f(n) = n²
Calcular n^(log_b a) = n^(log₂ 7) ≈ n^2.807
Comparar f(n) = n² contra n^2.807 → f(n) crece más lento → Caso 1
Resultado: T(n) = Θ(n^log₂7) ≈ Θ(n^2.807)


Estrategia recomendada
¿La recurrencia tiene la forma aT(n/b) + f(n)?
        │
        ├── Sí → ¿Cae claramente en un caso del Teorema Maestro?
        │           ├── Sí → Usar Teorema Maestro (rápido y directo)
        │           └── No → Usar árbol de recursión o sustitución
        │
        └── No (recurrencia irregular, ej. T(n/3)+T(2n/3)) 
                    → Usar árbol de recursión para adivinar,
                      luego sustitución para confirmar

*/