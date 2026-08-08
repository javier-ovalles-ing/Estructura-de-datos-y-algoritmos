/*
    PILAS (Stacks)

    1. Definición: Una pila es una estructura de datos lineal que sigue el principio LIFO (Last In, First Out), lo que significa que el último elemento agregado a la pila es el primero en ser removido.

    Es una estructura de datos lineal que sigue el prinsipio LIFO (Last in, First Out), el ultimo elemento en entrar es el primero en salir.


    Es comparable a una pila de platos, solo puedes agregar un plato ensima de la pila y no puedes sacar un plato sin antes sacar los que estan ensima de el. 

    |  5  |  <- tope (top) - último en entrar, primero en salir
        |  4  |
        |  3  |
        |  2  |
        |  1  |  <- fondo (bottom) - primero en entrar
        -------

    2. Operaciones Principales:

    Push(x): O(1) - Agregar un elemento x al tope de la pial.

    Pop(): O(1) - Eliminar y retornar elemento del tope.

    peek()/top(): O(1) Consulta el elemento del tope sin eliminarlo. 

    is_empty(): O(1) - verificar si la pila esta vacia. 
    size(): O(1) - retorna la cantidad de elementos en la pila.

    Todas las operaciones son O(1) por que no es nesesario reccorrer la pila sino que se trabaja siempre con el elemento del tope.

3. IMPLEMENTACION (CON ARREGLOS):

Es la mas comun porque aprobecha la insercion/eliminacion O(1) amortizada al final de un arreglo dinamico. 

*/

python
class Pila:
    def __init__(self):
        self._datos = []

    def push(self, x):
        """Inserta un elemento en el tope -> O(1) amortizado"""
        self._datos.append(x)

    def pop(self):
        """Elimina y retorna el elemento del tope -> O(1)"""
        if self.is_empty():
            raise IndexError("No se puede hacer pop: la pila está vacía")
        return self._datos.pop()

    def peek(self):
        """Consulta el tope sin eliminarlo -> O(1)"""
        if self.is_empty():
            raise IndexError("La pila está vacía")
        return self._datos[-1]

    def is_empty(self):
        return len(self._datos) == 0

    def size(self):
        return len(self._datos)

   /* Uso: */

python
p = Pila()
p.push(1)
p.push(2)
p.push(3)
print(p.peek())   # 3 (el tope)
print(p.pop())     # 3, se elimina
print(p.pop())     # 2
print(p.size())   # 1

/* Nota: en un arreglo se elimina siempre por el final y  no por el inicio, ya que al eliminar por el final tienes un rendimiento O(1), mientras que eliminar por el inicio tiene un rendimiento O(n) porque tienes que recorrer todo el arreglo.


4. IMPLEMENTACION (CON LISTAS ENLAZADAS):

Se implementa con listas enlazadas, insertando y eliminando siempre por la cabeza, lo cual tambien es O(1).
*/

class Nodo:
    def __init__(self, dato):
        self.dato = dato
        self.siguiente = None

class PilaConLista:
    def __init__(self):
        self.tope = None
        self._tamano = 0

    def push(self, x):
        """O(1)"""
        nuevo = Nodo(x)
        nuevo.siguiente = self.tope
        self.tope = nuevo
        self._tamano += 1

    def pop(self):
        """O(1)"""
        if self.is_empty():
            raise IndexError("La pila está vacía")
        nodo = self.tope
        self.tope = self.tope.siguiente
        self._tamano -= 1
        return nodo.dato

    def peek(self):
        if self.is_empty():
            raise IndexError("La pila está vacía")
        return self.tope.dato

    def is_empty(self):
        return self.tope is None

    def size(self):
        return self._tamano


*/
/*
Arreglo vs. lista enlazada para implementar una pila:

Aspecto	Arreglo dinámico	Lista enlazada
push/pop	O(1) amortizado	O(1) siempre
Memoria	Contigua, mejor localidad de caché	Dispersa, overhead de punteros
Redimensionamiento	Ocasional O(n) al crecer	No aplica

*/

