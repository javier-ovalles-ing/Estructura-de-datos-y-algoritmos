/*
    COMPLEJIDAD ESPACIAL

    1. definicion
    2. tipos de memorias
    3.Recursión
    4. Algoritmos In-Place vs Out-of-Place
    5. Trade-off Espacio-Tiempo
    6. clases de complejidad espacial
    7. Regla práctica para calcular la complejidad espacial
    8. Preguntas clave que debes hacerte al analizar espacio
    9. Casos especiales importantes
    10. ejemplos
    11. Técnicas para reducir el espacio
    12. El trade-off tiempo-espacio, revisitado


    1. DEFINICION

    La complejidad espacial mide la cantidad total de memoria que requiere un algoritmo para ejecutarse en función del tamaño de los datos de entrada n.

    2. TIPOS DE MEMORIAS

    fija vs variable

    Espacio fijo: No depende del tamano de la entrada (n). incluye codigo del programa, variables simples, constantes. 

    Espacio variable: depende del tamano de la entrada (n). Incluye estricuras de datos dinamicas (arrelgos, listas, tablas hash, creadas durante la ejecucion). 

Entrada vs auxiliar

    Espacio de entrada: memoria nesesaria para almacenar los datos iniciales que recibe el algoritmo. 

    Espacio auxiliar: Es la memoria que el algoritmo nesesita y crea para almacenar datos temporales durante su ejecucion.

    Espacio total: espacio auxiliar + espacio de entrada.

    nota: cuando se habla de complejidad espacial en entrevistas y la industria, por lo general se refieren al espacio auxiliar, ya que el espacio de entrada es fijo y no depende del algoritmo.

3. RECURSION

La recursion consume espacio de memoria, por lo que aunque no cree ninguna estructura de datos, aun asi sigue consumiendo memoria. 

 def suma(n):
    if n == 0:
        return 0
    return n + suma(n - 1)

Tiempo: O(n)
Espacio: O(n), porque hay n llamadas apiladas

su version iterativa consume menos espacio:

def suma_iterativa(n):
    total = 0
    for i in range(n + 1):
        total += i
    return total

Tiempo: O(n)
Espacio: O(1), porque no se acumulan llamadas en la pila, solo hay un par de variables.

Ojo: no es lo mismo "cuántas veces se llama a la función" que "cuántas llamadas están apiladas al mismo tiempo". Lo que importa para el espacio es la profundidad máxima de la pila en un momento dado.

def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

Tiempo: O(2^n)
Espacio: O(n), porque solo hay una rama en la pila, aunque se hagan dos llamadas en cada recursion, solo una de ellas esta en la pila en un momento dado.

4. ALGORITMOS IN-PLACE VS OUT-OF-PLACE

In-place: Algoritmos que no requieren espacio adicional significativo para ejecutarse. Modifican los datos de entrada directamente. Ejemplo: ordenamiento por selección, ordenamiento por inserción.

Out-of-place: Algoritmos que requieren espacio adicional para ejecutarse. No modifican los datos de entrada directamente, sino que crean estructuras de datos adicionales. Ejemplo: ordenamiento por mezcla (merge sort), ordenamiento rápido (quick sort).

5. TRADE-OFF ESPACIO-TIEMPO 

Es un primcipio que establece una relacion de intercambio entre el tiempo y el espacio: para reducir el tiempo de ejecucion se debe aumentar la memoria utilizada y viseversa, para reducir la memoria utilizada se debe aumentar el tiempo de ejecucion.

Priorizar Tiempo (Menos tiempo, más espacio): Calculas respuestas con anticipación o guardas resultados intermedios en memoria para no tener que repetirlos.

Priorizar Espacio (Menos espacio, más tiempo): Liberas memoria re-calculando valores desde cero cada vez que los necesitas, sacrificando tiempo de procesamiento.

ejemplo: 

Llama a la función recursivamente recalculando los mismos valores una y otra vez.

6. CLASES DE COMPLEJIDAD ESPACIAL

  a) O(1) - Espacio constante: usa siempre el mismo espacio de memoria sin importar cuanto cresca la entrada n. no crea estructuras nuevas sino que usa unas pocas variables. 

  b) O(log n) - La memoria crece muy lento de forma logaritmica. tipico de algoritmos recursivos que dividen el problema en partes mas pequeñas. como por ejemplo la busqueda binaria.

  c) O(n) - complejidad lineal: La memoria crece proporcionalmente al tamano de la entrada n. es la mas comun. ejmplos: almacenar un arreglo de n elementos, una lista enlazada de n elementos, una tabla hash de n elementos.

  d) O(n^2) - complejidad cuadratica: La memoria crece proporcionalmente al cuadrado del tamano de la entrada n. ejmplos: almacenar una matriz de n x n elementos, un grafo representado con una matriz de adyacencia de n x n elementos.
  
    e). O(n log n) - Lineal-logarítmica
Usada cuando guardas algo por cada elemento y además por cada nivel de división.

Ejemplo: MergeSort. Necesita un array auxiliar de tamaño n y log n niveles de recursión.

f). O(2^n) y O(n!) - Complejidad Exponencial y Factorial
Inviable para n grandes. Típica de algoritmos de fuerza bruta que guardan todos los subconjuntos o permutaciones.

Ejemplo: guardar todos los subconjuntos de un conjunto para el problema de la mochila por fuerza bruta.

REGLAS PRACTICAS PARA CALCULAR LA COMPLEJIDAD ESPACIAL

    a) Establece que vas a medir, si la memoria auxiliar o la memoria total. 

    b) Solo cuenta lo que escala con la entrada n. Las variables int x, bool, lfoat, int i son O(1). no imporat que sean 5 variables o 100, siguen siendo O(1) si no dependen de n. 

    c) Si hay estructuras de datos que crecen con n, cuenta su tamaño. Por ejemplo, un arreglo de n elementos es O(n), una matriz de n x n es O(n^2), etc.
    
    d) lo que se reutiliza en un blucle o en una recursion no se cuenta como espacio adicional. Solo cuenta lo que se acumula y no se libera. Esto quiere decir que si creas por ejemplo una lista o arreglo en un blucle for y en cada ciclo se vuelve a crear la misma lista o arreglo este se describe como O(1). 

    for i in range(n):
    temp = [0]*n # si lo creas dentro y se libera cada vuelta -> O(n), no O(n^2)
El pico máximo de memoria manda, no la suma de todas las iteraciones.

pero si se acumula entonces si es O(n^2):

    res = []
for i in range(n):
    res.append([0]*n) # aquí sí -> O(n^2)

e)  La recursión es la trampa principal: cuenta el stack.
Cada llamada guarda su frame en el call stack.

f). Divide en capas:
Pregúntate:

¿Cuántas variables escalares? -> O(1)
¿Creo estructuras de tamaño n? -> Suma sus tamaños
¿Hay recursión? -> Suma profundidad del stack
¿Llamo a otra función que usa memoria? -> Incluye su complejidad
Formula final: S(n) = memoria fija + estructuras + stack recursivo

8. PREGUNTAS CLAVE QUE DEBES HACERTE AL ANALIZAR ESPACIO

¿El algoritmo crea nuevas estructuras de datos? → ¿de qué tamaño en relación a n?
¿Es recursivo? → ¿cuál es la profundidad máxima de la pila?
¿Modifica la entrada in-place o crea copias?
¿Hay estructuras auxiliares temporales dentro de bucles que se destruyen y crean repetidamente?

9. CASOS ESPECIALES IMPORTANTES

A) Recursión con múltiples ramas (ej. Fibonacci)
python
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)

Aunque el árbol de llamadas tiene exponencialmente muchos nodos en el tiempo, en un momento dado la pila solo contiene una rama activa. Por eso el espacio es O(n), aunque el tiempo sea O(2ⁿ). Esto sorprende a mucha gente: tiempo y espacio no siempre van de la mano.

B) Divide y vencerás (ej. Merge Sort)

python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    izquierda = merge_sort(arr[:mid])
    derecha = merge_sort(arr[mid:])
    return merge(izquierda, derecha)

Aquí hay dos cosas que sumar:

Pila de recursión: O(log n) de profundidad
Arrays auxiliares creados en cada nivel para el merge: O(n)

Total: O(n) (domina el término más grande)

C) Algoritmos "in-place"

Cuando un algoritmo modifica la entrada directamente sin usar estructuras auxiliares (como Quicksort en su versión clásica o Bubble Sort), se dice que es O(1) en espacio auxiliar, aunque Quicksort recursivo técnicamente tiene O(log n) por la pila en el mejor caso, o O(n) en el peor caso (cuando las particiones están muy desbalanceadas).

10. EJEMPLO:  Aplicando las Reglas Paso a Paso

def procesar(arr):
    n = len(arr)
    
    # Paso 1: eliminar duplicados
    vistos = set()
    resultado = []
    for x in arr:
        if x not in vistos:
            vistos.add(x)
            resultado.append(x)
    
    # Paso 2: generar todas las combinaciones de pares
    pares = []
    for i in range(len(resultado)):
        for j in range(i + 1, len(resultado)):
            pares.append((resultado[i], resultado[j]))
    
    return pares

Aplicando el proceso
Paso 1 — Identificar qué cuenta como espacio

Ignoramos arr (la entrada) y contamos solo lo que el algoritmo crea de más.

Paso 2 — Identificar las fuentes de memoria

Estructura	          ¿Qué guarda?	            Tamaño máximo

vistos (set)	      elementos únicos	        hasta n
resultado (lista)     elementos únicos	        hasta n
pares (lista)	      combinaciones de pares	hasta n(n-1)/2
n, i, j	              contadores simples	O(1)  


Paso 3 — Analizar cada parte por separado

vistos: en el peor caso (todos los elementos distintos), guarda n elementos → O(n).
resultado: mismo caso, hasta n elementos → O(n).
pares: si resultado tiene k elementos (k ≤ n), el número de pares es k(k-1)/2, que es del orden de k² → en el peor caso, O(n²).
Variables sueltas (n, i, j): O(1), no crecen con n.

No hay recursión aquí, así que no hay que preocuparse por la pila.

Paso 4 — Combinar y quedarse con el término dominante

Sumamos todas las contribuciones:

O(n)+O(n)+O(n²)+O(1)

El término que domina cuando n crece es n², así que:

Complejidad espacial es O(n²)

Paso 5 — Verificación con la pregunta clave

"¿Qué estructura crece más si n crece?" → Claramente pares, porque el número de combinaciones crece cuadráticamente, mientras que vistos y resultado solo crecen linealmente.

11. TÉCNICAS PARA REDUCIR EL ESPACIO

a). Convertir recursión en iteración
Elimina el uso de la pila de llamadas. A veces se usa una pila explícita (estructura de datos) en vez de la del sistema, lo cual da más control pero no siempre reduce el espacio — solo lo hace explícito y a veces más eficiente.

b) Algoritmos in-place
Modifican la estructura de datos original en vez de crear una copia. Ejemplo: invertir un arreglo intercambiando elementos con dos punteros (O(1) espacio) en vez de crear un arreglo nuevo invertido (O(n) espacio).

c) In-place: O(1) espacio
def invertir(arr):
    i, j = 0, len(arr) - 1
    while i < j:
        arr[i], arr[j] = arr[j], arr[i]
        i += 1
        j -= 1
d) Reutilizar memoria en vez de crear nuevas estructuras
Por ejemplo, en programación dinámica, si solo necesitas la fila anterior de una tabla (no toda la tabla completa), puedes reducir de O(n²) a O(n) de espacio.

python
# Fibonacci con memoización clásica: O(n) espacio
def fib_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
    return memo[n]

# Fibonacci optimizado: O(1) espacio
def fib_optimo(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

Aquí pasamos de O(n) a O(1) de espacio porque solo necesitamos los dos últimos valores, no todo el historial.

f). Generadores / streaming en vez de estructuras completas
En vez de cargar todos los datos en memoria (por ejemplo, una lista completa), procesarlos uno a uno con generadores o iteradores puede reducir drásticamente el espacio necesario, especialmente al leer archivos grandes.

12. EL TRADE-OFF TIEMPO-ESPACIO, REVISITADO

A veces, para reducir el tiempo de ejecución, se puede aumentar el uso de memoria (por ejemplo, usando memoización o tablas de búsqueda). Otras veces, para reducir el uso de memoria, se puede sacrificar tiempo (por ejemplo, recalculando valores en vez de almacenarlos).

Fibonacci con memoización (O(n) tiempo, O(n) espacio) es más rápido que la versión sin memoización, pero gasta más memoria que la versión iterativa optimizada (O(n) tiempo, O(1) espacio).

Ordenamiento in-place (quicksort) ahorra memoria pero puede ser menos estable o más difícil de paralelizar que uno que usa espacio auxiliar (merge sort).

Tablas hash usan más espacio que arreglos simples, pero a cambio dan acceso O(1) en vez de O(n).

No existe una respuesta universal de "qué es mejor": depende de si tu cuello de botella real es el tiempo de ejecución o la memoria disponible (por ejemplo, en sistemas embebidos, la memoria es más crítica que en un servidor).



*/
