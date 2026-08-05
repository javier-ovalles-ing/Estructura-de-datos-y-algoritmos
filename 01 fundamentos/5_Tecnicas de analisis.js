/*

TECNIAS DE ANALISIS DE ALGORITMOS

Al analisar un algoritmo no basta con decir cuesta O(n^2) o O(n log n), sino que es necesario entender la disposición y estructura de los datos de entrada. El costo real depende de la entrada concreta. Por eso distinguimos entre tres tipos de análisis: peor caso, mejor caso y caso promedio.

1. Mejor caso (Best Case)


1Es el escenario en el que el algoritmo realiza el menor número posible de operaciones para un tamaño de entrada (n).

Representa el límite inferior del rendimiento del algoritmo

Utilidad: sirve para saber qué tan rápido puede llegar a ser el algoritmo en condiciones ideales. Sin embargo, en la práctica se usa poco porque las entradas “ideales” suelen ser raras o artificiales.

Ejemplo clásico – Búsqueda lineal:

*/

function busquedaLineal(A, x) {
    for (let i = 0; i < A.length; i++) {
        if (A[i] === x) {
            return i;
        }
    }
    return -1;
}

/*

Mejor Caso: El elemento x está en la primera posición (i=0)

2. Análisis del Peor Caso

El peor caso representa el máximo tiempo de ejecución posible para cualquier entrada de tamaño n. Es la situación donde el algoritmo tiene que realizar el mayor esfuerzo computacional.

Es el comportamiento del algoritmo bajo la entrada más desfavorable posible: aquella que maximiza el número de operaciones.

Garantía absoluta: El algoritmo nunca tomará más tiempo

Crítico para sistemas en tiempo real

Base para comparaciones justas entre algoritmos

ejemplo 2: ordenacion burbuja (Bubble Sort): 

*/

function burbujaOptimizada(arr) {
    let n = arr.length;
    let intercambiado;
    
    for (let i = 0; i < n; i++) {
        intercambiado = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                intercambiado = true;
            }
        }
        // Si no hubo intercambios en esta pasada, el array ya está ordenado
        if (!intercambiado) break;
    }
    return arr;
}

/*

Peor Caso: El array está ordenado en orden inverso

Caso promedio (Average Case)

Es el comportamiento esperado del algoritmo, considerando todas las entradas posibles de tamaño n ponderadas por su probabilidad de ocurrencia.

Realista: Refleja el comportamiento típico

Complejo: Requiere análisis probabilístico

Desafío matemático: Requiere asumir o conocer la distribución de los datos (habitualmente se asume una distribución uniforme, donde todas las entradas son igu
almente probables).

*/

class HashTable {
    constructor(size) {
        this.size = size;
        this.table = Array.from({ length: size }, () => []);
    }

    // Función hash simple para strings y números
    _hash(key) {
        let hash = 0;
        const strKey = String(key);
        for (let i = 0; i < strKey.length; i++) {
            hash = (hash + strKey.charCodeAt(i) * (i + 1)) % this.size;
        }
        return hash;
    }

    insert(key, value) {
        const index = this._hash(key);
        // Opcional: Actualizar el valor si la llave ya existe
        for (let i = 0; i < this.table[index].length; i++) {
            if (this.table[index][i][0] === key) {
                this.table[index][i][1] = value;
                return;
            }
        }
        this.table[index].push([key, value]);
    }

    search(key) {
        const index = this._hash(key);
        for (const [k, v] of this.table[index]) {
            if (k === key) {
                return v;
            }
        }
        return null;
    }
}

/*

Caso Promedio: 

Factor de carga α = n/m (n elementos, m buckets)

Longitud esperada de cada lista: α
Tiempo de búsqueda: O(1 + α)
Si α es constante: O(1) promedio


8. Caso amortizado (bonus: un cuarto tipo de análisis)

Existe un cuarto tipo de análisis, distinto de los tres anteriores, que es fundamental en estructuras de datos dinámicas: el análisis amortizado.

Definición

No analiza una sola operación aislada, sino el costo promedio por operación a lo largo de una secuencia completa de operaciones — incluso si algunas operaciones individuales son costosas, el análisis muestra que en promedio, "distribuidas" a lo largo de la secuencia, resultan baratas.

Diferencia clave con el caso promedio
Caso promedio: asume una distribución probabilística sobre las entradas.
Caso amortizado: NO asume probabilidad alguna; es una garantía determinista sobre secuencias de operaciones, sin importar el orden o la "suerte".
Ejemplo clásico: arreglo dinámico (dynamic array / ArrayList)
python
lista = []
for i in range(n):
    lista.append(i)   # a veces O(1), a veces O(n) por redimensionar

Cuando el arreglo se llena, se debe crear uno nuevo (típicamente del doble de tamaño) y copiar todos los elementos: esa operación individual cuesta O(n). Pero esto ocurre muy pocas veces (log n veces en total), así que el costo total de n inserciones es O(n), y por lo tanto:

→ Costo amortizado por operación = O(1), aunque el peor caso de una sola operación sea O(n).


9. Comparación integral de algoritmos clásicos

9. Comparación integral de algoritmos clásicos
Algoritmo	Mejor caso	Caso promedio	Peor caso
Búsqueda secuencial	O(1)	O(n)	O(n)
Búsqueda binaria	O(1)	O(log n)	O(log n)
Bubble Sort	O(n)	O(n²)	O(n²)
Insertion Sort	O(n)	O(n²)	O(n²)
Selection Sort	O(n²)	O(n²)	O(n²)
Merge Sort	O(n log n)	O(n log n)	O(n log n)
Quick Sort	O(n log n)	O(n log n)	O(n²)
Heap Sort	O(n log n)	O(n log n)	O(n log n)
Búsqueda en tabla hash	O(1)	O(1)	O(n)
Búsqueda en BST	O(log n)	O(log n)	O(n)
Búsqueda en AVL / Red-Black
*/