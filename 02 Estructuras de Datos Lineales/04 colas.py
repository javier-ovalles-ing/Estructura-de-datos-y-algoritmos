/*

COLA (QUEUES, DEQUES Y COLA DE PRIORIDAD)

una cola (queue) es una estructura de datos lineal que sigue el principio FIFO (First in, first out): el primero en entrar es el primero en salir.

Una analogia seria el de una fila de espera: el primero que llega es el primero que se atiende, los nuevos se agregan al final de la fila. 

Entrada ->  [1] [2] [3] [4] [5]  -> Salida
           frente              final
         (front)              (rear)


2. COLA SIMPLE (FIFO)

Operaciones principales

enqueue(x) O(1): Inserta un elemento al final de la cola

dequeue() O(1): Elimina y retorna el elemento del frente.

front() O(1): Consulta el elemento del frente sin elimiarlo.

is_empty() O(1): Verifica si la cola esta vacia.

dequeue() es O(1) solo si la implementacion es adecuada - si se implementa ingenuamente con un arreglo puede tener un rendimiento O(n) porque hay que desplazar todo los lementos restantes.
*/

class ColaIneficiente:
    def __init__(self):
        self._datos = []

    def enqueue(self, x):
        self._datos.append(x)          # O(1) amortizado

    def dequeue(self):
        return self._datos.pop(0)       # O(n) -> desplaza todos los elementos

/*
  Implementación con lista enlazada

  Con listas se implenta manteniendo la referencia tantoa  la cabeza(frente) como a la cola(final) dela lista, ambas operaciones son O(1):

  */

  class Nodo:
    def __init__(self, dato):
        self.dato = dato
        self.siguiente = None

class ColaConLista:
    def __init__(self):
        self.frente = None
        self.final = None
        self._tamano = 0

    def enqueue(self, x):
        """O(1)"""
        nuevo = Nodo(x)
        if self.final is None:
            self.frente = self.final = nuevo
        else:
            self.final.siguiente = nuevo
            self.final = nuevo
        self._tamano += 1

    def dequeue(self):
        """O(1)"""
        if self.frente is None:
            raise IndexError("La cola está vacía")
        nodo = self.frente
        self.frente = self.frente.siguiente
        if self.frente is None:
            self.final = None
        self._tamano -= 1
        return nodo.dato

    def is_empty(self):
        return self.frente is None

   /* Implementación con buffer circular (arreglo de tamaño fijo)
   
   se usa un arreglo de tamaño fijo con dos índices (frente y final) que "dan la vuelta" al llegar al final del arreglo, evitando desplazamientos.

   */
class ColaCircular:
    def __init__(self, capacidad):
        self._datos = [None] * capacidad
        self._capacidad = capacidad
        self._frente = 0
        self._tamano = 0

    def enqueue(self, x):
        if self._tamano == self._capacidad:
            raise OverflowError("Cola llena")
        posicion = (self._frente + self._tamano) % self._capacidad
        self._datos[posicion] = x
        self._tamano += 1

    def dequeue(self):
        if self._tamano == 0:
            raise IndexError("Cola vacía")
        valor = self._datos[self._frente]
        self._frente = (self._frente + 1) % self._capacidad
        self._tamano -= 1
        return valor


/* DEQUE ( DOBULE-ENDED QUEQUE)

Un deque (cola dedoble extremo) permite insertar y eliminar eficientemente tanto en inicio como el final, no solo en uno.

inicio                         final
     v                              v
   [1] <-> [2] <-> [3] <-> [4] <-> [5]
     ^insert/delete          insert/delete^


     Operaciones:

     append_left(x) O(1): insertar al inicio.

    append_right(x) O(1): insertar al final

    pop_left() O(1): Eliminar y retornar del inicio.

    pop_right() O(1): Elimina y retorna del final. 

    from collections import deque

d = deque()
d.append(10)         # inserta al final -> [10]
d.appendleft(5)        # inserta al inicio -> [5, 10]
d.append(20)           # -> [5, 10, 20]
d.appendleft(1)         # -> [1, 5, 10, 20]

print(d.pop())          # elimina del final -> 20, queda [1, 5, 10]
print(d.popleft())       # elimina del inicio -> 1, queda [5, 10]

si solo se usan append_right y pop_right (un solo extremo), el deque se comporta como una pila. 

Si se usan append_right y pop_left, el deque se comporta como una pila.

si se usan append_right y pop_left, el deque se comporta como una cola. 

un deque es la estructura mas flexible y muchas librerias como python la usan interanmente para implementar tanto pilas como colas. 

COLA DE PRIORIDAD (Priority Queue)

Es una cola donde cada uno de sus elementos tiene un orden de prioridad, y el elemento que se saca es el de mayor (o menor) prioridad, sin importar el orden en que fue insertado. no sigue el orden FIFO estricto. 

Insertados: (prioridad 5, "A"), (prioridad 1, "B"), (prioridad 3, "C")
Extracción (menor primero): "B" (1) -> "C" (3) -> "A" (5)

la mejor forma de implementarlo es con un heap binario (monticulo), tipicamente representado como un arreglo que simula un arbol binario casi completo: 

Min-heap: el elemento con menor valor siempre está en la raíz.

Max-heap: el elemento con mayor valor siempre está en la raíz.

Min-heap:
        1
       / \
      3   2
     / \
    5   4


operaciones

insertar O(log n)

extraer el mayor/menor prioridad O(log n)

comsultar el de mayor/menor prioridad O(1)

construir heap desde n elementos O(n)


Implementación con heapq en Python

Python implementa un min-heap por defecto: el menor valor sale primero.

import heapq

cola_prioridad = []
heapq.heappush(cola_prioridad, (3, "tarea baja"))
heapq.heappush(cola_prioridad, (1, "tarea urgente"))
heapq.heappush(cola_prioridad, (2, "tarea media"))

while cola_prioridad:
    prioridad, tarea = heapq.heappop(cola_prioridad)
    print(f"{prioridad}: {tarea}")

# Salida:
# 1: tarea urgente
# 2: tarea media
# 3: tarea baja

Para simular un max-heap (mayor prioridad primero), se invierten los valores al insertar:

*/

heapq.heappush(cola_prioridad, (-prioridad, tarea))  # negar la prioridad

/*
Implementación conceptual manual (simplificada)
*/

class ColaPrioridadSimple:
    def __init__(self):
        self._heap = []

    def _flotar(self, i):
        while i > 0:
            padre = (i - 1) // 2
            if self._heap[i] < self._heap[padre]:
                self._heap[i], self._heap[padre] = self._heap[padre], self._heap[i]
                i = padre
            else:
                break

    def _hundir(self, i):
        n = len(self._heap)
        while True:
            izq, der = 2*i + 1, 2*i + 2
            menor = i
            if izq < n and self._heap[izq] < self._heap[menor]:
                menor = izq
            if der < n and self._heap[der] < self._heap[menor]:
                menor = der
            if menor == i:
                break
            self._heap[i], self._heap[menor] = self._heap[menor], self._heap[i]
            i = menor

    def insertar(self, valor):
        self._heap.append(valor)
        self._flotar(len(self._heap) - 1)

    def extraer_min(self):
        if not self._heap:
            raise IndexError("Cola vacía")
        raiz = self._heap[0]
        ultimo = self._heap.pop()
        if self._heap:
            self._heap[0] = ultimo
            self._hundir(0)
        return raiz