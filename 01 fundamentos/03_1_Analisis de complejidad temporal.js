/*

Análisis de complejidad temporal y espacial

COMPLEJIDAD TEMPORAL

Busca medir como crece el numero de operaciones básicas elementales (comparaciones, asignaciones, suma) en función de n. Se suele analizar contando bucles anidados, llamadas recursivas, etc.  Es la relación entre el tamaño de la entrada (n) y el numero de operaciones básicas que ejecuta el algoritmo. 

Reglas practdicas para contar operaciones:

1. Instrucciones simples (asignación, comparación, operación aritmética) son O(1)

	ejemplo:

		x=1;	  // asignaciones
		if(x<3); // comparaciones
		x = 3*3; // operaciones aritmeticas

2. bucles simples corresponden a n elementos O(n)
*/

	ejmplos:
		
		for (let x = 1; x <= 7; x++) {
             console.log(x);  
        }
/*
3. Bucles anidados: se multiplican. dos bucles anidados que recorren n cada uno son O(n^2);

	for i in range(n):        # se ejecuta n veces
    		for j in range(n):    # se ejecuta n veces por cada i
       			 print(i, j)        # O(1)
			
	Esto es O(n · n) = O(n²).

4. los bucles dependientes también son O(n²), aunque hagan menos operaciones que un bucle anidado completo, la notación asintótica ignora ese factor constante. 

for i in range(n):
    for j in range(i, n):
        print(i, j)

5. Llamadas recursivas: se analizan con relaciones de recurrencia (tema 4). 

6. Instrucciones secuenciales: se suman  pero domnina el termino de mayor orden. un bucle O(n) seguido de otro O(n^2 + n) = O(n2)

7. Log n: Variable que se duplica o divide en cada iteración. La clave de  O(log n) es que el algoritmo reduce a la mitad el tamaño del problema en cada paso.

	Si tienes 8 elementos, te tomará como máximo 3 pasos (2^3 = 8).
	Si duplicas los elementos a 16, solo te toma 4 pasos (2^4 = 16).
	Si tienes 1,048,576 elementos, ¡solo te tomará un máximo de 20 pasos! (2^{20} = 1,048,576).

    */

function busquedaBinaria(arr, objetivo) {
    let izquierda = 0;
    let derecha = arr.length - 1;

    while (izquierda <= derecha) {
        // Encontramos el índice del elemento central
        const medio = Math.floor((izquierda + derecha) / 2);

        if (arr[medio] === objetivo) {
            return medio; // Elemento encontrado, devolvemos su índice
        } 
        
        // Si el objetivo es mayor, descartamos la mitad izquierda
        if (arr[medio] < objetivo) {
            izquierda = medio + 1;
        } 
        // Si el objetivo es menor, descartamos la mitad derecha
        else {
            derecha = medio - 1;
        }
    }

    return -1; // El elemento no está en el arreglo
}

/*
8. O(n log n): Un bucle que recorre n, y dentro otro que recorre log n.

*/

function ejercicioTres(n) {
    let total = 0;
    for (let i = 0; i < n; i++) {
        let j = 1;
        while (j < n) {
            total += i * j;
            j = j * 2;
        }
    }
    return total;
}
/*
9. O(2ⁿ): Bucle recursivo que genera 2 llamadas por nivel. Exponencial (Ej: Fuerza bruta para el Problema de la Mochila). Este es el territorio donde el rendimiento cae en picada. Cada elemento nuevo que agregas a la entrada duplica el número de operaciones totales.  Si tienes un conjunto de tamaño n, el total de subconjuntos posibles es exactamente 2^n. Para n = 10 son 1,024 operaciones; para n = 30 son más de 1,000 millones de operaciones.

/**
 * Fuerza bruta para el Problema de la Mochila 0/1
 * Complejidad: O(2^n) — por cada elemento hay 2 decisiones (incluir / no incluir)
 *
 * @param {number[]} pesos - array de pesos de los items
 * @param {number[]} valores - array de valores de los items
 * @param {number} capacidad - capacidad máxima de la mochila
 * @param {number} n - índice del item actual (empieza en pesos.length - 1)
 * @returns {number} - valor máximo alcanzable
 */



function mochilaFuerzaBruta(pesos, valores, capacidad, n) {
  // Caso base: no quedan items o no hay capacidad
  if (n === 0 || capacidad === 0) {
    return 0;
  }

  // Si el peso del item actual excede la capacidad, no se puede incluir
  if (pesos[n - 1] > capacidad) {
    return mochilaFuerzaBruta(pesos, valores, capacidad, n - 1);
  }

  // Llamada 1: NO incluir el item actual
  const sinIncluir = mochilaFuerzaBruta(pesos, valores, capacidad, n - 1);

  // Llamada 2: SÍ incluir el item actual
  const incluyendo =
    valores[n - 1] +
    mochilaFuerzaBruta(pesos, valores, capacidad - pesos[n - 1], n - 1);

  // Se elige la mejor opción entre las dos ramas
  return Math.max(sinIncluir, incluyendo);
}
/*

10. O(n!):bucle recursivo que genera todas las permutaciones de n elementos (en cada nivel se ramifica en una cantidad decreciente de opciones: n, luego n-1, luego n-2...)

*/
function permutaciones(elementos, actual = []) {
    // Caso base: si no quedan elementos en el arreglo
    if (elementos.length === 0) {
        console.log(actual);
        return;
    }

    for (let i = 0; i < elementos.length; i++) {
        // Se elige un elemento distinto en cada rama
        permutaciones(
            elementos.slice(0, i).concat(elementos.slice(i + 1)), // elementos[:i] + elementos[i+1:]
            actual.concat([elementos[i]])                         // actual + [elementos[i]]
        );
    }
}

// Ejemplo de uso:
permutaciones([1, 2, 3]);

        /*
Por qué es O(n!):

En el primer nivel hay n elecciones posibles (cuál elemento va primero).
En el segundo nivel, para cada una de esas, quedan n-1 elecciones.
En el tercer nivel, n-2 elecciones... y así sucesivamente.

Este patrón — elegir sin repetición entre un conjunto que se reduce en 1 en cada nivel de recursión — es la firma característica de O(n!). Aparece típicamente en:

Generación de todas las permutaciones.
Fuerza bruta del problema del viajante (TSP).
Backtracking sin poda sobre asignaciones completas de n elementos distintos.

gerarquía típica de complejidades (de mejor a peor):
O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(n³) < O(2ⁿ) < O(n!)


Las complejidades más comunes
 
O(1)	Constante	Acceder a un elemento de un arreglo por índice
O(log n)	Logarítmica    Búsqueda binaria en un arreglo ordenado
O(n)	Lineal	Recorrer un arreglo de n elementos
O(n log n)	Logarítmico lineal	Algoritmo de ordenamiento rápido (Quicksort)
O(n^2)	Cuadrática	Algoritmo de ordenamiento por burbuja (Bubble Sort)
O(2^n)	Exponencial	Algoritmo de fuerza bruta para el problema de la mochila
O(n!)	Factorial	Algoritmo de fuerza bruta para el problema del viajante de comercio

*/






 

