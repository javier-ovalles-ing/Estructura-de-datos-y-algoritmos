/*

Una lista enlazada es una estructura de datos lineal compuesta por un conjunto de nodos, donde cada nodo al macena: 

1. un dato (o valor que se quiere guardar)
2. Una o mas referencias (o punteros) que apuntan a otros nodos de la lista. 

A diferencia de los arreglos, no nesesitan estar en bloques contiguos de memoria, cada nodo puede vivir en cualquier lugar de la memoria, lo que los mantiene conectados es la cadena de referencias entre ellos. 

[dato|siguiente] -> [dato|siguiente] -> [dato|siguiente] -> NULL
   nodo 1               nodo 2               nodo 3


la lista siempre se accede atravez de una referencia inicial llamada cabeza (head) que apunta al primer nodo de la lista.


LISTAS SIMPLEMENTE ENLAZADAS

En este tipo de listas los nodos solo tienen un puntero al siguiente nodo. el recorrido de la lista es hacia una sola direccion, desde el primer nodo hasta el último nodo.

*/

class Nodo:
    def __init__(self, dato):
        self.dato = dato
        self.siguiente = None # puntero al siguiente nodo

//implementacion completa

ListaEnlazada:
    def __init__(self):
        self.cabeza = None # referencia al primer nodo de la lista
        self.tamano = 0 # tamaño de la lista

    def insertar_inicio(self,dato):
        """Insertar un nuevo nodo al principio -> o(1)"""
        nuevo = Nodo(dato)
        nuevo.siguiente = self.cabeza # el nuevo nodo apunta al nodo que era cabeza
        self.cabeza = nuevo # la cabeza ahora apunta al nuevo nodo
        self.tamano += 1 # incrementamos el tamaño de la lista

        def insertar_final(self,dato):
            """Insertar un nuevo nodo al final -> o(n), tiene que recorrer la lista completa"""
            nuevo = Nodo(dato)
            if self.cabeza is None: # si la lista esta vacia
                self.cabeza = nuevo # el nuevo nodo es la cabeza
            else:
                actual = self.cabeza # empezamos desde la cabeza
                while actual.siguiente: # mientras haya un siguiente nodo
                    actual = actual.siguiente # avanzamos al siguiente nodo
                actual.siguiente = nuevo # el ultimo nodo apunta al nuevo nodo
            self.tamano += 1 # incrementamos el tamaño de la lista

        def eliminar(self, dato):
        """Elimina el primer nodo que contenga 'dato' -> O(n)"""
        actual = self.cabeza
        anterior = None
        while actual:
            if actual.dato == dato:
                if anterior is None:          # es la cabeza
                    self.cabeza = actual.siguiente
                else:
                    anterior.siguiente = actual.siguiente
                self.tamano -= 1
                return True
            anterior = actual
            actual = actual.siguiente
        return False


        def buscar(self, dato):
        """Busca un dato -> O(n)"""
        actual = self.cabeza
        posicion = 0
        while actual:
            if actual.dato == dato:
                return posicion
            actual = actual.siguiente
            posicion += 1
        return -1

            def recorrer(self):
        """Imprime todos los elementos -> O(n)"""
        actual = self.cabeza
        elementos = []
        while actual:
            elementos.append(actual.dato)
            actual = actual.siguiente
        return elementos


// Ejemplo de uso

lista = ListaEnlazada()
lista.insertar_inicio(3)
lista.insertar_inicio(2)
lista.insertar_inicio(1)
lista.insertar_final(4)
print(lista.recorrer())   # [1, 2, 3, 4]
lista.eliminar(2)
print(lista.recorrer())   # [1, 3, 4]

/*
    LISTAS DOBLEMENTE ENLAZADAS

    Cada nodo mantiene dos referencias, una al nodo anterior y otra al nodo siguiente.

    NULL <- [ant|dato|sig] <-> [ant|dato|sig] <-> [ant|dato|sig] -> NULL
              nodo 1              nodo 2              nodo 3

              
*/
class NodoDoble:
    def __init__(self, dato):
        self.dato = dato
        self.anterior = None
        self.siguiente = None

/* Mantener una referencia tanto a la cabeza como a la cola permite insertar/eliminar en ambos extremos en O(1) */

class ListaDoblementeEnlazada:
    def __init__(self):
        self.cabeza = None
        self.cola = None
        self.tamano = 0

    def insertar_inicio(self, dato):
        """O(1)"""
        nuevo = NodoDoble(dato)
        if not self.cabeza:
            self.cabeza = self.cola = nuevo
        else:
            nuevo.siguiente = self.cabeza
            self.cabeza.anterior = nuevo
            self.cabeza = nuevo
        self.tamano += 1

    def insertar_final(self, dato):
        """O(1) gracias a la referencia 'cola'"""
        nuevo = NodoDoble(dato)
        if not self.cola:
            self.cabeza = self.cola = nuevo
        else:
            nuevo.anterior = self.cola
            self.cola.siguiente = nuevo
            self.cola = nuevo
        self.tamano += 1

    def eliminar(self, dato):
        """O(n) para encontrar el nodo, O(1) para desconectarlo"""
        actual = self.cabeza
        while actual:
            if actual.dato == dato:
                if actual.anterior:
                    actual.anterior.siguiente = actual.siguiente
                else:
                    self.cabeza = actual.siguiente   # era la cabeza

                if actual.siguiente:
                    actual.siguiente.anterior = actual.anterior
                else:
                    self.cola = actual.anterior       # era la cola

                self.tamano -= 1
                return True
            actual = actual.siguiente
        return False

    def recorrer_adelante(self):
        actual = self.cabeza
        elementos = []
        while actual:
            elementos.append(actual.dato)
            actual = actual.siguiente
        return elementos

    def recorrer_atras(self):
        actual = self.cola
        elementos = []
        while actual:
            elementos.append(actual.dato)
            actual = actual.anterior
        return elementos

/*  3.3 Ejemplo de uso*/

lista = ListaDoblementeEnlazada()
lista.insertar_final(1)
lista.insertar_final(2)
lista.insertar_final(3)
lista.insertar_inicio(0)

print(lista.recorrer_adelante())  # [0, 1, 2, 3]
print(lista.recorrer_atras())     # [3, 2, 1, 0]

lista.eliminar(2)
print(lista.recorrer_adelante())  # [0, 1, 3]

/* 3.4 Complejidad*/

Operación	Complejidad
Acceso por índice	O(n)
Búsqueda	O(n)
Inserción al inicio	O(1)
Inserción al final	O(1)
Eliminación al inicio	O(1)
Eliminación al final	O(1)
Eliminación en medio (con referencia al nodo)	O(1)
Eliminación en medio (buscando por valor)	O(n)

5. Variante: lista circular

Tanto las listas simples como las dobles pueden convertirse en circulares, donde el último nodo, en lugar de apuntar a NULL, apunta de vuelta al primero (y en la versión doble, el primero apunta también al último).

[dato] -> [dato] -> [dato] -+
   ^-------------------------+

Esto es útil para estructuras donde se necesita recorrer indefinidamente en ciclo, como en un turno rotativo (round-robin) de procesos o un carrusel de elementos.