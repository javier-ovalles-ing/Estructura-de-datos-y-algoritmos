/*
ARREGLOS

Es una estructura de datos que almacena una coleccion de elementos del mismo tipo en posiciones de memoria contiguas, identificados con un indice numerico que por lo general comienza con 0.

 Gracias a que los elementos estan contiguos en memoria, el sistmea puede calcular la direccion de cualquier elemento con una simple formula:

 direccion(i) = direccion_base + i * tamano_del_elemento

 Esto es lo que permite un acceso aleatorio en tiempo constante O(1) a cualquier elemento del arreglo.

 Índice:    0     1     2     3     4
Memoria:    [10] [25]  [ 7]   [42]     [ 3]
Dirección: 100   104   108    112      116   (si cada entero ocupa 4 bytes)

 ARREGLOS ESTATICOS

 En este tipo de arreglos el tamano se define al crearce el arreglo y no puede cambiarse durante la vida del mismo.
 
*/

int numeros[5] = {10, 25, 7, 42, 3};
printf("%d", numeros[2]); // acceso O(1) -> 7

//2.5 Recorrido y búsqueda

// Búsqueda lineal en un arreglo no ordenado -> O(n)

int buscar(int arr[], int n, int objetivo) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == objetivo) {
            return i; // Devuelve el índice donde se encontró
        }
    }
    return -1; // No se encontró
}

// si el arreglo esta ordenado se puede usar busqueda binaria para reducir su complejidad a O(log n).

int busquedaBinaria(int arr[], int n, int objetivo) {
    int izq = 0;
    int der = n - 1;

    while (izq <= der) {
        int medio = (izq + der) / 2;

        if (arr[medio] == objetivo) {
            return medio; // Se encontró el elemento
        }
        else if (arr[medio] < objetivo) {
            izq = medio + 1; // Buscar en la mitad derecha
        }
        else {
            der = medio - 1; // Buscar en la mitad izquierda
        }
    }

    return -1; // No se encontró
}

/*
    ARREGLOS DINAMICOS

    En este tipo de arreglos el tamano crece o se reduce durante el tiempo de ejecucion del programa.

    Ejemplos concretos: list en Python, ArrayList en Java, vector en C++, Array en JavaScript.

    siguen siendo arreglos internamente, pero el lenguaje gestiona automaticamente las reservas de memoria adicional.

    como funciona el redimensionamiento:

    1. Se crea un arrelgo de un tamano inicial. por ejemplo de 4 espacios.
    2. Cuando se llema la capacidad y se inserta un nuevo elemento:
        2.1 se reserva un nuveo bloque de memoria, por lo general del doble de tamano ( estrategia doubling).
        2.2 se copian los elementos del arreglo original al nuevo bloque de memoria. Esta operaicon es O(n).
        2.3 se libera la memoria anterior.
    3. La operacion de rezaising es costosa, pero como se hace en pocas ocaciones debido al crecimiento doble en cada rezaising, el costo se amortiza porque la insercion es O(1).

    Capacidad 4:  [10][25][ 7][42]        <- lleno
Insertar 3 -> se duplica a capacidad 8:
              [10][25][ 7][42][ 3][ ][ ][ ]


ejemplo en Python:


arr = []                 # capacidad inicial pequeña, gestionada internamente
arr.append(10)            # O(1) amortizado
arr.append(25)
arr.append(7)
arr.insert(1, 99)         # O(n): desplaza todo lo que está a la derecha del índice 1
print(arr)                # [10, 99, 25, 7]

arr.pop()                 # elimina el último -> O(1)
arr.pop(0)                 # elimina el primero -> O(n), desplaza todo hacia la izquierda


3.4 Complejidad de operaciones


Operación	Arreglo estático	Arreglo dinámico
Acceso por índice	O(1)	O(1)
Búsqueda (no ordenado)	O(n)	O(n)
Búsqueda (ordenado, binaria)	O(log n)	O(log n)
Inserción al final	No aplica (tamaño fijo)	O(1) amortizado
Inserción al inicio/medio	No aplica	O(n)
Eliminación al final	No aplica	O(1)
Eliminación al inicio/medio	No aplica	O(n)
Redimensionar	No permitido	O(n), pero infrecuente


3.5 arreglos multidimensionales

Los arreglos pueden ser tambien multidimensionales, utiles para representar matrices, tablas, o imagenes. 

*/

#include <stdio.h>

int main() {
    // Matriz 3x3
    int matriz[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    // fila 1, columna 2
    printf("%d\n", matriz[1][2]); // 6

    return 0;
}

/*
Las matrices se suelen almacenar en memoria de manera contigua usando orden por fila (row-major order) o por columna (column-major order). En C, se utiliza el orden por fila. row major significa que se guardan las filas de la matriz una tras otras. column major significa que se guardan las columnas de la matriz una tras otras de forma contigua. 

*/